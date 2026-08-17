// ======================================
// ROYAL ENFIELD ACCESSORIES
// COMPLETE CART + FILTER SYSTEM
// ======================================


// ======================================
// LOAD SAVED CART
// ======================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ======================================
// ELEMENTS
// ======================================

const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const cartButton = document.getElementById("cartButton");
const shoppingCart = document.getElementById("shoppingCart");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const viewCart = document.getElementById("viewCart");

const checkoutBtn = document.querySelector(".checkout-btn");

const buttons = document.querySelectorAll(".product-card button");

const filterButtons =
    document.querySelectorAll(".categories button");

const products =
    document.querySelectorAll(".product-card");


// ======================================
// SAVE CART
// ======================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ======================================
// UPDATE CART BADGE
// ======================================

function updateCartBadge() {

    // Count total quantities
    const totalItems = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    cartCount.textContent = totalItems;


    // Bounce animation

    cartCount.classList.remove("bounce");

    void cartCount.offsetWidth;

    cartCount.classList.add("bounce");

}


// ======================================
// RESTORE PRODUCT BUTTONS
// ======================================

function restoreButtons() {

    products.forEach(card => {

        const productName =
            card.dataset.name;

        const button =
            card.querySelector("button");

        const exists =
            cart.some(
                item => item.name === productName
            );


        if (exists) {

            button.disabled = true;

            button.classList.add("added");

            button.innerHTML =
                "✓ Added";

        }

        else {

            button.disabled = false;

            button.classList.remove("added");

            button.innerHTML =
                `Add to Cart <span>🛒</span>`;

        }

    });

}


// ======================================
// ADD TO CART
// ======================================

buttons.forEach(button => {

    button.addEventListener("click", function () {

        // Prevent duplicate product
        if (
            button.classList.contains("added")
        ) {
            return;
        }


        // IMPORTANT:
        // Find the actual product-card

        const card =
            this.closest(".product-card");


        // Product information

        const product = {

            name:
                card.dataset.name,

            price:
                Number(card.dataset.price),

            image:
                card.dataset.image,

            qty: 1

        };


        // Add product

        cart.push(product);


        // Save

        saveCart();


        // Update badge

        updateCartBadge();


        // Change button

        button.disabled = true;

        button.classList.add("added");

        button.innerHTML =
            "✓ Added";


        // Show toast

        toastText.textContent =
            product.name +
            " added to your cart.";

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);


        // Update cart

        updateCart();

    });

});


// ======================================
// OPEN CART
// ======================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


function openCart() {

    shoppingCart.classList.add("show");

    cartOverlay.classList.add("show");

}


// ======================================
// CLOSE CART
// ======================================

if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeShoppingCart
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeShoppingCart
    );

}


function closeShoppingCart() {

    shoppingCart.classList.remove("show");

    cartOverlay.classList.remove("show");

}


// ======================================
// VIEW CART FROM TOAST
// ======================================

if (viewCart) {

    viewCart.addEventListener(
        "click",
        () => {

            toast.classList.remove("show");

            openCart();

        }
    );

}


// ======================================
// UPDATE CART
// ======================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;


    // ==================================
    // EMPTY CART
    // ==================================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="cart-icon-big">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add genuine Royal Enfield
                    accessories to begin your journey.
                </p>

            </div>

        `;

        cartTotal.textContent = "0";

        return;

    }


    // ==================================
    // CART PRODUCTS
    // ==================================

    cart.forEach((item, index) => {

        total +=
            item.price * item.qty;


        cartItems.innerHTML += `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        NPR ${item.price.toLocaleString()}
                    </p>


                    <div class="qty">

                        <button
                            onclick="decreaseQty(${index})"
                        >
                            −
                        </button>


                        <span>
                            ${item.qty}
                        </span>


                        <button
                            onclick="increaseQty(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    🗑 Remove
                </button>

            </div>

        `;

    });


    // ==================================
    // TOTAL
    // ==================================

    cartTotal.textContent =
        total.toLocaleString();

}


// ======================================
// INCREASE QUANTITY
// ======================================

function increaseQty(index) {

    cart[index].qty++;

    saveCart();

    updateCart();

    updateCartBadge();

}


// ======================================
// DECREASE QUANTITY
// ======================================

function decreaseQty(index) {

    cart[index].qty--;


    if (cart[index].qty <= 0) {

        removeItem(index);

        return;

    }


    saveCart();

    updateCart();

    updateCartBadge();

}


// ======================================
// REMOVE PRODUCT
// ======================================

function removeItem(index) {

    const removed =
        cart[index];


    cart.splice(index, 1);


    saveCart();


    // Restore corresponding product button

    products.forEach(card => {

        if (
            card.dataset.name ===
            removed.name
        ) {

            const button =
                card.querySelector("button");


            button.disabled = false;

            button.classList.remove("added");

            button.innerHTML =
                `Add to Cart <span>🛒</span>`;

        }

    });


    updateCartBadge();

    updateCart();

}


// ======================================
// CHECKOUT
// ======================================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            // Save cart

            saveCart();


            // Go to checkout

            window.location.href =
                "checkout.html";

        }
    );

}


// ======================================
// PRODUCT FILTER
// ======================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            // Remove active

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            // Add active

            button.classList.add(
                "active"
            );


            // Get data-filter

            const category =
                button.dataset.filter;


            // Filter products

            products.forEach(product => {

                const productCategory =
                    product.dataset.category;


                if (
                    category === "all" ||
                    category === productCategory
                ) {

                    product.style.display =
                        "block";

                }

                else {

                    product.style.display =
                        "none";

                }

            });

        }
    );

});


// ======================================
// INITIALIZE
// ======================================

updateCart();

updateCartBadge();

restoreButtons();


// ======================================
// WELCOME BACK TOAST
// ======================================

if (cart.length > 0) {

    setTimeout(() => {

        toastText.textContent =
            "Welcome back! Your cart has been restored.";

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

    }, 600);

}