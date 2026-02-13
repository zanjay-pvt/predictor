import pandas as pd
import numpy as np
import re
import pickle
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error
from sklearn.ensemble import GradientBoostingRegressor

# =========================
# Load Dataset
# =========================
df = pd.read_csv("smartphones - smartphones.csv")

print("Original Shape:", df.shape)
print(df.head())

# =========================
# Clean Price Column
# =========================
df["price"] = df["price"].str.replace("₹", "", regex=False)
df["price"] = df["price"].str.replace(",", "", regex=False)
df["price"] = df["price"].astype(float)

# =========================
# Extract RAM (if contains GB text)
# =========================
df["ram"] = df["ram"].astype(str).str.extract(r'(\d+)').astype(float)

# =========================
# Extract Display Size
# =========================
df["display"] = df["display"].astype(str).str.extract(r'(\d+\.?\d*)').astype(float)

# =========================
# Extract Camera MP
# =========================
df["camera_mp"] = df["camera"].astype(str).str.extract(r'(\d+)').astype(float)

# =========================
# Extract Battery
# =========================
df["battery_capacity"] = df["battery"].astype(str).str.extract(r'(\d+)').astype(float)

# =========================
# Processor Simplification
# =========================
def simplify_processor(x):
    x = str(x).lower()
    if "snapdragon" in x:
        return "snapdragon"
    elif "dimensity" in x or "mediatek" in x:
        return "mediatek"
    elif "exynos" in x:
        return "exynos"
    elif "apple" in x or "bionic" in x:
        return "apple"
    else:
        return "other"

df["processor_type"] = df["processor"].apply(simplify_processor)

# =========================
# Memory Card Support
# =========================
df["card"] = df["card"].fillna("not supported")

# Convert to binary
df["card"] = df["card"].str.lower().apply(
    lambda x: 0 if "not supported" in str(x) else 1
)

# =========================
# SIM Type
# =========================
df["sim"] = df["sim"].astype(str).str.lower().apply(
    lambda x: 1 if "dual" in x else 0
)

# =========================
# Select Final Features
# =========================
df = df[[
    "price",
    "rating",
    "ram",
    "display",
    "camera_mp",
    "battery_capacity",
    "processor_type",
    "card",
    "sim"
]]

# Drop rows with missing numeric values
df = df.dropna()

print("After Cleaning Shape:", df.shape)

# =========================
# Encode Processor
# =========================
df = pd.get_dummies(df, columns=["processor_type"], drop_first=True)

# =========================
# Split Data
# =========================
X = df.drop("price", axis=1)
y = df["price"]

# Log transform
y = np.log1p(y)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# Train Model
# =========================
model = GradientBoostingRegressor(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=3,
    random_state=42
)

model.fit(X_train, y_train)

# =========================
# Evaluate
# =========================
y_pred_log = model.predict(X_test)

y_pred = np.expm1(y_pred_log)
y_test_actual = np.expm1(y_test)

print("\nModel Performance:")
print("R2 Score:", r2_score(y_test_actual, y_pred))
print("MAE:", mean_absolute_error(y_test_actual, y_pred))
print("RMSE:", np.sqrt(np.mean((y_test_actual - y_pred)**2)))

# =========================
# Save Model
# =========================
pickle.dump(model, open("mobile_price_model.pkl", "wb"))

print("\nModel saved successfully!")
