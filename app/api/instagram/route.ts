// app/api/instagram/route.ts
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;

// 1. Webhook Verification handshake from Meta
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// 2. Incoming Event (Comment or DM received)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === "instagram") {
      for (const entry of body.entry) {
        // Handle comment webhook
        if (entry.changes) {
          for (const change of entry.changes) {
            if (change.field === "comments") {
              const commentText = change.value.text?.toLowerCase() || "";
              const commenterId = change.value.from?.id;

              if (commentText.includes("calcular") || commentText.includes("calculadora")) {
                await sendInstagramDM(
                  commenterId,
                  "¡Hola! Aquí tienes la calculadora de costo real y DTI 28/36: https://barcias.com/calculator"
                );
              }
            }
          }
        }
      }
      return NextResponse.json({ status: "EVENT_RECEIVED" }, { status: 200 });
    }

    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function sendInstagramDM(recipientId: string, text: string) {
  const url = `https://graph.facebook.com/v21.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
    }),
  });
}