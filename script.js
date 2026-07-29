/* =======================================================
   1. GLOBAL SYSTEM CONFIGURATIONS & INITIAL LOCK
======================================================= */
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("auth-locked");
});

function triggerSystemToast(msg) {
    const box = document.getElementById("alertNotificationBox");
    const txt = document.getElementById("notificationText");
    if(!box || !txt) return;
    txt.innerText = msg;
    box.style.bottom = "30px";
    setTimeout(() => { box.style.bottom = "-100px"; }, 4000);
}

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
   2. SHIVAJI MOVIE STYLE HOLOGRAM GREETING & ENTRANCE HANDLER
======================================================= */
function triggerMatrixAccess(type) {
    if (type === 'auth') {
        const overlay = document.getElementById("aiEntranceOverlay");
        if (overlay) overlay.style.display = "none";
        toggleAuthModal(true);
        switchAuthTab('signup');
    } else {
        throwAiCongratsHologram("Guest Access Node Verified. Initializing portfolio...");
    }
}


/* =======================================================
   3. CORE UI ANIMATIONS & TYPING EFFECT
======================================================= */

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

window.addEventListener("scroll", () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progressNode = document.getElementById("progressBar");
    if(progressNode) progressNode.style.width = scrolled + "%";
});

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

const semanticHubSearch = document.getElementById("semanticHubSearch");
if(semanticHubSearch) {
    semanticHubSearch.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll("#learningGridHub .hub-card");
        
        cards.forEach(card => {
            const keywords = card.getAttribute("data-keywords") || "";
            if(query === "" || keywords.includes(query)) {
                card.style.display = "flex";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.9)";
                setTimeout(() => { if(semanticHubSearch.value !== "") card.style.display = "none"; }, 300);
            }
        });
    });
}


/* =======================================================
   4. DASHBOARD TERMINAL & AUTOMATIC LIVE NEWS API ENGINE
======================================================= */

function switchDashboardTab(tabId) {
    const panels = document.querySelectorAll(".hub-content-panel");
    panels.forEach(panel => {
        panel.classList.remove("active");
        panel.style.display = "none"; 
    });
    
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) {
        targetPanel.style.display = "block"; 
        setTimeout(() => {
            targetPanel.classList.add("active"); 
        }, 10);
    }
}

const breathTxtNode = document.getElementById("breathTxt");
if(breathTxtNode) {
    let mockValues = ["370", "73%", "ONLINE", "SYS_OK"];
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % mockValues.length;
        breathTxtNode.innerText = mockValues[idx];
    }, 4000);
}

// AUTOMATIC REAL-TIME LIVE NEWS FETCHER FROM PUBLIC API
async function initLiveNewsTickerSystem() {
    const wrapper = document.getElementById("liveNewsWrapper");
    if (!wrapper) return;

    wrapper.innerHTML = `<div class="news-card fade-in" style="padding: 12px 0; color: var(--accent-glow); font-size: 0.85rem;"><i class="fas fa-spinner fa-spin"></i> Fetching live feeds from global servers...</div>`;

    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en');
        const data = await response.json();

        if (data && data.items && data.items.length > 0) {
            let articles = data.items.slice(0, 8);
            let currentIndex = 0;

            function displayCurrentNews() {
                const article = articles[currentIndex];
                wrapper.innerHTML = `
                    <div class="news-card fade-in" style="border-bottom: 1px solid var(--border-color); padding: 12px 0;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                            <span class="news-tag" style="color:var(--accent-glow); font-size:0.75rem; font-weight:bold;">LIVE FEED 🔴</span>
                            <span style="font-size:0.7rem; background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid #ef4444; padding:2px 8px; border-radius:10px; font-weight:bold;">REAL-TIME</span>
                        </div>
                        <h4 style="font-size:0.92rem; color:var(--text-main); margin-bottom:6px; line-height:1.4; font-weight:600;">${article.title}</h4>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                            <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-satellite-dish"></i> ${article.author || 'Google News Live'}</span>
                            <a href="${article.link}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-glow); font-size:0.78rem; text-decoration:none; font-weight:bold;">Read News →</a>
                        </div>
                    </div>
                `;
                currentIndex = (currentIndex + 1) % articles.length;
            }

            displayCurrentNews();
            setInterval(displayCurrentNews, 6000);
        } else {
            throw new Error("No live feeds");
        }
    } catch (error) {
        wrapper.innerHTML = `<div class="news-card" style="padding: 12px 0; color: #ef4444; font-size: 0.85rem;">⚠️ Live Ticker Connection Offline. Showing Cached Secure Node.</div>`;
    }
}

