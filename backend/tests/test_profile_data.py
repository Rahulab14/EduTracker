import unittest
import pandas as pd
import numpy as np
import tempfile
from pathlib import Path
import json

from scripts.profile_data import (
    profile_nulls_and_duplicates,
    profile_numerical_columns,
    profile_categorical_columns,
    identify_quality_issues,
    calculate_quality_score,
    generate_profile_report
)


class TestProfileData(unittest.TestCase):

    def setUp(self):
        data = {
            'customer_id': [1, 2, 3, 4, 5],
            'name': ['Alice', 'Bob', 'Alice', None, 'Diana'],
            'email': ['alice@example.com', None, 'alice@example.com', 'charlie@example.com', None],
            'amount': [100.0, 250.0, 100.0, 500.0, -50.0],
            'status': ['active', 'active', 'active', 'inactive', 'active']
        }
        self.sample_df = pd.DataFrame(data)

    def test_profile_nulls_and_duplicates(self):
        result = profile_nulls_and_duplicates(self.sample_df)
        self.assertIn('null_counts', result)
        self.assertIn('null_percentages', result)
        self.assertEqual(result['null_counts']['email'], 2)
        self.assertEqual(result['null_percentages']['email'], 40.0)
        self.assertEqual(result['exact_duplicate_count'], 0)

    def test_profile_numerical_columns(self):
        num_df = profile_numerical_columns(self.sample_df)
        self.assertIn('customer_id', num_df.index)
        self.assertIn('amount', num_df.index)
        self.assertEqual(num_df.loc['amount', 'min'], -50.0)
        self.assertEqual(num_df.loc['amount', 'max'], 500.0)

    def test_profile_categorical_columns(self):
        cat_summary = profile_categorical_columns(self.sample_df)
        self.assertIn('name', cat_summary)
        self.assertIn('email', cat_summary)
        self.assertEqual(cat_summary['name']['unique_count'], 3)
        self.assertEqual(cat_summary['email']['null_count'], 2)

    def test_identify_quality_issues(self):
        issues = identify_quality_issues(self.sample_df)
        self.assertGreaterEqual(len(issues), 2)
        issue_types = [i['type'] for i in issues]
        self.assertIn('High nulls', issue_types)
        self.assertIn('Invalid range', issue_types)

    def test_calculate_quality_score(self):
        issues = identify_quality_issues(self.sample_df)
        score = calculate_quality_score(self.sample_df, issues)
        self.assertIsInstance(score, float)
        self.assertTrue(0 <= score <= 100)

    def test_generate_profile_report(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            temp_csv = Path(tmpdir) / "test.csv"
            self.sample_df.to_csv(temp_csv, index=False)
            
            report = generate_profile_report(self.sample_df, str(temp_csv))
            self.assertEqual(report['record_count'], 5)
            self.assertEqual(report['column_count'], 5)
            self.assertIn('quality_score', report)
            self.assertGreaterEqual(len(report['quality_issues']), 2)


if __name__ == '__main__':
    unittest.main()
