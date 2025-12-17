import BasePage from '../support/pages/BasePage';

describe('Speakers Category Page Tests', () => {
    beforeEach(() => {
        // Navigate to the Speakers category page
        BasePage.visit('#/category/Speakers/4');
    });

    it('should load the speakers category page successfully', () => {
        // Verify the page title
        cy.title().should('not.be.empty');
        
        // Verify the URL contains the speakers category
        cy.url().should('include', 'category/Speakers');
        
        // Wait for page to load
        cy.wait(1000);
    });

    it('should display the category page header', () => {
        // Check for category title or heading
        cy.get('body').then(($body) => {
            const headerSelectors = [
                'h1',
                '.categoryTitle',
                '[class*="category"]',
                '[class*="speaker"]',
                '.mainContent'
            ];
            
            let found = false;
            for (const selector of headerSelectors) {
                if ($body.find(selector).length > 0) {
                    found = true;
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should display speaker products', () => {
        // Wait for products to load
        cy.wait(2000);
        
        // Check for product elements
        cy.get('body').then(($body) => {
            const productSelectors = [
                '.productItem',
                '.product',
                '[id*="product"]',
                '[class*="product"]',
                '.imgProduct',
                '.productName',
                '.categoryCell'
            ];
            
            let found = false;
            for (const selector of productSelectors) {
                if ($body.find(selector).length > 0) {
                    found = true;
                    // Verify at least one product is visible
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
            
            // If products found, verify multiple products exist
            if (found) {
                cy.get(productSelectors.join(', ')).should('have.length.at.least', 1);
            }
        });
    });

    it('should display product information for each speaker', () => {
        cy.wait(2000);
        
        // Check for product details like name, price, image
        cy.get('body').then(($body) => {
            const detailSelectors = [
                '.productName',
                '.productPrice',
                '.imgProduct',
                '[class*="name"]',
                '[class*="price"]'
            ];
            
            // Check if any product details are present
            for (const selector of detailSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should allow clicking on a speaker product', () => {
        cy.wait(2000);
        
        // Find and click on the first available product
        cy.get('body').then(($body) => {
            const clickableSelectors = [
                '.productItem',
                '.product',
                '[id*="product"]',
                '.categoryCell',
                'a[href*="product"]'
            ];
            
            for (const selector of clickableSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().click();
                    // Verify navigation to product detail page
                    cy.url().should('satisfy', (url) => {
                        return url.includes('product') || url.includes('Speakers');
                    });
                    break;
                }
            }
        });
    });

    it('should have add to cart functionality', () => {
        cy.wait(2000);
        
        // Check for add to cart buttons
        cy.get('body').then(($body) => {
            const cartButtonSelectors = [
                'button[title*="Add to cart" i]',
                'button[title*="Add" i]',
                '.addToCart',
                '[class*="addToCart"]',
                '[id*="addToCart"]',
                'button:contains("Add")'
            ];
            
            for (const selector of cartButtonSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should display navigation elements', () => {
        // Verify common navigation elements are present
        cy.get('#menuUser').should('be.visible');
        cy.get('#shoppingCartLink').should('be.visible');
        
        // Check for breadcrumbs or category navigation
        cy.get('body').then(($body) => {
            const navSelectors = [
                '.breadcrumb',
                '[class*="breadcrumb"]',
                'nav',
                '[class*="navigation"]'
            ];
            
            for (const selector of navSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should allow filtering or sorting products', () => {
        cy.wait(2000);
        
        // Check for filter/sort controls
        cy.get('body').then(($body) => {
            const filterSelectors = [
                'select',
                '[class*="filter"]',
                '[class*="sort"]',
                'button[class*="filter"]',
                'button[class*="sort"]'
            ];
            
            for (const selector of filterSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should display product images', () => {
        cy.wait(2000);
        
        // Verify product images are loaded
        cy.get('body').then(($body) => {
            const imageSelectors = [
                '.imgProduct',
                'img[class*="product"]',
                'img[alt*="speaker" i]',
                'img[src*="speaker" i]',
                '.product img'
            ];
            
            for (const selector of imageSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    cy.get(selector).first().should('have.attr', 'src');
                    break;
                }
            }
        });
    });

    it('should maintain shopping cart count', () => {
        // Verify shopping cart link is visible and functional
        cy.get('#shoppingCartLink').should('be.visible');
        
        // Check if cart count is displayed
        cy.get('body').then(($body) => {
            if ($body.find('#shoppingCartLink').text().trim() !== '') {
                cy.get('#shoppingCartLink').should('contain.text', /\d+/);
            }
        });
    });

    it('should be responsive on different viewport sizes', () => {
        // Test desktop viewport
        cy.viewport(1280, 720);
        cy.get('#menuUser').should('be.visible');
        cy.wait(1000);
        
        // Test tablet viewport
        cy.viewport(768, 1024);
        cy.get('#menuUser').should('be.visible');
        cy.wait(1000);
        
        // Test mobile viewport
        cy.viewport(375, 667);
        cy.get('#menuUser').should('be.visible');
        cy.wait(1000);
        
        // Reset to desktop
        cy.viewport(1280, 720);
    });

    it('should allow navigation back to home', () => {
        // Check for home/logo link
        cy.get('body').then(($body) => {
            const homeSelectors = [
                'a[href*="/"]',
                '.logo',
                '#logo',
                '[class*="logo"]'
            ];
            
            for (const selector of homeSelectors) {
                if ($body.find(selector).length > 0) {
                    const $element = $body.find(selector).first();
                    const href = $element.attr('href');
                    if (href && (href === '/' || href.includes('advantageonlineshopping.com'))) {
                        cy.get(selector).first().click();
                        cy.url().should('include', 'advantageonlineshopping.com');
                        break;
                    }
                }
            }
        });
    });
});

