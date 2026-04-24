"use client";

import { useEffect, useState } from "react";

interface Item {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customerName?: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  items: Item[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [prevOrders, setPrevOrders] = useState<string[]>([]);
  const isNewOrder = (id: string) => {
    return !prevOrders.includes(id);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/order?time=" + Date.now(), {
        cache: "no-store",
      });

      const data = await res.json();

      // 🔥 Detect new orders
      const newOrders = data.filter(
        (order: Order) => !prevOrders.includes(order._id),
      );

      if (prevOrders.length > 0 && newOrders.length > 0) {
        // 🔔 Play sound
        const audio = new Audio("/notification.mp3");
        audio.play();

        console.log("New Order Received!");
      }

      setOrders(data);
      setPrevOrders(data.map((order: Order) => order._id));
      setLoading(false);
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, [prevOrders]);

  if (loading) {
    return <p className="p-10">Loading orders...</p>;
  }
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: id,
          status: newStatus,
        }),
      });

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Status update error:", error);
    }
  };
  const filteredOrders = orders.filter((order) => {
    const value = search.toLowerCase();

    return (
      order.status.toLowerCase().includes(value) ||
      order.customerName?.toLowerCase().includes(value) ||
      order.email.toLowerCase().includes(value)
    );
  });
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by status, name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className={`border p-5 rounded-xl ${
              isNewOrder(order._id) ? "border-green-500 bg-green-50" : ""
            }`}
          >
            {/* Customer */}
            <h2 className="font-bold text-lg">
              {order.customerName || "No Name"}
            </h2>

            <p>{order.email}</p>
            <p>{order.phone}</p>
            <p className="text-gray-600">{order.address}</p>

            {/* Order Info */}
            <div className="mt-2 flex justify-between">
              <p className="font-bold">$. {order.totalAmount}</p>
              <div className="flex gap-2 items-center">
                <span className="text-sm font-semibold">{order.status}</span>

                <button
                  onClick={() => updateStatus(order._id, "Pending")}
                  className="text-xs px-2 py-1 bg-yellow-100 rounded"
                >
                  Pending
                </button>

                <button
                  onClick={() => updateStatus(order._id, "Completed")}
                  className="text-xs px-2 py-1 bg-green-100 rounded"
                >
                  Completed
                </button>

                <button
                  onClick={() => updateStatus(order._id, "Cancelled")}
                  className="text-xs px-2 py-1 bg-red-100 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="mt-3 border-t pt-2">
              {order.items?.map((item: Item, i: number) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>
                    {item.productName} x {item.quantity}
                  </span>
                  <span>$. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
