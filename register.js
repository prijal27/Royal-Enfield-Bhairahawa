// ==========================
// ELEMENTS
// ==========================

const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const showPassword = document.getElementById("showPassword");

const message = document.getElementById("message");

const registerBtn = document.querySelector(".register-btn");

// ==========================
// SHOW PASSWORD
// ==========================

showPassword.addEventListener("change",()=>{

    const type = showPassword.checked ? "text" : "password";

    password.type = type;
    confirmPassword.type = type;

});

// ==========================
// EMAIL VALIDATION
// ==========================

function validEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

// ==========================
// PHONE VALIDATION
// ==========================

function validPhone(phone){

    return /^98\d{8}$/.test(phone);

}

// ==========================
// REGISTER
// ==========================

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    message.style.color="#ff4d4d";
    message.textContent="";

    if(fullname.value.trim().length < 3){

        message.textContent="Please enter your full name.";
        return;

    }

    if(!validEmail(email.value.trim())){

        message.textContent="Please enter a valid email.";
        return;

    }

    if(!validPhone(phone.value.trim())){

        message.textContent="Enter a valid Nepal mobile number.";
        return;

    }

    if(password.value.length < 8){

        message.textContent="Password must be at least 8 characters.";
        return;

    }

    if(password.value !== confirmPassword.value){

        message.textContent="Passwords do not match.";
        return;

    }

    registerBtn.disabled=true;
    registerBtn.textContent="Creating Account...";

    setTimeout(()=>{

        message.style.color="#00ff88";
        message.textContent="Registration Successful!";

        registerBtn.textContent="Success ✓";

        setTimeout(()=>{

            window.location.href="login.html";

        },1500);

    },1500);

});