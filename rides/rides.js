/* =========================================================
   ROYAL ENFIELD BHAIRAHAWA
   RIDES PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. PRELOADER
    ===================================================== */

    const loader = document.getElementById("ridesLoader");

    if (loader) {

        window.addEventListener("load", function () {

            setTimeout(function () {
                loader.classList.add("hide");
            }, 800);

        });

        /* Safety fallback */
        setTimeout(function () {
            loader.classList.add("hide");
        }, 3000);
    }


    /* =====================================================
       2. MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function () {
            mobileMenu.classList.add("active");
        });

    }

    if (mobileClose && mobileMenu) {

        mobileClose.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
        });

    }


    /* Close mobile menu when link clicked */

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

        });

    });


    /* =====================================================
       3. SEARCH
    ===================================================== */

    const openSearch =
        document.getElementById("openSearch");

    const closeSearch =
        document.getElementById("closeSearch");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchInput =
        document.getElementById("searchInput");

    const searchSuggestions =
        document.getElementById("searchSuggestions");


    if (openSearch && searchOverlay) {

        openSearch.addEventListener("click", function () {

            searchOverlay.classList.add("active");

            if (searchInput) {
                setTimeout(function () {
                    searchInput.focus();
                }, 300);
            }

        });

    }


    if (closeSearch && searchOverlay) {

        closeSearch.addEventListener("click", function () {

            searchOverlay.classList.remove("active");

        });

    }


    /* ESC closes search */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (searchOverlay) {
                searchOverlay.classList.remove("active");
            }

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

        }

    });


    /* =====================================================
       4. SEARCH RIDES
    ===================================================== */

    if (searchInput && searchSuggestions) {

        searchInput.addEventListener("input", function () {

            const text =
                searchInput.value.toLowerCase().trim();

            searchSuggestions.innerHTML = "";


            if (text === "") {
                return;
            }


            const cards =
                document.querySelectorAll(".ride-card");

            let found = false;


            cards.forEach(function (card) {

                const title =
                    card.querySelector("h3");

                if (!title) {
                    return;
                }


                const rideName =
                    title.textContent.toLowerCase();


                if (rideName.includes(text)) {

                    found = true;


                    const result =
                        document.createElement("a");

                    result.href = "#all-rides";

                    result.textContent =
                        title.textContent;


                    result.addEventListener(
                        "click",
                        function () {

                            searchOverlay.classList.remove(
                                "active"
                            );

                        }
                    );


                    searchSuggestions.appendChild(result);

                }

            });


            if (!found) {

                const message =
                    document.createElement("p");

                message.textContent =
                    "No rides found.";

                searchSuggestions.appendChild(message);

            }

        });

    }


    /* =====================================================
       5. RIDE CATEGORY FILTER
    ===================================================== */

    const categoryButtons =
        document.querySelectorAll(".ride-category");

    const rideCards =
        document.querySelectorAll(".ride-card");


    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category =
                button.dataset.category;


            /* Active button */

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* Filter cards */

            rideCards.forEach(function (card) {

                const cardCategory =
                    card.dataset.category;


                if (
                    category === "all" ||
                    category === cardCategory
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });


            /* Reset slider */

            const slider =
                document.getElementById("ridesSlider");

            if (slider) {
                slider.scrollLeft = 0;
            }


            updateCounter();

        });

    });


    /* =====================================================
       6. HORIZONTAL RIDE SLIDER
    ===================================================== */

    const slider =
        document.getElementById("ridesSlider");

    const previous =
        document.getElementById("ridePrev");

    const next =
        document.getElementById("rideNext");


    function getCardWidth() {

        const card =
            document.querySelector(
                ".ride-card:not([style*='display: none'])"
            );


        if (!card) {
            return 0;
        }


        const gap = 20;

        return card.offsetWidth + gap;

    }


    /* NEXT */

    if (next && slider) {

        next.addEventListener("click", function () {

            slider.scrollBy({
                left: getCardWidth(),
                behavior: "smooth"
            });

        });

    }


    /* PREVIOUS */

    if (previous && slider) {

        previous.addEventListener("click", function () {

            slider.scrollBy({
                left: -getCardWidth(),
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       7. SLIDER COUNTER
    ===================================================== */

    const counter =
        document.getElementById("rideCounter");

    const progress =
        document.getElementById("rideProgress");


    function updateCounter() {

        if (!slider) {
            return;
        }


        const visibleCards =
            Array.from(
                document.querySelectorAll(".ride-card")
            ).filter(function (card) {

                return card.style.display !== "none";

            });


        if (visibleCards.length === 0) {
            return;
        }


        let closest = 0;
        let distance = Infinity;


        visibleCards.forEach(function (card, index) {

            const cardDistance =
                Math.abs(
                    card.offsetLeft -
                    slider.scrollLeft
                );


            if (cardDistance < distance) {

                distance = cardDistance;
                closest = index;

            }

        });


        const current = closest + 1;
        const total = visibleCards.length;


        if (counter) {

            counter.textContent =
                String(current).padStart(2, "0") +
                " / " +
                String(total).padStart(2, "0");

        }


        if (progress) {

            progress.style.width =
                ((current / total) * 100) + "%";

        }

    }


    if (slider) {

        slider.addEventListener(
            "scroll",
            updateCounter
        );

    }


    /* =====================================================
       8. IMPORTANT
       DO NOT CONVERT VERTICAL MOUSE WHEEL
       INTO HORIZONTAL SCROLL
       
       This allows the whole page to scroll normally.
    ===================================================== */


    /* =====================================================
       9. DRAG TO SLIDE
    ===================================================== */

    if (slider) {

        let dragging = false;
        let startX = 0;
        let startScroll = 0;


        slider.addEventListener(
            "mousedown",
            function (event) {

                dragging = true;

                startX = event.pageX;

                startScroll =
                    slider.scrollLeft;

                slider.style.cursor = "grabbing";

            }
        );


        slider.addEventListener(
            "mousemove",
            function (event) {

                if (!dragging) {
                    return;
                }


                event.preventDefault();


                const distance =
                    event.pageX - startX;


                slider.scrollLeft =
                    startScroll - distance;

            }
        );


        function stopDragging() {

            dragging = false;

            slider.style.cursor = "grab";

        }


        slider.addEventListener(
            "mouseup",
            stopDragging
        );

        slider.addEventListener(
            "mouseleave",
            stopDragging
        );

    }


    /* =====================================================
       10. HERO BUTTON
    ===================================================== */

    const heroButton =
        document.querySelector(".hero-btn");


    if (heroButton) {

        heroButton.addEventListener(
            "click",
            function (event) {

                const target =
                    document.getElementById("all-rides");


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       11. BACK TO TOP
    ===================================================== */

    const backTop =
        document.querySelector(
            ".footer-bottom a"
        );


    if (backTop) {

        backTop.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       12. NAVBAR HIDE / SHOW
    ===================================================== */

    const header =
        document.querySelector(".main-header");

    let lastScroll =
        window.scrollY;


    window.addEventListener(
        "scroll",
        function () {

            if (!header) {
                return;
            }


            const currentScroll =
                window.scrollY;


            if (currentScroll <= 80) {

                header.style.transform =
                    "translateY(0)";

                lastScroll =
                    currentScroll;

                return;

            }


            if (currentScroll > lastScroll) {

                header.style.transform =
                    "translateY(-100%)";

            } else {

                header.style.transform =
                    "translateY(0)";

            }


            lastScroll =
                currentScroll;

        }
    );


    /* =====================================================
       13. INITIALIZE
    ===================================================== */

    updateCounter();

});