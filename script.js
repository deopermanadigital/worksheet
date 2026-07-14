/* ==========================================================
SCRIPT.JS PREMIUM V4.0
PART 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================
LOADER
========================================================== */

const loader = $("#loader");

window.addEventListener("load", () => {

    if (!loader) return;

    loader.style.opacity = "0";

    setTimeout(() => {

        loader.style.display = "none";

    }, 500);

});

/* ==========================================================
HEADER + PROGRESS
========================================================== */

const header = $("header");
const progress = $("#progress");

function handleScroll() {

    const scroll = window.scrollY;

    if (header) {

        header.classList.toggle("sticky", scroll > 40);

    }

    if (progress) {

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percent = (scroll / total) * 100;

        progress.style.width = percent + "%";

    }

}

handleScroll();

window.addEventListener("scroll", handleScroll);

/* ==========================================================
SMOOTH SCROLL
========================================================== */

$$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", e => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        window.scrollTo({

            top: target.offsetTop - 90,

            behavior: "smooth"

        });

    });

});

/* ==========================================================
REVEAL
========================================================== */

const revealItems = $$(
`
section,
.box,
.bonus-card,
.price-box,
.guarantee,
.counter div
`
);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: .15

});

revealItems.forEach(item => {

    item.classList.add("reveal");

    revealObserver.observe(item);

});

/* ==========================================================
COUNTER
========================================================== */

const counters = $$(".count");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;

        const target =
            parseInt(el.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));

        function update() {

            current += increment;

            if (current >= target) {

                current = target;

            }

            if (target === 4000) {

                el.textContent =
                    current + "+";

            }

            else if (target === 1000) {

                el.textContent =
                    current + "+";

            }

            else if (target === 99) {

                el.textContent =
                    current + "%";

            }

            else {

                el.textContent =
                    current;

            }

            if (current < target) {

                requestAnimationFrame(update);

            }

        }

        update();

        counterObserver.unobserve(el);

    });

}, {

    threshold: .5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* ==========================================================
SLIDER + SWIPE
========================================================== */

const slides = $$(".slide");
const nextBtn = $(".next");
const prevBtn = $(".prev");

if (slides.length) {

    let currentSlide = 0;
    let autoSlide;

    function showSlide(index){

        slides.forEach((slide,i)=>{

            slide.classList.toggle("active",i===index);

        });

    }

    function nextSlide(){

        currentSlide++;

        if(currentSlide>=slides.length){

            currentSlide=0;

        }

        showSlide(currentSlide);

    }

    function prevSlide(){

        currentSlide--;

        if(currentSlide<0){

            currentSlide=slides.length-1;

        }

        showSlide(currentSlide);

    }

    function startAuto(){

        stopAuto();

        autoSlide=setInterval(nextSlide,5000);

    }

    function stopAuto(){

        clearInterval(autoSlide);

    }

    nextBtn?.addEventListener("click",()=>{

        nextSlide();

        startAuto();

    });

    prevBtn?.addEventListener("click",()=>{

        prevSlide();

        startAuto();

    });

    const slider=$(".slider");

    let startX=0;

    slider?.addEventListener("touchstart",(e)=>{

        startX=e.touches[0].clientX;

    });

    slider?.addEventListener("touchend",(e)=>{

        const endX=e.changedTouches[0].clientX;

        const diff=startX-endX;

        if(diff>60){

            nextSlide();

            startAuto();

        }

        if(diff<-60){

            prevSlide();

            startAuto();

        }

    });

    showSlide(currentSlide);

    startAuto();

}

/* ==========================================================
LIGHTBOX
========================================================== */

const lightbox=$("#lightbox");
const lightboxImg=$("#lightboxImg");

slides.forEach(img=>{

    img.addEventListener("click",()=>{

        if(!lightbox||!lightboxImg) return;

        lightbox.style.display="flex";

        lightboxImg.src=img.src;

        document.body.style.overflow="hidden";

    });

});

lightbox?.addEventListener("click",()=>{

    lightbox.style.display="none";

    document.body.style.overflow="";

});

/* ==========================================================
PROMO POPUP
========================================================== */

const promoPopup=$("#promoPopup");
const closePopup=$("#closePopup");

if(promoPopup){

    if(!sessionStorage.getItem("promo")){

        setTimeout(()=>{

            promoPopup.style.display="flex";

        },2000);

    }

}

closePopup?.addEventListener("click",()=>{

    promoPopup.style.display="none";

    sessionStorage.setItem("promo","1");

});

promoPopup?.addEventListener("click",(e)=>{

    if(e.target===promoPopup){

        promoPopup.style.display="none";

        sessionStorage.setItem("promo","1");

    }

});

/* ==========================================================
COUNTDOWN
========================================================== */

const countdown=$("#countdown");

if(countdown){

    let end=Date.now()+(2*60*60*1000);

    function updateCountdown(){

        let distance=end-Date.now();

        if(distance<0){

            end=Date.now()+(2*60*60*1000);

            distance=end-Date.now();

        }

        const h=Math.floor(distance/3600000);
        const m=Math.floor((distance%3600000)/60000);
        const s=Math.floor((distance%60000)/1000);

        countdown.textContent=

            String(h).padStart(2,"0")+":"+

            String(m).padStart(2,"0")+":"+

            String(s).padStart(2,"0");

    }

    updateCountdown();

    setInterval(updateCountdown,1000);

}

/* ==========================================================
ACTIVE MENU
========================================================== */

const sections=$$("section[id]");
const menus=$$("#navbar a");

function activeMenu(){

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        if(window.scrollY>=top){

            current=section.id;

        }

    });

    menus.forEach(menu=>{

        menu.classList.remove("active");

        if(menu.getAttribute("href")==="#"+current){

            menu.classList.add("active");

        }

    });

}

