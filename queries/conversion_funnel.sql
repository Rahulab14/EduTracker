SELECT
    DATE_TRUNC('day', u.created_at)::DATE AS signup_date,
    COUNT(*) AS signups,
    COUNT(*) FILTER (WHERE u.email_verified_at IS NOT NULL) AS email_verified,
    COUNT(*) FILTER (WHERE u.first_purchase_at IS NOT NULL) AS first_purchase,
    ROUND(100.0 * COUNT(*) FILTER (WHERE u.first_purchase_at IS NOT NULL) / NULLIF(COUNT(*), 0), 1) AS conversion_pct
FROM users u
WHERE u.created_at >= NOW() - INTERVAL '90 days'
GROUP BY DATE_TRUNC('day', u.created_at)
ORDER BY signup_date DESC;
