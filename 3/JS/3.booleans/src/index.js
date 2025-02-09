// 1. Password Authentication
// Why store passwords in a hashed format?
// Hashing makes it computationally infeasible to retrieve the original password even if the database is compromised.
// Even if two users have the same password, hashing with a unique salt prevents attackers from guessing them easily.
// It mitigates rainbow table attacks (precomputed hash attacks).
// 2. Multi-Factor Authentication (MFA)
// How does MFA enhance security?
// It requires something the user knows (password) and something the user has (MFA code).
// Prevents attacks like phishing, credential stuffing, and brute force attacks.
// Even if a hacker steals a password, they still need access to the MFA code.
// 3. Balance Verification
// Why check the balance before withdrawal?
// Prevents overdrawing the account, which could lead to negative balances.
// Avoids bounced transactions in real-world banking, which can incur fees.
// Protects against double spending or system inconsistencies.
// 4. Daily Transaction Limit
// Why have a withdrawal limit?
// Helps prevent fraudulent large withdrawals if an account is compromised.
// Protects against accidental large withdrawals.
// Enables banks to track and detect anomalies in user spending behavior.
// 5. Extra Feature: Fraud Detection
// How would you implement fraud detection?
// Track abnormal withdrawal patterns (e.g., if the user never withdraws large sums but suddenly does).
// Monitor location and device fingerprints (flag withdrawals from unusual locations).
// Analyze withdrawal frequency (if a user makes too many transactions within minutes, it may be fraud).
// AI-powered risk scoring (use machine learning models to detect anomalies).