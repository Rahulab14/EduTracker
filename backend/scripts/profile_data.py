import os
import json
from pathlib import Path
import pandas as pd
import numpy as np


def profile_nulls_and_duplicates(df):
    """
    Compute null percentage and duplicate counts per column.
    
    Returns: Dictionary with null analysis by column
    """
    profile = {
        'null_counts': {},
        'null_percentages': {},
        'exact_duplicate_count': 0
    }
    
    for col in df.columns:
        null_count = int(df[col].isna().sum())
        null_pct = (null_count / len(df)) * 100 if len(df) > 0 else 0.0
        profile['null_counts'][col] = null_count
        profile['null_percentages'][col] = round(null_pct, 2)
    
    dup_count = int(df.duplicated().sum())
    profile['exact_duplicate_count'] = dup_count
    profile['duplicate_percentage'] = round((dup_count / len(df)) * 100, 2) if len(df) > 0 else 0.0
    
    return profile


def profile_numerical_columns(df):
    """
    Summarise numerical columns with statistical measures.
    
    Returns: DataFrame with min, max, mean, median, std
    """
    numerical_cols = df.select_dtypes(include=[np.number]).columns
    
    stats = {}
    for col in numerical_cols:
        col_data = df[col].dropna()
        stats[col] = {
            'min': round(float(df[col].min()), 2) if not df[col].isnull().all() else None,
            'max': round(float(df[col].max()), 2) if not df[col].isnull().all() else None,
            'mean': round(float(df[col].mean()), 2) if not df[col].isnull().all() else None,
            'median': round(float(df[col].median()), 2) if not df[col].isnull().all() else None,
            'std': round(float(df[col].std()), 2) if len(col_data) > 1 else 0.0,
            'null_count': int(df[col].isnull().sum())
        }
    
    return pd.DataFrame(stats).T


def profile_categorical_columns(df, top_n=5):
    """
    Summarise categorical columns with value distributions.
    
    Returns: Dictionary with unique counts and top values
    """
    categorical_cols = df.select_dtypes(include=['object', 'string', 'category']).columns
    
    profile = {}
    for col in categorical_cols:
        profile[col] = {
            'unique_count': int(df[col].nunique()),
            'top_values': {str(k): int(v) for k, v in df[col].value_counts().head(top_n).to_dict().items()},
            'null_count': int(df[col].isnull().sum())
        }
    
    return profile


def identify_quality_issues(df, null_threshold=30, duplicate_threshold=5):
    """
    Identify data quality problems based on thresholds.
    
    Returns: List of issues found with severity and recommendations
    """
    issues = []
    
    # Check nulls
    null_pcts = (df.isnull().sum() / len(df)) * 100 if len(df) > 0 else 0
    for col, pct in null_pcts.items():
        if pct > null_threshold:
            issues.append({
                'type': 'High nulls',
                'column': str(col),
                'severity': 'HIGH',
                'value': f"{pct:.1f}% missing",
                'recommendation': 'Consider imputation or column exclusion'
            })
    
    # Check duplicates
    dup_count = df.duplicated().sum()
    dup_pct = (dup_count / len(df)) * 100 if len(df) > 0 else 0
    if dup_pct > duplicate_threshold:
        issues.append({
            'type': 'High duplicates',
            'column': 'Full row',
            'severity': 'HIGH',
            'value': f"{dup_pct:.1f}% duplicated",
            'recommendation': 'Deduplication required before analysis'
        })
    
    # Check for invalid ranges
    for col in df.select_dtypes(include=[np.number]).columns:
        if (df[col] < 0).any() and 'amount' in str(col).lower():
            issues.append({
                'type': 'Invalid range',
                'column': str(col),
                'severity': 'MEDIUM',
                'value': f"Contains negative values",
                'recommendation': 'Investigate negative entries'
            })
    
    return issues


def calculate_quality_score(df, issues):
    """
    Calculate an overall Data Quality Score (0 to 100%).
    Deducts points based on null count ratio and severity of issues.
    """
    total_cells = df.size if df.size > 0 else 1
    null_cells = int(df.isnull().sum().sum())
    completeness = max(0, 100 - (null_cells / total_cells) * 100)

    deductions = 0
    for issue in issues:
        if issue['severity'] == 'HIGH':
            deductions += 15
        elif issue['severity'] == 'MEDIUM':
            deductions += 10
        else:
            deductions += 5

    score = max(0, min(100, round(completeness - deductions, 2)))
    return score


def generate_profile_report(df, filepath):
    """
    Generate complete data quality report and save to JSON.
    
    Returns: Complete profile report dictionary
    """
    num_df = profile_numerical_columns(df)
    num_stats_dict = num_df.to_dict() if not num_df.empty else {}
    quality_issues = identify_quality_issues(df)
    quality_score = calculate_quality_score(df, quality_issues)

    report = {
        'dataset': str(filepath),
        'record_count': len(df),
        'column_count': len(df.columns),
        'quality_score': quality_score,
        'nulls_and_duplicates': profile_nulls_and_duplicates(df),
        'numerical_stats': num_stats_dict,
        'categorical_stats': profile_categorical_columns(df),
        'quality_issues': quality_issues
    }
    
    # Save report
    out_dir = Path('output')
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / 'profile_report.json'

    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, default=str)

    # Also save to script-relative path if script is run from root
    root_out_file = Path(__file__).resolve().parent.parent / 'output' / 'profile_report.json'
    root_out_file.parent.mkdir(parents=True, exist_ok=True)
    with open(root_out_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, default=str)
    
    # Print summary
    print(f"\n{'='*60}")
    print(f"DATA QUALITY PROFILE: {filepath}")
    print(f"{'='*60}")
    print(f"Records: {report['record_count']}")
    print(f"Columns: {report['column_count']}")
    print(f"Overall Quality Score: {report['quality_score']}%")
    print(f"\nQuality Issues Found: {len(report['quality_issues'])}")
    for issue in report['quality_issues']:
        print(f"  [{issue['severity']}] {issue['type']} in {issue['column']}")
        print(f"    Value: {issue['value']} -> {issue['recommendation']}")
    print(f"{'='*60}\n")
    
    return report


def main():
    # Resolve dataset path
    script_dir = Path(__file__).resolve().parent
    base_dir = script_dir.parent
    data_path = base_dir / 'data' / 'raw' / 'quality_test.csv'

    if not data_path.exists():
        data_path = Path('data/raw/quality_test.csv')

    print(f"Loading data for profiling from {data_path}...")
    df = pd.read_csv(data_path)
    report = generate_profile_report(df, str(data_path))
    print(f"[OK] Profile report saved to output/profile_report.json")


if __name__ == '__main__':
    main()
