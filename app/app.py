import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Load model + scaler
rf_model = joblib.load('../models/random_forest_model.pkl')
scaler = joblib.load('../models/scaler.pkl')

FEATURES = [
    "CRIM", "ZN", "INDUS", "CHAS", "NOX", "RM",
    "AGE", "DIS", "RAD", "TAX", "PTRATIO", "B", "LSTAT"
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # lấy đúng thứ tự feature
        input_data = [data.get(f, 0) for f in FEATURES]

        input_array = np.array(input_data).reshape(1, -1)
        scaled_data = scaler.transform(input_array)

        prediction = rf_model.predict(scaled_data)[0]

        return jsonify({
            "prediction": round(float(prediction), 2),
            "unit": "USD (thousands)"
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400

if __name__ == "__main__":
    app.run(debug=True)