
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

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const id = this.getAttribute("href");

        if(id === "#") return;

        const target = document.querySelector(id);

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    });

});

/* =====================================
   SLIDER PREVIEW
===================================== */

const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let currentSlide = 0;

function showSlide(index){

    if(slides.length === 0) return;

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    currentSlide = index;

    if(currentSlide >= slides.length){

        currentSlide = 0;

    }

    if(currentSlide < 0){

        currentSlide = slides.length-1;

    }

    slides[currentSlide].classList.add("active");

}

if(next){

    next.addEventListener("click",()=>{

        showSlide(currentSlide+1);

    });

}

if(prev){

    prev.addEventListener("click",()=>{

        showSlide(currentSlide-1);

    });

}

if(slides.length){

    setInterval(()=>{

        showSlide(currentSlide+1);

    },5000);

}


/* =====================================
   REVEAL ANIMATION
===================================== */

const reveals = document.querySelectorAll(".reveal");

function revealElements(){

    const trigger = window.innerHeight - 120;

    reveals.forEach(el=>{

        const top = el.getBoundingClientRect().top;

        if(top < trigger){

            el.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealElements);

revealElements();


/* =====================================
   COUNTER ANIMATION
===================================== */

const counters = document.querySelectorAll(".counter h2");

let counterPlayed = false;

function runCounter(){

    if(counterPlayed) return;

    const section = document.querySelector(".counter");

    if(!section) return;

    const top = section.getBoundingClientRect().top;

    if(top > window.innerHeight-100) return;

    counterPlayed = true;

    counters.forEach(counter=>{

        const text = counter.innerText;

        const number = parseInt(text.replace(/\D/g,""));

        if(isNaN(number)) return;

        let start = 0;

        const step = Math.ceil(number/80);

        const timer = setInterval(()=>{

            start += step;

            if(start >= number){

                counter.innerText = text;

                clearInterval(timer);

            }else{

                if(text.includes("+")){

                    counter.innerText = start + "+";

                }

                else if(text.includes("/")){

                    counter.innerText = text;

                }

                else{

                    counter.innerText = start;

                }

            }

        },20);

    });

}

window.addEventListener("scroll",runCounter);

runCounter();

/* =====================================
   RIPPLE EFFECT
===================================== */

document.querySelectorAll(".btn,.buy,.buy-now,.secondary,.cta a")
.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=e.clientX-rect.left-size/2+"px";
        ripple.style.top=e.clientY-rect.top-size/2+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/* =====================================
   ACTIVE MENU
===================================== */

const sections=document.querySelectorAll("section[id]");
const navLinks=document.querySelectorAll("#navbar a");

function activeMenu(){

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-120;
        const height=section.offsetHeight;

        if(pageYOffset>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll",activeMenu);

activeMenu();


/* =====================================
   STICKY BUY MOBILE
===================================== */

const stickyBuy=document.querySelector(".sticky-buy");

function stickyMobile(){

    if(!stickyBuy) return;

    if(window.innerWidth>768){

        stickyBuy.style.display="none";
        return;

    }

    if(window.scrollY>500){

        stickyBuy.style.display="flex";

    }else{

        stickyBuy.style.display="none";

    }

}

window.addEventListener("scroll",stickyMobile);

window.addEventListener("resize",stickyMobile);

stickyMobile();


/* =====================================
   PREVENT IMAGE DRAG
===================================== */

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});


/* =====================================
   LAZY LOAD IMAGE
===================================== */

document.querySelectorAll("img").forEach(img=>{

    if(!img.hasAttribute("loading")){

        img.loading="lazy";

    }

});


/* =====================================
   CONSOLE
===================================== */

console.log("%cMega Bundle Worksheet",
"color:#7b2ff7;font-size:18px;font-weight:bold");

console.log("Version 1.0 Final Loaded");

