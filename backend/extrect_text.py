from paddleocr import PaddleOCR
import cv2
import matplotlib.pyplot as plt
from get_meditine import *
# from main import *
# from ocr_model import ocr_model  # Import the pre-initialized OCR model

# Flask backend server
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import json

# Azure Document AI
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult, AnalyzeDocumentRequest

from dotenv import load_dotenv
load_dotenv()

key = os.getenv("DI_KEY")
endpoint = os.getenv("DI_ENDPOINT")

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10Mb

CORS(app)  # Allowing all origins TODO: remove in production
# CORS(app, resources={
#      r"/*": {"origins": "https://e951-2405-201-9000-a088-48dd-75db-79c6-130b.ngrok-free.app/scan/"}})


def extrect_text(file):
    print("✅ extrect_text call successfully")
    # sample document
    # formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/rest-api/read.png"

    client = DocumentIntelligenceClient(
        endpoint=endpoint, credential=AzureKeyCredential(key)
    )
    # with open(file_path,"rb") as file:
    poller = client.begin_analyze_document(
        "prebuilt-read", body=file)

    result: AnalyzeResult = poller.result()
    print(result.content)

    with open("result_content.txt", "w") as output_file:
        output_file.write(result.content)
        output_file.close()


#     con=""""Sir Ganga Ram Hospital Sir Ganga Ram Hospital Marg, Rajinder Nagar, New Delhi-110060, INDIA Tel : +91-11-4225 4000 Medical Superintendent (Offg.) Sir Ganga Ram Kolmet Hospital, 7-B, Pusa Road, New Delhi-110005. Tel : +91-11-45099999, (D) 45099980\nDr. Raj Kamal Agarwal Sr. Consultant Deptt. of Anesthesiology Pain & Peri Operative Medicine Mobile : +91 98101 52201 E-mail : kamalagarwal300@gmail.com\nTO WHOM IT MAY CONCERN\nAs per ICMR guideline, the contacts of COVID tve cases should be put on HOME ISOLATION even with Mild Symptoms\nIt is advised that everybody takes these preventive medication apart from following SOCIAL DISTANCING, HAND HYGIENE & WEARING MASK\nRx\n. TAB HYDROXY CHLOROQUINE 400mg once a week\n. TAB VITAMIN C one gram once a day\n· TAB ZING 50mg once a day In case of fever\n* · TAB CROCIN/CALPOL 650 mg SOS In case of throat pain & cough\n* · TAB CETIRIZINE 10mg once a day. · SYRUP ALEX 2/3 Tea spoon 3 times a day.\nDR. RAJ KAMAL AGARWAL\nMBBS, DA\nDIG NOT 4537 1. - SENIOR CONSULTANT DEPTT. OF ANAESTHSIOLOGY Residence : PERIOPERATIVE MEDICINE & PAIN SIR GANGARAM HOSPITAL 181, Royalton Tower, Princeton Estate, DLF Phase-V, Gurugram, RIJNDER NAGAR, NEW DELHI-110060\nPÅ229820152201","""
#     con=''''DEA# GB 05455616 De
# LIC # 976269
# DI e
# MEDICAL CENTRE 824 14th Street New York, NY 91743, USA dobe Stock go
# NAME
# John Smith
# AGE
# 34
# ADDRESS 162 Example St, NY
# DATE 09-11-12
# R X
# dob
# Stock
# Betaloc 100mg - 1 tab BID Dorzolamidum 10 mg - 1 tab BID Cimetidine 50 mg - 2 tabs TID Oxprelol 50mg - 1 tab QD
# Adobe Stock
# Adobe Stock dobe Stock
# signature Dr. Steve Johnson
# Adobe s
# OLABEL REFILL 01 2 3 4 5 PRN
# Rock
# WTX-N-PRESC-T 1-889-422-0700
# Adobe Stock
# Stock
# Stock.
# A'''

    # data=get_medical_data(con)
    data=get_medical_data(result.content)


    # return (result.content,result.content_format,result.documents,result.key_value_pairs,result.api_version,data)
    return data
