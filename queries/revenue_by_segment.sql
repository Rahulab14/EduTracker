SELECT
    c.customer_type AS customer_segment,
    DATE_TRUNC('month', t.transaction_date)::DATE AS month,
    COUNT(DISTINCT t.order_id) AS order_count,
    ROUND(SUM(t.amount), 2) AS monthly_revenue,
    ROUND(AVG(t.amount), 2) AS avg_order_value,
    COUNT(DISTINCT t.customer_id) AS unique_customers,
    ROUND(SUM(t.amount) / NULLIF(COUNT(DISTINCT t.customer_id), 0), 2) AS revenue_per_customer
FROM transactions t
JOIN customers c ON t.customer_id = c.customer_id
WHERE t.transaction_date >= DATE_TRUNC('month', NOW()) - INTERVAL '12 months'
GROUP BY c.customer_type, DATE_TRUNC('month', t.transaction_date)
ORDER BY month DESC, monthly_revenue DESC;
