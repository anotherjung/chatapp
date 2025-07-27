import { makeAssistantTool, tool } from "@assistant-ui/react";
import { z } from "zod";
import { FC } from "react";

// TypeScript interfaces for weather data
interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  unit: "celsius" | "fahrenheit";
}

interface WeatherError {
  error: string;
  message: string;
}

type WeatherResponse = WeatherData | WeatherError;

// Mock weather API implementation
const fetchWeatherAPI = async (
  location: string, 
  unit: "celsius" | "fahrenheit" = "celsius"
): Promise<WeatherResponse> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock weather data based on location
    const mockData: Record<string, Omit<WeatherData, "unit">> = {
      "london": {
        location: "London, UK",
        temperature: unit === "celsius" ? 15 : 59,
        condition: "Partly Cloudy",
        humidity: 68,
        windSpeed: 12
      },
      "new york": {
        location: "New York, NY",
        temperature: unit === "celsius" ? 22 : 72,
        condition: "Sunny",
        humidity: 45,
        windSpeed: 8
      },
      "tokyo": {
        location: "Tokyo, Japan",
        temperature: unit === "celsius" ? 18 : 64,
        condition: "Rainy",
        humidity: 82,
        windSpeed: 15
      }
    };

    const locationKey = location.toLowerCase();
    const weatherData = mockData[locationKey];
    
    if (!weatherData) {
      return {
        error: "Location not found",
        message: `Weather data for "${location}" is not available. Try: London, New York, or Tokyo.`
      };
    }

    return {
      ...weatherData,
      unit
    };
  } catch {
    return {
      error: "API Error",
      message: "Failed to fetch weather data. Please try again later."
    };
  }
};

// Weather tool display component
const WeatherDisplay: FC<{ weather: WeatherResponse }> = ({ weather }) => {
  if ("error" in weather) {
    return (
      <div className="p-4 border border-red-200 rounded-lg bg-red-50">
        <div className="flex items-center gap-2 text-red-800">
          <span className="text-lg">⚠️</span>
          <span className="font-medium">{weather.error}</span>
        </div>
        <p className="text-red-600 mt-1">{weather.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🌤️</span>
        <h3 className="font-semibold text-blue-900">{weather.location}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex justify-between">
          <span className="text-blue-700">Temperature:</span>
          <span className="font-medium">
            {weather.temperature}°{weather.unit === "celsius" ? "C" : "F"}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-blue-700">Condition:</span>
          <span className="font-medium">{weather.condition}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-blue-700">Humidity:</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-blue-700">Wind Speed:</span>
          <span className="font-medium">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

// Define the tool with improved error handling
const weatherTool = tool({
  description: "Get current weather information for a specified location",
  parameters: z.object({
    location: z.string().describe("City name (e.g., London, New York, Tokyo)"),
    unit: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("Temperature unit")
  }),
  execute: async ({ location, unit }) => {
    const weather = await fetchWeatherAPI(location, unit);
    return weather;
  }
});

// Create the component
export const WeatherTool = makeAssistantTool({
    ...weatherTool,
    toolName: "getWeather",
    render: ({ result }) => {
      if (!result) return null;
      return <WeatherDisplay weather={result as WeatherResponse} />;
    }
  });
  

