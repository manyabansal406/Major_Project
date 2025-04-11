from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    base_path = os.path.dirname(__file__)

    vectorizer = joblib.load(os.path.join(base_path, 'vectorizer.pkl'))
    model = joblib.load(os.path.join(base_path, 'model.pkl'))

    print(" Vectorizer and Model loaded successfully with joblib!")
except Exception as e:
    print(f" Error loading model/vectorizer: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    content = data.get('content', '')

    X = vectorizer.transform([content])
    prediction = model.predict(X)[0]

    if prediction == 1:
        result = "real"
    else:
        result = "fake"

    

    return jsonify({'prediction': result})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
