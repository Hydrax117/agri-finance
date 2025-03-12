// src/services/weatherAPI.ts
import { WeatherForecast } from "@/types/loan";

// This function fetches weather data from an external API
// In a real application, you would use an actual weather API like OpenWeatherMap, AccuWeather, etc.
export async function fetchWeatherData(
  location: string
): Promise<WeatherForecast> {
  try {
    // In a real implementation, you would make an API call like:
    // const response = await fetch(`https://api.weatherservice.com/forecast?location=${encodeURIComponent(location)}&apiKey=${process.env.WEATHER_API_KEY}`);
    // const data = await response.json();

    // For demo purposes, we're returning mock data
    // This would be replaced with actual API call in production
    return mockWeatherForecast(location);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data");
  }
}

// Mock function to simulate weather data
function mockWeatherForecast(location: string): WeatherForecast {
  const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"];
  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)];

  const temp = Math.floor(Math.random() * 15) + 15; // Random temp between 15-30°C
  const humid = Math.floor(Math.random() * 50) + 30; // Random humidity between 30-80%
  const wind = Math.floor(Math.random() * 20) + 5; // Random wind between 5-25 km/h
  const rain = randomCondition === "Rainy" ? Math.random() * 25 : 0; // Random rainfall if rainy

  let forecastText = "";
  switch (randomCondition) {
    case "Sunny":
      forecastText =
        "Clear skies expected for the next 3 days. Good conditions for harvesting.";
      break;
    case "Partly Cloudy":
      forecastText =
        "Partly cloudy with moderate temperatures. Suitable for most farming activities.";
      break;
    case "Cloudy":
      forecastText =
        "Overcast conditions with possible light rain. Consider postponing fertilizer application.";
      break;
    case "Rainy":
      forecastText =
        "Precipitation expected to continue. Monitor soil moisture levels and watch for flooding in low areas.";
      break;
    default:
      forecastText = "Variable conditions expected. Check updates regularly.";
  }

  return {
    id: Math.floor(Math.random() * 1000).toString(), // Mock ID
    createdAt: new Date(), // Mock createdAt
    updatedAt: new Date(), // Mock updatedAt
    location,
    currentCondition: randomCondition,
    temperature: temp,
    humidity: humid,
    windSpeed: wind,
    rainfall: rain,
    forecast: forecastText,
  };
}

// Function to get agricultural advice based on weather conditions
export function getAgricultureAdvice(forecast: WeatherForecast): string {
  if (forecast.currentCondition === "Rainy" && forecast.rainfall > 10) {
    return "Heavy rainfall alert: Ensure proper drainage in your fields to prevent waterlogging.";
  } else if (
    forecast.currentCondition === "Sunny" &&
    forecast.temperature > 28
  ) {
    return "High temperature alert: Ensure adequate irrigation to prevent crop stress.";
  } else if (forecast.windSpeed > 15) {
    return "Strong winds expected: Secure any structures and consider postponing pesticide spraying.";
  } else if (forecast.currentCondition === "Cloudy" && forecast.humidity > 70) {
    return "High humidity alert: Monitor crops for fungal diseases.";
  }

  return "Weather conditions are favorable for standard farming operations.";
}

// Function to check if conditions are suitable for specific farming activities
export function checkFarmingConditions(
  forecast: WeatherForecast
): Record<string, boolean> {
  return {
    suitableForPlanting:
      forecast.rainfall > 0 &&
      forecast.rainfall < 10 &&
      forecast.temperature > 15 &&
      forecast.temperature < 30,
    suitableForHarvesting:
      forecast.currentCondition !== "Rainy" && forecast.humidity < 70,
    suitableForFertilizing:
      forecast.currentCondition !== "Rainy" && forecast.windSpeed < 10,
    suitableForPestControl:
      forecast.currentCondition !== "Rainy" && forecast.windSpeed < 8,
  };
}
