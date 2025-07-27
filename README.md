# Assistant-UI Chat Application with Weather Tool

This is an enhanced [assistant-ui](https://github.com/Yonom/assistant-ui) starter project featuring a complete weather tool implementation with custom UI components.

**GitHub Repository:** [https://github.com/anotherjung/chatapp](https://github.com/anotherjung/chatapp)

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Generative AI API key (for Gemini model access)

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/anotherjung/chatapp.git
cd chatapp
npm install
```

2. **Add your Google Generative AI API key** to `.env.local` file:

```
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser** to [http://localhost:3000](http://localhost:3000) to see the chat interface.

5. **Test the weather tool** by asking: "What's the weather in London?"

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Recent Updates

### Weather Tool Implementation (Latest)

A comprehensive weather tool has been added as a reference implementation for creating AI-powered tools with custom UI components.

**Key Features:**
- **TypeScript-first design** with comprehensive interfaces
- **Mock API implementation** with realistic data and error handling
- **Custom UI components** with error states and responsive design
- **Tailwind CSS styling** with semantic color schemes
- **Complete documentation** with git diff-style insertion guides

**Files Added/Modified:**
- [`app/api/chat/route.ts`](app/api/chat/route.ts) - Tool registration and API integration
- [`app/assistant.tsx`](app/assistant.tsx) - Main chat interface updates
- [`components/assistant-ui/thread.tsx`](components/assistant-ui/thread.tsx) - Message handling enhancements
- [`components/assistant-ui/tool-weather.tsx`](components/assistant-ui/tool-weather.tsx) - Complete weather tool implementation
- [`docs/specs/weather-tools-ui.md`](docs/specs/weather-tools-ui.md) - Comprehensive implementation guide

### Architecture Overview

The weather tool demonstrates the **tool-based architecture** pattern:

```
User Query → AI Model → Tool Execution → Custom UI Rendering → Chat Display
```

**Implementation Highlights:**

1. **Type Safety**: Discriminated unions for error/success states
2. **Mock Development**: Realistic API simulation with 500ms delays
3. **Error Handling**: Comprehensive error states with user-friendly messages
4. **UI Components**: Polished cards with grid layouts and semantic colors
5. **Framework Integration**: Seamless assistant-ui tool registration

### Tool Features

**Supported Locations:** London, New York, Tokyo  
**Temperature Units:** Celsius, Fahrenheit  
**Weather Data:** Temperature, condition, humidity, wind speed  
**Error Handling:** Location not found, API errors  

### Developer Guide

For detailed implementation instructions, see:
- **[Weather Tools UI Specification](docs/specs/weather-tools-ui.md)** - Complete guide with git diff examples
- **[Weather Tool Component](components/assistant-ui/tool-weather.tsx)** - Reference implementation

### Usage Example

Try these queries in the chat:
- "What's the weather in London?"
- "Show me Tokyo weather in Fahrenheit"
- "Get New York weather"

### Extending the Tool

To add new locations or features:
1. Update the `mockData` object in `fetchWeatherAPI`
2. Extend the `WeatherData` interface if needed
3. Enhance the `WeatherDisplay` component UI
4. Follow patterns in the specification guide

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: assistant-ui components
- **Styling**: Tailwind CSS with shadcn/ui
- **Type Safety**: TypeScript with strict configuration
- **Validation**: Zod schemas for tool parameters
- **AI Integration**: AI SDK with Google Gemini 2.0 Flash

## For Future Developers

This repository serves as a **reference implementation** for:
- AI tool development patterns
- Custom UI component integration
- TypeScript best practices
- Error handling strategies
- Documentation standards

The weather tool implementation follows enterprise-grade patterns and can be used as a template for developing similar AI-powered tools.
