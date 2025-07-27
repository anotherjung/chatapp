# Weather Tools UI Specification

## Overview

This specification defines the implementation pattern for creating AI-powered tool integrations with custom UI components in the assistant-ui framework. The weather tool serves as a reference implementation demonstrating best practices for tool development, type safety, error handling, and UI design.

## System Architecture

### Tool Integration Pattern

```
User Query → AI Model → Tool Execution → Custom UI Rendering → Chat Display
```

The weather tool follows the **tool-based architecture** where:
1. AI models identify when external functions are needed
2. Tools execute business logic (API calls, calculations, etc.)
3. Custom UI components render results with proper error handling
4. Results integrate seamlessly into the chat interface

### Core Components

| Component | File | Purpose |
|-----------|------|---------|
| API Route | [`app/api/chat/route.ts`](../../../app/api/chat/route.ts) | Tool registration and execution |
| Main Assistant | [`app/assistant.tsx`](../../../app/assistant.tsx) | Chat interface container |
| Thread Component | [`components/assistant-ui/thread.tsx`](../../assistant-ui/thread.tsx) | Message handling and tool display |
| Weather Tool | [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx) | Weather-specific implementation |

## Implementation Guide

### 1. TypeScript Interface Design

Define comprehensive types for tool responses:

**File Location:** [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx)

**Insert After:** Line 3 (after React imports)

```diff
 import { makeAssistantTool, tool } from "@assistant-ui/react";
 import { z } from "zod";
 import { FC } from "react";
+
+// TypeScript interfaces for weather data
+interface WeatherData {
+  location: string;
+  temperature: number;
+  condition: string;
+  humidity: number;
+  windSpeed: number;
+  unit: "celsius" | "fahrenheit";
+}
+
+interface WeatherError {
+  error: string;
+  message: string;
+}
+
+type WeatherResponse = WeatherData | WeatherError;
```

**Key Principles:**
- Use discriminated unions for error/success states
- Include all necessary data fields for UI rendering
- Maintain strict typing throughout the pipeline

### 2. Mock API Implementation

Create realistic mock implementations for development:

**File Location:** [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx)

**Insert After:** Line 20 (after type definitions)

```diff
 type WeatherResponse = WeatherData | WeatherError;
+
+// Mock weather API implementation
+const fetchWeatherAPI = async (
+  location: string, 
+  unit: "celsius" | "fahrenheit" = "celsius"
+): Promise<WeatherResponse> => {
+  try {
+    // Simulate API delay
+    await new Promise(resolve => setTimeout(resolve, 500));
+    
+    // Mock data based on location
+    const mockData: Record<string, Omit<WeatherData, "unit">> = {
+      "london": {
+        location: "London, UK",
+        temperature: unit === "celsius" ? 15 : 59,
+        condition: "Partly Cloudy",
+        humidity: 68,
+        windSpeed: 12
+      },
+      "new york": {
+        location: "New York, NY",
+        temperature: unit === "celsius" ? 22 : 72,
+        condition: "Sunny",
+        humidity: 45,
+        windSpeed: 8
+      },
+      "tokyo": {
+        location: "Tokyo, Japan",
+        temperature: unit === "celsius" ? 18 : 64,
+        condition: "Rainy",
+        humidity: 82,
+        windSpeed: 15
+      }
+    };
+
+    const locationKey = location.toLowerCase();
+    const weatherData = mockData[locationKey];
+    
+    if (!weatherData) {
+      return {
+        error: "Location not found",
+        message: `Weather data for "${location}" is not available. Try: London, New York, or Tokyo.`
+      };
+    }
+
+    return {
+      ...weatherData,
+      unit
+    };
+  } catch {
+    return {
+      error: "API Error",
+      message: "Failed to fetch weather data. Please try again later."
+    };
+  }
+};
```

**Best Practices:**
- Simulate realistic API delays (500ms)
- Handle both success and error cases
- Provide helpful error messages
- Support parameter variations (temperature units)

### 3. UI Component Design

Create polished UI components with proper error handling:

**File Location:** [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx)

**Insert After:** Line 76 (after fetchWeatherAPI function)

```diff
 };
+
+// Weather display component
+const WeatherDisplay: FC<{ weather: WeatherResponse }> = ({ weather }) => {
+  if ("error" in weather) {
+    return (
+      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
+        <div className="flex items-center gap-2 text-red-800">
+          <span className="text-lg">⚠️</span>
+          <span className="font-medium">{weather.error}</span>
+        </div>
+        <p className="text-red-600 mt-1">{weather.message}</p>
+      </div>
+    );
+  }
+
+  return (
+    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
+      <div className="flex items-center gap-2 mb-3">
+        <span className="text-2xl">🌤️</span>
+        <h3 className="font-semibold text-blue-900">{weather.location}</h3>
+      </div>
+      
+      <div className="grid grid-cols-2 gap-4 text-sm">
+        <div className="flex justify-between">
+          <span className="text-blue-700">Temperature:</span>
+          <span className="font-medium">
+            {weather.temperature}°{weather.unit === "celsius" ? "C" : "F"}
+          </span>
+        </div>
+        
+        <div className="flex justify-between">
+          <span className="text-blue-700">Condition:</span>
+          <span className="font-medium">{weather.condition}</span>
+        </div>
+        
+        <div className="flex justify-between">
+          <span className="text-blue-700">Humidity:</span>
+          <span className="font-medium">{weather.humidity}%</span>
+        </div>
+        
+        <div className="flex justify-between">
+          <span className="text-blue-700">Wind Speed:</span>
+          <span className="font-medium">{weather.windSpeed} km/h</span>
+        </div>
+      </div>
+    </div>
+  );
+};
```

