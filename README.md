# Potato Disease Classification System
A full-stack AI application designed to identify potato leaf diseases (Early Blight, Late Blight, Healthy) using Deep Learning. This project demonstrates a production-grade MLOps pipeline using *TensorFlow Serving, FastAPI and React*.

## System Architecture
1. Frontend: React/Vite
2. Gatekeeper API: FastAPI
3. Model Server: TF-Serving via Docker

## Tech Stack
- Deep Learning: Tensorflow
- Backend: Python, FastAPI, Uvicorn
- Deployment: Docker (TensorFlow Serving)
- Frontend: React.js, Vite, Axios
- Environment: Venv


## Setup and Installation 

1. Model Serving (Docker)
Install docker and run the following command.

```
    
    docker run -t --rm -p 8501:8501 \
        -v "(**your own path**)" \
        emacski/tensorflow-serving:latest \
        --rest_api_port=8501 \
        --model_config_file=/Project/models.config
        
```


Note: This command runs the ARM-optimized image for Apple Silicon and mounts the local model folder.

2. Backend API (FastAPI)
Navigate to the /api directory, activate your virtual environment and install dependencies:

'''
    cd api
    source venv/bin/activate
    pip install -r requirements.txt
    python main.py
'''

3. Frontend(React)
Navigate to /frontend directory and start the deployment server:
```
    cd frontend
    npm install
    npm run dev
```



## Features 
- Real-time inference: Drag and drop potato leaf images for instant classification.
- Confidence Scoring: Provides a percentage-based certainty level for every prediction.
- Scalable Infrastructure: Decoupled frontend and backend allow for independent scaling of services.
