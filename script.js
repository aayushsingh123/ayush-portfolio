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
CRASH-PROOF COUNTER WITH OBSERVER
=========================*/
const startCounterAnimation = () => {
    const counters = document.querySelectorAll(".achievement-card h1");
    const speed = 150; 

    counters.forEach(counter => {
        // Asli value ko data-target attribute me safe save kar lo
        if (!counter.getAttribute("data-target")) {
            counter.setAttribute("data-target", counter.innerText);
            counter.innerText = "0"; // Start from zero
        }

        const targetString = counter.getAttribute("data-target");
        const targetValue = parseFloat(targetString);
        let current = 0;
        counter.setAttribute("data-count", current);

        const update = () => {
            let currentCount = +counter.getAttribute("data-count");
            const increment = targetValue / speed;

            if (currentCount < targetValue) {
                currentCount += increment;
                counter.setAttribute("data-count", currentCount);

                if (targetString.includes("%")) {
                    counter.innerText = currentCount.toFixed(2) + "%";
                } else if (targetString.includes("+")) {
                    counter.innerText = Math.ceil(currentCount) + "+";
                } else {
                    counter.innerText = Math.ceil(currentCount);
                }
                requestAnimationFrame(update);
            } else {
                counter.innerText = targetString; // Sahi stop window parse
            }
        };
        update();
    });
};

// Naya separate observer jo loop ko crash nahi hone dega
const achievementSection = document.querySelector(".achievements");
if (achievementSection) {
    const achievementObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounterAnimation();
                observerInstance.unobserve(entry.target); // Ek baar chalne ke baad band!
            }
        });
    }, { threshold: 0.2 });

    achievementObserver.observe(achievementSection);
}/*=========================
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
}// New Reveal handler matching your existing portfolio pattern
const newElementsReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            entry.target.classList.add("animate-show");
        }
    });
}, { threshold: 0.1 });

// Targets both container cards
document.querySelectorAll(".hub-card, .feedback-container").forEach(el => {
    newElementsReveal.observe(el);
});/* =======================================================
   ANIMATIONS TRIGGER SYSTEMS FOR THEME SWITCH & LIVE TABS
======================================================= */

// Theme Environment Runtime Configuration Engine
const toggleBtnNode = document.getElementById("themeToggle");
if(toggleBtnNode) {
    toggleBtnNode.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const currentStatus = document.body.classList.contains("light-theme") ? "Light Mode Active" : "Dark Mode Active";
        if(typeof triggerSystemToast === "function") {
            triggerSystemToast(`Theme Engine: Config changed to ${currentStatus}`);
        }
    });
}

// Universal Dashboard Multi-Tab Panel Switch Mechanics
function switchDashboardTab(tabId) {
    document.querySelectorAll(".hub-content-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    
    const activeBtn = event.currentTarget;
    if(activeBtn && activeBtn.parentElement) {
        activeBtn.parentElement.querySelectorAll(".tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
    }
    
    const targetedPanel = document.getElementById(tabId);
    if(targetedPanel) targetedPanel.classList.add("active");
    if(activeBtn) activeBtn.classList.add("active");
}

// Guided Breath Sync Dynamic Controller loop
const breathTxtNode = document.getElementById("breathTxt");
if(breathTxtNode) {
    setInterval(() => {
        if(breathTxtNode.innerText === "Inhale") {
            breathTxtNode.innerText = "Exhale";
        } else {
            breathTxtNode.innerText = "Inhale";
        }
    }, 4000);
}/* =======================================================
   REVIEWS LOGIC, SYSTEM CHATBOX, LIGHT SWITCH & LIVE TABS
======================================================= */

// Core Alert System Toast Trigger Configuration
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

// Light / Dark Theme Environment Logic Fix
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if(themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        
        // Sync icon graphics instantly
        if(isLight) {
            themeIcon.className = "fas fa-sun";
            triggerSystemToast("Environment: Light Mode Enabled");
        } else {
            themeIcon.className = "fas fa-adjust";
            triggerSystemToast("Environment: Dark Mode Enabled");
        }
    });
}

