import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template, url_for

app = Flask(__name__)
# Load the trained model
rf_model = joblib.load('./models/random_forest_model.pkl')
scaler = joblib.load('./models/scaler.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict_api', methods=['POST'])
def predict_api():
    data = request.json['data']
    print(data)
    print(np.array(list(data.values())).reshape(1, -1))
    scaled_data = scaler.transform(np.array(list(data.values())).reshape(1, -1))
    output = rf_model.predict(scaled_data)
    print(output[0])
    return jsonify(output[0])

if __name__ == "__main__":
    app.run(debug=True)