SELECT
    DATE_TRUNC('month', transaction_date)::DATE AS month,
    COUNT(DISTINCT customer_id) AS active_users,
    COUNT(DISTINCT customer_id) FILTER (WHERE customer_type = 'Enterprise') AS enterprise_users,
    COUNT(DISTINCT customer_id) FILTER (WHERE customer_type = 'SMB') AS smb_users
FROM transactions
WHERE transaction_date >= DATE_TRUNC('month', NOW()) - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', transaction_date)
ORDER BY month DESC;
