# House Price Prediction (End-to-End ML)

## Overview
This project builds and deploys a machine learning model to predict housing prices using the Boston Housing dataset.

## Project structure
```
project/
│
├── app/
│   ├── app.py
│   ├── templates/
│   └── static/
│
├── models/
├── data/
├── notebooks/
├── .github/workflows/
├── Dockerfile
├── requirements.txt
└── README.md
```

## Models
- Linear Regression
- Support Vector Machine
- Random Forest (Best: R² = 0.89)

## Tech Stack
- Python, Flask
- Scikit-learn
- Docker
- GitHub Actions (CI/CD)
- Render

## Features
- 13 input features
- Real-time prediction via web UI
- Feature scaling

## Demo
[Live App Link] (sau khi deploy Render)

<!-- ## Run locally
```bash
pip install -r requirements.txt
python app.py

---

## F. Docker + CI/CD (CHƯA CÓ)

👉 Đây là phần **quan trọng nhất để bạn vượt người khác**

---

### Bạn cần thêm:

#### 1. Dockerfile
#### 2. GitHub Actions
#### 3. Deploy Render

--- -->


## For Anaconda/Miniconda users
Create a new environment
```
conda create -n venv python=3.13
```

Activate environment
```
conda activate venv
```

Install the necessary libraries.
```
pip install -r requirements.txt
```

How to run
```
cd app
python app.py
```

## For ... users