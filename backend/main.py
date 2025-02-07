from flask import Flask, request, jsonify
from PIL import Image
import os
from extrect_text import *  # Import function to extract text from image
from get_medicine_links import *  # Import function to get medicine links

app = Flask(__name__)

# Directory where images will be saved
SAVE_DIR = "output"

# Create the directory if it doesn't exist
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

@app.route('/radhe', methods=['POST'])
def main():
    """
    Handles image upload, saves the image, and extracts text using Azure Document AI.
    Returns the extracted text along with the saved image path.
    """
    print("✅ main.py calling successfully ")

    # Ensure that the request method is POST
    if request.method == "POST":
        # Check if the request contains an image file
        if "image" not in request.files:
            return jsonify({"error": "No image file uploaded"}), 400

        img = request.files["image"]

        if img:
            # Open the uploaded image
            image = Image.open(img)

            # Save the uploaded image in the output directory
            image_filename = os.path.join(SAVE_DIR, "uploaded_image.png")
            print(image_filename)
            image.save(image_filename)

            # Reset the file pointer to read image bytes
            img.seek(0)
            file_bytes = img.read()

            # Extract text from the image
            data = extrect_text(file_bytes)

            return jsonify({
                "message": "Image saved successfully",
                "image_path": image_filename,
                "data": data
            }), 200

        else:
            return jsonify({"error": "No image found in the request"}), 400

@app.route('/krishna', methods=['POST'])
def get_medicine_links():
    """
    Accepts a text input (medicine name) and retrieves relevant medicine links.
    Returns the list of medicines with links.
    """
    # Check if the request contains a text field
    if "text" not in request.form:
        return jsonify({"error": "No text data provided"}), 400

    med = request.form['text']
    
    # Fetch medicine links based on the provided text
    medicines = get_medicine_name_links(med=med)

    return jsonify({
        "medicines": medicines
    }), 200

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(debug=True)
