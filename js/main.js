document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

});

/* =========================================
   UniTutor - Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       Lucide Icons
    ========================================= */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    /* =========================================
       Mobile Menu
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const unitutorNav = document.getElementById("unitutorNav");

    if (menuToggle && unitutorNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = unitutorNav.classList.toggle("menu-open");

            if (!isOpen && homeDropdown) {
                homeDropdown.classList.remove("dropdown-open");
            }

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }

        });

        /* Close menu when clicking a navigation link */

        /* Close mobile menu when clicking normal navigation links */

        const navigationLinks = unitutorNav.querySelectorAll(
            ".unitutor-menu a:not(.unitutor-dropdown-link)"
        );

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                unitutorNav.classList.remove("menu-open");

                if (homeDropdown) {
                    homeDropdown.classList.remove("dropdown-open");
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i data-lucide="menu"></i>';

                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }

            });

        });

        /* Close menu when resizing to desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 991) {

                unitutorNav.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i data-lucide="menu"></i>';

                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }

            }

        });

    }


    /* =========================================
       Dark Mode
    ========================================= */

    const themeToggle = document.getElementById("themeToggle");
    const mobileThemeToggle =
        document.getElementById("mobileThemeToggle");

    const savedTheme = localStorage.getItem("unitutor-theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
    }


    function updateThemeIcon() {

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        const iconName = isDark ? "sun" : "moon";

        if (themeToggle) {
            themeToggle.innerHTML =
                `<i data-lucide="${iconName}"></i>`;
        }

        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML =
                `<i data-lucide="${iconName}"></i>
                 <span>${isDark ? "Light Mode" : "Dark Mode"}</span>`;
        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }


    function toggleTheme() {

        const isDark =
            document.documentElement.classList.toggle("dark-mode");

        localStorage.setItem(
            "unitutor-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    }


    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener("click", toggleTheme);
    }

    updateThemeIcon();


    /* =========================================
       RTL Mode
    ========================================= */

    const rtlToggle = document.getElementById("rtlToggle");
    const mobileRtlToggle =
        document.getElementById("mobileRtlToggle");

    const savedDirection =
        localStorage.getItem("unitutor-direction");

    if (savedDirection === "rtl") {
        document.documentElement.setAttribute("dir", "rtl");
    }


    function updateRtlButton() {

        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";

        const buttonText =
            isRTL ? "LTR Mode" : "RTL Mode";

        if (mobileRtlToggle) {

            mobileRtlToggle.innerHTML = `
    <i data-lucide="arrow-left-right"></i>
    <span>${buttonText}</span>
`;

        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }


    function toggleRTL() {

        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";

        if (isRTL) {

            document.documentElement.setAttribute("dir", "ltr");

            localStorage.setItem(
                "unitutor-direction",
                "ltr"
            );

        } else {

            document.documentElement.setAttribute("dir", "rtl");

            localStorage.setItem(
                "unitutor-direction",
                "rtl"
            );

        }

        updateRtlButton();

    }


    if (rtlToggle) {
        rtlToggle.addEventListener("click", toggleRTL);
    }

    if (mobileRtlToggle) {
        mobileRtlToggle.addEventListener("click", toggleRTL);
    }

    updateRtlButton();

});

/* =========================================
   Mobile Home Dropdown
========================================= */

const homeDropdown = document.querySelector(".unitutor-dropdown");
const homeDropdownLink = document.querySelector(".unitutor-dropdown-link");

if (homeDropdown && homeDropdownLink) {

    homeDropdownLink.addEventListener("click", (event) => {

        if (window.innerWidth <= 991) {

            event.preventDefault();
            event.stopPropagation();

            homeDropdown.classList.toggle("dropdown-open");

        }

    });

}

/* =========================================================
   UniTutor Hero Slider
   ========================================================= */

const heroSlider = document.getElementById("unitutorHeroSlider");

