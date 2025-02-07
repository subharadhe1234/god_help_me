import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve API credentials from environment variables
API_KEY = os.getenv("HUG_API_KEY")
MODEL_NAME = os.getenv("HUG_MODEL_NAME")
API_URL = os.getenv("HUG_API_URL")

# Print API details for debugging (ensure sensitive info is not exposed in production)
print("API Key:", API_KEY)
print("Model Name:", MODEL_NAME)
print("API URL:", API_URL)

# Set request headers with API key
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Function to process extracted text and return structured medical data
def get_medical_data(extracted_text):
    """
    Calls an AI model to extract structured medical data from a given text (e.g., prescription).
    
    Parameters:
        extracted_text (str): The text extracted from a prescription.

    Returns:
        dict: A JSON-like dictionary with structured medical information.
    """
    print("✅ get_medical_data called successfully")

    # Construct the request payload
    data = {
        "inputs": f"""
        You are a helpful AI that extracts medicines, dosages, instructions, and additional details from a doctor's prescription.

        Given the text:
        {extracted_text}

        Please convert this prescription into the following structured JSON format:

        {{
          "medicines": [
            {{
              "name": "medicine_name",
              "dosage": "dosage_details",
              "frequency": "how_often",
              "duration": "duration_of_treatment",  // Optional: e.g., "for 7 days"
              "route": "administration_route",  // Optional: e.g., "oral", "injection"
              "purpose": "intended_use",  // Optional: e.g., "pain relief", "infection"
              "special_instructions": "any_additional_instructions"  // Optional: e.g., "take with food", "avoid alcohol"
            }},
            {{
              "name": "medicine_name",
              "dosage": "dosage_details",
              "frequency": "how_often",
              "duration": "duration_of_treatment",
              "route": "administration_route",
              "purpose": "intended_use",
              "special_instructions": "any_additional_instructions"
            }}
            // Additional medicines can be added here in the same format
          ],
          "general_instructions": "any_overall_instructions_or_warnings"
        }}

        ### Output Guidelines:
        1. **Medicines**:
            - Provide **name** and **dosage** for each medicine.
            - Specify how often the medicine should be taken (**frequency**) and any recommended **duration**.
            - Include the **route** of administration (e.g., oral, topical, injection), **purpose** (e.g., pain relief, anti-inflammatory), and any **special instructions** (e.g., take with food, avoid alcohol).

        2. **General Instructions**:
            - Include any general **instructions** that apply to the entire prescription, such as warnings or reminders (e.g., "Drink plenty of water while on these medications").

        ### Ensure that the output:
        - Is **clear**, **structured**, and **accurate**.
        - Only includes the necessary details, following the prescribed format.
        - Does **not** include any explanations or additional commentary beyond the structured JSON.

        Your output should look exactly like the example JSON structure, with all the necessary fields filled in appropriately based on the prescription text.
        """
    }

    try:
        # Send request to API
        response = requests.post(API_URL, headers=headers, data=json.dumps(data))

        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            structured_output = result[0]["generated_text"]

            # Attempt to extract the JSON content
            try:
                # print(structured_output)
                raw_output = structured_output.split("json")[1].split("```")[0]
            except Exception:
                raw_output = structured_output.split(">")[1]

            # Parse JSON output
            output = json.loads(raw_output)

            # Define the path to save the output JSON file
            output_dir = "output"
            os.makedirs(output_dir, exist_ok=True)  # Ensure directory exists
            file_path = os.path.join(output_dir, "radhe.json")

            # Save the structured data into a JSON file
            with open(file_path, "w") as json_file:
                json.dump(output, json_file, indent=2)

            print(f"✅ Data successfully saved to {file_path}")
            return output

        else:
            print(f"❌ API Request Failed: {response.status_code} - {response.text}")
            return {"error": f"API request failed with status code {response.status_code}"}

    except Exception as e:
        print(f"❌ Error processing request: {e}")
        return {"error": "An error occurred while processing the request"}