function toggleCyberSecurityPanel() {
    const content = document.getElementById("cyberDropdownContentPane");
    const icon = document.getElementById("cyberChevronIcon");
    if(!content) return;
    content.classList.toggle("open");
    if(icon) icon.classList.toggle("rotate-active");
}


/* =======================================================
   5. ADVANCED AI CHATBOT ENGINE
======================================================= */

const chatBadge = document.getElementById("chatBadge");
const chatWidget = document.getElementById("chatWidget");
const chatHeader = document.getElementById("chatHeader");

if(chatBadge && chatWidget && chatHeader) {
    chatBadge.addEventListener("click", () => {
        chatWidget.classList.add("active");
        scrollChatToBottom();
    });
    chatHeader.querySelector(".fa-chevron-down").addEventListener("click", (e) => {
        e.stopPropagation();
        chatWidget.classList.remove("active");
    });
}

const sendChatBtn = document.getElementById("sendChatBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

function scrollChatToBottom() {
    if(!chatBody) return;
    setTimeout(() => { chatBody.scrollTop = chatBody.scrollHeight; }, 50);
}

function triggerQuickChatAction(type) {
    if(!chatBody) return;
    const botBubble = document.createElement("div");
    botBubble.className = "chat-msg bot";

    if(type === 'skills') {
        botBubble.innerHTML = "Ayush is an expert in <b>Java 21, Spring Boot, Microservices, Kafka, Redis, SQL, and System Design</b>! 🚀";
    } else if(type === 'projects') {
        botBubble.innerHTML = "Ayush has engineered Auth Platforms, High-Throughput Data Pipelines, and API Sandboxes! 🛠️";
    } else if(type === 'contact') {
        botBubble.innerHTML = "Direct email: <a href='mailto:aayushs821@gmail.com' style='color:#4cc9ff;'>aayushs821@gmail.com</a> 📧";
    }
    chatBody.appendChild(botBubble);
    scrollChatToBottom();
}

function generateSmartAiResponse(userText) {
    const text = userText.toLowerCase().trim();
    if (/(gaali|abuse|fuck|bitch|shit|stupid|idiot|chutiya|bakwas|pagal|harami|mc|bc)/i.test(text)) {
        return "I request you to please maintain a respectful and professional tone! 🙏 How can I assist you politely?";
    }
    if (/(love|pyar|pyaar|sweet|cute|awesome|great|amazing|like you)/i.test(text)) {
        return "Aww, thank you so much for such warm and sweet words! ❤️";
    }
    if (/^(hi|hello|hey|heyy|namaste|hlo)/i.test(text)) {
        return "Hello! 👋 Welcome! How can I assist you today?";
    }
    if (text.includes("skill") || text.includes("java") || text.includes("spring")) {
        return "Ayush has 5+ years of experience in Java 21, Spring Boot, Microservices, Kafka, Redis, and SQL! ⚡";
    }
    return `Thanks for your message! You can reach Ayush directly at aayushs821@gmail.com ✉️`;
}

if(sendChatBtn && chatInput && chatBody) {
    const sendClientMessage = () => {
        const userText = chatInput.value.trim();
        if(userText === "") return;
        const userBubble = document.createElement("div");
        userBubble.className = "chat-msg user";
        userBubble.style.cssText = "background: #2563eb; color: white; align-self: flex-end; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px; font-size: 13px; font-family: 'Poppins';";
        userBubble.innerText = userText;
        chatBody.appendChild(userBubble);
        chatInput.value = "";
        scrollChatToBottom();

        setTimeout(() => {
            const botBubble = document.createElement("div");
            botBubble.className = "chat-msg bot";
            botBubble.style.cssText = "background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-main); max-width: 85%; padding: 12px 16px; border-radius: 14px; margin-bottom: 8px; font-size: 13px; line-height: 1.6; font-family: 'Poppins';";
            botBubble.innerHTML = generateSmartAiResponse(userText);
            chatBody.appendChild(botBubble);
            scrollChatToBottom();
        }, 600);
    };

    sendChatBtn.addEventListener("click", sendClientMessage);
    chatInput.addEventListener("keypress", (e) => { if(e.key === 'Enter') sendClientMessage(); });
}


/* =======================================================
   6. MULTI-LANGUAGE TRANSLATOR & VOICE COMMAND ENGINE
======================================================= */

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,bho,pa,sd,gu,te,ta,ml,kn',
        autoDisplay: false
    }, 'google_translate_element');
}

