// ===============================
// BOOK TEST RIDE
// ===============================

const form = document.getElementById("rideForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const dateInput = document.getElementById("date");

// ===============================
// Prevent Past Dates
// ===============================

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;

// ===============================
// Form Submit
// ===============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const bike = document.getElementById("bike").value;
    const branch = document.getElementById("branch").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Validation

    if (
        fullname === "" ||
        email === "" ||
        phone === "" ||
        bike === "" ||
        branch === "" ||
        date === "" ||
        time === ""
    ) {

        alert("Please fill in all required fields.");

        return;

    }

    // Email Validation

   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Enter a valid email address.");

        return;

    }

    // Phone Validation

    const phonePattern = /^(98|97)\d{8}$/;

if(!phonePattern.test(phone)){
    alert("Enter a valid Nepal mobile number.");
    return;
}
    const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate()+1);

dateInput.min = tomorrow.toISOString().split("T")[0];

    // Show Popup

    popup.classList.add("active");

    // Reset Form

    form.reset();

});

// ===============================
// Close Popup
// ===============================

closePopup.addEventListener("click", function () {

    popup.classList.remove("active");

});

// ===============================
// Close When Clicking Outside
// ===============================

popup.addEventListener("click", function (e) {

    if (e.target === popup) {

        popup.classList.remove("active");

    }

});

// ===============================
// ESC Key
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        popup.classList.remove("active");

    }

});

// ===============================
// Button Hover Effect
// ===============================

const button = document.querySelector(".ride-btn");

button.addEventListener("mouseenter", function () {

    button.style.transform = "translateY(-4px) scale(1.02)";

});

button.addEventListener("mouseleave", function () {

    button.style.transform = "translateY(0) scale(1)";

});

// ===============================
// Fade-in Animation
// ===============================

const section = document.querySelector(".testride-section");

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            section.classList.add("show");

        }

    });

}, {

    threshold: 0.3

});

observer.observe(section);