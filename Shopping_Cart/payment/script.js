document.addEventListener("DOMContentLoaded", function () {
  const cartItemsListContainer = document.querySelector(
    ".cart-items-list-container"
  );
  const returnBtn = document.querySelector(".return-btn");
  const removeAllBtn = document.querySelector(".remove-all-btn");
  const payBtn = document.querySelector(".pay-btn");
  const paymentErrorMessage = document.getElementById("payment-error-message");
  // Get references to all payment input fields
  const paymentInputs = {
    name: document.getElementById("b-name"),
    email: document.getElementById("email-ad"),
    phone: document.getElementById("phone-num"),
    address: document.getElementById("delivery-address"),
    cardName: document.getElementById("card-name"),
    cardNumber: document.getElementById("card-number"),
    cardExpiry: document.getElementById("card-expiry"),
    cardCvv: document.getElementById("card-cvv"),
  };
  const paymentFormFields = Object.values(paymentInputs).filter(Boolean);

  const PAYMENT_DETAILS_KEY = "paymentDetails"; // Key for localStorage

  // Load Cart and Potentially Saved Form Data
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to save payment details to localStorage
  function savePaymentDetails() {
    const details = {};
    for (const key in paymentInputs) {
      if (paymentInputs[key]) {
        details[key] = paymentInputs[key].value;
      }
    }
    localStorage.setItem(PAYMENT_DETAILS_KEY, JSON.stringify(details));
  }

  // Function to load payment details from localStorage
  function loadPaymentDetails() {
    const savedDetails = JSON.parse(localStorage.getItem(PAYMENT_DETAILS_KEY));
    if (savedDetails) {
      for (const key in savedDetails) {
        if (paymentInputs[key]) {
          paymentInputs[key].value = savedDetails[key];
        }
      }
    }
  }

   // Function to clear saved payment details from localStorage
   function clearSavedPaymentDetails() {
    localStorage.removeItem(PAYMENT_DETAILS_KEY);
  }

  // Cart Display and Updates
  function displayCartItems() {
    cartItemsListContainer.innerHTML = "";

    if (cartItems.length === 0) {
      showEmptyCartMessage();
       // Clear form fields AND saved data if cart becomes empty
       paymentFormFields.forEach((input) => (input.value = ""));
       clearSavedPaymentDetails();
    } else {
      cartItems.forEach((item, index) => {
        if (!item.quantity) {
          item.quantity = 1;
        }

        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";

        let itemPrice = 0;
        if (item.price && typeof item.price === "string") {
          const priceStringNoCommas = item.price.replace(/,/g, "");
          const priceMatch = priceStringNoCommas.match(/[\d\.]+/);
          if (priceMatch && priceMatch[0]) {
            itemPrice = parseFloat(priceMatch[0]);
          } else {
            console.warn(
              `Could not parse price for item: "${item.name}". Original price string: "${item.price}"`
            );
          }
        } else if (typeof item.price === "number") {
          itemPrice = item.price;
        } else {
          console.warn(
            `Price data missing or not a string/number for item: "${item.name}".`
          );
        }

        cartItemElement.innerHTML = `
          <span class="item-name">${item.name || "Unknown Item"}</span>
          <div class="item-controls">
            <span class="price-tag">${itemPrice.toFixed(2)} EGP</span>
            <div class="quantity-control">
              <i class="bx bx-minus-circle bx-sm" data-index="${index}"></i>
              <span class="quantity">${item.quantity}</span>
              <i class="bx bx-plus-circle bx-sm" data-index="${index}"></i>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
        cartItemsListContainer.appendChild(cartItemElement);
      });
    }
    updateTotals();
    attachItemEventListeners(); // Re-attach needed after display updates
  }

  function attachItemEventListeners() {
    // Individual remove button
    document.querySelectorAll(".cart-item .remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems(); // Will clear form if cart becomes empty
        updateCartCount();
      });
    });
    // Plus button
    document
      .querySelectorAll(".cart-item .bx-plus-circle")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.target.dataset.index);
          cartItems[index].quantity++;
          localStorage.setItem("cart", JSON.stringify(cartItems));
          displayCartItems(); // Update display & totals
        });
      });
    // Minus button
    document
      .querySelectorAll(".cart-item .bx-minus-circle")
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.target.dataset.index);
          if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            localStorage.setItem("cart", JSON.stringify(cartItems));
            displayCartItems(); // Update display & totals
          }
        });
      });
  }

  function updateTotals() {
    let subtotal = 0;
    const TAX_RATE = 0.14;

    cartItems.forEach((item) => {
      let price = 0;
      if (item.price && typeof item.price === "string") {
        const priceStringNoCommas = item.price.replace(/,/g, "");
        const priceMatch = priceStringNoCommas.match(/[\d\.]+/);
        if (priceMatch && priceMatch[0]) {
          price = parseFloat(priceMatch[0]);
        } else {
          console.warn(
            `Could not parse price for total calculation for item: "${item.name}". Original price string: "${item.price}"`
          );
        }
      } else if (typeof item.price === "number") {
        price = item.price;
      } else {
        console.warn(
          `Price data missing or not a string/number for total calculation for item: "${item.name}".`
        );
      }
      const quantity = item.quantity || 1;
      subtotal += price * quantity;
    });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    updateDisplay(".subtotal-amount", subtotal);
    updateDisplay(".tax-amount", tax);
    updateDisplay(".total-amount", total);
  }

  function updateDisplay(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = `${value.toFixed(2)} EGP`;
    }
  }

  function showEmptyCartMessage() {
    const existingMessage = cartItemsListContainer.querySelector(
      ".empty-cart-message"
    );
    if (existingMessage) existingMessage.remove();

    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-cart-message";
    emptyMessage.textContent = "Your cart is empty.";
    cartItemsListContainer.appendChild(emptyMessage);
  }

  function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const count = cartItems.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );
      if (count > 0) {
        cartCountElement.textContent = count;
        cartCountElement.style.display = "inline";
      } else {
        cartCountElement.style.display = "none";
      }
    }
  }

  // Button Event Listeners
  if (returnBtn) {
    returnBtn.addEventListener("click", function() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "project_IT.html";
      }
    });
  }

  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", () => {
      cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      clearSavedPaymentDetails();
      paymentFormFields.forEach((input) => (input.value = ""));
      displayCartItems();
      updateCartCount();
    });
  }

  if (payBtn) {
    payBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (paymentErrorMessage) {
        paymentErrorMessage.style.display = "none";
        paymentErrorMessage.textContent = "";
      }

      if (cartItems.length === 0) {
        if (paymentErrorMessage) {
          paymentErrorMessage.textContent =
            "Your cart is empty. Please add items before checkout.";
          paymentErrorMessage.style.display = "block";
        } else {
          alert("Your cart is empty. Please add items before checkout.");
        }
        return;
      }

      const requiredInputs = document.querySelectorAll(
        ".payment-wrapper input[required]"
      );
      let isValid = true;
      let firstInvalidField = null;

      requiredInputs.forEach((input) => {
        // Use checkValidity() which considers required, pattern, minlength, maxlength etc.
        if (!input.checkValidity()) {
            input.style.borderColor = "red";
            isValid = false;
            // Use title attribute for specific error hints if available and pattern mismatched
            if (input.validity.patternMismatch && input.title) {
              // You could display input.title near the field or in the main error message
              console.log(`Pattern mismatch for ${input.id}: ${input.title}`);
            }
            if (!firstInvalidField) firstInvalidField = input;
        } else {
            input.style.borderColor = "";
        }
      });


      if (!isValid) {
        if (paymentErrorMessage) {
            // Display a generic message, or potentially loop through invalid fields
            // and combine their 'title' attributes if you want more specific feedback.
            paymentErrorMessage.textContent =
              "Please fill out all required fields correctly.";
            paymentErrorMessage.style.display = "block";
        } else {
            alert("Please fill out all required fields correctly.");
        }
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      // --- If validation passes ---
      alert("Payment successful! Thank you for your purchase.");

      cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      clearSavedPaymentDetails();
      paymentFormFields.forEach((input) => (input.value = ""));
      displayCartItems();
      updateCartCount();
    });
  }

  // Input field restrictions
  function restrictToNumeric(
    inputElement,
    regexPatternToRemove,
    maxLength = null
  ) {
    if (inputElement) {
      inputElement.addEventListener("input", function (event) {
        let value = event.target.value;
        value = value.replace(regexPatternToRemove, "");
        if (maxLength && value.length > maxLength) {
          value = value.slice(0, maxLength);
        }
        event.target.value = value;
      });
    }
  }

  function formatCardNumber(inputElement) {
    if (inputElement) {
      inputElement.addEventListener("input", function (event) {
        let value = event.target.value;
        const digitsOnly = value.replace(/[^0-9]/g, "");
        const limitedDigits = digitsOnly.slice(0, 16);
        let formattedValue = "";
        for (let i = 0; i < limitedDigits.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += " ";
          }
          formattedValue += limitedDigits[i];
        }
        event.target.value = formattedValue;
      });
    }
  }

  // Apply restrictions
  // --- MODIFIED: Use maxLength 10 for phone number ---
  restrictToNumeric(paymentInputs.phone, /[^0-9]/g, 10);
  formatCardNumber(paymentInputs.cardNumber);
  restrictToNumeric(paymentInputs.cardCvv, /[^0-9]/g, 4);

  if (paymentInputs.cardExpiry) {
    paymentInputs.cardExpiry.addEventListener("input", function (event) {
      let value = event.target.value;
      let digitsAndSlashOnly = value.replace(/[^0-9/]/g, "");
      let formattedValue = "";
      const parts = digitsAndSlashOnly.split("/");
      let monthPart = parts[0] || "";
      let yearPart = parts[1] || "";

      if (monthPart.length > 2) {
        yearPart = monthPart.substring(2) + yearPart;
        monthPart = monthPart.substring(0, 2);
      }
      formattedValue = monthPart;
      if ( monthPart.length === 2 && !digitsAndSlashOnly.includes("/") && event.inputType !== "deleteContentBackward" && event.inputType !== "deleteContentForward" ) {
        if (digitsAndSlashOnly.length > 2 || yearPart.length > 0) {
          formattedValue += "/";
        }
      } else if (monthPart.length === 2 && digitsAndSlashOnly.includes("/")) {
        formattedValue += "/";
      }
      yearPart = yearPart.replace(/\//g, "");
      if (yearPart.length > 2) {
        yearPart = yearPart.substring(0, 2);
      }
      formattedValue += yearPart;
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, 5);
      }
      event.target.value = formattedValue;
    });
    paymentInputs.cardExpiry.addEventListener("blur", function (event) { /* Optional blur validation */ });
  }

  // Storage and Focus listeners
  window.addEventListener("storage", function (event) {
    if (event.key === "cart") {
      const newCartData = JSON.parse(event.newValue);
      cartItems = newCartData ? newCartData : [];
      displayCartItems();
      updateCartCount();
    }
    if (event.key === PAYMENT_DETAILS_KEY && cartItems.length > 0) {
       loadPaymentDetails();
    }
  });

  window.addEventListener("focus", function () {
    const currentCartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    if (JSON.stringify(cartItems) !== JSON.stringify(currentCartFromStorage)) {
      cartItems = currentCartFromStorage;
      displayCartItems();
      updateCartCount();
    }
     if (cartItems.length > 0) {
       loadPaymentDetails();
     }
  });

  // Initial Page Load
  if (cartItems.length > 0) {
    loadPaymentDetails();
  }
  displayCartItems();
  updateCartCount();
});