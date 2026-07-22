// ==========================
// ELEMENTS
// ==========================

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

const showPassword = document.getElementById("showPassword");
const remember = document.getElementById("remember");

const message = document.getElementById("message");
const loginBtn = document.querySelector(".login-btn");

// ==========================
// SHOW / HIDE PASSWORD
// ==========================

showPassword.addEventListener("change", () => {

    password.type = showPassword.checked ? "text" : "password";

});

// ==========================
// LOAD SAVED EMAIL
// ==========================

window.addEventListener("load", () => {

    const savedEmail = localStorage.getItem("rememberEmail");

    if(savedEmail){

        email.value = savedEmail;
        remember.checked = true;

    }

});

// ==========================
// EMAIL VALIDATION
// ==========================

function validEmail(mail){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

}

// ==========================
// LOGIN
// ==========================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    message.textContent = "";
    message.style.color = "#ff4d4d";

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    // Email validation

    if(!validEmail(userEmail)){

        message.textContent = "Please enter a valid email address.";
        return;

    }

    // Password validation

    if(userPassword.length < 8){

        message.textContent = "Password must be at least 8 characters.";
        return;

    }

    // Remember Email

    if(remember.checked){

        localStorage.setItem("rememberEmail", userEmail);

    }else{

        localStorage.removeItem("rememberEmail");

    }

    // Loading Button

    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    // Simulate Server

    setTimeout(()=>{

        message.style.color = "#00ff88";
        message.textContent = "Login Successful!";

        loginBtn.textContent = "Success ✓";

        setTimeout(()=>{

            window.location.href = "index.html";

        },1000);

    },1500);

});