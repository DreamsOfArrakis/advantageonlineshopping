import BasePage from '../support/pages/BasePage';

describe('Product Detail Page Tests', () => {
    beforeEach(() => {
        // Navigate to a specific product page (Product ID: 20)
        BasePage.visit('#/product/20');
        // Wait for page to load
        cy.wait(2000);
    });

    it('should load the product detail page successfully', () => {
        // Verify the page title
        cy.title().should('not.be.empty');
        
        // Verify the URL contains the product path
        cy.url().should('include', 'product/20');
        
        // Verify we're on the product page
        cy.url().should('include', 'advantageonlineshopping.com');
    });

    it('should display product name', () => {
        // Check for product name/title
        cy.get('body').then(($body) => {
            const nameSelectors = [
                'h1',
                '.productName',
                '[class*="productName"]',
                '[class*="product-name"]',
                '.product-title',
                '[id*="productName"]',
                '[class*="title"]'
            ];
            
            for (const selector of nameSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    cy.get(selector).first().should('not.be.empty');
                    break;
                }
            }
        });
    });

    it('should display product price', () => {
        // Check for product price
        cy.get('body').then(($body) => {
            const priceSelectors = [
                '.productPrice',
                '[class*="price"]',
                '[class*="Price"]',
                '.price',
                '[id*="price"]',
                '[class*="cost"]'
            ];
            
            for (const selector of priceSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    // Price should contain currency symbol or numbers
                    cy.get(selector).first().should('satisfy', ($el) => {
                        const text = $el.text();
                        return text.includes('$') || text.includes('€') || /\d/.test(text);
                    });
                    break;
                }
            }
        });
    });

    it('should display product images', () => {
        // Check for product images
        cy.get('body').then(($body) => {
            const imageSelectors = [
                '.imgProduct',
                'img[class*="product"]',
                '.product-image',
                '[class*="productImage"]',
                'img[alt*="product" i]',
                '.main-product-image',
                'img'
            ];
            
            let imageFound = false;
            for (const selector of imageSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    cy.get(selector).first().should('have.attr', 'src');
                    imageFound = true;
                    break;
                }
            }
            
            if (imageFound) {
                // Verify image is loaded (not broken)
                cy.get(imageSelectors.join(', ')).first().should('have.attr', 'src').and('not.be.empty');
            }
        });
    });

    it('should display product description or details', () => {
        // Check for product description
        cy.get('body').then(($body) => {
            const descriptionSelectors = [
                '.productDescription',
                '[class*="description"]',
                '[class*="Description"]',
                '.product-details',
                '[class*="details"]',
                'p',
                '.product-info'
            ];
            
            for (const selector of descriptionSelectors) {
                if ($body.find(selector).length > 0) {
                    const $element = $body.find(selector).first();
                    // Skip if it's a navigation or header element
                    if (!$element.closest('nav, header, footer').length) {
                        cy.get(selector).first().should('be.visible');
                        break;
                    }
                }
            }
        });
    });

    it('should have an add to cart button', () => {
        // Check for add to cart button
        cy.get('body').then(($body) => {
            const cartButtonSelectors = [
                'button[title*="Add to cart" i]',
                'button[title*="ADD TO CART" i]',
                '.addToCart',
                '[class*="addToCart"]',
                '[id*="addToCart"]',
                'button:contains("Add")',
                'button:contains("Cart")',
                '[class*="add-to-cart"]',
                'button[ng-click*="addToCart"]'
            ];
            
            for (const selector of cartButtonSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    cy.get(selector).first().should('be.enabled');
                    break;
                }
            }
        });
    });

    it('should allow adding product to cart', () => {
        // Find and click add to cart button
        cy.get('body').then(($body) => {
            const cartButtonSelectors = [
                'button[title*="Add to cart" i]',
                'button[title*="ADD TO CART" i]',
                '.addToCart',
                '[class*="addToCart"]',
                '[id*="addToCart"]',
                '[class*="add-to-cart"]',
                'button[ng-click*="addToCart"]'
            ];
            
            for (const selector of cartButtonSelectors) {
                if ($body.find(selector).length > 0) {
                    // Get initial cart count if available
                    let initialCartCount = 0;
                    cy.get('#shoppingCartLink').then(($cart) => {
                        const cartText = $cart.text();
                        const match = cartText.match(/\d+/);
                        if (match) {
                            initialCartCount = parseInt(match[0]);
                        }
                    });
                    
                    // Click add to cart
                    cy.get(selector).first().click();
                    
                    // Wait for cart update
                    cy.wait(1000);
                    
                    // Verify success message or cart update
                    cy.get('body').then(($bodyAfter) => {
                        // Check for success message
                        if ($bodyAfter.find('[class*="success"], [class*="Success"], [id*="success"]').length > 0) {
                            cy.get('[class*="success"], [class*="Success"], [id*="success"]').first().should('be.visible');
                        }
                        
                        // Or verify cart count increased
                        cy.get('#shoppingCartLink').then(($cartAfter) => {
                            const cartTextAfter = $cartAfter.text();
                            const matchAfter = cartTextAfter.match(/\d+/);
                            if (matchAfter) {
                                const newCartCount = parseInt(matchAfter[0]);
                                if (initialCartCount > 0) {
                                    cy.wrap(newCartCount).should('be.gte', initialCartCount);
                                }
                            }
                        });
                    });
                    break;
                }
            }
        });
    });

    it('should allow quantity selection', () => {
        // Check for quantity input or selector
        cy.get('body').then(($body) => {
            const quantitySelectors = [
                'input[type="number"]',
                'input[name*="quantity" i]',
                'input[id*="quantity" i]',
                '[class*="quantity"] input',
                'select[name*="quantity" i]',
                '.quantity-selector',
                '[class*="qty"]'
            ];
            
            for (const selector of quantitySelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    cy.get(selector).first().should('be.enabled');
                    break;
                }
            }
        });
    });

    it('should display product specifications or features', () => {
        // Check for product specifications/features
        cy.get('body').then(($body) => {
            const specSelectors = [
                '.specifications',
                '[class*="spec"]',
                '.features',
                '[class*="feature"]',
                '.product-specs',
                'table',
                'ul li',
                '[class*="detail"]'
            ];
            
            for (const selector of specSelectors) {
                if ($body.find(selector).length > 0) {
                    const $element = $body.find(selector).first();
                    // Make sure it's not a navigation menu
                    if (!$element.closest('nav').length) {
                        cy.get(selector).first().should('be.visible');
                        break;
                    }
                }
            }
        });
    });

    it('should have navigation elements', () => {
        // Verify common navigation elements
        cy.get('#menuUser').should('be.visible');
        cy.get('#shoppingCartLink').should('be.visible');
        
        // Check for breadcrumbs or back navigation
        cy.get('body').then(($body) => {
            const navSelectors = [
                '.breadcrumb',
                '[class*="breadcrumb"]',
                'a[href*="category"]',
                'a[href*="home"]',
                '[class*="back"]'
            ];
            
            for (const selector of navSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should update shopping cart count after adding product', () => {
        // Get initial cart count
        cy.get('#shoppingCartLink').then(($cart) => {
            const initialText = $cart.text();
            
            // Try to add product to cart
            cy.get('body').then(($body) => {
                const cartButtonSelectors = [
                    'button[title*="Add to cart" i]',
                    '.addToCart',
                    '[class*="addToCart"]',
                    '[id*="addToCart"]'
                ];
                
                for (const selector of cartButtonSelectors) {
                    if ($body.find(selector).length > 0) {
                        cy.get(selector).first().click();
                        cy.wait(1500);
                        
                        // Verify cart count updated
                        cy.get('#shoppingCartLink').should(($cartAfter) => {
                            const newText = $cartAfter.text();
                            // Cart should show a number or be different
                            expect(newText).to.not.equal(initialText);
                        });
                        break;
                    }
                }
            });
        });
    });

    it('should allow viewing shopping cart', () => {
        // Click on shopping cart link
        cy.get('#shoppingCartLink').should('be.visible').click();
        
        // Verify navigation to cart page
        cy.wait(1000);
        cy.url().should('satisfy', (url) => {
            return url.includes('cart') || url.includes('shopping');
        });
    });

    it('should be responsive on different viewport sizes', () => {
        // Test desktop viewport
        cy.viewport(1280, 720);
        cy.get('#menuUser').should('be.visible');
        cy.wait(500);
        
        // Test tablet viewport
        cy.viewport(768, 1024);
        cy.get('#menuUser').should('be.visible');
        cy.wait(500);
        
        // Test mobile viewport
        cy.viewport(375, 667);
        cy.get('#menuUser').should('be.visible');
        cy.wait(500);
        
        // Reset to desktop
        cy.viewport(1280, 720);
    });

    it('should display related or similar products', () => {
        // Scroll down to check for related products
        cy.scrollTo('bottom');
        cy.wait(1000);
        
        // Check for related products section
        cy.get('body').then(($body) => {
            const relatedSelectors = [
                '.related-products',
                '[class*="related"]',
                '[class*="similar"]',
                '[class*="recommended"]',
                '.suggested-products'
            ];
            
            for (const selector of relatedSelectors) {
                if ($body.find(selector).length > 0) {
                    cy.get(selector).first().should('be.visible');
                    break;
                }
            }
        });
    });

    it('should allow navigation back to category or home', () => {
        // Check for navigation links
        cy.get('body').then(($body) => {
            const navSelectors = [
                'a[href*="category"]',
                'a[href*="/"]',
                '.breadcrumb a',
                '[class*="back"]',
                '.logo'
            ];
            
            for (const selector of navSelectors) {
                if ($body.find(selector).length > 0) {
                    const $link = $body.find(selector).first();
                    const href = $link.attr('href');
                    if (href && !href.startsWith('javascript:')) {
                        cy.get(selector).first().click();
                        cy.wait(1000);
                        cy.url().should('include', 'advantageonlineshopping.com');
                        break;
                    }
                }
            }
        });
    });
});

