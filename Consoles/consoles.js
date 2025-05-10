const openCartButton = document.querySelector('.open-cart');
const closeCartButton = document.querySelector('.close-cart');
const sidebarCart = document.querySelector('.sidebar-cart');

openCartButton.addEventListener('click', () => {
    if (sidebarCart.classList.contains('open')) {
        sidebarCart.classList.remove('open');
        openCartButton.style.right = '0';
    } else {
        sidebarCart.classList.add('open');
        openCartButton.style.right = '450px';
    }
});

closeCartButton.addEventListener('click', () => {
    if (sidebarCart.classList.contains('open')) {
        sidebarCart.classList.remove('open');
        openCartButton.style.right = '0';
    }
});

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const notification = document.querySelector('.notification');
const notificationCircle = document.querySelector('.notification-circle');
const clearCartButton = document.querySelector('.clear-cart');

clearCartButton.addEventListener('click', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => item.remove());
    localStorage.removeItem('cart');
    updateNotificationCircle();
    showNotification('Cart has been cleared');
});

const cardButtons = document.querySelectorAll('.card-buttons');

cardButtons.forEach((buttons) => {
    const decrementButton = buttons.querySelector('.decrement');
    const incrementButton = buttons.querySelector('.increment');
    const itemCountElement = buttons.querySelector('.item-count');

    decrementButton.addEventListener('click', () => {
        let itemCount = parseInt(itemCountElement.textContent);
        if (itemCount > 1) {
            itemCount--;
            itemCountElement.textContent = itemCount;
        }
    });
    incrementButton.addEventListener('click', () => {
        let itemCount = parseInt(itemCountElement.textContent);
        itemCount++;
        itemCountElement.textContent = itemCount;
    });
});

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function updateNotificationCircle() {
    const cartItems = document.querySelectorAll('.cart-item');
    const itemCount = cartItems.length;
    const notificationCircle = document.querySelector('.notification-circle');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    notificationCircle.style.display = itemCount > 0 ? 'flex' : 'none';
    notificationCircle.textContent = itemCount > 10 ? '+10' : itemCount;
    emptyCartMessage.style.display = itemCount === 0 ? 'flex' : 'none';
}

