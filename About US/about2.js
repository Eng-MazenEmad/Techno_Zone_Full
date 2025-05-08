//-------------------Shopping Cart Page JS-------------------------
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");

  const updateCartCount = () => {
      const count = cartItems.length;
      if (count > 0) {
          cartCountElement.textContent = count;
          cartCountElement.style.display = "inline";
      } else {
          cartCountElement.style.display = "none";
      }
  };

  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
          const card = button.closest(".product-card");
          const name = card.querySelector(".product-name").innerText.trim();
          const price = card.querySelector(".product-price").innerText.trim();
          const product = { name, price };

          cartItems.push(product);
          localStorage.setItem("cart", JSON.stringify(cartItems));

          updateCartCount();
      });
  });
});