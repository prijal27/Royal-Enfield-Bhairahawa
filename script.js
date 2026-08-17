window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 2600);

});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let currentSlide = 0;
let autoSlide;

// Show Slide
function showSlide(index) {

    // Remove active class
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    // Add active class
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

// Next Slide
function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Previous Slide
function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

// Auto Slider
function startAutoSlide() {

    autoSlide = setInterval(() => {
        nextSlide();
    }, 5000);

}

// Restart Timer
function resetTimer() {

    clearInterval(autoSlide);
    startAutoSlide();

}

// Next Button
next.addEventListener("click", () => {

    nextSlide();
    resetTimer();

});

// Previous Button
prev.addEventListener("click", () => {

    prevSlide();
    resetTimer();

});

// Dot Navigation
dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showSlide(currentSlide);

        resetTimer();

    });

});

// Start Slider
showSlide(currentSlide);
startAutoSlide();
// Ride navbar active while scrolling cards

const rideCards = document.querySelectorAll(".ride-card");
const rideLinks = document.querySelectorAll(".ride-navbar li");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            rideLinks.forEach(link=>link.classList.remove("active"));

            let index = [...rideCards].indexOf(entry.target);

            if(rideLinks[index]){
                rideLinks[index].classList.add("active");
            }

        }

    });

},{
    threshold:0.6
});

rideCards.forEach(card=>observer.observe(card));
rideLinks.forEach((link, index) => {

    link.addEventListener("click", () => {

        if (rideCards[index]) {

            rideCards[index].scrollIntoView({
                behavior: "smooth",
                inline: "start",
                block: "nearest"
            });

        }

    });

});
// ===============================
// Auto Scroll Ride Section
// ===============================

const ridesContainer = document.querySelector(".rides-container");

let scrollAmount = 0;

function autoScrollRides() {

    scrollAmount += 1800; // width of one card + gap

    if (scrollAmount >= ridesContainer.scrollWidth - ridesContainer.clientWidth) {
        scrollAmount = 0;
    }

    ridesContainer.scrollTo({
        left: scrollAmount,
        behavior:"smooth"
    });

}

setInterval(autoScrollRides, 4500);



const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});
// ================= PRELOADER =================

/*==============================
SCROLL ANIMATION
==============================*/

const elements = document.querySelectorAll(
".hidden, .left, .right, .zoom"
);

const observe = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

elements.forEach(el=>{

    observe.observe(el);
});
const data = [

"Classic 350",

"Himalayan 450",

"Guerrilla 450",

"Hunter 350",

"Shotgun 650",

"Bear 650",

"Himalayan Odyssey",

"Moto Himalaya",

"Leh Ladakh",

"Riding Jacket",

"Helmet",

"Gloves",

"Boots",

"Accessories"

];

const input = document.getElementById("searchInput");

const suggestions = document.getElementById("suggestions");

input.addEventListener("input", ()=>{

    const value = input.value.toLowerCase();

    suggestions.innerHTML = "";

    if(value==="") return;

    const result = data.filter(item=>{

        return item.toLowerCase().includes(value);

    });

    result.forEach(item=>{

        const div = document.createElement("div");

        div.className="suggestion";

        div.textContent=item;

       div.onclick = () => {

    switch(item){

        case "Classic 350":
            window.location.href="classic350.html";
            break;

        case "Himalayan 450":
            window.location.href="himalayan.html";
            break;

        case "Guerrilla 450":
            window.location.href="guerrilla.html";
            break;

        case "Helmet":
            window.location.href="accessories.html";
            break;

        default:
            input.value = item;
            suggestions.innerHTML = "";
    }

};

        suggestions.appendChild(div);

    });

});

// ================= SEARCH =================

const searchBtn = document.querySelector(".icon-btn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

// Open Search
searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    searchInput.focus();
});

// Close Search
closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
});

// Close by clicking outside
searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active");
    }
});
const navbar = document.querySelector(".navbar");
const rideSection = document.querySelector(".rides-section");
const observ = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            navbar.classList.add("hide");

        }else{

            navbar.classList.remove("hide");

        }

    });

},{
    threshold:0.2
});

observ.observe(rideSection);
// =====================================
// CTA SECTION JAVASCRIPT
// =====================================

// Fade In Animation
const ctaSection = document.querySelector(".cta-section");

const ctaObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.25

});

ctaObserver.observe(ctaSection);


// =====================================
// Smooth Scroll to Test Ride Section
// =====================================

const bookRideBtn = document.querySelector(".cta-btn.primary");

bookRideBtn.addEventListener("click", function(e){

    const target = document.querySelector("#testride");

    if(target){

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    }

});


// =====================================
// Ripple Click Effect
// =====================================

const buttons = document.querySelectorAll(".cta-btn");

buttons.forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = button.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";
        ripple.style.top = (e.clientY - rect.top) + "px";

        button.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },600);

    });

});


// =====================================
// Social Icon Hover Animation
// =====================================

const socialIcons = document.querySelectorAll(".social-icons a");

socialIcons.forEach(icon=>{

    icon.addEventListener("mouseenter",()=>{

        icon.style.transform="translateY(-8px) rotate(360deg) scale(1.1)";

    });

    icon.addEventListener("mouseleave",()=>{

        icon.style.transform="translateY(0) rotate(0deg) scale(1)";

    });

});


// =====================================
// CTA Button Hover Effect
// =====================================

buttons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform="translateY(-5px)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="translateY(0)";

    });

});


// =====================================
// Optional Console Message
// =====================================

console.log("Royal Enfield Bhairahawa CTA Loaded Successfully");



