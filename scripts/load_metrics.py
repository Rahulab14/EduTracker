from pathlib import Path

import pandas as pd

ROOT_DIR = Path(__file__).resolve().parents[1]
QUERY_DIR = ROOT_DIR / "queries"


def load_query(query_name: str) -> str:
    """Load SQL query text from a shared query file."""
    query_path = QUERY_DIR / f"{query_name}.sql"
    if not query_path.exists():
        raise FileNotFoundError(f"Query file not found: {query_path}")

    return query_path.read_text(encoding="utf-8")


def execute_query(engine, query_name: str) -> pd.DataFrame:
    """Execute a named SQL query and return the results as a DataFrame."""
    query_text = load_query(query_name)
    return pd.read_sql(query_text, engine)


def validate_metrics(mau_df: pd.DataFrame, revenue_df: pd.DataFrame, funnel_df: pd.DataFrame) -> bool:
    """Validate the loaded metric results for nulls, ranges, and logical consistency."""
    assert mau_df.isnull().sum().sum() == 0, "MAU has nulls"
    assert revenue_df.isnull().sum().sum() == 0, "Revenue has nulls"
    assert funnel_df.isnull().sum().sum() == 0, "Funnel has nulls"

    assert (revenue_df["monthly_revenue"] > 0).all(), "Revenue <= 0"
    assert (funnel_df["conversion_pct"] >= 0).all() and (funnel_df["conversion_pct"] <= 100).all(), "Conversion out of range"

    assert (revenue_df["order_count"] > 0).all(), "Zero orders present"
    assert (revenue_df["unique_customers"] > 0).all(), "Zero unique customers present"

    print("✓ All metrics validated")
    return True


if __name__ == "__main__":
    from sqlalchemy import create_engine

    # Example engine URL; replace with your real database connection string.
    engine = create_engine("postgresql://user:password@localhost:5432/dbname")

    mau = execute_query(engine, "monthly_active_users")
    revenue = execute_query(engine, "revenue_by_segment")
    funnel = execute_query(engine, "conversion_funnel")

    print("Monthly Active Users:")
    print(mau)
    print("\nRevenue by Segment:")
    print(revenue)
    print("\nConversion Funnel:")
    print(funnel)

    validate_metrics(mau, revenue, funnel)
