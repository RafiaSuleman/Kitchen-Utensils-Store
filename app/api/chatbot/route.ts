import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const input = message.toLowerCase();

  let reply = "Sorry, I couldn't understand your question.";

  // Delivery
  if (input.includes("delivery") || input.includes("shipping")) {
    reply = "Our delivery usually takes 3 to 5 working days";
  }

  // COD
  else if (input.includes("cod") || input.includes("cash on delivery")) {
    reply = "Yes, Cash on Delivery is available .";
  }

  // Product availability
  else if (
    input.includes("pan") ||
    input.includes("knife") ||
    input.includes("utensils")
  ) {
    reply = "Yes, kitchen utensils and cookware products are available.";
  }

  // Return policy
  else if (input.includes("return")) {
    reply = "Our return policy is 7 days if the product is unused.";
  }

  return NextResponse.json({ reply });
}
