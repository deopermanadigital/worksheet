/* ==========================================================
MEGA BUNDLE WORKSHEET
SCRIPT.JS V1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADER
    ===================================== */

    window.addEventListener("load", () => {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 400);

        }

    });

    /* =====================================
       STICKY HEADER
    ===================================== */

    const header = document.getElementById("header");

    function stickyHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    }

    window.addEventListener("scroll", stickyHeader);

    stickyHeader();

    /* =====================================
       PROGRESS BAR
    ===================================== */

    const progress = document.getElementById("progress");

    function progressBar() {

        if (!progress) return;

        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progressWidth =
            (window.pageYOffset / totalHeight) * 100;

        progress.style.width = progressWidth + "%";

    }

    window.addEventListener("scroll", progressBar);

    progressBar();

    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuBtn = document.querySelector(".menu-toggle");

    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

        });

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

            });

        });

    }

    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target =
                document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /* =====================================
       PREVIEW SLIDER
    ===================================== */

    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentSlide = 0;

    function showSlide(index) {

        if (!slides.length) return;

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }

    if (nextBtn) {

        nextBtn.addEventListener("click", nextSlide);

    }

    if (prevBtn) {

        prevBtn.addEventListener("click", prevSlide);

    }

    if (slides.length > 1) {

        setInterval(nextSlide, 4000);

    }

    showSlide(currentSlide);



    /* =====================================
       REVEAL ANIMATION
    ===================================== */

    const reveals = document.querySelectorAll(".reveal");

    function revealSection() {

        const windowHeight = window.innerHeight;

        reveals.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < windowHeight - 80) {

                item.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", revealSection);

    revealSection();



    /* =====================================
       COUNTER
    ===================================== */

    const counters = document.querySelectorAll(".counter h2");

    let counterStarted = false;

    function animateCounter() {

        if (counterStarted) return;

        const counterBox = document.querySelector(".counter");

        if (!counterBox) return;

        const top = counterBox.getBoundingClientRect().top;

        if (top > window.innerHeight - 100) return;

        counterStarted = true;

        counters.forEach(counter => {

            const original = counter.innerText;

            const value = parseInt(original.replace(/\D/g, ""));

            if (!value) return;

            let start = 0;

            const speed = value / 80;

            const interval = setInterval(() => {

                start += speed;

                if (start >= value) {

                    counter.innerText = original;

                    clearInterval(interval);

                } else {

                    if (original.includes("+")) {

                        counter.innerText =
                            Math.floor(start) + "+";

                    } else {

                        counter.innerText =
                            Math.floor(start);

                    }

                }

            }, 20);

        });

    }

    window.addEventListener("scroll", animateCounter);

    animateCounter();



    /* =====================================
       RIPPLE BUTTON
    ===================================== */

    document.querySelectorAll(".buy,.btn,.buy-now,.cta a")
    .forEach(button => {

        button.addEventListener("click", function(e){

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left =
                (e.clientX - rect.left) + "px";

            ripple.style.top =
                (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            },600);

        });

    });



    /* =====================================
       ACTIVE MENU
    ===================================== */

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll("#navbar a");

    function activeMenu(){

        let current = "";

        sections.forEach(section=>{

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll",activeMenu);

    activeMenu();

    /* =====================================
       FAQ ACCORDION
    ===================================== */

    const faqItems = document.querySelectorAll(".faq details");

    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) return;

            faqItems.forEach(other => {

                if (other !== item) {

                    other.open = false;

                }

            });

        });

    });



    /* =====================================
       STICKY BUY MOBILE
    ===================================== */

    const stickyBuy = document.querySelector(".sticky-buy");

    function toggleStickyBuy() {

        if (!stickyBuy) return;

        if (window.innerWidth > 768) {

            stickyBuy.style.display = "none";
            return;

        }

        if (window.scrollY > 500) {

            stickyBuy.style.display = "flex";

        } else {

            stickyBuy.style.display = "none";

        }

    }

    window.addEventListener("scroll", toggleStickyBuy);

    window.addEventListener("resize", toggleStickyBuy);

    toggleStickyBuy();



    /* =====================================
       ACTIVE NAVBAR SCROLL
    ===================================== */

    const navLinksAll = document.querySelectorAll("#navbar a");

    navLinksAll.forEach(link => {

        link.addEventListener("click", () => {

            navLinksAll.forEach(nav => {

                nav.classList.remove("active");

            });

            link.classList.add("active");

        });

    });



    /* =====================================
       IMAGE LAZY FALLBACK
    ===================================== */

    document.querySelectorAll("img").forEach(img => {

        if (!img.hasAttribute("loading")) {

            img.setAttribute("loading", "lazy");

        }

    });



    /* =====================================
       CONSOLE INFO
    ===================================== */

    console.log("%cMega Bundle Worksheet V1.0",
        "color:#7b2ff7;font-size:18px;font-weight:bold");

    console.log("Developed by Deo Permana Digital");
    
    
});
