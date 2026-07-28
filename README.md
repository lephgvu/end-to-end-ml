# House Price Prediction — End-to-End Machine Learning

An end-to-end machine learning project that predicts Boston house values and serves the result through a modern web interface.

## Live Demo

- **Hearthline frontend:** https://end-to-end-ml-1-g21x.onrender.com/
- **Flask API and legacy interface:** https://housing-app-rqh8.onrender.com/

![Hearthline social preview](web/public/og.png)

## Overview

This project covers the complete workflow:

> Data analysis → Model training → Evaluation → API → Web deployment

The prediction model is exposed through a Flask API hosted on Render. The Hearthline frontend provides a responsive interface for configuring all 13 Boston Housing signals and sends prediction requests to that API.

## Models

The following regression models were implemented and evaluated:

- Linear Regression
- Support Vector Machine
- Random Forest Regressor (**best performer**)

Best model performance:

- **R² score:** approximately 0.89
- **Selected model:** Random Forest Regressor

## Tech Stack

### Machine learning and API

- Python 3.11
- Flask
- Scikit-learn
- Pandas and NumPy
- Joblib
- Gunicorn

### Frontend

- React 19
- TypeScript
- Next.js-compatible Vinext runtime
- Responsive HTML and CSS

### DevOps and deployment

- Docker
- GitHub Actions
- Render
- OpenAI Sites

## Features

- Configure all **13 Boston Housing features**
- Start from three predefined neighborhood profiles
- Fine-tune individual housing, access, and environmental signals
- Generate real-time predictions from the deployed Random Forest model
- Responsive and accessible interface
- Branded Open Graph and social-sharing preview

## Input Features

| Feature | Description |
| --- | --- |
| CRIM | Per-capita crime rate |
| ZN | Residential land zoned for large lots (%) |
| INDUS | Non-retail business acreage (%) |
| CHAS | Charles River dummy variable (1 = near, 0 = not) |
| NOX | Nitric oxide concentration |
| RM | Average number of rooms |
| AGE | Homes built before 1940 (%) |
| DIS | Distance to employment centers |
| RAD | Accessibility to highways |
| TAX | Property tax rate |
| PTRATIO | Pupil–teacher ratio |
| B | Dataset demographic index |
| LSTAT | Lower-income population (%) |

## API Usage

### Endpoint

```http
POST https://housing-app-rqh8.onrender.com/predict
Content-Type: application/json
```

### Request

```json
{
  "CRIM": 0.1,
  "ZN": 18,
  "INDUS": 2.3,
  "CHAS": 0,
  "NOX": 0.5,
  "RM": 6.5,
  "AGE": 65,
  "DIS": 4,
  "RAD": 1,
  "TAX": 300,
  "PTRATIO": 15,
  "B": 390,
  "LSTAT": 10
}
```

### Response

```json
{
  "prediction": 24.5,
  "unit": "USD (thousands)"
}
```

## Project Structure

```text
.
├── app/                    # Flask API and legacy interface
│   ├── app.py
│   ├── static/
│   └── templates/
├── web/                    # Hearthline React frontend
│   ├── app/
│   ├── public/
│   └── package.json
├── models/                 # Trained model and scaler
├── data/                   # Boston Housing dataset
├── notebook/               # Analysis and model training
├── .github/workflows/      # CI pipeline
├── Dockerfile              # Flask API container
├── requirements.txt
└── README.md
```

## Run Locally

### Hearthline frontend

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000.

The frontend uses the deployed Render API by default.

### Flask API

```bash
pip install -r requirements.txt
python app/app.py
```

Open http://localhost:5000.

### Docker

```bash
docker build -t housing-app .
docker run -p 5000:5000 housing-app
```

## Continuous Integration

GitHub Actions runs on pushes and pull requests targeting `main`. The workflow:

1. Installs Python dependencies
2. Validates required imports
3. Builds the Docker image
4. Starts the container
5. Tests the Flask homepage

## Deployment

| Component | Platform | URL |
| --- | --- | --- |
| Hearthline frontend | Render | https://end-to-end-ml-1-g21x.onrender.com/ |
| Prediction API | Render | https://housing-app-rqh8.onrender.com/ |
| Hearthline private deployment | OpenAI Sites | https://hearthline-boston.vuleephuong123.chatgpt.site/ |

The frontend and API are deployed as separate services. The frontend forwards prediction requests to the Flask API.

## Disclaimer

This project is for educational and portfolio purposes. Predictions are based on the historical Boston Housing dataset and are not professional property appraisals.