**Design Guidelines:**
- Use Tailwind CSS for consistent styling
- Implement distinct visual states for errors vs. success
- Include semantic HTML and accessibility considerations
- Use grid layouts for organized data presentation
- Add appropriate icons and visual hierarchy

### 4. Tool Registration

Integrate with the assistant-ui framework:

**File Location:** [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx)

**Insert After:** Line 124 (after WeatherDisplay component)

```diff
 };
+
+// Define the tool with improved error handling
+const weatherTool = tool({
+  description: "Get current weather information for a specified location",
+  parameters: z.object({
+    location: z.string().describe("City name (e.g., London, New York, Tokyo)"),
+    unit: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("Temperature unit")
+  }),
+  execute: async ({ location, unit }) => {
+    const weather = await fetchWeatherAPI(location, unit);
+    return weather;
+  }
+});
+
+// Create the assistant tool with custom render
+export const WeatherTool = makeAssistantTool({
+  ...weatherTool,
+  toolName: "getWeather",
+  render: ({ result }) => {
+    if (!result) return null;
+    return <WeatherDisplay weather={result as WeatherResponse} />;
+  }
+});
```

**Integration Requirements:**
- Use zod for parameter validation
- Provide clear descriptions for AI model understanding
- Set appropriate defaults for optional parameters
- Separate tool logic from UI rendering

## Data Flow Architecture

**Reference Implementation:** [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx)

### 1. User Input Processing
```
"What's the weather in London?" → AI Model Analysis → Tool Identification
```

### 2. Tool Execution
```
getWeather({location: "London", unit: "celsius"}) → fetchWeatherAPI() → WeatherResponse
```

### 3. UI Rendering
```
WeatherResponse → WeatherDisplay Component → Formatted Chat Card
```

### 4. Error Handling
```
API Error → WeatherError Interface → Error UI State → User-Friendly Message
```

## Testing Strategy

**Test Coverage Areas:** Based on [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx) implementation

### Unit Testing
- Test mock API with various inputs
- Validate error handling scenarios
- Verify UI component rendering states

### Integration Testing
- Test tool execution within chat context
- Validate parameter parsing and validation
- Confirm UI integration with assistant-ui framework

### User Experience Testing
- Test with realistic user queries
- Validate error messages are helpful
- Ensure UI is responsive and accessible

## Extension Patterns

**Template:** Use [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx) as reference pattern

### Adding New Tools
1. Define TypeScript interfaces for tool responses
2. Implement mock API function with error handling
3. Create custom UI component with error/success states
4. Register tool with assistant-ui framework
5. Add to API route tool registry

### Enhancing Existing Tools
1. Extend TypeScript interfaces for new data fields
2. Update mock API to include new functionality
3. Enhance UI component with additional features
4. Update tool parameters and descriptions

## Performance Considerations

**Implementation Examples:** See [`components/assistant-ui/tool-weather.tsx:23-76`](../../assistant-ui/tool-weather.tsx) for mock API patterns

- **Mock Delays**: Simulate realistic API response times
- **Error Boundaries**: Implement graceful error handling
- **Component Optimization**: Use React.memo for expensive components
- **Type Safety**: Maintain strict TypeScript throughout

## Security Guidelines

**Validation Examples:** See [`components/assistant-ui/tool-weather.tsx:129-132`](../../assistant-ui/tool-weather.tsx) for zod schema patterns

- **Input Validation**: Use zod schemas for all tool parameters
- **Error Messages**: Avoid exposing sensitive system information
- **Mock Data**: Keep test data realistic but not sensitive
- **API Keys**: Never expose real API credentials in mock implementations

## Deployment Checklist

**Reference Implementation:** [`components/assistant-ui/tool-weather.tsx`](../../assistant-ui/tool-weather.tsx) passes all requirements

- [ ] All TypeScript types properly defined
- [ ] Mock API includes comprehensive error handling
- [ ] UI component handles all response states
- [ ] Tool properly registered in API route
- [ ] Linting passes without warnings
- [ ] Responsive design tested on multiple screen sizes
- [ ] Accessibility standards met (WCAG 2.1)
- [ ] Documentation updated with new tool information

---

*This specification serves as a template for implementing any AI tool integration within the assistant-ui framework. Follow these patterns to ensure consistent, high-quality tool implementations.*