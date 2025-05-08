const cartMsg = document.createElement('div');
cartMsg.className = 'cart-message';
cartMsg.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  background: rgba(0, 128, 0, 0.9);
  color: white;
  border-radius: 5px;
  display: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
  max-width: 300px;
  font-family: 'Karla', sans-serif;
`;
document.body.appendChild(cartMsg);

let hideTimer;

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    // Get the monitor name from the parent element
    const monitorname = this.closest('.cards-desc').querySelector('.product-name').textContent;
    
    // Update the message with the monitor name
    cartMsg.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">${monitorname}</div>
      <div>Added to cart! 🛒</div>
    `;
    
    // Show message (or keep it showing)
    cartMsg.style.display = 'block';
    
    // Reset the 3-second timer
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      cartMsg.style.display = 'none';
    }, 3000);
    
               // Button feedback
               const originalText = this.textContent;
               this.innerHTML = `
             <span style="display: inline-flex; align-items: center;">
                 <i class="fa-solid fa-circle-check fa-1x" ></i>Added!
             </span>`;
   
               setTimeout(() => {
                   this.textContent = originalText;
               }, 3000);
           });
       });
   


// Js for checkout and cart count

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
