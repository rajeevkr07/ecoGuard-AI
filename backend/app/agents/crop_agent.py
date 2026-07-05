from google import genai
from app.core.config import settings

class CropDiagnosticAgent:
    def __init__(self):
        # Initializes official Google GenAI Client
        # Falls back to default initialization if environment key is set
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY) if settings.GEMINI_API_KEY else None

    def diagnose_crop_health(self, image_data: bytes) -> dict:
        """
        Submits crop photos to Gemini (Multimodal) to identify pest damage, weeds, or nutritional issues.
        Uses the free Gemini 2.5 Flash model.
        """
        if not self.client:
            return {
                "diagnosis": "MOCKED: Gemini API key is missing. Visual health indicates mild weed infestation.",
                "confidence": 0.85
            }
        
        try:
            # Official Google ADK invocation
            response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=[
                    genai.types.Part.from_bytes(
                        data=image_data,
                        mime_type="image/jpeg"
                    ),
                    "Identify crop status, diseases, weeds, or pests. Outline severity."
                ]
            )
            return {
                "diagnosis": response.text,
                "confidence": 0.95
            }
        except Exception as e:
            return {
                "error": str(e),
                "diagnosis": "Failed to invoke Google GenAI model. Diagnostic fallback.",
                "confidence": 0.0
            }
