import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider"
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { experimental_createMCPClient as createMCPClient } from "ai";

export const runtime = "edge";
export const maxDuration = 30;



export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const result = streamText({
    //model: openai("gpt-4o"),
    model: ollama("gemma3:4b-it-qat"),
    messages,
    // forward system prompt and tools from the frontend
    toolCallStreaming: true,
    system,
    tools: {
      ...frontendTools(tools),
    },
    onError: console.log,
  });

  return result.toDataStreamResponse();
}
