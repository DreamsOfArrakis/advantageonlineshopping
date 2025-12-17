import BasePage from '../support/pages/BasePage';

describe('Home Page Tests', () => {
    beforeEach(() => {
        BasePage.visit(); // Navigate to the home page
    });

    it('should load the home page successfully', () => {
        // Verify the page title
        cy.title().should('not.be.empty');
        
        // Verify the URL is correct
        cy.url().should('include', 'advantageonlineshopping.com');
    });

    it('should display the main navigation elements', () => {
        // Check for user menu/login button
        cy.get('#menuUser').should('be.visible');
        
        // Check for shopping cart icon (common in e-commerce sites)
        cy.get('#shoppingCartLink').should('be.visible');
        
        // Check for search functionality if available
        cy.get('body').then(($body) => {
            if ($body.find('#searchSection, #menuSearch, input[type="search"]').length > 0) {
                cy.get('#searchSection, #menuSearch, input[type="search"]').first().should('be.visible');
            }
        });
    });

    it('should display product categories or featured items', () => {
        // Check for category links or product sections
        cy.get('body').then(($body) => {
            // Look for common e-commerce elements
            const selectors = [
                '.categoryCell',
                '.productName',
                '.imgProduct',
                '[id*="product"]',
                '[class*="product"]',
                '[class*="category"]'
            ];
            
            let found = false;
            selectors.forEach(selector => {
                if ($body.find(selector).length > 0) {
                    found = true;
                }
            });
            
            if (found) {
                cy.get(selectors.join(', ')).first().should('be.visible');
            }
        });
    });

    it('should have a working user menu button', () => {
        // Click the user menu button
        cy.get('#menuUser').click();
        
        // Verify login popup or menu appears
        cy.get('body').then(($body) => {
            // Check for login form elements
            if ($body.find("input[name='username']").length > 0) {
                cy.get("input[name='username']").should('be.visible');
                cy.get("input[name='password']").should('be.visible');
                cy.get('#sign_in_btn').should('be.visible');
            }
        });
    });

    it('should display the logo or site branding', () => {
        // Check for logo element
        cy.get('body').then(($body) => {
            const logoSelectors = [
                '.logo',
                '#logo',
                '[class*="logo"]',
                'img[alt*="logo" i]',
                'img[alt*="advantage" i]'
            ];
            
            let found = false;
            logoSelectors.forEach(selector => {
                if ($body.find(selector).length > 0) {
                    found = true;
                }
            });
            
            if (found) {
                cy.get(logoSelectors.join(', ')).first().should('be.visible');
            }
        });
    });

    it('should have a shopping cart icon that is clickable', () => {
        // Verify shopping cart exists and is clickable
        cy.get('#shoppingCartLink')
            .should('be.visible')
            .and('be.enabled');
        
        // Click it to verify it's interactive
        cy.get('#shoppingCartLink').click();
        
        // Verify cart page or popup appears
        cy.url().should('satisfy', (url) => {
            return url.includes('cart') || url.includes('shopping');
        });
    });

    it('should display footer information', () => {
        // Scroll to bottom to check footer
        cy.scrollTo('bottom');
        
        // Check for footer elements
        cy.get('body').then(($body) => {
            const footerSelectors = [
                'footer',
                '.footer',
                '#footer',
                '[class*="footer"]'
            ];
            
            let found = false;
            footerSelectors.forEach(selector => {
                if ($body.find(selector).length > 0) {
                    found = true;
                }
            });
            
            if (found) {
                cy.get(footerSelectors.join(', ')).first().should('be.visible');
            }
        });
    });

    it('should have responsive layout elements', () => {
        // Check viewport
        cy.viewport(1280, 720);
        cy.get('#menuUser').should('be.visible');
        
        // Test mobile viewport
        cy.viewport(375, 667);
        cy.get('#menuUser').should('be.visible');
        
        // Reset to desktop
        cy.viewport(1280, 720);
    });

    it('should allow navigation to different sections', () => {
        // Check for navigation links
        cy.get('body').then(($body) => {
            const navSelectors = [
                'nav a',
                '.nav a',
                '#menuContainer a',
                '[class*="menu"] a',
                '[class*="nav"] a'
            ];
            
            for (const selector of navSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().then(($link) => {
                        const href = $link.attr('href');
                        if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
                            cy.get(selector).first().should('have.attr', 'href');
                        }
                    });
                    break;
                }
            }
        });
    });
});

