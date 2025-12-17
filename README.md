# Advantage Online Shopping - Cypress E2E Tests

This project contains end-to-end (E2E) tests for the Advantage Online Shopping website using Cypress.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Files](#test-files)
- [Page Object Model](#page-object-model)
- [Configuration](#configuration)
- [Cypress MCP Server](#cypress-mcp-server)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This Cypress test suite validates the functionality of the Advantage Online Shopping website (`https://advantageonlineshopping.com/`). The project uses the Page Object Model (POM) pattern for maintainable and reusable test code.

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🚀 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd advantageonlineshopping
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Cypress binary:**
   ```bash
   npx cypress install
   ```

## 📁 Project Structure

```
advantageonlineshopping/
├── cypress/
│   ├── e2e/                    # Test specifications
│   │   └── home_page.cy.js     # Home page tests
│   ├── fixtures/               # Test data fixtures
│   │   └── example.json
│   ├── screenshots/            # Screenshots from failed tests
│   └── support/                # Support files and utilities
│       ├── commands.js         # Custom Cypress commands
│       ├── e2e.js             # Support file loaded before tests
│       └── pages/              # Page Object Model classes
│           └── BasePage.js     # Base page object with common methods
├── cypress-mcp/                # Cypress MCP server (optional)
├── cypress.config.js           # Cypress configuration
└── package.json                # Project dependencies
```

## 🧪 Running Tests

### Interactive Mode (Recommended for Development)

Open Cypress Test Runner in interactive mode:

```bash
npx cypress open
```

This opens the Cypress GUI where you can:
- Select and run individual test files
- Watch tests execute in real-time
- Debug tests with time-travel debugging
- View screenshots and videos

### Headless Mode (CI/CD)

Run all tests in headless mode:

```bash
npm test
```

Or directly:

```bash
npx cypress run
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/home_page.cy.js"
```

## 📝 Test Files

### `home_page.cy.js`

Comprehensive tests for the home page including:

- ✅ Page loading verification
- ✅ Navigation elements visibility
- ✅ Product categories display
- ✅ User menu functionality
- ✅ Logo/branding elements
- ✅ Shopping cart functionality
- ✅ Footer information
- ✅ Responsive layout testing
- ✅ Navigation links validation

## 🏗️ Page Object Model

The project uses the Page Object Model pattern to encapsulate page-specific logic and selectors.

### BasePage.js

The `BasePage` class provides common methods for interacting with the website:

```javascript
import BasePage from '../support/pages/BasePage';

// Navigate to home page
BasePage.visit();

// Open login popup
BasePage.openLoginPopup();

// Login with credentials
BasePage.login('username', 'password');
```

### Creating New Page Objects

1. Create a new file in `cypress/support/pages/`
2. Export a class with static methods for page interactions
3. Import and use in your test files

Example:
```javascript
// cypress/support/pages/ProductPage.js
class ProductPage {
    static visit(productId) {
        cy.visit(`https://advantageonlineshopping.com/#/product/${productId}`);
    }
    
    static addToCart() {
        cy.get('#productAddToCartButton').click();
    }
}

export default ProductPage;
```

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.js`)

The project is configured with:
- **Project ID**: `ffwo93` (for Cypress Cloud integration)
- **E2E Testing**: Enabled with default settings

### Customizing Configuration

Edit `cypress.config.js` to customize:
- Base URL
- Viewport size
- Timeouts
- Browser preferences
- Environment variables

## 🤖 Cypress MCP Server

This project includes an optional Cypress MCP (Model Context Protocol) server that can automatically generate Page Object classes from any website URL.

### Location
`/cypress-mcp/`

### Setup
See `cypress-mcp/SETUP.md` for detailed installation and configuration instructions.

### Usage
Once configured, you can use the MCP server to generate Page Objects by providing a URL.

## 🐛 Troubleshooting

### Tests Not Running

1. **Ensure Cypress is installed:**
   ```bash
   npx cypress verify
   ```

2. **Reinstall Cypress if needed:**
   ```bash
   npx cypress install
   ```

### Common Issues

- **"Cypress executable not found"**: Run `npx cypress install`
- **Tests timing out**: Increase timeout in `cypress.config.js`
- **Element not found**: Check if selectors match the current website structure

### Debugging

- Use `cy.pause()` in tests to pause execution
- Use `.debug()` on any Cypress command
- Check screenshots in `cypress/screenshots/` after test failures
- Enable video recording in `cypress.config.js` for test runs

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model Pattern](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Login-Custom-Commands-and-Seeding-State)

## 📄 License

ISC

## 👤 Author

Created for testing Advantage Online Shopping website functionality.

---

**Note**: This is a test project for learning and practicing Cypress E2E testing. The website being tested is `https://advantageonlineshopping.com/`.
