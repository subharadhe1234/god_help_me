
import requests
import json
import re
# from fuzzywuzzy import process
# from difflib import SequenceMatcher

import os
print("radhe radhe")
from dotenv import load_dotenv
load_dotenv()

# key = os.getenv("DI_KEY")
# endpoint = os.getenv("DI_ENDPOINT")

# Define API Key and Model Name
API_KEY=os.getenv("HUG_API_KEY")
MODEL_NAME =os.getenv("HUG_MODEL_NAME") 
API_URL = os.getenv("HUG_API_URL")
print(API_KEY)
print(MODEL_NAME)
print(API_URL)

# Set headers with API key
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# data model
def get_medical_data(extracted_text):
# Preprocess the text data
    print("✅ get_medical_data call successfully")

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



    # responce

    response = requests.post(API_URL, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        result = response.json()
        structured_output = result[0]["generated_text"]

        try:
            print(structured_output)
            raw_output=structured_output.split("json")[1].split("```")[0]

        except : 
            raw_output=structured_output.split(">")[1]


        output=json.loads(raw_output)   
        # Define the path where the JSON file will be saved
        
        
        file_path = "radhe.json"
        # Save the data into the JSON file
        with open(file_path, "w") as json_file:
            json.dump(output, json_file, indent=2)

        print(f"Data has been successfully saved to {file_path}")
        return output

    else:
        print(f"Error: {response.status_code}")