function changePortfolioLanguage(langCode) {
    const googleCombo = document.querySelector('.goog-te-combo');
    if (googleCombo) {
        googleCombo.value = (langCode === 'hi-HR') ? 'hi' : langCode; 
        googleCombo.dispatchEvent(new Event('change'));
        triggerSystemToast(`Language Updated! 🌐`);
    } else {
        document.cookie = `googtrans=/en/${(langCode === 'hi-HR') ? 'hi' : langCode}; path=/;`;
        location.reload();
    }
}

function initVoiceCommandGateway() {
    const micBtn = document.getElementById("voiceCommandBtn");
    if (!micBtn) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    micBtn.addEventListener("click", () => {
        try {
            recognition.start();
            micBtn.classList.add("listening-active");
            triggerSystemToast("Listening for voice command... Speak now 🎤");
        } catch (e) {
            console.log("Mic active");
        }
    });

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript.toLowerCase();
        micBtn.classList.remove("listening-active");
        triggerSystemToast(`Command: "${text}"`);

        if (text.includes("skills")) window.location.href = "#skills";
        else if (text.includes("projects")) window.location.href = "#projects";
        else if (text.includes("contact")) window.location.href = "#contact";
        else if (text.includes("light")) document.body.classList.add("light");
        else if (text.includes("dark")) document.body.classList.remove("light");
    };

    recognition.onerror = () => micBtn.classList.remove("listening-active");
    recognition.onend = () => micBtn.classList.remove("listening-active");
}

