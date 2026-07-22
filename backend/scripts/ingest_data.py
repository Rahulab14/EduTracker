"""Load multi-format business data into Pandas DataFrames for downstream analysis."""

import os
from io import StringIO
from pathlib import Path

import pandas as pd


ROOT_DIR = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT_DIR / "data" / "raw"
PROCESSED_DIR = ROOT_DIR / "data" / "processed"


def ingest_csv(filepath, delimiter=",", encoding="utf-8", dtype_dict=None):
    """
    Load CSV file with explicit parameters documented.

    Args:
        filepath: Path to CSV file.
        delimiter: Field delimiter (comma by default, but could be semicolon or tab).
        encoding: File encoding (UTF-8 standard, but may be latin-1 or cp1252).
        dtype_dict: Dictionary mapping column names to data types.

    Returns:
        Pandas DataFrame with shape and column names confirmed.
    """
    try:
        df = pd.read_csv(
            filepath,
            delimiter=delimiter,
            encoding=encoding,
            dtype=dtype_dict,
        )
        print(f"✓ CSV loaded: {filepath}")
        print(f"  Shape: {df.shape[0]} rows × {df.shape[1]} columns")
        print(f"  Columns: {list(df.columns)}")
        return df
    except FileNotFoundError:
        print(f"Error: File not found - {filepath}")
        raise
    except UnicodeDecodeError as exc:
        print(f"Encoding error: Could not decode with {encoding}")
        print("Try: latin-1, iso-8859-1, or cp1252")
        raise exc


def ingest_json(filepath, is_nested=False):
    """
    Load JSON file, handling nested structures by flattening them.

    Args:
        filepath: Path to JSON file.
        is_nested: If True, flatten nested JSON structures into columns.

    Returns:
        Pandas DataFrame with nested structures expanded.
    """
    try:
        with open(filepath, "r", encoding="utf-8") as handle:
            json_data = handle.read()

        parsed_data = pd.read_json(StringIO(json_data))

        if isinstance(parsed_data, pd.Series):
            records = [parsed_data.to_dict()]
        elif isinstance(parsed_data, list):
            records = parsed_data
        else:
            records = parsed_data.to_dict(orient="records")

        df = pd.DataFrame(records)

        if is_nested:
            df = pd.json_normalize(records)
            print("✓ Nested JSON flattened to tabular format")

        print(f"✓ JSON loaded: {filepath}")
        print(f"  Shape: {df.shape[0]} rows × {df.shape[1]} columns")
        return df
    except FileNotFoundError:
        print(f"Error: File not found - {filepath}")
        raise


def ingest_csv_with_fallback(filepath, delimiters=None, fallback_encodings=None):
    """
    Load CSV with fallback encodings if the initial attempt fails.

    Tries multiple encodings and delimiters in sequence.
    """
    if delimiters is None:
        delimiters = [","]
    if fallback_encodings is None:
        fallback_encodings = ["utf-8", "latin-1", "iso-8859-1", "cp1252"]

    for delimiter in delimiters:
        for encoding in fallback_encodings:
            try:
                df = pd.read_csv(filepath, delimiter=delimiter, encoding=encoding)
                print(f"✓ Successfully loaded with delimiter='{delimiter}', encoding='{encoding}'")
                return df
            except (UnicodeDecodeError, pd.errors.ParserError):
                continue

    raise ValueError(f"Could not load {filepath} with any encoding/delimiter combination")


def document_ingestion(df, source_file):
    """
    Print detailed ingestion report for an audit trail.
    """
    print(f"\n{'=' * 60}")
    print(f"INGESTION REPORT: {source_file}")
    print(f"{'=' * 60}")
    print(f"Rows: {df.shape[0]}")
    print(f"Columns: {df.shape[1]}")
    print("\nColumn Names & Data Types:")
    print(df.dtypes)
    print("\nNull Values Per Column:")
    print(df.isnull().sum())
    print("\nFirst 3 Rows:")
    print(df.head(3).to_string())
    print(f"{'=' * 60}\n")
    return df


def main():
    """Run the multi-format ingestion workflow and save processed outputs."""
    print("Starting multi-format ingestion...\n")

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    csv_df = ingest_csv(
        RAW_DIR / "customers.csv",
        delimiter=",",
        encoding="utf-8",
    )
    document_ingestion(csv_df, "customers.csv")

    json_df = ingest_json(
        RAW_DIR / "transactions.json",
        is_nested=True,
    )
    document_ingestion(json_df, "transactions.json")

    csv_df.to_csv(PROCESSED_DIR / "customers_ingested.csv", index=False)
    json_df.to_csv(PROCESSED_DIR / "transactions_ingested.csv", index=False)

    print("\n✓ All data ingested and saved to processed/")


if __name__ == "__main__":
    main()
