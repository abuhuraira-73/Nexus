# Contributing to Nexus

We welcome contributions to Nexus! Here's how you can help.

## Code of Conduct
Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

## How Can I Contribute?

**Note from the Founder:** As the solo developer of Nexus, I deeply appreciate any contributions. Your help is invaluable!

### Reporting Bugs
- Ensure the bug hasn't already been reported.
- Open a new issue on GitHub, providing a clear and concise description of the problem.
- Include steps to reproduce the bug, expected behavior, and actual behavior.
- Provide screenshots or error messages if applicable.

### Suggesting Enhancements
- Open a new issue on GitHub.
- Clearly describe the enhancement and its benefits.
- Provide mockups or examples if possible.

### Code Contributions
1.  **Fork the repository.**
2.  **Clone your forked repository** to your local machine.
    ```bash
    git clone https://github.com/your-username/Nexus.git
    cd Nexus
    ```
3.  **Install dependencies** for both client and server:
    ```bash
    cd client && npm install && cd ..
    cd server && npm install && cd ..
    ```
4.  **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
5.  **Make your changes.**
    - Adhere to the existing code style and conventions.
    - Write clear, concise, and well-documented code.
    - Add tests for new features or bug fixes.
6.  **Run tests and linting:**
    ```bash
    # Example commands (adjust based on actual project setup)
    cd client && npm test && npm run lint
    cd server && npm test && npm run lint
    ```
7.  **Commit your changes:**
    - Write a clear and descriptive commit message.
    - Follow conventional commits if applicable (e.g., `feat: add new feature`, `fix: resolve bug`).
    ```bash
    git commit -m "feat: Add new awesome feature"
    ```
8.  **Push your branch** to your forked repository:
    ```bash
    git push origin feature/your-feature-name
    ```
9.  **Open a Pull Request (PR):**
    - Go to the original Nexus repository on GitHub.
    - You should see a prompt to open a PR from your branch.
    - Provide a clear title and description for your PR.
    - Reference any related issues.

## Development Setup
- **Frontend:** `cd client && npm run dev`
- **Backend:** `cd server && npm start` (or `node index.js`)
- Ensure `.env` files are configured as per `README.md`.

Thank you for contributing to Nexus!
