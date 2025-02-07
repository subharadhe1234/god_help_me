from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import json
import re
import time
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
# ocr = PaddleOCR(use_angle_cls=True, lang="en")  # Initialize PaddleOCR

# Directory where images will be saved
SAVE_DIR = "saved_images"

# Create the directory if it doesn't exist
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)





@app.route('/krishna', methods=['POST'])
def get_medicine_name_links():
    
    # Configure headless Firefox
    options = Options()
    options.add_argument("--headless")  # Run in the background
    # options.add_argument("--disable-blink-features=AutomationControlled")  # Bypass bot detection
    driver = webdriver.Firefox(options=options)

    if "text" not in request.form:
            return jsonify({"error": "No image file uploaded"}), 400
    else:
        med = request.form['text']

    if med:
        URL = f"https://www.google.com/search?q={med}+medicine&tbm=shop"
        medicines = [] 
        try:
            driver.get(URL)
            time.sleep(2)  # Allow time for page to load

            html_content = driver.page_source
            soup = BeautifulSoup(html_content, "html.parser")

            # Extract all product containers
            content_classes = soup.find_all("div", class_=re.compile(".*sh-dgr.*"))

            for i, content in enumerate(content_classes):
                title_tag = content.find("h3")
                title = title_tag.text.strip() if title_tag else "No title found"

                link_tag = content.find("a")
                product_url = "https://www.google.com" + link_tag["href"] if link_tag else "No link found"

                price_tag = content.find("span", class_=re.compile(".*Pemb.*"))
                raw_price = price_tag.text.strip() if price_tag else "No price found"

                price_match = re.search(r"[\d,]+(?:\.\d+)?", raw_price)
                price = float(price_match.group().replace(",", "")) if price_match else float("inf")

                img_tag = content.find("img")
                img_url = img_tag["src"] if img_tag else "No image found"

                results = {
                    "title": title,
                    "link": product_url,
                    "price": price,
                    "image": img_url
                }

                medicines.append(results)

                if i == 5:
                    break

            medicines = sorted(medicines, key=lambda x: x["price"])

            with open("output.json", "w", encoding="utf-8") as w:
                json.dump(medicines, w, indent=2, ensure_ascii=False)

            print("✅ Data extracted, sorted by price, and saved to output.json")
            # print(json.dumps(medicines, indent=2, ensure_ascii=False))

        except Exception as e:
            print("❌ Error:", e)

        driver.quit()
        time.sleep(3)
        return jsonify({
            "medicines": medicines}),200
    else:
            return jsonify({"error": "No text found in the request"}), 400
# Uncomment to run:
# medicines = get_medicine_name_links("paracetamol")
# print(medicines)
if __name__ == '__main__':
    app.run(debug=True)



