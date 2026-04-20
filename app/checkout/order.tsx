"use client";

import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";

export default function Checkout() {
  const { cart, clearCart } = useCartStore();

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const orderData = {
      ...form,
      products: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: "pending",
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Placed Successfully ✅");

        // optional: clear cart after order
        clearCart();

        setForm({
          customerName: "",
          email: "",
          address: "",
        });
      } else {
        alert("Failed to place order ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* CART SUMMARY */}
      <div className="mb-6 border p-4 rounded">
        <h2 className="font-semibold mb-2">Cart Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))
        )}

        <hr className="my-2" />

        <div className="font-bold flex justify-between">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.customerName}
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Address"
          className="border p-2 rounded"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-[#C78238] text-white py-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}