// Interactive Live Dashboard Multi-Tab Panel Switch Controller
function switchDashboardTab(tabId) {
    document.querySelectorAll(".hub-content-panel").forEach(panel => {
        panel.classList.remove("active");
    });
    
    const activeBtn = event.currentTarget;
    if(activeBtn && activeBtn.parentElement) {
        activeBtn.parentElement.querySelectorAll(".tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
    }
    
    const targetedPanel = document.getElementById(tabId);
    if(targetedPanel) targetedPanel.classList.add("active");
    if(activeBtn) activeBtn.classList.add("active");
}

// Guided Breath Sync Loop Core Counter
const breathTxtNode = document.getElementById("breathTxt");
if(breathTxtNode) {
    setInterval(() => {
        breathTxtNode.innerText = (breathTxtNode.innerText === "Inhale") ? "Exhale" : "Inhale";
    }, 4000);
}

// Chatbox Interface Widgets Drawer Mechanics
const chatBadge = document.getElementById("chatBadge");
const chatWidget = document.getElementById("chatWidget");
const chatHeader = document.getElementById("chatHeader");

if(chatBadge && chatWidget && chatHeader) {
    chatBadge.addEventListener("click", () => {
        chatWidget.classList.add("active");
        chatWidget.style.bottom = "110px";
        chatWidget.style.opacity = "1";
    });
    
    chatHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        chatWidget.classList.remove("active");
        chatWidget.style.bottom = "-500px";
        chatWidget.style.opacity = "0";
    });
}

// Send Message Chat System Framework
const sendChatBtn = document.getElementById("sendChatBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

function sendClientMessage() {
    if(!chatInput || chatInput.value.trim() === "") return;
    
    const userText = chatInput.value;
    const userBubble = document.createElement("div");
    userBubble.className = "chat-msg user";
    userBubble.style.cssText = "background: #2563eb; color: white; align-self: flex-end; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px;";
    userBubble.innerText = userText;
    chatBody.appendChild(userBubble);
    
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
    
    triggerSystemToast("Notification: Message buffered to chat backup!");

    setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.className = "chat-msg bot";
        botBubble.style.cssText = "background: rgba(255,255,255,0.05); color: #cbd5e1; align-self: flex-start; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px;";
        botBubble.innerText = "Received! Your message logs have been saved. Ayush will get back to you soon. ⚡";
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

// Real-time Feedback Dynamic Compilation Protocol
const reviewForm = document.getElementById("portfolioFeedbackForm");
const reviewsContainerStack = document.getElementById("reviewsContainerStack");

if(reviewForm && reviewsContainerStack) {
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const clientName = document.getElementById("feedbackName").value;
        const clientReview = document.getElementById("feedbackMessage").value;
        
        // Generate a clean custom card layout instantly inside the view array
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-compiled-card";
        reviewCard.innerHTML = `<h4><i class="fas fa-user-circle"></i> ${clientName}</h4><p>${clientReview}</p>`;
        
        reviewsContainerStack.prepend(reviewCard); // Top stack placement
        triggerSystemToast(`Success: Review compiled for ${clientName}! ✨`);
        
        reviewForm.reset();
    });
}
// AI System Overlay Initiation Module
const aiEntranceOverlay = document.getElementById("aiEntranceOverlay");
const initializeAiSystemBtn = document.getElementById("initializeAiSystemBtn");

if(initializeAiSystemBtn && aiEntranceOverlay) {
    initializeAiSystemBtn.addEventListener("click", () => {
        aiEntranceOverlay.classList.add("terminate");
        setTimeout(() => {
            triggerSystemToast("AI Core Shell Synced. Welcome To Ayush Portfolio Matrix! ⚡");
            startCounterAnimation();
        }, 800);
    });
}

