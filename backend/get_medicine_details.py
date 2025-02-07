import requests
import json

def get_medicine_details_fun(medicine_name):
    base_url = "https://api.fda.gov/drug/label.json"
    search_query = f"active_ingredient:{medicine_name}"
    params = {"search": search_query, "limit": 1}

    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        data = response.json()
        results = data.get("results", [])

        if results:
            result = results[0]  # Get first matching medicine
            
            details = {
                "medicine_name": medicine_name,
                "active_ingredient": result.get("active_ingredient", ["Not Available"])[0],
                "definition": result.get("spl_product_data_elements", "Not Available"),
                "usage": result.get("indications_and_usage", ["Not Available"])[0],
                "side_effects": result.get("adverse_reactions", ["Not Available"])[0],
                "warnings": result.get("warnings", ["Not Available"])[0]
            }

            return details # Return as JSON object

    return {"Error": "No data found for this medicine."}

# # Example Usage
# medicine_name = "Paracetamol"  # Try "Acetaminophen" as well
# details = get_medicine_details(medicine_name)
# print(details)  # Pretty-print JSON
