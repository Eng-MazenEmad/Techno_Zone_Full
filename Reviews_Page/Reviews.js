// Select DOM elements :
const btn = document.querySelector(".btn");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");

// Add click event handler to the "POST" button
  btn.onclick = () => {
  // When "POST" button is clicked:
  // 1. Hide the star rating widget
  widget.style.display = "none";
  // 2. Show the post-submission content
  post.style.display = "block";


// Add click event handler to the "EDIT" button
  editBtn.onclick = () => {
    // When "Edit" button is clicked:
    // 1. Show the star rating widget again
    widget.style.display = "block";
    // 2. Hide the post-submission content
    post.style.display = "none";
  }
// Prevent default form submission behavior
  return false;
}
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