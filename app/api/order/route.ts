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