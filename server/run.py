
from app import app, db
from flask_sqlalchemy import SQLAlchemy
from app.models import DICOMFile

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///path/to/dicom_files.db'
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()
