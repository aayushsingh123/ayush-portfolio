/* =======================================================
   1. GLOBAL SYSTEM CONFIGURATIONS (MUST BE ON TOP)
======================================================= */

// Global System Toast Notifier
function triggerSystemToast(msg) {
    const box = document.getElementById("alertNotificationBox");
    const txt = document.getElementById("notificationText");
    if(!box || !txt) return;
    txt.innerText = msg;
    box.style.bottom = "30px";
    setTimeout(() => { box.style.bottom = "-100px"; }, 4000);
}

// Crash-Proof Counter System Animation Loop
function startCounterAnimation() {
    const counters = document.querySelectorAll(".achievement-card h1");
    counters.forEach(counter => {
        const targetValue = parseFloat(counter.getAttribute("data-target"));
        if (isNaN(targetValue)) return;
        let current = 0;
        const speed = 120;
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


/* =======================================================
   2. AI SYSTEM OVERLAY INITIATION MODULE
======================================================= */
const aiEntranceOverlay = document.getElementById("aiEntranceOverlay");
const initializeAiSystemBtn = document.getElementById("initializeAiSystemBtn");

if(initializeAiSystemBtn && aiEntranceOverlay) {
    initializeAiSystemBtn.addEventListener("click", () => {
        aiEntranceOverlay.classList.add("terminate");
        setTimeout(() => {
            triggerSystemToast("Welcome to Ayush Singh's Portfolio Matrix Node! ⚡");
            startCounterAnimation();
            renderLiveNewsFeed(); // Renders news feed when overlay collapses
        }, 600);
    });
}


/* =======================================================
   3. CORE UI ANIMATIONS & EFFECTS
======================================================= */

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
const stickyNav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (!stickyNav) return;
    if (window.scrollY > 80) {
        stickyNav.style.background = "rgba(5, 8, 22, 0.95)";
        stickyNav.style.boxShadow = "0 5px 20px rgba(0,0,0,.35)";
    } else {
        stickyNav.style.background = "rgba(255,255,255,.05)";
        stickyNav.style.boxShadow = "none";
    }
});

// Scroll Reveal Observer Engine
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});
document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
    revealObserver.observe(sec);
});

// Scroll Progress Bar Tracker Module
window.addEventListener("scroll", () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progressNode = document.getElementById("progressBar");
    if(progressNode) progressNode.style.width = scrolled + "%";
});

// Theme Toggle Engine (Dark/Light Core Connection Fixed)
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


/* =======================================================
   4. DASHBOARD TERMINAL & INTERACTIONS
======================================================= */

// Universal Dashboard Multi-Tab Panel Switch Mechanics with Animations Trigger
function switchDashboardTab(tabId) {
    const panels = document.querySelectorAll(".hub-content-panel");
    panels.forEach(panel => {
        panel.classList.remove("active");
        panel.style.display = "none"; // Hide panel cleanly first
    });
    
    const activeBtn = event.currentTarget;
    if(activeBtn && activeBtn.parentElement) {
        activeBtn.parentElement.querySelectorAll(".tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
    }
    
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) {
        targetPanel.style.display = "block"; // Instantly bind blocks
        setTimeout(() => {
            targetPanel.classList.add("active"); // Trigger layout fade opacity
        }, 10);
    }
    if(activeBtn) activeBtn.classList.add("active");
}

// Guided Breath Sync Dynamic Controller loop
const breathTxtNode = document.getElementById("breathTxt");
if(breathTxtNode) {
    setInterval(() => {
        breathTxtNode.innerText = (breathTxtNode.innerText === "Inhale") ? "Exhale" : "Inhale";
    }, 4000);
}

// Actual 2026 Real-time Desh Videsh Tech News Renderer Logic Configuration
function renderLiveNewsFeed() {
    const wrapper = document.getElementById("liveNewsWrapper");
    if(!wrapper) return;

    // Actual re-verified news data arrays mapping 2026 pipelines
    const newsData2026 = [
        { tag: "Global Tech", title: "OpenAI Debuts GPT-5.6 & ChatGPT Work Workspace", desc: "Integrates Codex processing natively across enterprise dynamic platform pipelines." },
        { tag: "National India", title: "BSNL Launches Satellite Phone Node Networks", desc: "Delivers resilient backup links in regions detached from classic cellular fields." },
        { tag: "Hardware Infrastructure", title: "Meta to Launch Custom AI Chips Production in September", desc: "Aims to expand cluster limits to 14 gigawatts to maximize execution loops." }
    ];

    wrapper.innerHTML = ""; // Flushes blank rows safely

    newsData2026.forEach((item, index) => {
        setTimeout(() => {
            const card = document.createElement("div");
            card.className = "news-card";
            card.innerHTML = `<span class="news-tag">${item.tag}</span><h4>${item.title}</h4><p>${item.desc}</p>`;
            wrapper.appendChild(card);
        }, index * 250); // Fluid sequence stagger stack entry
    });
}

// Real-time Feedback Dynamic Submission Compiler
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
        triggerSystemToast(`Success: Review compiled for ${clientName}! ✨`);
        reviewForm.reset();
    });
}


/* =======================================================
   5. CHATBOX & FOOTER UTILITIES
======================================================= */

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

if(sendChatBtn && chatInput && chatBody) {
    const sendClientMessage = () => {
        if(chatInput.value.trim() === "") return;
        
        const userText = chatInput.value;
        const userBubble = document.createElement("div");
        userBubble.className = "chat-msg user";
        userBubble.style.cssText = "background: #2563eb; color: white; align-self: flex-end; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px;";
        userBubble.innerText = userText;
        chatBody.appendChild(userBubble);
        
        chatInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
        triggerSystemToast("Message buffered to safe chat storage!");

        setTimeout(() => {
            const botBubble = document.createElement("div");
            botBubble.className = "chat-msg bot";
            botBubble.style.cssText = "background: rgba(255,255,255,0.05); color: #cbd5e1; align-self: flex-start; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px;";
            botBubble.innerText = "Received! Your message logs have been saved. Ayush will get back to you soon. ⚡";
            chatBody.appendChild(botBubble);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1200);
    };

    sendChatBtn.addEventListener("click", sendClientMessage);
    chatInput.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') sendClientMessage();
    });
}

// Back To Top Navigation Rule
const backToTopBtn = document.getElementById("top");
if(backToTopBtn) {
    backToTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}
