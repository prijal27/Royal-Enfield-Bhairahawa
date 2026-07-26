// ======================================
// ROYAL ENFIELD ACCESSORIES
// PART 1 - CART SETUP & ADD TO CART
// ======================================

// Load saved cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const buttons = document.querySelectorAll(".product-card button");

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge() {

    cartCount.textContent = cart.length;

    cartCount.classList.add("bounce");

    setTimeout(() => {

        cartCount.classList.remove("bounce");

    }, 500);

}

// Restore buttons after refresh
function restoreButtons() {

    cart.forEach(item => {

        document.querySelectorAll(".product-card").forEach(card => {

            if (card.dataset.name === item.name) {

                const btn = card.querySelector("button");

                btn.disabled = true;
                btn.classList.add("added");
                btn.innerHTML = "✓ Added";

            }

        });

    });

}

// Add To Cart
buttons.forEach(button => {

    button.addEventListener("click", function () {

        if (button.classList.contains("added")) return;

        const card = this.parentElement;

        const product = {

            name: card.dataset.name,
            price: Number(card.dataset.price),
            image: card.dataset.image,
            qty: 1

        };

        // Add product
        cart.push(product);

        // Save
        saveCart();

        // Update badge
        updateCartBadge();

        // Disable button
        button.disabled = true;
        button.classList.add("added");
        button.innerHTML = "✓ Added";

        // Toast
        toastText.textContent = product.name + " added to your cart.";

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

        // Refresh cart drawer
        updateCart();

    });

});

// Restore previous cart
restoreButtons();
updateCartBadge();
// ======================================
// PART 2 - SHOPPING CART
// ======================================

const cartButton = document.getElementById("cartButton");
const shoppingCart = document.getElementById("shoppingCart");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const viewCart = document.getElementById("viewCart");

// Open Cart
cartButton.addEventListener("click", openCart);

if(viewCart){
    viewCart.addEventListener("click", () => {

        toast.classList.remove("show");

        openCart();

    });
}

// Close Cart
closeCart.addEventListener("click", closeShoppingCart);
cartOverlay.addEventListener("click", closeShoppingCart);

function openCart(){

    shoppingCart.classList.add("show");

    cartOverlay.classList.add("show");

}

function closeShoppingCart(){

    shoppingCart.classList.remove("show");

    cartOverlay.classList.remove("show");

}

// ======================================
// UPDATE CART
// ======================================

function updateCart(){

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `

        <div class="empty-cart">

            <div class="cart-icon-big">🛒</div>

            <h3>Your cart is empty</h3>

            <p>Add genuine Royal Enfield accessories to begin your journey.</p>

        </div>

        `;

        cartTotal.textContent = "0";

        return;

    }

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        cartItems.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>NPR ${item.price.toLocaleString()}</p>

                <div class="qty">

                    <button onclick="decreaseQty(${index})">−</button>

                    <span>${item.qty}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">

                🗑 Remove

            </button>

        </div>

        `;

    });

    cartTotal.textContent = total.toLocaleString();

}

// ======================================
// QUANTITY +
// ======================================

function increaseQty(index){

    cart[index].qty++;

    saveCart();

    updateCart();

}

// ======================================
// QUANTITY -
// ======================================

function decreaseQty(index){

    cart[index].qty--;

    if(cart[index].qty <= 0){

        removeItem(index);

        return;

    }

    saveCart();

    updateCart();

}

// ======================================
// REMOVE PRODUCT
// ======================================

function removeItem(index){

    const removed = cart[index];

    cart.splice(index,1);

    saveCart();

    document.querySelectorAll(".product-card").forEach(card=>{

        if(card.dataset.name === removed.name){

            const btn = card.querySelector("button");

            btn.disabled = false;

            btn.classList.remove("added");

            btn.innerHTML = "Add to Cart";

        }

    });

    updateCartBadge();

    updateCart();

}

// Load cart when page opens
updateCart();
// ======================================
// PART 3 - CHECKOUT & FILTERS
// ======================================

// ---------- Proceed to Checkout ----------
const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", () => {

        if(cart.length === 0){

            alert("Your cart is empty.");

            return;

        }

        // Save latest cart
        saveCart();

        // Go to checkout page
        window.location.href = "checkout.html";

    });

}

// ---------- Product Filter ----------

const filterButtons = document.querySelectorAll(".categories button");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.textContent.toLowerCase();

        products.forEach(product => {

            const productCategory = product.dataset.category.toLowerCase();

            if(category === "all" || category === productCategory){

                product.style.display = "block";

            }else{

                product.style.display = "none";

            }

        });

    });

});

// ---------- Restore Cart After Refresh ----------

updateCart();
updateCartBadge();
restoreButtons();

// ---------- Premium Welcome Toast ----------

if(cart.length > 0){

    setTimeout(()=>{

        toastText.textContent =
        "Welcome back! Your cart has been restored.";

        toast.classList.add("show");

        setTimeout(()=>{

            toast.classList.remove("show");

        },3000);

    },600);

}