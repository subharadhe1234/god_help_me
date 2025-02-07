from flask import Flask, request, jsonify
from PIL import Image
import os
from extrect_text import *
from get_medicine_links import *


app = Flask(__name__)

# Directory where images will be saved
SAVE_DIR = "saved_images"

# Create the directory if it doesn't exist
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)




@app.route('/radhe', methods=['POST'])
def main():
    print("✅ main.py calling successfully ")
    if request.method == "GET":
        return "Make a post request here"
    elif request.method == "POST":
        if "image" not in request.files:
            return jsonify({"error": "No image file uploaded"}), 400
        img = request.files["image"]
        if img:
            image = Image.open(img)
            # Save the image
            image_filename = os.path.join(SAVE_DIR, image.filename)
            image.save("uploaded_image.png")
            # Process the image with Azure Document AI and save the result
            img.seek(0)
            file_bytes = img.read()

            data=extrect_text(file_bytes)
            for i,med in enumerate(data["medicines"]):
                print(med["name"],i)
                name=med["name"]

            with open("final_result.json","w") as w:
                json.dump(data,w)
                
            return jsonify({
                "message": "Image saved successfully",
                "image_path": image_filename,
                "data":data
            }),200

        else:
            return jsonify({"error": "No image found in the request"}), 400


@app.route('/krishna', methods=['POST'])
def get_medicin_links():
    if "text" not in request.form:
                return jsonify({"error": "No image file uploaded"}), 400
    else:
        med = request.form['text']
        medicines=get_medicine_name_links(med=med)
        return jsonify({
            "medicines": medicines}),200



if __name__ == '__main__':
    app.run(debug=True)
