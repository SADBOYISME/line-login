import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message/reply";
  const LINE_HEADER = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
  };

  const body = await request.json();

  await fetch(LINE_MESSAGING_API, {
    method: "POST",
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: body.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: JSON.stringify(body),
        },
      ],
    }),
  });

  return NextResponse.json({
    status: 200,
    message: "Success",
  });
}
