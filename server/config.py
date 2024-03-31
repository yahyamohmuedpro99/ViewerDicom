
# Configuration
class Config(object):
    UPLOAD_FOLDER = './DICOMS_FILES'
    ALLOWED_EXTENSIONS = {'dcm'}
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dicom_files.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
