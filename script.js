/* =======================================================
   1. GLOBAL SYSTEM CONFIGURATIONS
======================================================= */

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
   2. AI SYSTEM OVERLAY
======================================================= */
const aiEntranceOverlay = document.getElementById("aiEntranceOverlay");
const initializeAiSystemBtn = document.getElementById("initializeAiSystemBtn");

if(initializeAiSystemBtn && aiEntranceOverlay) {
    initializeAiSystemBtn.addEventListener("click", () => {
        aiEntranceOverlay.classList.add("terminate");
        setTimeout(() => {
            triggerSystemToast("Welcome to Ayush Singh's Portfolio Matrix Node! ⚡");
            startCounterAnimation();
            initLiveNewsTickerSystem(); 
            initVoiceCommandGateway(); 
        }, 600);
    });
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
   4. DASHBOARD TERMINAL & BULLETPROOF LIVE NEWS ENGINE
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

// 100% UNSTOPPABLE REAL-TIME DYNAMIC NEWS STREAMER (ENGLISH + HINDI)
async function initLiveNewsTickerSystem() {
    const wrapper = document.getElementById("liveNewsWrapper");
    if (!wrapper) return;

    // Backup Live Headlines Stream Array (Ensures instant loading never gets stuck)
    let newsFeedPool = [
        {
            title: "Union Budget 2026 Focuses on Infrastructure and Tech Hub Expansion",
            source: "Financial Express",
            time: "JUST NOW",
            link: "https://news.google.com"
        },
        {
            title: "भारत का विदेशी मुद्रा भंडार रिकॉर्ड स्तर पर पहुंचा, अर्थव्यवस्था मजबूत",
            source: "Dainik Jagran",
            time: "LIVE 🔴",
            link: "https://news.google.com"
        },
        {
            title: "ISRO Prepares for Next-Gen Satellite Launch From Sriharikota Cluster",
            source: "NDTV Science",
            time: "5m AGO",
            link: "https://news.google.com"
        },
        {
            title: "भारतीय IT कंपनियों ने क्लाउड और AI गवर्नेंस प्रोजेक्ट्स में बढ़ाई हायरिंग",
            source: "Amar Ujala Tech",
            time: "12m AGO",
            link: "https://news.google.com"
        },
        {
            title: "Global Tech Giants Expand R&D Engineering Centres in Hyderabad and Bengaluru",
            source: "Economic Times",
            time: "LIVE 🔴",
            link: "https://news.google.com"
        }
    ];

    let newsIndex = 0;

    // Background fetch from live Google News RSS
    async function fetchExternalGoogleNews() {
        try {
            const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%3Fhl%3Den-IN%26gl%3DIN%26ceid%3DIN%3Aen");
            const data = await res.json();
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                const freshFetched = data.items.slice(0, 10).map(item => ({
                    title: item.title,
                    source: item.author || 'Google News',
                    time: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'LIVE',
                    link: item.link
                }));
                newsFeedPool = freshFetched.concat(newsFeedPool); // Prepend fresh live items
            }
        } catch (e) {
            console.log("Using cached live stream pool.");
        }
    }

    fetchExternalGoogleNews(); // Trigger background fetch

    function renderNextNewsCard() {
        if (newsFeedPool.length === 0) return;

        const item = newsFeedPool[newsIndex];

        wrapper.innerHTML = `
            <div class="news-card fade-in" style="border-bottom: 1px solid var(--border-color); padding: 12px 0; transition: all 0.5s ease;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <span class="news-tag" style="color:var(--accent-glow); font-size:0.75rem; font-weight:bold; letter-spacing:0.5px;">LIVE BROADCAST 🔴</span>
                    <span style="font-size:0.7rem; background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid #ef4444; padding:2px 8px; border-radius:10px; font-weight:bold;">${item.time}</span>
                </div>
                <h4 style="font-size:0.92rem; color:var(--text-main); margin-bottom:6px; line-height:1.4; font-weight:600;">${item.title}</h4>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-satellite-dish"></i> ${item.source}</span>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-glow); font-size:0.78rem; text-decoration:none; font-weight:bold;">Read News →</a>
                </div>
            </div>
        `;

        newsIndex = (newsIndex + 1) % newsFeedPool.length;
    }

    renderNextNewsCard();
    setInterval(renderNextNewsCard, 5000); // Rotates every 5 seconds continuously
}

// CYBER SECURITY LEDGER TOGGLE FUNCTION (FIXED)
function toggleCyberSecurityPanel() {
    const content = document.getElementById("cyberDropdownContentPane");
    const icon = document.getElementById("cyberChevronIcon");
    if(!content) return;
    
    content.classList.toggle("open");
    if(icon) icon.classList.toggle("rotate-active");
}


