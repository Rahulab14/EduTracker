"""Modular data workflow for ingesting, processing, and exporting sample data."""

import sys
from pathlib import Path

import pandas as pd


try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass


ROOT_DIR = Path(__file__).resolve().parents[1]
RAW_DATA_PATH = ROOT_DIR / "data" / "raw" / "sample.csv"
OUTPUT_PATH = ROOT_DIR / "output" / "processed.csv"


def ingest_data(filepath):
    """
    Load tabular data from a CSV or JSON file into a Pandas DataFrame.

    Input: File path to a CSV or JSON dataset.
    Output: A Pandas DataFrame containing the loaded records.
    Assumptions: The input file exists and uses a standard tabular format.
    """
    file_path = Path(filepath)

    # Support both CSV and JSON input files so the pipeline can adapt to new datasets.
    if file_path.suffix.lower() == ".csv":
        return pd.read_csv(file_path)
    if file_path.suffix.lower() == ".json":
        return pd.read_json(file_path)

    raise ValueError(f"Unsupported file format for {file_path}")


def process_data(df):
    """
    Transform raw data into analysis-ready form.

    Input: A Pandas DataFrame containing raw records.
    Output: A cleaned DataFrame with duplicates removed, missing values filled,
    and a derived performance label added.
    Assumptions: The dataset contains at least one column suitable for cleaning.
    """
    # Remove exact duplicate rows so downstream metrics are not inflated by repeated records.
    df = df.drop_duplicates().copy()

    # Fill missing numeric values with the median for each numeric column.
    numeric_columns = df.select_dtypes(include=["number"]).columns
    for column in numeric_columns:
        df[column] = df[column].fillna(df[column].median())

    # Fill missing text values with a placeholder so the dataset remains usable.
    text_columns = df.select_dtypes(exclude=["number"]).columns
    for column in text_columns:
        df[column] = df[column].fillna("unknown")

    # Create a simple performance label from the score column when present.
    if "score" in df.columns:
        df["performance_band"] = pd.cut(
            df["score"],
            bins=[-1, 59, 79, 100],
            labels=["needs-improvement", "good", "excellent"],
            include_lowest=True,
        )

    return df


def output_results(df, output_path):
    """
    Save the processed DataFrame to disk and print a short success summary.

    Input: A Pandas DataFrame and the destination path for the output file.
    Output: A CSV file written to disk and confirmation text printed to stdout.
    Assumptions: The destination directory exists or can be created.
    """
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)

    # Write the processed dataset so it can be consumed by downstream tools or reports.
    df.to_csv(output_file, index=False)

    print("✓ Data successfully processed")
    print(f"✓ Rows processed: {len(df)}")
    print(f"✓ Output saved to {output_file}")


if __name__ == "__main__":
    data = ingest_data(RAW_DATA_PATH)
    processed = process_data(data)
    output_results(processed, OUTPUT_PATH)
