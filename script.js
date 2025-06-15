const products = [
  {
    id: 1,
    name: "UltraBook Pro",
    desc: "A lightweight, powerful laptop for professionals.",
    price: 999,
    image: "https://source.unsplash.com/400x300/?laptop"
  },
  {
    id: 2,
    name: "SmartPhone X",
    desc: "Sleek design, powerful features, stunning display.",
    price: 699,
    image: "https://source.unsplash.com/400x300/?smartphone"
  },
  {
    id: 3,
    name: "Noise-Canceling Headphones",
    desc: "Immersive sound, perfect for travel.",
    price: 199,
    image: "https://source.unsplash.com/400x300/?headphones"
  },
  {
    id: 4,
    name: "4K Monitor",
    desc: "Ultra HD clarity for work and play.",
    price: 299,
    image: "https://source.unsplash.com/400x300/?monitor"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");
const cartSidebar = document.getElementById("cart-sidebar");
const cartToggle = document.getElementById("cart-toggle");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// Render products
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="desc">${product.desc}</p>
    <p class="price">$${product.price}</p>
    <button data-id="${product.id}">Add to Cart</button>
  `;
  grid.appendChild(div);
});

// Add to cart
grid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = +e.target.dataset.id;
    cart.push(id);
    saveCart();
    updateCartUI();
  }
});

// Toggle cart sidebar
cartToggle.addEventListener("click", () => {
  cartSidebar.classList.toggle("hidden");
});

// Save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    total += product.price;
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = `Total: $${total}`;
  cartCount.textContent = cart.length;
}

// Init
updateCartUI();

