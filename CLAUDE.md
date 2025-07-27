# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an assistant-ui starter project that creates a ChatGPT-like interface using React, Next.js, and the assistant-ui component library. The application provides a chat interface with AI models (Google Gemini and local Ollama models) and includes a weather tool example.

## Development Commands

**Working Directory**: All commands should be run from `/chatapp/` subdirectory

- **Development**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Start Production**: `npm start`

## Architecture

### Core Structure
- **Next.js 15** with App Router architecture
- **assistant-ui** component library for chat interface
- **AI SDK** integration for multiple model providers
- **Tailwind CSS** with shadcn/ui components
- **TypeScript** with strict configuration

### Key Components

**API Layer** (`app/api/chat/route.ts:17-38`):
- Edge runtime with 30s timeout
- Supports Google Gemini and Ollama models 
- Includes weather tool example with zod validation
- Uses AI SDK's `streamText` for real-time responses

**Frontend Architecture**:
- `app/assistant.tsx`: Main chat component with sidebar layout
- `components/assistant-ui/thread.tsx`: Core chat thread with message handling
- `components/assistant-ui/tool-weather.tsx`: Weather tool UI component
- `components/app-sidebar.tsx`: Navigation sidebar

**State Management**:
- Uses assistant-ui's `AssistantRuntimeProvider` and `useChatRuntime`
- Chat state managed via `/api/chat` endpoint

### Environment Setup

Required environment variable in `.env.local`:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

### Tool System
- Tools defined in API route with zod schemas
- UI components in `components/assistant-ui/tool-*.tsx`
- Weather tool example shows pattern for custom tools

### Model Configuration
- Default: Google Gemini 2.0 Flash
- Alternative: Ollama models (commented out in route.ts:14-15)
- Switch models by updating the `model` parameter in route.ts:18

## Tool Integration Pattern

The codebase demonstrates a **tool-based architecture** for AI-powered functions:

```
User Query → AI Model → Tool Execution → Custom UI Rendering → Chat Display
```

### Adding New Tools

1. **Define Tool in API Route** (`app/api/chat/route.ts`):
   - Add to `tools` object with zod schema
   - Implement `execute` function

2. **Create UI Component** (`components/assistant-ui/tool-*.tsx`):
   - Use `makeAssistantTool` for registration
   - Implement custom render function
   - Handle error and success states

3. **Register in Main App** (`app/assistant.tsx`):
   - Import tool component
   - Add to component tree

### Weather Tool Example

Reference implementation at `components/assistant-ui/tool-weather.tsx` demonstrates:
- TypeScript interfaces for response types
- Mock API with error handling
- Custom UI with Tailwind styling
- Tool registration pattern

## Development Notes

- Components use assistant-ui primitives (ThreadPrimitive, MessagePrimitive, etc.)
- Styling follows shadcn/ui patterns with Tailwind
- TypeScript path mapping configured for `@/*` imports
- The weather tool serves as a template for creating additional AI tools