/* =======================================================
   7. EXACT SINGLE CENTERED SCI-FI HUD TECH INTERFACE
======================================================= */
function startCyberCanvas() {
    const canvas = document.getElementById("cyberBackgroundCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = Math.max(
            document.body.scrollHeight, 
            document.documentElement.scrollHeight, 
            window.innerHeight
        );
    }
    
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", resizeCanvas);
    resizeCanvas();
    setTimeout(resizeCanvas, 500);

    let r1 = 0, r2 = 0, r3 = 0;

    function renderSciFiHud() {
        ctx.clearRect(0, 0, width, height);

        r1 += 0.025; 
        r2 -= 0.035;
        r3 += 0.045;

        // Exactly screen ke ek specific central position par set karein (Web aur Mobile dono ke liye)
        const cx = width < 768 ? width * 0.5 : width * 0.25;
        const cy = width < 768 ? height * 0.3 : height * 0.45;
        const scale = width < 768 ? 0.85 : 1.25;

        ctx.save();
        ctx.translate(cx, cy);

        // --- 1. OUTER SPINNING DASHED RINGS ---
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 2.5;

        ctx.save();
        ctx.rotate(r1);
        ctx.setLineDash([12 * scale, 8 * scale]);
        ctx.beginPath();
        ctx.arc(0, 0, 180 * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.rotate(r2);
        ctx.setLineDash([35 * scale, 15 * scale, 8 * scale, 15 * scale]);
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, 0, 150 * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // --- 2. INNER SOLID & TARGET RINGS ---
        ctx.setLineDash([]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 125 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 100 * scale, 0, Math.PI * 1.6);
        ctx.stroke();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(0, 0, 70 * scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 40 * scale, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs inside center
        ctx.beginPath();
        ctx.moveTo(-25 * scale, 0); ctx.lineTo(25 * scale, 0);
        ctx.moveTo(0, -25 * scale); ctx.lineTo(0, 25 * scale);
        ctx.stroke();

        // --- 3. SUB-HUD OVERLAPPING SMALL CIRCLE (jaise screenshot mein niche right side hai) ---
        ctx.save();
        ctx.translate(65 * scale, 120 * scale);
        ctx.rotate(r3);
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 2;
        ctx.setLineDash([6 * scale, 6 * scale]);
        ctx.beginPath();
        ctx.arc(0, 0, 45 * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ctx.restore();

        // --- 4. CONNECTOR LINE & DATA METRICS (jaise screenshot mein right side box ki taraf ja raha hai) ---
        ctx.strokeStyle = "rgba(0, 240, 255, 0.85)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx + 150 * scale, cy - 40);
        ctx.lineTo(cx + 270 * scale, cy - 40);
        ctx.lineTo(cx + 300 * scale, cy - 10);
        ctx.stroke();

        // Data node dot
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.arc(cx + 300 * scale, cy - 10, 4, 0, Math.PI * 2);
        ctx.fill();

        // Loading blocks indicator at line bottom
        for (let b = 0; b < 6; b++) {
            ctx.fillRect(cx + 280 * scale + (b * 8), cy, 5, 12);
        }

        requestAnimationFrame(renderSciFiHud);
    }

    renderSciFiHud();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startCyberCanvas);
} else {
    startCyberCanvas();
}
/* =======================================================
   8. DYNAMIC LOGIN, SIGNUP & AI CONGRATS HOLOGRAM ENGINE
======================================================= */
function triggerMatrixAccess(type) {
    if (type === 'auth') {
        const overlay = document.getElementById("aiEntranceOverlay");
        if (overlay) overlay.style.display = "none";
        toggleAuthModal(true);
        switchAuthTab('signup');
    } else {
        throwAiCongratsHologram("Guest Access Node Verified. Initializing portfolio...");
    }
}

function toggleAuthModal(show) {
    const modal = document.getElementById("authModalOverlay");
    if (!modal) return;
    if (show) modal.classList.add("open");
    else modal.classList.remove("open");
}

function switchAuthTab(tab) {
    const loginBtn = document.getElementById("loginTabBtn");
    const signupBtn = document.getElementById("signupTabBtn");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (tab === 'login') {
        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");
        loginForm.classList.add("active-form");
        signupForm.classList.remove("active-form");
    } else {
        signupBtn.classList.add("active");
        loginBtn.classList.remove("active");
        signupForm.classList.add("active-form");
        loginForm.classList.remove("active-form");
    }
}

function handleSignupSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const userData = { name, email, password };
    localStorage.setItem("matrixUser", JSON.stringify(userData));

    triggerSystemToast(`Account created for ${name}! Please Login now. ⚡`);
    switchAuthTab('login');
    
    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("matrixUser"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        toggleAuthModal(false);
        throwAiCongratsHologram(`Authentication Granted! Welcome Back, ${savedUser.name} 🚀`);
    } else if (!savedUser) {
        triggerSystemToast("No account found! Please Sign Up first. ⚠️");
    } else {
        triggerSystemToast("Invalid Security Credentials! Access Denied ❌");
    }
}

function throwAiCongratsHologram(msg) {
    let hologram = document.getElementById("matrixGreetingHologram");
    if (!hologram) {
        hologram = document.createElement("div");
        hologram.id = "matrixGreetingHologram";
        document.body.appendChild(hologram);
    }

    hologram.innerHTML = `
        <div class="greeting-icon-pulse"><i class="fas fa-brain" style="color: #00ffcc;"></i></div>
        <h2 style="color: #00ffcc; text-shadow: 0 0 15px rgba(0,255,204,0.6);">🎉 CONGRATULATIONS! 🎉</h2>
        <p>${msg}</p>
        <button class="ai-btn" onclick="closeGreetingAndEnterPortfolio()" style="border-color: #00ffcc; color: #00ffcc;">ENTER PORTFOLIO MATRIX ⚡</button>
    `;
    hologram.classList.add("active-greeting");
}

function closeGreetingAndEnterPortfolio() {
    const hologram = document.getElementById("matrixGreetingHologram");
    if (hologram) hologram.classList.remove("active-greeting");

    const overlay = document.getElementById("aiEntranceOverlay");
    if (overlay) overlay.classList.add("terminate");

    document.body.classList.remove("auth-locked");

    setTimeout(() => {
        triggerSystemToast("Welcome to Ayush Singh's Portfolio Matrix Node! ⚡");
        startCounterAnimation();
        initLiveNewsTickerSystem(); 
        initVoiceCommandGateway(); 
    }, 600);
}
