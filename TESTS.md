# TESTS.md

## Automated Tests Overview
[cite_start]I have implemented **5 automated tests**  covering the core logic of the `audit-engine.ts`. These tests ensure that the tool provides defensible and accurate financial advice.

### Test Coverage:
1. **Cursor Tier Optimization:** Verifies that a team of <3 is recommended to switch from Business ($40) to Pro ($20).
2. **ChatGPT Enterprise Check:** Ensures teams with <20 seats are prompted to use the Team plan to save costs.
3. **Claude Savings Logic:** Validates the calculation for teams switching to the Team tier.
4. **Annual Savings Accuracy:** Verifies that `annualSavings` is exactly `monthlySavings * 12`.
5. **Zero/Invalid Input Handling:** Ensures the engine doesn't crash or return negative savings with 0 seats.

## How to Run Tests
1. Install dependencies: `npm install`
2. Run the test suite: `npm test`