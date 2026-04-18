# 🏠 House Price Prediction — End-to-End Machine Learning Project

## 🚀 Live Demo

👉 https://housing-app-rqh8.onrender.com/

---

## 📌 Overview

This project demonstrates a complete **end-to-end machine learning pipeline** for predicting house prices using the Boston Housing dataset.

It covers the full workflow from:

> **Data Analysis → Model Training → Evaluation → Deployment**

The final model is deployed as a **production-ready web application** using Docker and cloud infrastructure.

---

## 🧠 Models

The following regression models were implemented and evaluated:

* Linear Regression
* Support Vector Machine (SVM)
* Random Forest Regressor (**Best Performer**)

📊 **Best model performance:**

* R² Score: ~0.89
* Selected model: Random Forest

---

## ⚙️ Tech Stack

### 🔹 Backend

* Python
* Flask
* Scikit-learn

### 🔹 Frontend

* HTML, CSS, JavaScript

### 🔹 DevOps & Deployment

* Docker (containerization)
* GitHub Actions (**CI pipeline**)
* Render (cloud deployment)

---

## ✨ Features

* Input all **13 housing features**
* Real-time prediction via web interface
* Feature scaling with `StandardScaler`
* Clean and responsive UI
* Publicly deployed ML service

---

## 🏗️ Project Structure

```bash
project/
│
├── app/                       # Flask application
│   ├── app.py                 # Main backend (API + routing + model inference)
│   │
│   ├── templates/             # HTML templates 
│   │   └── index.html         # Main UI page
│   │
│   └── static/                # Frontend assets
│       └── style.css          # Styling
│        
│
├── models/                    # Trained ML artifacts
│   ├── random_forest_model.pkl
│   └── scaler.pkl             # StandardScaler for preprocessing
│
├── data/                      # Raw dataset (Boston Housing)
│
├── notebooks/                 # Jupyter notebooks
│   └── linear_ml.ipynb        # EDA + training + evaluation
│
├── .github/workflows/
│   └── ci.yml                 # CI pipeline (build + test Docker)
│
├── Dockerfile                 # Container configuration
├── requirements.txt           # Python dependencies
├── README.md                  # Project documentation
└── app.png                    # UI screenshot (for GitHub preview)
```

---

## 🐳 Run with Docker

```bash
docker build -t housing-app .
docker run -p 5000:5000 housing-app
```

👉 Open: http://localhost:5000

---

## 💻 Run Locally (Without Docker)

```bash
conda create -n ml-app python=3.11
conda activate ml-app
pip install -r requirements.txt
python app/app.py
```

---

## 🔄 CI Pipeline

This project uses **GitHub Actions** for Continuous Integration:

* Install dependencies
* Validate Python environment
* Build Docker image
* Run container
* Test application endpoint

👉 Ensures the project is always **buildable and runnable**

---

## 🌐 Deployment

The application is deployed on **Render** using Docker.

👉 Live URL:
https://housing-app-rqh8.onrender.com/

---

## 🏠 Screenshot UI

![App Screenshot](app.png)

---

## 📊 Future Improvements

* Add feature importance visualization
* Improve UI/UX (loading states, better feedback)
* Compare multiple models in UI
* Add REST API documentation

---

## 📄 License

This project is for educational and portfolio purposes.
