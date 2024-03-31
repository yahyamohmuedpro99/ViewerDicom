# ViewerDicom

ViewerDicom is an application for viewing DICOM images. It consists of a backend server and a client interface.
and have alot of tools to see and understand the DICOM images better 

## Prerequisites
Before running the application, ensure you have Docker Compose installed on your system. You can download it from [here](https://docs.docker.com/compose/install/).

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yahyamohmuedpro99/ViewerDicom.git
    ```

2. Navigate to the parent directory and install the client dependencies:
    ```bash
    cd ViewerDicom/client/dicom_view
    npm install
    ```

## Running the Application
1. Go back to the root directory of the project:
    ```bash
    cd ../..
    ```

2. Start the application using Docker Compose:
    ```bash
    docker-compose up
    ```

## Usage
Once the application is running, you can access it locally using the following URLs:
- Client: [http://localhost:3000/](http://localhost:3000/)
- Backend: [http://localhost:5000/api](http://localhost:5000/api)