// Typing Animation Engine
const words = ["Senior Java Backend Engineer", "Spring Boot Developer", "Microservices Architect", "Kafka & Redis Enthusiast", "Problem Solver"];
let wordIndex = 0, charIndex = 0, isDeleting = false;
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
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 90);
}
typeEffect();

// Sticky Navbar Configurations
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        nav.style.background = "rgba(5, 8, 22, 0.9)";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,.35)";
    } else {
        nav.style.background = "rgba(255,255,255,.05)";
        nav.style.boxShadow = "none";
    }
});

// Theme Management Engine (Working Perfectly)
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if(themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const isLight = document.body.classList.contains("light");
        if(themeIcon) {
            themeIcon.className = isLight ? "fas fa-sun" : "fas fa-adjust";
        }
        triggerSystemToast(isLight ? "Environment: Light Mode Enabled" : "Environment: Dark Mode Enabled");
    });
}

// Crash-Proof Separate Counter Logic (Resolves the blue background box freezing issue)
function startCounterAnimation() {
    const counters = document.querySelectorAll(".achievement-card h1");
    counters.forEach(counter => {
        const targetValue = parseFloat(counter.getAttribute("data-target"));
        let current = 0;
        const speed = 100;
        const increment = targetValue / speed;

        const update = () => {
            if (current < targetValue) {
                current += increment;
                if(targetValue % 1 !== 0) {
                    counter.innerText = current.toFixed(2) + "%";
                } else {
                    counter.innerText = Math.ceil(current) + "+";
                }
                requestAnimationFrame(update);
            } else {
                counter.innerText = targetValue % 1 !== 0 ? targetValue + "%" : targetValue + "+";
            }
        };
        update();
    });
}

// Universal Tab Switcher Logic
function switchDashboardTab(tabId) {
    document.querySelectorAll(".hub-content-panel").forEach(panel => panel.classList.remove("active"));
    const activeBtn = event.currentTarget;
    if(activeBtn && activeBtn.parentElement) {
        activeBtn.parentElement.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    }
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) targetPanel.classList.add("active");
    if(activeBtn) activeBtn.classList.add("active");
}

// Guided Breath Circle Node Simulation
const breathTxtNode = document.getElementById("breathTxt");
if(breathTxtNode) {
    setInterval(() => {
        breathTxtNode.innerText = (breathTxtNode.innerText === "Inhale") ? "Exhale" : "Inhale";
    }, 4000);
}

// Feedback Processing & Stack Display
const reviewForm = document.getElementById("portfolioFeedbackForm");
const reviewsContainerStack = document.getElementById("reviewsContainerStack");

if(reviewForm && reviewsContainerStack) {
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const clientName = document.getElementById("feedbackName").value;
        const clientReview = document.getElementById("feedbackMessage").value;
        
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-compiled-card";
        reviewCard.innerHTML = `<h4><i class="fas fa-user-circle"></i> ${clientName}</h4><p>${clientReview}</p>`;
        
        reviewsContainerStack.prepend(reviewCard);
        triggerSystemToast(`Success: Review added for ${clientName}! ✨`);
        reviewForm.reset();
    });
}

// Chatbot Interface Drawer Mechanics
const chatBadge = document.getElementById("chatBadge");
const chatWidget = document.getElementById("chatWidget");
const chatHeader = document.getElementById("chatHeader");

if(chatBadge && chatWidget && chatHeader) {
    chatBadge.addEventListener("click", () => {
        chatWidget.classList.add("active");
        chatWidget.style.bottom = "110px";
        chatWidget.style.opacity = "1";
    });
    chatHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        chatWidget.classList.remove("active");
        chatWidget.style.bottom = "-500px";
        chatWidget.style.opacity = "0";
    });
}

// Core Toast Notifier
function triggerSystemToast(msg) {
    const box = document.getElementById("alertNotificationBox");
    const txt = document.getElementById("notificationText");
    if(!box || !txt) return;
    txt.innerText = msg;
    box.style.bottom = "30px";
    setTimeout(() => { box.style.bottom = "-100px"; }, 4000);
}