activeMenu();

window.addEventListener("scroll",activeMenu);

/* ==========================================================
LIVE SALES POPUP
========================================================== */

const buyers = [

"Rina - Bandung",
"Budi - Surabaya",
"Sinta - Jakarta",
"Andi - Gresik",
"Nabila - Malang",
"Dewi - Semarang",
"Fajar - Jogja",
"Yuni - Bekasi",
"Putri - Bali",
"Arif - Sidoarjo",
"Lina - Makassar",
"Rizky - Kediri"

];

const salesPopup=$("#salesPopup");
const buyerName=$("#buyerName");
const buyerTime=$("#buyerTime");

function randomMinute(){

    return Math.floor(Math.random()*9)+1;

}

function showSales(){

    if(!salesPopup) return;

    buyerName.textContent=

    buyers[Math.floor(Math.random()*buyers.length)];

    buyerTime.textContent=

    randomMinute()+" menit lalu";

    salesPopup.classList.add("show");

    setTimeout(()=>{

        salesPopup.classList.remove("show");

    },4500);

}

setTimeout(showSales,5000);

setInterval(showSales,18000);


/* ==========================================================
BUTTON RIPPLE
========================================================== */

$$(".buy,.btn,.buy-now,.cta a").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=
        (e.clientX-rect.left-size/2)+"px";

        ripple.style.top=
        (e.clientY-rect.top-size/2)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/* ==========================================================
LAZY IMAGE
========================================================== */

$$("img").forEach(img=>{

    img.loading="lazy";

    img.decoding="async";

});


/* ==========================================================
PARALLAX BLOB
========================================================== */

const blobs=$$(".blob");

window.addEventListener("mousemove",(e)=>{

    const x=e.clientX/window.innerWidth;

    const y=e.clientY/window.innerHeight;

    blobs.forEach((blob,index)=>{

        const speed=(index+1)*12;

        blob.style.transform=

        `translate(${x*speed}px,${y*speed}px)`;

    });

});


/* ==========================================================
FAQ ACCORDION
========================================================== */

$$(".faq details").forEach(item=>{

    item.addEventListener("toggle",()=>{

        if(item.open){

            $$(".faq details").forEach(other=>{

                if(other!==item){

                    other.removeAttribute("open");

                }

            });

        }

    });

});


/* ==========================================================
MOBILE MENU
========================================================== */

const menuToggle=$("#menuToggle");
const navbar=$("#navbar");

menuToggle?.addEventListener("click",()=>{

    navbar.classList.toggle("active");

});

$$('#navbar a').forEach(link=>{

    link.addEventListener("click",()=>{

        navbar.classList.remove("active");

    });

});


/* ==========================================================
PERFORMANCE
========================================================== */

window.addEventListener("pageshow",()=>{

    document.body.classList.add("loaded");

});


/* ==========================================================
END
========================================================== */

});