if (heroSlider) {

    const heroSlides = Array.from(
        heroSlider.querySelectorAll(".unitutor-hero-slide")
    );

    const heroDots = Array.from(
        heroSlider.querySelectorAll(".unitutor-hero-dots button")
    );

    const heroPrev = document.getElementById(
        "unitutorHeroPrev"
    );

    const heroNext = document.getElementById(
        "unitutorHeroNext"
    );

    let heroCurrent = 0;
    let heroAnimating = false;


    /* =====================================================
       Preload Hero Images
    ===================================================== */

    heroSlides.forEach((slide) => {

        const image = slide.querySelector(
            ".unitutor-hero-image"
        );

        if (image && image.src) {
            const preloadImage = new Image();
            preloadImage.src = image.src;
        }

    });


    /* =====================================================
       Update Dots
    ===================================================== */

    function updateHeroDots(index) {

        heroDots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        });

    }


    /* =====================================================
       Change Hero Slide
    ===================================================== */

    function changeHeroSlide(newIndex) {

        /* Stop multiple clicks during animation */

        if (heroAnimating) {
            return;
        }

        /* Same slide */

        if (newIndex === heroCurrent) {
            return;
        }

        const currentSlide =
            heroSlides[heroCurrent];

        const nextSlide =
            heroSlides[newIndex];

        if (!currentSlide || !nextSlide) {
            return;
        }


        heroAnimating = true;

        heroSlider.classList.add(
            "is-animating"
        );


        /* Make sure incoming slide starts clean */

        nextSlide.classList.remove(
            "active",
            "hero-slide-enter"
        );


        /*
         * Force browser to register the clean state
         * before starting the animation.
         */

        void nextSlide.offsetWidth;


        /* Incoming slide */

        nextSlide.classList.add(
            "hero-slide-enter"
        );


        updateHeroDots(newIndex);


        /* =================================================
           Wait for actual animation completion
        ================================================= */

        const finishTransition = () => {

            nextSlide.removeEventListener(
                "animationend",
                finishTransition
            );


            /*
             * Remove old slide completely
             */

            currentSlide.classList.remove(
                "active"
            );


            /*
             * Convert incoming slide
             * into the normal active slide
             */

            nextSlide.classList.remove(
                "hero-slide-enter"
            );

            nextSlide.classList.add(
                "active"
            );


            heroCurrent = newIndex;

            heroAnimating = false;

            heroSlider.classList.remove(
                "is-animating"
            );

        };


        nextSlide.addEventListener(
            "animationend",
            finishTransition
        );

    }


    /* =====================================================
       Next Slide
    ===================================================== */

    function nextHeroSlide() {

        const nextIndex =
            (heroCurrent + 1) %
            heroSlides.length;

        changeHeroSlide(nextIndex);

    }


    /* =====================================================
       Previous Slide
    ===================================================== */

    function previousHeroSlide() {

        const previousIndex =
            (heroCurrent - 1 + heroSlides.length) %
            heroSlides.length;

        changeHeroSlide(previousIndex);

    }


    /* =====================================================
       Arrow Buttons
    ===================================================== */

    if (heroNext) {

        heroNext.addEventListener(
            "click",
            nextHeroSlide
        );

    }

    if (heroPrev) {

        heroPrev.addEventListener(
            "click",
            previousHeroSlide
        );

    }


    /* =====================================================
       Dots
    ===================================================== */

    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            changeHeroSlide(index);

        });

    });

}

/* =========================================
   SCROLL TO TOP
========================================= */

const unitutorScrollTop = document.getElementById("unitutorScrollTop");

if (unitutorScrollTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            unitutorScrollTop.classList.add("show");
        } else {
            unitutorScrollTop.classList.remove("show");
        }

    });

    unitutorScrollTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

const passwordToggles = document.querySelectorAll(".unitutor-password-toggle");

passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {

        const targetId = toggle.getAttribute("data-password-target");
        const passwordInput = document.getElementById(targetId);

        if (!passwordInput) return;

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";

        toggle.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );

        toggle.innerHTML = `
            <i data-lucide="${isPassword ? "eye-off" : "eye"}"></i>
        `;

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    });
});

const pricingFaqItems = document.querySelectorAll(
    ".unitutor-pricing-faq-item"
);

pricingFaqItems.forEach((item) => {
    const question = item.querySelector(
        ".unitutor-pricing-faq-question"
    );

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        pricingFaqItems.forEach((faqItem) => {
            faqItem.classList.remove("active");

            const icon = faqItem.querySelector(
                ".unitutor-pricing-faq-question svg"
            );

            if (icon) {
                icon.outerHTML = `
                    <i data-lucide="plus"></i>
                `;
            }
        });

        if (!isActive) {
            item.classList.add("active");

            const icon = item.querySelector(
                ".unitutor-pricing-faq-question svg"
            );

            if (icon) {
                icon.outerHTML = `
                    <i data-lucide="minus"></i>
                `;
            }
        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    });
});
