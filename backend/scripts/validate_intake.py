"""Validate incoming data files before they enter the processing pipeline."""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

import chardet
import pandas as pd


ROOT_DIR = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = Path("data/raw/sample.csv")
DEFAULT_OUTPUT = ROOT_DIR / "output" / "intake_report.json"


def validate_file_exists(filepath):
    """
    Check whether the input file exists and contains content.

    Input: A file path string.
    Output: A tuple of (bool, message).
    Assumptions: The path points to a local filesystem file.
    """
    if not os.path.exists(filepath):
        return False, f"File does not exist: {filepath}"

    if os.path.getsize(filepath) == 0:
        return False, f"File is empty: {filepath}"

    return True, "File exists and has content"


def validate_file_format(filepath, allowed_formats=None):
    """
    Check that the file extension is supported by the intake workflow.

    Input: A file path string and a list of allowed extensions.
    Output: A tuple of (bool, message).
    Assumptions: Supported formats are csv, json, and xlsx.
    """
    if allowed_formats is None:
        allowed_formats = ["csv", "json", "xlsx"]

    extension = Path(filepath).suffix.lower().lstrip(".")
    if extension not in allowed_formats:
        return False, f"Unsupported format: {extension}. Allowed: {allowed_formats}"

    return True, f"Format valid: {extension}"


def validate_schema(df, expected_columns):
    """
    Validate that a DataFrame contains the expected columns and no unexpected ones.

    Input: A Pandas DataFrame and a list of expected column names.
    Output: A tuple of (bool, message).
    Assumptions: The expected schema is defined before validation begins.
    """
    missing = set(expected_columns) - set(df.columns)
    extra = set(df.columns) - set(expected_columns)

    issues = []
    if missing:
        issues.append(f"Missing columns: {sorted(missing)}")
    if extra:
        issues.append(f"Unexpected columns: {sorted(extra)}")

    if not issues:
        return True, f"Schema valid: {len(df.columns)} columns present"

    return False, " | ".join(issues)


def detect_encoding(filepath):
    """
    Detect the character encoding of a file using chardet.

    Input: A file path string.
    Output: A tuple of (encoding, message).
    Assumptions: The file can be opened in binary mode for sampling.
    """
    with open(filepath, "rb") as handle:
        result = chardet.detect(handle.read(10000))

    encoding = result.get("encoding", "utf-8")
    confidence = result.get("confidence", 0)
    return encoding, f"Detected: {encoding} (confidence: {confidence:.1%})"


def capture_dataset_stats(filepath, df):
    """
    Log basic dataset dimensions and file size for intake reporting.

    Input: A file path string and a Pandas DataFrame.
    Output: A dictionary containing rows, columns, file size, and byte count.
    Assumptions: The file exists and the DataFrame is loaded successfully.
    """
    file_size_mb = os.path.getsize(filepath) / (1024 * 1024)
    row_count = len(df)
    col_count = len(df.columns)

    return {
        "rows": row_count,
        "columns": col_count,
        "file_size_mb": round(file_size_mb, 2),
        "bytes": os.path.getsize(filepath),
    }


def generate_intake_report(filepath, expected_columns):
    """
    Generate a structured JSON report for dataset intake validation.

    Input: A file path string and the expected column names.
    Output: A dictionary report written to output/intake_report.json.
    Assumptions: The input file is a supported tabular format and can be loaded.
    """
    input_path = Path(filepath)
    display_path = input_path.as_posix() if not input_path.is_absolute() else str(input_path.relative_to(ROOT_DIR))

    report = {
        "timestamp": datetime.now().isoformat(),
        "filepath": display_path,
        "validations": {},
    }

    file_exists, message = validate_file_exists(filepath)
    report["validations"]["file_exists"] = message
    if not file_exists:
        report["statistics"] = {"rows": 0, "columns": 0, "file_size_mb": 0.0, "bytes": 0}
        return report

    format_valid, message = validate_file_format(filepath)
    report["validations"]["format"] = message

    if not format_valid:
        report["statistics"] = {"rows": 0, "columns": 0, "file_size_mb": 0.0, "bytes": os.path.getsize(filepath)}
        return report

    df = pd.read_csv(filepath)

    schema_valid, message = validate_schema(df, expected_columns)
    report["validations"]["schema"] = message

    encoding, message = detect_encoding(filepath)
    report["validations"]["encoding"] = message

    report["statistics"] = capture_dataset_stats(filepath, df)

    output_dir = Path(DEFAULT_OUTPUT).parent
    output_dir.mkdir(parents=True, exist_ok=True)
    with open(DEFAULT_OUTPUT, "w", encoding="utf-8") as handle:
        json.dump(report, handle, indent=2, default=str)

    return report


def main():
    """Run the intake validation workflow and print the generated report."""
    expected_columns = [
        "customer_id",
        "customer_name",
        "transaction_amount",
        "transaction_date",
    ]
    report = generate_intake_report(str(DEFAULT_INPUT), expected_columns)
    print(json.dumps(report, indent=2, default=str))


if __name__ == "__main__":
    main()
