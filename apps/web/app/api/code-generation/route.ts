import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// TODO: Add it to turbo.json
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
CREATE TABLE users (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text,
  email text,
  created_at timestamp with time zone
  
);

Ensure the generated SQL code accurately represents the visual schema for Supabase, including table relationships where present. 
Return only the SQL code without any additional characters like backticks or formatting indicators.`;

export async function POST(req: Request) {
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
      console.error(error.message);
      const errorMessage =
        "An error has ocurred with API Completions. Please try again.";
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
