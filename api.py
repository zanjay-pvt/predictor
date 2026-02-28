import pickle
import numpy as np
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# 1. Initialize the FastAPI app
app = FastAPI()

# 2. Add CORS Middleware (Crucial for connecting to Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load your trained model and column list
# Note: Make sure these files are in the same folder as api.py
try:
    model = pickle.load(open("mobile_price_model.pkl", "rb"))
    model_columns = pickle.load(open("model_columns.pkl", "rb"))
    print("Model and columns loaded successfully!")
except FileNotFoundError:
    print("Error: Model files not found. Did you run main.py first?")

# 4. Define the data structure for incoming requests
class MobileData(BaseModel):
    rating: float
    ram: float
    display: float
    camera_mp: float
    battery_capacity: float
    processor_type: str
    card: int
    sim: int

# 5. The Root Endpoint (To check if server is live)
@app.get("/")
def read_root():
    return {"status": "Server is running!", "api_docs": "/docs"}

# 6. The Prediction Endpoint
@app.post("/predict")
def predict(data: MobileData):
    # Create a base dataframe with all zeros using the saved column names
    input_df = pd.DataFrame(0, index=[0], columns=model_columns)
    
    # Fill in the basic numeric features
    input_df['rating'] = data.rating
    input_df['ram'] = data.ram
    input_df['display'] = data.display
    input_df['camera_mp'] = data.camera_mp
    input_df['battery_capacity'] = data.battery_capacity
    input_df['card'] = data.card
    input_df['sim'] = data.sim
    
    # Handle the processor type (One-Hot Encoding)
    # This looks for 'processor_type_snapdragon', etc.
    proc_col = f"processor_type_{data.processor_type.lower()}"
    if proc_col in input_df.columns:
        input_df[proc_col] = 1
        
    # Make the prediction
    # We use np.expm1 because we used np.log1p during training
    prediction_log = model.predict(input_df)
    final_price = np.expm1(prediction_log)[0]
    
    return {"estimated_price": round(float(final_price), 2)}