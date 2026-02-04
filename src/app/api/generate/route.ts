import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { review, stars, tone, businessType } = body;

    if (!review || !stars || !tone || !businessType) {
      return NextResponse.json(
        { error: "Missing required fields: review, stars, tone, businessType" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert at writing business review responses. You help local businesses respond to customer reviews on Google, Yelp, and similar platforms.

Your responses should:
- Be genuine, warm, and human-sounding (never robotic or templated)
- Address specific points mentioned in the review
- Be appropriately concise (2-4 sentences for positive reviews, 3-5 for negative)
- Never be defensive or dismissive
- Show gratitude for feedback
- For negative reviews: acknowledge the issue, apologize sincerely, offer to make it right
- For positive reviews: express genuine thanks, reinforce what they enjoyed
- Match the business type context (${businessType})
- NEVER include placeholder text like [Name] or [Business Name] — write as if the business owner is responding directly`;

    const userPrompt = `Write 3 different response options for this ${stars}-star review. Each response should have a slightly different approach while maintaining a ${tone.toLowerCase()} tone.

Review (${stars}/5 stars):
"${review}"

Business type: ${businessType}
Desired tone: ${tone}

Return exactly 3 responses in this JSON format:
[
  {"tone": "${tone}", "response": "..."},
  {"tone": "${tone} (variation)", "response": "..."},
  {"tone": "${tone} (alternative)", "response": "..."}
]

Return ONLY the JSON array, no other text.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from AI");
    }

    // Parse the JSON response - try to extract JSON from the response
    let responses;
    const responseText = textContent.text.trim();
    
    // Try direct parse first
    try {
      responses = JSON.parse(responseText);
    } catch {
      // Try to find JSON array in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        responses = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse AI response");
      }
    }

    if (!Array.isArray(responses) || responses.length === 0) {
      throw new Error("Invalid response format");
    }

    return NextResponse.json({ responses });
  } catch (error) {
    console.error("Generate error:", error);
    
    if (error instanceof Error && error.message.includes("API key")) {
      return NextResponse.json(
        { error: "API configuration error. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate responses. Please try again." },
      { status: 500 }
    );
  }
}
