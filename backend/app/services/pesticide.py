class PesticideOptimizationService:
    def calculate_dosage(self, ndvi: float, moisture: float, temp: float) -> dict:
        """
        Determines if spraying is needed and calculates optimal dosage
        to reduce unnecessary chemical waste.
        """
        # Logic to optimize spraying calculations (free, custom algorithm)
        needs_spraying = ndvi < 0.6 and moisture < 30.0
        recommended_volume_liters = 0.0
        
        if needs_spraying:
            # Scale recommended volume based on crop stress
            recommended_volume_liters = round((0.8 - ndvi) * 15.0, 2)
            
        return {
            "needs_spraying": needs_spraying,
            "recommended_volume_liters_per_hectare": recommended_volume_liters,
            "rationale": "NDVI index indicates low vegetation health" if needs_spraying else "Crop condition is healthy"
        }