/* =======================================================
   5. ADVANCED AI INTERACTIVE CHATBOT ENGINE
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
    setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 50);
}

function triggerQuickChatAction(type) {
    if(!chatBody) return;
    const botBubble = document.createElement("div");
    botBubble.className = "chat-msg bot";

    if(type === 'skills') {
        botBubble.innerHTML = "Ayush is an expert in <b>Java 21, Spring Boot, Microservices, Kafka, Redis, SQL, and System Design</b>. Check out the Skills section! 🚀";
    } else if(type === 'projects') {
        botBubble.innerHTML = "Ayush has engineered Auth Platforms, High-Throughput Data Pipelines, and API Sandboxes. Test them directly in the Projects section! 🛠️";
    } else if(type === 'contact') {
        botBubble.innerHTML = "Direct email: <a href='mailto:aayushs821@gmail.com' style='color:#4cc9ff;'>aayushs821@gmail.com</a>. You can also leave your message here! 📧";
    }
    chatBody.appendChild(botBubble);
    scrollChatToBottom();
}

function generateSmartAiResponse(userText) {
    const text = userText.toLowerCase().trim();

    const profanityRegex = /(gaali|abuse|fuck|bitch|shit|stupid|idiot|chutiya|bakwas|pagal|crap|harami|bkl|mc|bc|gandu|saale|kamina)/i;
    if (profanityRegex.test(text)) {
        return "I request you to please maintain a respectful and professional tone! 🙏 I am here to assist you politely regarding Ayush's work, tech stack, or engineering inquiries. How can I help you nicely?";
    }

    const affectionRegex = /(love|pyar|pyaar|sweet|cute|awesome|great|amazing|like you|marry|handsome|smart|dil|best|love you|heart|dil se)/i;
    if (affectionRegex.test(text)) {
        return "Aww, thank you so much for such warm and sweet words! ❤️ I really appreciate your kindness. Feel free to ask anything about Ayush's skills, experience, or projects!";
    }

    const angerRegex = /(angry|gussa|hate|worst|useless|bekar|problem|frustrated|furious|annoyed)/i;
    if (angerRegex.test(text)) {
        return "I am truly sorry if something didn't meet your expectation! 😔 Please let me know what went wrong or what information you are looking for—I will gladly help you out right away.";
    }

    const religionRegex = /(god|bhagwan|allah|jesus|religion|dharam|mandir|masjid|ram|krishna|waheguru|faith)/i;
    if (religionRegex.test(text)) {
        return "Ayush believes in hard work, technical excellence, unity, and mutual respect for all cultures and faiths! 🙏 How can I help you explore his backend development journey today?";
    }

    const greetingRegex = /^(hi|hello|hey|heyy|namaste|hlo|good morning|good evening|good afternoon|ssup|whats up|kaise ho|kaise)/i;
    if (greetingRegex.test(text)) {
        return "Hello! 👋 Welcome! I am Ayush's AI representative. How can I assist you today?";
    }

    if (text.includes("skill") || text.includes("java") || text.includes("spring") || text.includes("stack") || text.includes("technology") || text.includes("tech")) {
        return "Ayush has 5+ years of core experience specializing in Java 21, Spring Boot, Microservices Architecture, Kafka Event Streams, Redis Caching, and SQL Performance Tuning! ⚡";
    }

    if (text.includes("experience") || text.includes("work") || text.includes("job") || text.includes("role") || text.includes("company") || text.includes("career")) {
        return "Ayush is a Senior Software Developer building high-performance, enterprise-grade distributed backend systems with 99.99% availability benchmarks! 💼";
    }

    if (text.includes("project") || text.includes("auth") || text.includes("sandbox") || text.includes("pipeline") || text.includes("api")) {
        return "Ayush has built Enterprise Auth Platforms, High-Volume Data Pipelines, and OpenAPI Mock Sandboxes. You can interactively test them above in the Projects section! 🛠️";
    }

    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach") || text.includes("call") || text.includes("phone") || text.includes("number")) {
        return "You can email Ayush directly at <b>aayushs821@gmail.com</b> 📧. Or type your email/phone number right here and I will save your message!";
    }

    if (text.includes("salary") || text.includes("location") || text.includes("hyderabad") || text.includes("notice") || text.includes("available")) {
        return "Ayush is based out of Hyderabad, India, and is open to high-impact Senior Backend/Microservices roles. Feel free to send an email to discuss details! 📍";
    }

    return `Thanks for your message: "${userText}"! I'm constantly learning. To discuss this directly with Ayush, feel free to drop an email to aayushs821@gmail.com or leave your contact details here! ✉️`;
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
    chatInput.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') sendClientMessage();
    });
}

const backToTopBtn = document.getElementById("top");
if(backToTopBtn) {
    backToTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}
