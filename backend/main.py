import os
import numpy as np
import tensorflow as tf
import cv2

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# --------------------------------------------------
# SETTINGS
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "Best_Cattle_Breed_Improved.h5"
)

IMAGE_SIZE = (224, 224)

CLASS_NAMES = [
    "Alambadi", "Amritmahal", "Ayrshire", "Banni", "Bargur", "Bhadawari",
    "Brown_Swiss", "Dangi", "Deoni", "Gir", "Guernsey", "Hallikar", "Hariana",
    "Holstein_Friesian", "Jaffrabadi", "Jersey", "Kangayam", "Kankrej",
    "Kasargod", "Kenkatha", "Kherigarh", "Khillari", "Krishna_Valley",
    "Malnad_gidda", "Mehsana", "Murrah", "Nagori", "Nagpuri", "Nili_Ravi",
    "Nimari", "Ongole", "Pulikulam", "Rathi", "Red_Dane", "Red_Sindhi",
    "Sahiwal", "Surti", "Tharparkar", "Toda", "Umblachery", "Vechur"
]

# --------------------------------------------------
# LOAD MODEL
# --------------------------------------------------

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model not found at: {MODEL_PATH}"
    )

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

if model.output_shape[-1] != len(CLASS_NAMES):
    raise ValueError(
        f"Model has {model.output_shape[-1]} outputs, "
        f"but there are {len(CLASS_NAMES)} class names."
    )

# MobileNetV2 for cattle/non-cattle check
cow_model = tf.keras.applications.MobileNetV2(
    weights="imagenet"
)

# --------------------------------------------------
# FASTAPI
# --------------------------------------------------

app = FastAPI(
    title="Cattle Breed Identification API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# PREDICTION FUNCTION
# --------------------------------------------------

def predict_image(image_bytes):

    # Convert uploaded bytes into image
    image_array = np.frombuffer(
        image_bytes,
        np.uint8
    )

    img = cv2.imdecode(
        image_array,
        cv2.IMREAD_COLOR
    )

    if img is None:
        raise ValueError("Cannot read uploaded image")

    # --------------------------------------------------
    # CATTLE / NON-CATTLE CHECK
    # --------------------------------------------------

    check = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    check = cv2.resize(
        check,
        IMAGE_SIZE
    ).astype(np.float32)

    check = tf.keras.applications.mobilenet_v2.preprocess_input(
        check
    )

    check_pred = cow_model.predict(
        np.expand_dims(check, 0),
        verbose=0
    )

    labels = [
        x[1].lower()
        for x in tf.keras.applications.mobilenet_v2.decode_predictions(
            check_pred,
            top=5
        )[0]
    ]

    cattle_words = [
        "cow",
        "ox",
        "water_buffalo",
        "buffalo"
    ]

    if not any(
        word in label
        for label in labels
        for word in cattle_words
    ):
        return None

    # --------------------------------------------------
    # BREED CLASSIFICATION
    # --------------------------------------------------

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    img = cv2.resize(
        img,
        IMAGE_SIZE
    ).astype(np.float32)

    img = tf.keras.applications.efficientnet_v2.preprocess_input(
        img
    )

    pred = model.predict(
        np.expand_dims(img, 0),
        verbose=0
    )[0]

    # Top 3
    ids = np.argsort(pred)[-3:][::-1]

    results = []

    for i in ids:
        results.append({
            "breed": CLASS_NAMES[i],
            "confidence": float(pred[i] * 100)
        })

    return results


# --------------------------------------------------
# API ROUTES
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Cattle Breed Identification API is running"
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    try:

        image_bytes = await file.read()

        results = predict_image(image_bytes)

        # Non-cattle image
        if results is None:
            return {
                "success": True,
                "is_cattle": False,
                "message": "Image is not of a cattle breed",
                "prediction": None,
                "confidence": None,
                "top3": []
            }

        # Successful prediction
        return {
            "success": True,
            "is_cattle": True,
            "message": "Prediction successful",
            "prediction": results[0]["breed"],
            "confidence": results[0]["confidence"],
            "top3": results
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }