// src/app/farmer/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import CreditScoreIndicator from "@/components/dashboard/CreditScoreIndicator";
import LoanCard from "@/components/dashboard/LoanCard";
import { Loan, WeatherForecast } from "@/types/loan";
import { User } from "@/types/user";
import { fetchWeatherData } from "@/services/weatherAPI";

export default function FarmerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);

  useEffect(() => {
    // Fetch user data, loans, and weather information
    async function fetchDashboardData() {
      try {
        // In a real app, these would be API calls to your backend
        const userData = await fetch("/api/farmer/profile").then((res) =>
          res.json()
        );
        const loansData = await fetch("/api/farmer/loans").then((res) =>
          res.json()
        );

        setUser(userData);
        setLoans(loansData);

        // Fetch weather data based on user's location
        if (userData.location) {
          const forecast = await fetchWeatherData(userData.location);
          setWeatherData(forecast);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.firstName || "Farmer"}
        </h1>
        <p className="text-gray-600">
          Here is an overview of your agricultural finances
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Credit Score Card */}
        <Card className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Your Credit Score</h2>
          <CreditScoreIndicator score={user?.creditScore || 700} />
          <p className="mt-4 text-sm text-gray-600">
            Your credit score affects your loan eligibility and interest rates.
          </p>
        </Card>

        {/* Weather Card */}
        <Card className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Weather Forecast</h2>
          {weatherData ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">
                  {weatherData.currentCondition === "Sunny"
                    ? "☀️"
                    : weatherData.currentCondition === "Rainy"
                    ? "🌧️"
                    : weatherData.currentCondition === "Cloudy"
                    ? "☁️"
                    : "🌤️"}
                </span>
                <div>
                  <p className="font-medium">{weatherData.currentCondition}</p>
                  <p className="text-2xl font-bold">
                    {weatherData.temperature}°C
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{weatherData.forecast}</p>
            </div>
          ) : (
            <p>Weather data unavailable</p>
          )}
        </Card>

        {/* Quick Actions Card */}
        <Card className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
              Apply for Loan
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition">
              Make Payment
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition mt-2">
              Update Profile
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition mt-2">
              Contact Support
            </button>
          </div>
        </Card>
      </div>

      {/* Active Loans Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Active Loans</h2>
        {loans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-white shadow rounded-lg text-center">
            <p className="text-gray-600">You do not have any active loans.</p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition">
              Apply Now
            </button>
          </Card>
        )}
      </div>

      {/* Financial Tips Section */}
      <Card className="p-6 bg-white shadow rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Financial Tips for Farmers
        </h2>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <p>
              Diversify your crops to reduce climate-related financial risks
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <p>
              Consider crop insurance to protect against unpredictable weather
              events
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <p>Track your expenses carefully to improve your credit score</p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <p>Apply for loans early before the planting season begins</p>
          </li>
        </ul>
      </Card>
    </div>
  );
}
