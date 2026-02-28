import pandas as pd
import numpy as np
import re
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
from sklearn.ensemble import GradientBoostingRegressor

# =========================
# 1. Load Dataset
# =========================
# Using the specific filename you uploaded
df = pd.read_csv("mysmartprice_mobile_dataset.csv")

# =========================
# 2. Clean Price Column
# =========================
def clean_price(val):
    if pd.isna(val): return None
    # Remove ₹ and commas
    cleaned = re.sub(r'[^\d]', '', str(val))
    return float(cleaned) if cleaned else None

df['price'] = df['price'].apply(clean_price)

# =========================
# 3. Extract Technical Specs
# =========================

# RAM: Extract from "8 GB RAM | 128 GB Storage"
df['ram'] = df['ram_and_storage'].str.extract(r'(\d+)\s*GB RAM').astype(float)

# Display: Extract number from "6.9″ (17.53 cm)..."
df['display'] = df['display'].str.extract(r'(\d+\.?\d*)').astype(float)

# Camera: Extract first number from "200+50+10..."
df['camera_mp'] = df['rear_camera'].str.extract(r'(\d+)').astype(float)

# Battery: Extract number from "5000 mAh | 45W..."
df['battery_capacity'] = df['battery_and_charging_speed'].str.extract(r'(\d+)').astype(float)

# Rating: Fill missing with average
df['rating'] = df['avg_rating'].fillna(df['avg_rating'].mean())

# =========================
# 4. Processor Simplification
# =========================
def simplify_processor(x):
    x = str(x).lower()
    if "snapdragon" in x: return "snapdragon"
    if "dimensity" in x or "mediatek" in x or "helio" in x: return "mediatek"
    if "exynos" in x: return "exynos"
    if "apple" in x or "bionic" in x: return "apple"
    if "unisoc" in x: return "unisoc"
    return "other"

df["processor_type"] = df["cpu"].apply(simplify_processor)

# =========================
# 5. Features Logic (Binary)
# =========================
# Check if "Memory Card" is mentioned in the features column
df["card"] = df['5G|NFC|Fingerprint'].fillna('').apply(
    lambda x: 1 if 'Memory Card' in str(x) else 0
)

# Most in this dataset are Dual SIM, setting as 1
df["sim"] = 1

# =========================
# 6. Final Cleaning & Split
# =========================
features = ["price", "rating", "ram", "display", "camera_mp", "battery_capacity", "processor_type", "card", "sim"]
df = df[features].dropna()

# Encode Processor
df = pd.get_dummies(df, columns=["processor_type"], drop_first=True)

X = df.drop("price", axis=1)
y = np.log1p(df["price"]) # Log transform to handle high-end phone outliers

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# =========================
# 7. Train & Save
# =========================
model = GradientBoostingRegressor(
    n_estimators=600, 
    learning_rate=0.05, 
    max_depth=4, 
    random_state=42
)

model.fit(X_train, y_train)

# Save Model
pickle.dump(model, open("mobile_price_model.pkl", "wb"))
# Save column order so your Frontend knows which 0/1 to send for processors
pickle.dump(X.columns.tolist(), open("model_columns.pkl", "wb"))

print("Model trained and saved successfully!")
print(f"Final Features used: {list(X.columns)}")