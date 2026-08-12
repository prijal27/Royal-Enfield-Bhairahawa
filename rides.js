
/* =========================================================
   RIDES PAGE JAVASCRIPT
   Royal Enfield Bhairahawa
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. PRELOADER
    ===================================================== */

    const loader = document.getElementById("ridesLoader");

    if (loader) {
        setTimeout(function () {
            loader.classList.add("hide");
        }, 1200);
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
            document.body.style.overflow = "hidden";
        });
    }

    if (mobileClose && mobileMenu) {
        mobileClose.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            document.body.style.overflow = "";
        });
    });


    /* =====================================================
       3. SEARCH OVERLAY
    ===================================================== */

    const openSearch = document.getElementById("openSearch");
    const closeSearch = document.getElementById("closeSearch");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchInput = document.getElementById("searchInput");
    const searchSuggestions =
        document.getElementById("searchSuggestions");


    if (openSearch && searchOverlay) {

        openSearch.addEventListener("click", function () {

            searchOverlay.classList.add("active");

            document.body.style.overflow = "hidden";

            if (searchInput) {
                searchInput.focus();
            }

        });

    }


    if (closeSearch && searchOverlay) {

        closeSearch.addEventListener("click", function () {

            searchOverlay.classList.remove("active");

            document.body.style.overflow = "";

        });

    }


    /* Close search with ESC */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (searchOverlay) {
                searchOverlay.classList.remove("active");
            }

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
            }

            document.body.style.overflow = "";

        }

    });


    /* =====================================================
       4. SEARCH
    ===================================================== */

    if (searchInput && searchSuggestions) {

        searchInput.addEventListener("input", function () {

            const searchText =
                searchInput.value.toLowerCase().trim();

            searchSuggestions.innerHTML = "";


            if (searchText === "") {
                return;
            }


            const cards =
                document.querySelectorAll(".ride-card");


            let found = false;


            cards.forEach(function (card) {

                const titleElement =
                    card.querySelector("h3");

                if (!titleElement) {
                    return;
                }


                const title =
                    titleElement.textContent
                        .toLowerCase()
                        .trim();


                if (title.includes(searchText)) {

                    found = true;


                    const result =
                        document.createElement("a");

                    result.href = "#all-rides";

                    result.textContent =
                        titleElement.textContent.trim();


                    result.addEventListener(
                        "click",
                        function () {

                            searchOverlay.classList.remove(
                                "active"
                            );

                            document.body.style.overflow = "";

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

            const selectedCategory =
                button.getAttribute("data-category");


            /* Remove active from all buttons */

            categoryButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            /* Add active to clicked button */

            button.classList.add("active");


            /* Show / hide cards */

            rideCards.forEach(function (card) {

                const cardCategory =
                    card.getAttribute("data-category");


                if (
                    selectedCategory === "all" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });


            /* Return slider to beginning */

            const slider =
                document.getElementById("ridesSlider");

            if (slider) {

                slider.scrollLeft = 0;

            }


            updateCounter();

        });

    });


    /* =====================================================
       6. RIDE SLIDER
    ===================================================== */

    const slider =
        document.getElementById("ridesSlider");

    const previousButton =
        document.getElementById("ridePrev");

    const nextButton =
        document.getElementById("rideNext");


    function getCardWidth() {

        const visibleCard =
            document.querySelector(
                ".ride-card:not([style*='display: none'])"
            );


        if (!visibleCard) {
            return 0;
        }


        return visibleCard.offsetWidth + 20;

    }


    /* NEXT */

    if (nextButton && slider) {

        nextButton.addEventListener("click", function () {

            slider.scrollBy({

                left: getCardWidth(),

                behavior: "smooth"

            });

        });

    }


    /* PREVIOUS */

    if (previousButton && slider) {

        previousButton.addEventListener(
            "click",
            function () {

                slider.scrollBy({

                    left: -getCardWidth(),

                    behavior: "smooth"

                });

            }
        );

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


        let closestCard = 0;

        let smallestDistance = Infinity;


        visibleCards.forEach(function (card, index) {

            const distance =
                Math.abs(
                    card.offsetLeft -
                    slider.scrollLeft
                );


            if (distance < smallestDistance) {

                smallestDistance = distance;

                closestCard = index;

            }

        });


        const current =
            closestCard + 1;

        const total =
            visibleCards.length;


        if (counter) {

            counter.textContent =
                String(current).padStart(2, "0") +
                " / " +
                String(total).padStart(2, "0");

        }


        if (progress) {

            const percentage =
                (current / total) * 100;

            progress.style.width =
                percentage + "%";

        }

    }


    if (slider) {

        slider.addEventListener(
            "scroll",
            updateCounter
        );

    }


   /* =====================================================
   8. HORIZONTAL EXPLORER SCROLL
===================================================== */

const explorer = document.getElementById("all-rides");

if (explorer && slider) {

    let explorerLocked = false;

    window.addEventListener(
        "wheel",
        function (event) {

            /* Desktop only */
            if (window.innerWidth <= 800) {
                return;
            }

            const rect =
                explorer.getBoundingClientRect();

            const explorerTop =
                rect.top;

            const explorerBottom =
                rect.bottom;

            /*
                Activate only when Explorer is
                around the viewport.
            */

            if (
                explorerTop <= 100 &&
                explorerBottom > window.innerHeight
            ) {

                const maxScroll =
                    slider.scrollWidth -
                    slider.clientWidth;

                const currentScroll =
                    slider.scrollLeft;


                /* =====================================
                   MOVING RIGHT
                ===================================== */

                if (event.deltaY > 0) {

                    if (currentScroll < maxScroll) {

                        event.preventDefault();

                        slider.scrollLeft +=
                            event.deltaY;

                        explorerLocked = true;

                    } else {

                        explorerLocked = false;

                    }

                }


                /* =====================================
                   MOVING LEFT
                ===================================== */

                else if (event.deltaY < 0) {

                    if (currentScroll > 0) {

                        event.preventDefault();

                        slider.scrollLeft +=
                            event.deltaY;

                        explorerLocked = true;

                    } else {

                        explorerLocked = false;

                    }

                }

            }

        },
        {
            passive: false
        }
    );

}


    /* =====================================================
       9. DRAG SLIDER
    ===================================================== */

    if (slider) {

        let isDragging = false;

        let startX = 0;

        let startScroll = 0;


        slider.addEventListener(
            "mousedown",
            function (event) {

                isDragging = true;

                startX = event.pageX;

                startScroll =
                    slider.scrollLeft;

                slider.classList.add("dragging");

            }
        );


        slider.addEventListener(
            "mousemove",
            function (event) {

                if (!isDragging) {
                    return;
                }


                event.preventDefault();


                const distance =
                    event.pageX - startX;


                slider.scrollLeft =
                    startScroll - distance;

            }
        );


        slider.addEventListener(
            "mouseup",
            function () {

                isDragging = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );


        slider.addEventListener(
            "mouseleave",
            function () {

                isDragging = false;

                slider.classList.remove(
                    "dragging"
                );

            }
        );

    }


    /* =====================================================
       10. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".rides-intro, " +
            ".ride-explorer, " +
            ".featured-ride, " +
            ".community-section, " +
            ".rides-cta"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            function (element) {

                element.classList.add("reveal");

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add("visible");

            }
        );

    }


    /* =====================================================
       11. NAVBAR HIDE / SHOW
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
       12. INITIAL SETUP
    ===================================================== */

    updateCounter();

});
document.body.style.overflow = "";
