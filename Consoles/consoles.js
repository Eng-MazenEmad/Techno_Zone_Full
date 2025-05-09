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
    updateNotificationCircle(); //
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

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const offerCard = event.target.closest('.offer-wrapper');
        const offerName = offerCard.querySelector('h3').textContent;
        const offerPrice = offerCard.querySelector('.price').textContent;
        const offerImage = offerCard.querySelector('.offer-image').src;
        const offeritemCountElement = offerCard.querySelector('.item-count');
        const offeritemCount = parseInt(offeritemCountElement.textContent);
        const existingCartItem = Array.from(cartItemsContainer.children).find((item) => {
            return item.querySelector('h4').textContent === offerName;
        });

        if (existingCartItem) {
            const existingItemCountElement = existingCartItem.querySelector('.item-count');
            const existingItemCount = parseInt(existingItemCountElement.textContent);
            existingItemCountElement.textContent = existingItemCount + offeritemCount;
        } else {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${offerImage}" alt="${offerName}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${offerName}</h4>
                    <div class="price-controls">
                        <p>${offerPrice}</p>
                        <div class="cart-item-controls">
                            <button class="btn decrement">-</button>
                            <span class="item-count">${offeritemCount}</span>
                            <button class="btn increment">+</button>
                            <button class="btn remove-item">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        }

        showNotification(`${offeritemCount} of ${offerName} added to cart`);
        updateNotificationCircle();
        offeritemCountElement.textContent = 1;
    });
});

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.playstations-wrapper');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.product-image').src;
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
    });
});

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.nintendo-switch-wrapper');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.product-image').src;
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
    });
});

addToCartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.Xbox-wrapper');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.product-image').src;
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
    });
});

cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('increment')) {
        const itemCountElement = event.target.previousElementSibling;
        let itemCount = parseInt(itemCountElement.textContent);
        itemCount++;
        itemCountElement.textContent = itemCount;
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
            updateNotificationCircle();
        }
    }

    if (event.target.classList.contains('remove-item')) {
        const cartItem = event.target.closest('.cart-item');
        cartItem.remove();
        updateNotificationCircle();
    }
});


const applyFiltersButton = document.querySelector('.apply-filters');
const categoryCheckboxes = document.querySelectorAll('.filter-item input[type="checkbox"]');
const priceFromInput = document.getElementById('price-from');
const priceToInput = document.getElementById('price-to');
const productCards = document.querySelectorAll('.product-card');

applyFiltersButton.addEventListener('click', () => {
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const priceFrom = parseFloat(priceFromInput.value) || 0;
    const priceTo = parseFloat(priceToInput.value) || Infinity;

    productCards.forEach(card => {
        const productCategory = card.querySelector('h3').textContent.toLowerCase();
        const productPrice = parseFloat(card.querySelector('.price').textContent.replace('EGP', '').trim());

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(category => productCategory.includes(category.toLowerCase()));
        const matchesPrice = productPrice >= priceFrom && productPrice <= priceTo;

        if (matchesCategory && matchesPrice) {
            card.parentElement.style.display = 'block';
        } else {
            card.parentElement.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
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
