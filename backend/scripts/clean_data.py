import json
from pathlib import Path
import pandas as pd
import numpy as np


def clean_dataset(df, report=None):
    """
    Clean dataset by resolving data quality issues based on profiling findings.
    
    Operations performed:
    1. Deduplicate rows.
    2. Impute or fill null values for categorical/numerical columns.
    3. Rectify invalid negative range values in numeric columns (e.g., amount).
    """
    cleaned_df = df.copy()
    
    # 1. Deduplicate exact duplicate rows
    initial_rows = len(cleaned_df)
    cleaned_df = cleaned_df.drop_duplicates()
    dedup_count = initial_rows - len(cleaned_df)
    if dedup_count > 0:
        print(f"[OK] Removed {dedup_count} duplicate row(s)")

    # 2. Fix negative values in numeric columns (e.g. amount)
    num_cols = cleaned_df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        if 'amount' in str(col).lower():
            neg_mask = cleaned_df[col] < 0
            if neg_mask.any():
                count = neg_mask.sum()
                cleaned_df[col] = cleaned_df[col].abs()
                print(f"[OK] Converted {count} negative entry/entries in '{col}' to positive absolute values")

    # 3. Impute null values
    for col in cleaned_df.columns:
        null_count = cleaned_df[col].isnull().sum()
        if null_count > 0:
            if pd.api.types.is_numeric_dtype(cleaned_df[col]):
                median_val = cleaned_df[col].median()
                cleaned_df[col] = cleaned_df[col].fillna(median_val)
                print(f"[OK] Imputed {null_count} missing value(s) in numeric column '{col}' with median ({median_val})")
            else:
                mode_val = cleaned_df[col].mode()[0] if not cleaned_df[col].mode().empty else "Unknown"
                cleaned_df[col] = cleaned_df[col].fillna(mode_val)
                print(f"[OK] Imputed {null_count} missing value(s) in categorical column '{col}' with mode ('{mode_val}')")

    return cleaned_df


def main():
    script_dir = Path(__file__).resolve().parent
    base_dir = script_dir.parent
    input_path = base_dir / 'data' / 'raw' / 'quality_test.csv'
    report_path = base_dir / 'output' / 'profile_report.json'
    output_path = base_dir / 'data' / 'processed' / 'cleaned_data.csv'

    if not input_path.exists():
        input_path = Path('data/raw/quality_test.csv')

    print(f"Loading raw data for cleaning from {input_path}...")
    df = pd.read_csv(input_path)

    report = None
    if report_path.exists():
        with open(report_path, 'r', encoding='utf-8') as f:
            report = json.load(f)

    cleaned_df = clean_dataset(df, report)
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    cleaned_df.to_csv(output_path, index=False)
    print(f"[OK] Cleaned dataset saved to {output_path}")


if __name__ == '__main__':
    main()