function saveCart() {
    const cartItems = [];
    document.querySelectorAll('.cart-item').forEach(item => {
        const productName = item.querySelector('h4').textContent;
        const allProducts = document.querySelectorAll('.offer-wrapper, .playstations-wrapper, .nintendo-switch-wrapper, .Xbox-wrapper');
        let imagePath = item.querySelector('.cart-item-image').src;
        
        for (const product of allProducts) {
            if (product.querySelector('h3').textContent === productName) {
                const imgElement = product.querySelector('.offer-image, .product-image');
                if (imgElement) {
                    imagePath = imgElement.src;
                    break;
                }
            }
        }
        
        cartItems.push({
            name: productName,
            price: item.querySelector('.price-controls p').textContent,
            quantity: parseInt(item.querySelector('.item-count').textContent),
            image: imagePath
        });
    });
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    
    cartItemsContainer.innerHTML = '';
    
    savedCart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        let imageSelector;
        if (item.name.includes('PlayStation') || item.name.includes('PS')) {
            imageSelector = '.playstations-wrapper .product-image';
        } else if (item.name.includes('Xbox')) {
            imageSelector = '.Xbox-wrapper .product-image';
        } else if (item.name.includes('Switch')) {
            imageSelector = '.nintendo-switch-wrapper .product-image';
        } else {
            imageSelector = '.offer-wrapper .offer-image';
        }
        
        const allProducts = document.querySelectorAll('.offer-wrapper, .playstations-wrapper, .nintendo-switch-wrapper, .Xbox-wrapper');
        let imagePath = item.image;
        
        for (const product of allProducts) {
            if (product.querySelector('h3').textContent === item.name) {
                const imgElement = product.querySelector('.offer-image, .product-image');
                if (imgElement) {
                    imagePath = imgElement.src;
                    break;
                }
            }
        }
        
        cartItem.innerHTML = `
            <img src="${imagePath}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="price-controls">
                    <p>${item.price}</p>
                    <div class="cart-item-controls">
                        <button class="btn decrement">-</button>
                        <span class="item-count">${item.quantity}</span>
                        <button class="btn increment">+</button>
                        <button class="btn remove-item">Remove</button>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateNotificationCircle();
}

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.offer-wrapper, .playstations-wrapper, .nintendo-switch-wrapper, .Xbox-wrapper');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.offer-image, .product-image').src;
        const itemCountElement = productCard.querySelector('.item-count');
        const itemCount = parseInt(itemCountElement.textContent);
        
        const existingCartItem = Array.from(cartItemsContainer.children).find((item) => {
            return item.querySelector('h4').textContent === productName;
        });

        if (existingCartItem) {
            const existingItemCountElement = existingCartItem.querySelector('.item-count');
            const existingItemCount = parseInt(existingItemCountElement.textContent);
            existingItemCountElement.textContent = existingItemCount + itemCount;
        } else {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${productImage}" alt="${productName}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${productName}</h4>
                    <div class="price-controls">
                        <p>${productPrice}</p>
                        <div class="cart-item-controls">
                            <button class="btn decrement">-</button>
                            <span class="item-count">${itemCount}</span>
                            <button class="btn increment">+</button>
                            <button class="btn remove-item">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        showNotification(`${itemCount} of ${productName} added to cart`);
        updateNotificationCircle();
        itemCountElement.textContent = 1;
        saveCart();
    });
});

cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('increment')) {
        const itemCountElement = event.target.previousElementSibling;
        let itemCount = parseInt(itemCountElement.textContent);
        itemCount++;
        itemCountElement.textContent = itemCount;
        saveCart();
    }

    if (event.target.classList.contains('decrement')) {
        const itemCountElement = event.target.nextElementSibling;
        let itemCount = parseInt(itemCountElement.textContent);
        if (itemCount > 1) {
            itemCount--;
            itemCountElement.textContent = itemCount;
        } else {
            const cartItem = event.target.closest('.cart-item');
            cartItem.remove();
        }
        saveCart();
        updateNotificationCircle();
    }

    if (event.target.classList.contains('remove-item')) {
        const cartItem = event.target.closest('.cart-item');
        cartItem.remove();
        saveCart();
        updateNotificationCircle();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    const toggleButton = document.querySelector('.toggle-filters');
    const sidebar = document.querySelector('.sidebar');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');

        if (sidebar.classList.contains('active')) {
            toggleButton.style.left = '310px';
        } else {
            toggleButton.style.left = '10px';
        }
    });
});

//-------------------Shopping Cart JS-------------------------
document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");

    // SUM of Quantities in Cart {to make multiple product increase its count and not added again}
    const updateCartCount = () => {
        const totalItems = cartItems.reduce((total, item) => {
            return total + (item.quantity || 1); // Handles missing quantity
        }, 0);
        if (cartCountElement) {
            if (totalItems > 0) {
                cartCountElement.textContent = totalItems;
                cartCountElement.style.display = "inline";
            } else {
                cartCountElement.style.display = "none";
            }
        }
    };

    // Initialize Cart Count
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            // Find the closest product wrapper (works for all sections)
            const card = button.closest(".offer-wrapper, .playstations-wrapper, .Xbox-wrapper, .nintendo-switch-wrapper");
            const name = card.querySelector(".Name").innerText.trim();
            const price = card.querySelector(".price").innerText.trim();

            // Check if product exists
            const existingIndex = cartItems.findIndex(item => item.name === name);
            if (existingIndex !== -1) {
                // Product exists → increment quantity
                cartItems[existingIndex].quantity = (cartItems[existingIndex].quantity || 1) + 1;
            } else {
                // New product → add with quantity 1
                cartItems.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartCount(); // updates count
        });
    });
});
