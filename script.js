// Typing Animation

const words = [
    "Senior Java Backend Engineer",
    "Spring Boot Developer",
    "Microservices Architect",
    "Kafka & Redis Enthusiast",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    let current = words[wordIndex];

    if (!isDeleting) {

        typing.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, isDeleting ? 40 : 90);

}

typeEffect();


// Sticky Navbar

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        nav.style.background = "rgba(0,0,0,.75)";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,.35)";

    } else {

        nav.style.background = "rgba(255,255,255,.05)";
        nav.style.boxShadow = "none";

    }

});


// Scroll Reveal

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(sec=>{

    sec.classList.add("hidden");

    observer.observe(sec);

});


// Cursor Glow

const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});// Skill Animation

const bars=document.querySelectorAll(".progress span");

const observer2=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.width=entry.target.style.width;

}

});

});

bars.forEach(bar=>{

observer2.observe(bar);

});// Timeline Animation

const timeline=document.querySelectorAll(".timeline-item");

const observer3=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateX(0)";

}

});

});

timeline.forEach(item=>{

item.style.opacity="0";
item.style.transform="translateX(-80px)";
item.style.transition="1s";

observer3.observe(item);

});// Project Cards Animation

const cards=document.querySelectorAll(".project-card");

const observer4=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(100px)";

card.style.transition="1s";

observer4.observe(card);

});// Back To Top

document.getElementById("top").onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};/*=========================
LOADER
=========================*/

window.onload=()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},800);

},1500);

};



/*=========================
SCROLL BAR
=========================*/

window.addEventListener("scroll",()=>{

let winScroll=document.body.scrollTop||

document.documentElement.scrollTop;

let height=document.documentElement.scrollHeight-

document.documentElement.clientHeight;

let scrolled=(winScroll/height)*100;

document.getElementById("progressBar").style.width=scrolled+"%";

});



/*=========================
THEME
=========================*/

const theme=document.getElementById("themeToggle");

theme.onclick=()=>{

document.body.classList.toggle("light");

};/*=========================
COUNTER ANIMATION
=========================*/

const counters=document.querySelectorAll(".achievement-card h1");

const speed=200;

counters.forEach(counter=>{

const update=()=>{

const target=counter.innerText;

const value=parseFloat(target);

let current=+counter.getAttribute("data-count")||0;

const increment=value/speed;

if(current<value){

current+=increment;

counter.setAttribute("data-count",current);

if(target.includes("%")){

counter.innerText=current.toFixed(2)+"%";

}else if(target.includes("+")){

counter.innerText=Math.ceil(current)+"+";

}else{

counter.innerText=Math.ceil(current);

}

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

});/*=========================
PARALLAX IMAGE
=========================*/

const profile=document.querySelector(".right img");

document.addEventListener("mousemove",(e)=>{

if(!profile) return;

let x=(window.innerWidth/2-e.pageX)/35;

let y=(window.innerHeight/2-e.pageY)/35;

profile.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;

});

document.addEventListener("mouseleave",()=>{

if(profile){

profile.style.transform="rotateY(0deg) rotateX(0deg)";

}

});



/*=========================
BUTTON RIPPLE EFFECT
=========================*/

document.querySelectorAll(".btn,.btn2,.project-buttons a,.resume-card a").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";
ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.classList.add("ripple");

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});/*=========================
FADE ANIMATION
=========================*/

const fade=document.querySelectorAll(
".testimonial-card,.blog-card,.certificate-card,.service-card"
);

const fadeObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

});

fade.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(80px)";
el.style.transition="1s";

fadeObserver.observe(el);

});


/*=========================
CURRENT YEAR
=========================*/

const footer=document.querySelector("footer p:last-child");

if(footer){

footer.innerHTML=`© ${new Date().getFullYear()} Aayush Singh. All Rights Reserved.`;

}/* =======================================================
   ANIMATED INTERACTIVE LOGIC FOR NEW SECTIONS
======================================================= */

// Toast Controller Engine
function triggerSystemToast(alertMessage) {
    const toastBox = document.getElementById("alertNotificationBox");
    const toastText = document.getElementById("notificationText");
    if(!toastBox || !toastText) return;

    toastText.innerText = alertMessage;
    toastBox.style.bottom = "30px";
    
    setTimeout(() => {
        toastBox.style.bottom = "-100px";
    }, 4000);
}

// Custom Scroll Reveal for New Components (Matching user style.js pattern)
const newElementsReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("animate-show");
        }
    });
}, { threshold: 0.15 });

// Applying the reveal handler
document.querySelectorAll(".hub-card, .feedback-container").forEach(el => {
    newElementsReveal.observe(el);
});

// Global Welcome Alert Trigger
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        triggerSystemToast("Welcome! Learning Hub features are loaded completely. 🚀");
    }, 2500);
});

// Chatbox Drawer Elastic Mechanics
const chatBadge = document.getElementById("chatBadge");
const chatWidget = document.getElementById("chatWidget");
const chatHeader = document.getElementById("chatHeader");

if(chatBadge && chatWidget && chatHeader) {
    chatBadge.addEventListener("click", () => {
        chatWidget.classList.add("active");
    });
    
    chatHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        chatWidget.classList.remove("active");
    });
}

// Send Message Handler
const sendChatBtn = document.getElementById("sendChatBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

function sendClientMessage() {
    if(!chatInput || chatInput.value.trim() === "") return;
    
    const userText = chatInput.value;
    const userBubble = document.createElement("div");
    userBubble.className = "chat-msg user";
    userBubble.innerText = userText;
    chatBody.appendChild(userBubble);
    
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
    
    triggerSystemToast("Notification: Message buffered to backup!");

    setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.className = "chat-msg bot";
        botBubble.innerText = "Received! Your message logs have been saved. I will get back to you soon. ⚡";
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1200);
}

if(sendChatBtn && chatInput) {
    sendChatBtn.addEventListener("click", sendClientMessage);
    chatInput.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') sendClientMessage();
    });
}

// Review Feedback Processor
const reviewForm = document.getElementById("portfolioFeedbackForm");
if(reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const clientName = document.getElementById("feedbackName").value;
        triggerSystemToast(`Notification: Review submitted by ${clientName}! ✨`);
        reviewForm.reset();
    });
}
