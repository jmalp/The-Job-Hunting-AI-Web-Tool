import pandas as pd
import numpy as np

# Sample data
data = {'Name': ['John Doe', 'Jane Smith', 'Jane Smith', 'Mary Johnson'],
        'Age': [28, 34, np.nan, 45],
        'Gender': ['Male', 'Female', 'Female', 'Female'],
        'Income': ['50000', '54000', '54000', None]}

# Create dataframe
df = pd.DataFrame(data)

# Remove duplicates
df = df.drop_duplicates()

# Handling missing values
df['Age'].fillna(df['Age'].mean(), inplace=True)

# Converting data types
df['Income'] = pd.to_numeric(df['Income'], errors='coerce')

# Renaming columns for clarity
df.rename(columns={'Name': 'Full Name'}, inplace=True)

# Display the cleaned dataframe
print(df)
