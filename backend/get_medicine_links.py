from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import json
import re
import time
import os


def get_medicine_name_links(med):
    """
    Fetches medicine names, prices, and links from Google Shopping results.

    Parameters:
        med (str): The medicine name to search for.

    Returns:
        list: A sorted list of dictionaries containing medicine details (title, link, price, image).
    """
    print("✅ get_medicine_name_links called successfully")

    # Ensure the input is valid
    if not med:
        return {"error": "No text found in the request"}

    # Configure headless Firefox for Selenium
    options = Options()
    options.add_argument("--headless")  # Run in the background

    # Define URL for Google Shopping search
    URL = f"https://www.google.com/search?q={med}+medicine&tbm=shop"

    medicines = []

    # Start Selenium WebDriver
    driver = webdriver.Firefox(options=options)

    try:
        driver.get(URL)
        time.sleep(2)  # Allow time for page to load

        # Parse HTML content
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # Extract product containers
        content_classes = soup.find_all("div", class_=re.compile(".*sh-dgr.*"))

        for i, content in enumerate(content_classes):
            # Extract medicine name
            title_tag = content.find("h3")
            title = title_tag.text.strip() if title_tag else "No title found"

            # Extract product link
            link_tag = content.find("a", href=True)
            product_url = f"https://www.google.com{link_tag['href']}" if link_tag else "No link found"

            # Extract price
            price_tag = content.find("span", class_=re.compile(".*Pemb.*"))
            raw_price = price_tag.text.strip() if price_tag else "No price found"

            # Convert price to float
            price_match = re.search(r"[\d,]+(?:\.\d+)?", raw_price)
            price = float(price_match.group().replace(",", "")
                          ) if price_match else float("inf")

            # Extract image URL
            img_tag = content.find("img")
            img_url = img_tag["src"] if img_tag else "No image found"

            # Store extracted data
            medicines.append({
                "title": title,
                "link": product_url,
                "price": price,
                "image": img_url
            })

            # Limit results to 6
            if i == 5:
                break
        print(medicines)
        # Sort medicines by price (ascending)
        medicines = sorted(medicines, key=lambda x: x["price"])

        # Ensure the output directory exists
        output_dir = "output"
        os.makedirs(output_dir, exist_ok=True)

        # Save the extracted data to a JSON file
        file_path = os.path.join(output_dir, "medicine_links.json")
        with open(file_path, "w", encoding="utf-8") as w:
            json.dump(medicines, w, indent=2, ensure_ascii=False)

        print(f"✅ Data extracted, sorted by price, and saved to {file_path}")

    except Exception as e:
        print(f"❌ Error occurred: {e}")
        return {"error": "An error occurred while fetching medicine data"}

    finally:
        # Quit WebDriver to free up resources
        driver.quit()
        time.sleep(5)

    return medicines
