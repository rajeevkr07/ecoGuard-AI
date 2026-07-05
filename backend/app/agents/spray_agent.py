from app.services.pesticide import PesticideOptimizationService

class SprayDecisionAgent:
    def __init__(self):
        self.pesticide_svc = PesticideOptimizationService()

    def make_decision(self, diagnosis: str, ndvi: float, moisture: float, temp: float) -> dict:
        """
        Coordinates reasoning: combines Gemini visual diagnostic labels
        with hard telemetry sensor boundaries to determine the safest, most resource-efficient
        pesticide spray prescription.
        """
        raw_dosage = self.pesticide_svc.calculate_dosage(ndvi, moisture, temp)
        
        # Adjust logic based on AI visual diagnosis labels
        diagnosis_lower = diagnosis.lower()
        if "disease" in diagnosis_lower or "infestation" in diagnosis_lower or "pest" in diagnosis_lower:
            # Scale up dosage slightly or validate application requirement
            if not raw_dosage["needs_spraying"]:
                raw_dosage["needs_spraying"] = True
                raw_dosage["recommended_volume_liters_per_hectare"] = 2.5
                raw_dosage["rationale"] = f"Forced spray recommendation: AI Visual Diagnosis detected issues: '{diagnosis}'"
        
        return raw_dosage
