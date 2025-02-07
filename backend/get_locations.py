from dotenv import load_dotenv
import os
from serpapi import GoogleSearch
import json
load_dotenv()

SERP_API = os.getenv("SERP_API")


def get_positions(qes,latitute,logitute):
    params = {
    "engine": "google_maps",
    "q": qes,
    "ll": f"{latitute},{logitute},14z",
    "api_key": SERP_API}
    search = GoogleSearch(params)
    results = search.get_dict()
    positions=results["local_results"]

    locations = []

    for i,data in enumerate(positions):
        if i==5:
            break 
        gps = data.get("gps_coordinates", {"latitude": None, "longitude": None})
        
        place_data = {
            "title": data.get("title", None),
            "photos_link": data.get("photos_link", None),
            "gps_coordinates": gps,
            "url": f"https://www.google.com/maps/place/{gps['latitude']},{gps['longitude']}",
            "address": data.get("address", None),
            "open_state": data.get("open_state", None),
            "hours": data.get("hours", None),
            "operating_hours": data.get("operating_hours", {}),
            "phone": data.get("phone", None),
            "website": data.get("website", None),
            # "description": data.get("description", None),
            # "order_online": data.get("order_online", None),
            "thumbnail": data.get("thumbnail", None)
        }
        locations.append(place_data)
        
    return locations


if __name__ == "__main__":
    # qes = "shop near me"
    ques="near me medical shop"
    latitute="@40.7455096"
    logitute="-74.0083012"
    locations = get_positions(ques,latitute,logitute)
    print(locations)
    # Save to JSON file
    with open("output/places_data.json", "w", encoding="utf-8") as json_file:
        json.dump(locations, json_file, indent=4, ensure_ascii=False)

    print("Data successfully saved to places_data.json")
