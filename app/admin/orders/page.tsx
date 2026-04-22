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
 
 useEffect(() => {
  const fetchOrders = async () => {
    const res = await fetch("/api/order", {
      cache: "no-store",
    });

    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  fetchOrders(); // first load

  const interval = setInterval(fetchOrders, 5000); // auto refresh

  return () => clearInterval(interval);
}, []);

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

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      {orders.length === 0 && <p>No orders found</p>}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-5 rounded-xl">
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