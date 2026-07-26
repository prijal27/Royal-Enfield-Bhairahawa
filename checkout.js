// ===============================
// LOAD CART
// ===============================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = document.getElementById("orderItems");
const subtotal = document.getElementById("subtotal");
const grandTotal = document.getElementById("grandTotal");

let total = 0;

cart.forEach(item => {

    total += item.price * item.qty;

    orderItems.innerHTML += `

    <div class="cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div class="cart-details">

            <h4>${item.name}</h4>

            <p>Qty : ${item.qty}</p>

            <strong>NPR ${(item.price * item.qty).toLocaleString()}</strong>

        </div>

    </div>

    `;

});

subtotal.textContent = "NPR " + total.toLocaleString();
grandTotal.textContent = "NPR " + total.toLocaleString();


// ===============================
// INPUTS
// ===============================

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const city = document.getElementById("city");
const province = document.getElementById("province");
const postal = document.getElementById("postal");


// ===============================
// ERROR ELEMENTS
// ===============================

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const addressError = document.getElementById("addressError");
const cityError = document.getElementById("cityError");
const provinceError = document.getElementById("provinceError");
const postalError = document.getElementById("postalError");


// ===============================
// CLEAR ERRORS
// ===============================

function clearErrors(){

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    addressError.textContent = "";
    cityError.textContent = "";
    provinceError.textContent = "";
    postalError.textContent = "";

}


// ===============================
// VALIDATION
// ===============================

function validateForm(){

    clearErrors();

    let valid = true;

    if(fullname.value.trim()===""){

        nameError.textContent="Full name is required.";
        valid=false;

    }

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email.value.trim()===""){

        emailError.textContent="Email is required.";
        valid=false;

    }

    else if(!emailPattern.test(email.value)){

        emailError.textContent="Enter a valid email.";
        valid=false;

    }

    const phonePattern=/^[0-9]{10}$/;

    if(phone.value.trim()===""){

        phoneError.textContent="Phone number is required.";
        valid=false;

    }

    else if(!phonePattern.test(phone.value)){

        phoneError.textContent="Phone must contain 10 digits.";
        valid=false;

    }

    if(address.value.trim()===""){

        addressError.textContent="Address is required.";
        valid=false;

    }

    if(city.value.trim()===""){

        cityError.textContent="City is required.";
        valid=false;

    }

    if(province.value===""){

        provinceError.textContent="Select a province.";
        valid=false;

    }

    if(postal.value.trim()===""){

        postalError.textContent="Postal code is required.";
        valid=false;

    }

    return valid;

}


// ===============================
// CLEAR ERROR WHEN USER TYPES
// ===============================

document.querySelectorAll("input,select").forEach(input=>{

    input.addEventListener("input",()=>{

        clearErrors();

    });

});


// ===============================
// ORDER ID
// ===============================

function generateOrderID(){

    const date = new Date();

    const id =
        "REB-" +
        date.getFullYear() +
        String(date.getMonth()+1).padStart(2,"0") +
        String(date.getDate()).padStart(2,"0") +
        "-" +
        Math.floor(Math.random()*900+100);

    return id;

}


// ===============================
// PLACE ORDER
// ===============================

const placeOrder=document.getElementById("placeOrder");

placeOrder.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    if(!validateForm()) return;

    const orderID = generateOrderID();

    document.getElementById("orderMessage").innerHTML =

    `

    Thank you for shopping with
    <strong>Royal Enfield Bhairahawa</strong>.

    <br><br>

    <strong>Order ID:</strong>

    ${orderID}

    <br><br>

    Estimated Delivery:
    2-4 Business Days.

    `;

    document.getElementById("successPopup").classList.add("show");

    localStorage.removeItem("cart");

    setTimeout(()=>{

        window.location.href="index.html";

    },4000);

});