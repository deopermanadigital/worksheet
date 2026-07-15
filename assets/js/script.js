/* ==========================================================
MEGA BUNDLE WORKSHEET
SCRIPT.JS
FINAL V1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

const body=document.body;

const loader=document.getElementById("loader");

const progress=document.getElementById("progress");

const header=document.getElementById("header");

const reveals=document.querySelectorAll(".reveal");

const menu=document.querySelector(".menu-toggle");

const navbar=document.getElementById("navbar");

/* ==========================================================
LOADER
========================================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},500);

});

/* ==========================================================
HEADER
========================================================== */

function stickyHeader(){

if(window.scrollY>80){

header.classList.add("sticky");

}else{

header.classList.remove("sticky");

}

}

stickyHeader();

window.addEventListener("scroll",stickyHeader);

/* ==========================================================
PROGRESS BAR
========================================================== */

function scrollProgress(){

const scroll=

document.documentElement.scrollTop;

const height=

document.documentElement.scrollHeight-

document.documentElement.clientHeight;

const width=(scroll/height)*100;

progress.style.width=width+"%";

}

scrollProgress();

window.addEventListener("scroll",scrollProgress);

/* ==========================================================
REVEAL
========================================================== */

const observer=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{

threshold:.15

});

reveals.forEach(item=>{

observer.observe(item);

});

/* ==========================================================
MOBILE MENU
========================================================== */

if(menu){

menu.addEventListener("click",()=>{

navbar.classList.toggle("show");

});

}

document.querySelectorAll("#navbar a").forEach(item=>{

item.addEventListener("click",()=>{

navbar.classList.remove("show");

});

});
/* ==========================================================
SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

if(navbar.classList.contains("show")){

navbar.classList.remove("show");

}

});

});

/* ==========================================================
ACTIVE MENU
========================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("#navbar a");

window.addEventListener("scroll",()=>{

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

});

/* ==========================================================
PREVIEW SLIDER
========================================================== */

const slides=document.querySelectorAll(".slide");

const next=document.querySelector(".next");

const prev=document.querySelector(".prev");

let currentSlide=0;

function showSlide(index){

slides.forEach(slide=>{

slide.classList.remove("active");

});

slides[index].classList.add("active");

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

if(next){

next.addEventListener("click",nextSlide);

}

if(prev){

prev.addEventListener("click",prevSlide);

}

/* ==========================================================
AUTO SLIDER
========================================================== */

setInterval(()=>{

if(slides.length){

nextSlide();

}

},4000);

/* ==========================================================
KEYBOARD
========================================================== */

document.addEventListener("keydown",e=>{

if(e.key==="ArrowRight"){

nextSlide();

}

if(e.key==="ArrowLeft"){

prevSlide();

}

});

/* ==========================================================
POPUP PROMO
========================================================== */

const popup=document.getElementById("promoPopup");
const closePopup=document.getElementById("closePopup");

if(popup){

setTimeout(()=>{

popup.style.display="flex";

},1200);

}

if(closePopup){

closePopup.addEventListener("click",()=>{

popup.style.display="none";

});

}

if(popup){

popup.addEventListener("click",(e)=>{

if(e.target===popup){

popup.style.display="none";

}

});

}

/* ==========================================================
COUNTDOWN
========================================================== */

const countdown=document.getElementById("countdown");

if(countdown){

let totalTime=24*60*60;

setInterval(()=>{

const hours=Math.floor(totalTime/3600);

const minutes=Math.floor((totalTime%3600)/60);

const seconds=totalTime%60;

countdown.textContent=

String(hours).padStart(2,"0")+" : "+

String(minutes).padStart(2,"0")+" : "+

String(seconds).padStart(2,"0");

if(totalTime>0){

totalTime--;

}else{

totalTime=24*60*60;

}

},1000);

}

/* ==========================================================
SCROLL TO TOP
========================================================== */

const waButton=document.querySelector(".wa-help");

if(waButton){

waButton.addEventListener("dblclick",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/* ==========================================================
LAZY IMAGE FADE
========================================================== */

document.querySelectorAll("img").forEach(img=>{

img.addEventListener("load",()=>{

img.style.opacity="1";

});

});

/* ==========================================================
PREVENT EMPTY LINK
========================================================== */

document.querySelectorAll('a[href="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

});

});

/* ==========================================================
END
========================================================== */

});
