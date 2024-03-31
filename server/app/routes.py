# app/routes.py

from flask import request, jsonify
from app import app, db
from app.utils import allowed_file
from app.models import DICOMFile
from werkzeug.utils import secure_filename
import pydicom 
import os
import logging
import numpy as np
logging.basicConfig(level=logging.DEBUG)

@app.route('/api', methods=['GET'])
def index():
    return {
        "first": "start",
        "second": "keep on"
    }




def analyze_dicom(file_path):
    try:
        ds = pydicom.dcmread(file_path, stop_before_pixels=True) # stop_before_pixels to avoid loading pixel data
        
        info = {
            'PatientName': str(ds.get('PatientName', 'N/A')),
            'PatientAge': str(ds.get('PatientAge', 'N/A')),
            'PatientSex': str(ds.get('PatientSex', 'N/A')),
            'StudyDate': str(ds.get('StudyDate', 'N/A')),
            'StudyDescription': str(ds.get('StudyDescription', 'N/A')),
            'InstitutionName': str(ds.get('InstitutionName', 'N/A')),
            'Modality': str(ds.get('Modality', 'N/A')),
        }

        all_data = {}
        for elem in ds:
            tag = f"{elem.tag.group:04x}{elem.tag.element:04x}"
            if elem.tag != pydicom.tag.Tag(0x7FE0, 0x0010): # Skip Pixel Data
                all_data[tag] = {
                    'description': elem.description(),
                    'value': str(elem.value) if elem.value else 'None'
                }

        return {
            'BasicInfo': info,
            'AllData': all_data,
        }

    except Exception as e:
        logging.error("Error analyzing DICOM file: %s", str(e))
        return {'error': 'Failed to analyze DICOM file.'}

@app.route('/analyze', methods=['POST'])
def analyze_single_dicom():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)

        analysis_result = analyze_dicom(save_path)
        return jsonify(analysis_result), 200

    return jsonify({'error': 'Invalid file or file extension not allowed'}), 400
      
# @app.route('/all_images', methods=['GET'])
# def get_all_images():
#     # Path to the directory containing DICOM files
#     dicom_dir = './DICOMS_FILES'

#     # Get a list of all DICOM files in the directory
#     file_list = os.listdir(dicom_dir)

#     # Create a dictionary to store file paths
#     files = {}

#     # Iterate through the file list and store file paths
#     for file in file_list:
#         file_path = os.path.join(dicom_dir, file)
#         files[file] = file_path

#     # Return the files as attachments
#     return send_files(files)

# def send_files(files):
#     # Create a Flask response object
#     response = jsonify(files)

#     # Set the content-disposition header to attachment
#     response.headers['Content-Disposition'] = 'attachment; filename=files.zip'

#     # Return the response
#     return response
@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)  # It's a good practice to secure the filename
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        logging.debug("Uploaded file: %s", filename)  # Corrected logging.debug() call

        # Assuming DICOMFile is a model for your database and
        # analyze_dicom is a function that returns a dictionary of the analysis results
        new_record = DICOMFile(filename=filename, filepath=save_path)
        db.session.add(new_record)
        db.session.commit()

        # Perform analysis on the saved file and get the result
        analysis_result = analyze_dicom(save_path)
        return jsonify({
            'message': 'File uploaded and analyzed successfully',
            'analysis': analysis_result  # Directly pass the dictionary
            }), 200    
    else:
        return jsonify({'error': 'File extension not allowed'}), 400
