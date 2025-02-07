from flask import Flask, request, jsonify
# from paddleocr import PaddleOCR
from PIL import Image
import io
import os
from extrect_text import *
from get_medicine_links import *

app = Flask(__name__)
# ocr = PaddleOCR(use_angle_cls=True, lang="en")  # Initialize PaddleOCR

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
            # file_bytes = open("./uploaded_image.png", "rb")
            # content,content_format,documents,key_value_pairs,api_version,data=extrect_text(file_bytes)
            data=extrect_text(file_bytes)
            for i,med in enumerate(data["medicines"]):
                print(med["name"],i)
                name=med["name"]
                
                # med["website"]=f"{name} + {i}"
                # print(get_medicine_name_links(med=med))
                # print()
                # break

            # return jsonify({
            #     "message": "Image saved successfully",
            #     "image_path": image_filename,
            #     "content":content ,
            #     "content_format":content_format ,
            #     "documents":documents ,
            #     "key_value_pairs":key_value_pairs ,
            #     "api_version":api_version ,
            #     "data":data
            # }),200
            # save data
            with open("final_result.json","w") as w:
                json.dump(data,w)
                
            return jsonify({
                "message": "Image saved successfully",
                "image_path": image_filename,
                "data":data
            }),200

        else:
            return jsonify({"error": "No image found in the request"}), 400





    # if 'image' not in request.files:
    #     return jsonify({"error": "No image uploaded"}), 400

    # image = request.files['image']

    # try:
    #     # Open image
    #     img = Image.open(io.BytesIO(image.read()))

    #     # Generate a unique filename and save image
    #     image_filename = os.path.join(SAVE_DIR, image.filename)
    #     img.save(image_filename)

    #     content,content_format,documents,key_value_pairs,api_version=extrect_text(image_path=image_filename)

        # Run OCR
        # result = ocr.ocr(image_filename, cls=True)

        # # Extract detected text
        # extracted_text = [line[1][0] for region in result for line in region]

        # return jsonify({
        #     "message": "Image saved successfully",
        #     "image_path": image_filename,
        #     "content":content ,
        #     "content_format":content_format ,
        #     "documents":documents ,
        #     "key_value_pairs":key_value_pairs ,
        #     "api_version":api_version ,
        # })

    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
