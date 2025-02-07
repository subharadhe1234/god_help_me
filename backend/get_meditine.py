
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
API_KEY=os.getenv("API_KEY")
MODEL_NAME =os.getenv("MODEL_NAME") 
API_URL = os.getenv("API_URL")
print(API_KEY)
print(MODEL_NAME)
print(API_URL)

# Set headers with API key
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}


# # Function to compute N-Gram similarity
# def ngram_similarity(a, b, n=3):
#     """Calculate similarity using N-Grams"""
#     a_ngrams = set([a[i:i+n] for i in range(len(a)-n+1)])
#     b_ngrams = set([b[i:i+n] for i in range(len(b)-n+1)])
#     return len(a_ngrams & b_ngrams) / len(a_ngrams | b_ngrams) if a_ngrams | b_ngrams else 0

# # Function to find the best match using Fuzzy and N-Gram search
# def correct_medicine_name(word, medicine_names):
#     if word in medicine_names:
#         return word  # Exact match found
    
#     # Find closest match using fuzzy matching
#     best_match, fuzzy_score = process.extractOne(word, medicine_names)
    
#     # Find closest match using N-Gram similarity
#     best_ngram_match = max(medicine_names, key=lambda x: ngram_similarity(word, x))
#     ngram_score = ngram_similarity(word, best_ngram_match)

#     # Choose the best match based on scores
#     if fuzzy_score > 75 or ngram_score > 0.5:
#         return best_match if fuzzy_score > ngram_score else best_ngram_match
#     else:
#         return word  # No good match found, return original word
# # =============================================================================


# # spelling correct
# def spell_correct(extracted_json):
#     medicine_name_path=r"D:\projects\poject_hackathon\doctor_handwritten_reader\medical_data\all_medicine_names.txt"
#     # Load correct medicine names from file

#     # Load medicine names from the file
#     with open(medicine_name_path, "r") as file:
#         lines = file.readlines()

#     # Clean medicine names (remove symbols, numbers, extra spaces)
#     medicine_names = []
#     for line in lines:
#         cleaned_line = re.sub(r"[^a-zA-Z]", "", line.strip().upper())  # Keep only letters
#         if len(cleaned_line) > 3:  # Ignore very short words
#             medicine_names.append(cleaned_line)

#     print(f"Loaded {len(medicine_names)} valid medicine names.")


#     # Apply correction to medicine names in JSON
#     for medicine in extracted_json["medicines"]:
#         medicine["name"] = correct_medicine_name(medicine["name"], medicine_names)
    
#     # Convert back to JSON format
#     corrected_json = json.dumps(extracted_json, indent=2)

#     print("Corrected Text:", corrected_json)
#     return corrected_json


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
        # print(re)
        structured_output = result[0]["generated_text"]
        # print(structured_output)

        try:
            print(structured_output)
            raw_output=structured_output.split("json")[1].split("```")[0]

        except : 
            raw_output=structured_output.split(">")[1]


        # raw_output=structured_output.split(">")[1]
        output=json.loads(raw_output)   
        # Define the path where the JSON file will be saved
        
        
        file_path = "radhe.json"
        # Save the data into the JSON file
        with open(file_path, "w") as json_file:
            json.dump(output, json_file, indent=2)

        print(f"Data has been successfully saved to {file_path}")

        # mod_radhe=spell_correct(output)
        # mod_radhe=json.loads(spell_correct(output))
        # file_path_mod = "radhe_mod.json"
        # # Save the data into the JSON file
        # with open(file_path_mod, "w") as json_file:
        #     json.dump(mod_radhe, json_file, indent=2)

        return output

    else:
        print(f"Error: {response.status_code}")



