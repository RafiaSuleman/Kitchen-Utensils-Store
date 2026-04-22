import { client } from "@/sanity/lib/sanityClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const result = await client.create({
      _type: "order",
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      items: data.items,
      totalAmount: data.totalAmount,
      status: "pending",
      orderDate: data.orderDate,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await client.fetch(`
      *[_type == "order"] | order(orderDate desc) {
        _id,
        customerName,
        email,
        phone,
        address,
        items,
        totalAmount,
        status,
        orderDate
      }
    `);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    const updatedOrder = await client
      .patch(orderId)
      .set({ status })
      .commit();

    return NextResponse.json({ success: true, updatedOrder });
  } catch (error) {
    return NextResponse.json(
     { error: error instanceof Error ? error.message : "Failed to update status" },
      { status: 500 }
    );
  }
}