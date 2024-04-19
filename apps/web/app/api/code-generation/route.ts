import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const openai = new OpenAI();

export const runtime = "edge";

const PROMPT = `You're a PostgreSQL expert specializing in SQL diagram construction and need to follow specific guidelines:

1.Add the following comment in uppercase at the top of each table: --TABLE
2.Analyze each column carefully. If column types aren't specified, use your expertise to select the appropriate type based on the column name.
3.Utilize these PostgreSQL column types for Supabase: int2, int4, int8, float4, float8, numeric, json, jsonb, text, varchar, uuid, date, time, timetz, timestamp, timestamptz, bool.
4.Don't add any extra column, just create those that are in the diagram.
5.Regarding relationships, there are two approaches:
- If there are relationships in the diagram: Ensure to generate the corresponding SQL relationships between tables as depicted in the diagram.
- If no relationships are depicted: Utilize your expertise to infer and generate relationships between tables based on their structure or other available information.

Here is an example of table:

--TABLE
CREATE TABLE "public"."users" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text,
  email text,
  created_at timestamp with time zone
);

Add always the schema name "public" before the table's name.
Ensure the generated SQL code accurately represents the visual schema for Supabase, including table relationships where present. 
Return only the SQL code without any additional characters like backticks or formatting indicators.`;

// TODO: add environment variables
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(2, "1440 m"), // 2 per day
        analytics: true,
      })
    : false;

export async function POST(req: Request) {
  const customApiKey = cookies().get("api-key")?.value;
  if (customApiKey && customApiKey.trim().length > 0) {
    // Set user's api key
    openai.apiKey = customApiKey;
  }

  if (process.env.NODE_ENV === "production") {
    if (ratelimit) {
      const ip = req.headers.get("x-real-ip") ?? "local";

      const { success, limit, reset, remaining } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { message: "You have reached your request limit for the day." },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        );
      }
    }
  }

  const { prompt: base64 } = await req.json();

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return NextResponse.json(
      {
        data: undefined,
        error:
          "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
      },
      { status: 400 }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      stream: true,
      max_tokens: 4096,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: PROMPT,
            },
            {
              type: "image_url",
              image_url: {
                url: base64,
              },
            },
          ],
        },
      ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      let errorMessage =
        "An error has ocurred with API Completions. Please try again.";
      if (error.code === "invalid_api_key") {
        errorMessage =
          "The provided API Key is invalid. Please enter a valid API Key.";
      }

      const { name, status, headers } = error;
      return NextResponse.json(
        { name, status, headers, message: errorMessage },
        { status }
      );
    } else {
      throw error;
    }
  }
}
