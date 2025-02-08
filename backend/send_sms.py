# import requests

# api_key = "db65313009c040df319558729adda94c-c1f3a8b5-f355-4faa-bc9f-5b4822b6d696"
# phone_number = "+919732329582"  # ✅ Must be in a list inside "destinations"
# message = "Radhe Radhe"

# url = "https://xkgyye.api.infobip.com/sms/2/text/advanced"  # ✅ Correct endpoint
# headers = {
#     "Authorization": f"App {api_key}",  # ✅ Correct authentication format
#     "Content-Type": "application/json"
# }
# data = {
#     "messages": [
#         {
#             "from": "447491163443",  # ✅ Replace with your Infobip Sender ID
#             "destinations": [{"to": phone_number}],  # ✅ Corrected destination format
#             "text": message
#         }
#     ]
# }

# response = requests.post(url, headers=headers, json=data)
# print(response.json())  # ✅ Check response
import http.client
import json

conn = http.client.HTTPSConnection("xkgyye.api.infobip.com")

payload = json.dumps({
    "messages": [
        {
            "destinations": [{"to": "+919641411198"}],  # ✅ Correct phone format
            "from": "+919732329582",  # ✅ Replace with an approved sender ID
            "text": "Congratulations on sending your first message. Check the delivery report in the next step."
        }
    ]
})

headers = {
    'Authorization': 'App db65313009c040df319558729adda94c-c1f3a8b5-f355-4faa-bc9f-5b4822b6d696',  # ✅ Ensure API key is correct
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

conn.request("POST", "/sms/2/text/advanced", payload, headers)
res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))  # ✅ Check response
