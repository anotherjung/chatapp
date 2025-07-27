import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { ollama } from "ollama-ai-provider"
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import {z} from "zod";

import { experimental_createMCPClient as createMCPClient } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const result = streamText({
    //model: google("gemini-2.0-flash"),
    model: ollama("llama3.2:3b"),
    messages,
    // forward system prompt and tools from the frontend
    toolCallStreaming: true,
    system,
    tools: {
      ...frontendTools(tools),
      // ollama doesn't render
      // weather: {
      //   description: "Get weather information",
      //   parameters: z.object({
      //     location: z.string().describe("Location to get weather for"),
      //   }),
      //   execute: async ({ location }) => {
      //     return `The weather in ${location} is sunny.`;
      //   },
      // },
    },
    onError: console.log,
  });

  return result.toDataStreamResponse();
}
