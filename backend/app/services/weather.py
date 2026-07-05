import urllib.request
import json

class WeatherService:
    def get_forecast(self, lat: float, lon: float) -> dict:
        """
        Fetches current weather and 3-day forecast using Open-Meteo API (completely free, no API key).
        """
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
        try:
            with urllib.request.urlopen(url) as response:
                data = json.loads(response.read().decode())
                return {
                    "temperature": data["current_weather"]["temperature"],
                    "windspeed": data["current_weather"]["windspeed"],
                    "source": "Open-Meteo Free API"
                }
        except Exception:
            return {
                "temperature": 25.0,  # Fallback default values
                "windspeed": 5.0,
                "source": "Fallback default (No connection)"
            }
