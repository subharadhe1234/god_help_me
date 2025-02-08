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

# Set request headers with API key
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Function to process extracted text and return structured medical data
def ai_response(medical_data, query):
    # Construct the request payload
    data = {
        "inputs": f"Hello, my medicine details are: {medical_data}. I have a question based on these details: {query}. Please provide a valid answer based on this information.",
        "parameters": {"temperature": 0.5, "max_length": 500}
    }

    try:
        # Send request to API
        response = requests.post(API_URL, headers=headers, json=data)

        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            structured_output = result[0]["generated_text"]

            try:
                # print(structured_output)
                raw_output = structured_output.split(">")[1]
            except Exception:
                raw_output = structured_output.split("json")[1].split("```")[0]


            return raw_output
        else:
            return f"⚠️ API Request Failed! Status Code: {response.status_code}, Response: {response.text}"

    except Exception as e:
        return f"❌ Error processing request: {e}"

if __name__ == "__main__":
    # Test the function with sample data
    medical_data = """{
      "medicines": [
        {"name": "Betaloc", "dosage": "100mg", "frequency": "1 tab BID"},
        {"name": "Dorzolamidum", "dosage": "10 mg", "frequency": "1 tab BID"},
        {"name": "Cimetidine", "dosage": "50 mg", "frequency": "2 tabs TID"},
        {"name": "Oxprelol", "dosage": "50mg", "frequency": "1 tab QD"}
      ]
    }"""

    question = "Can you tell me when will i take those  medicines?"
    print(ai_response(medical_data, question))
