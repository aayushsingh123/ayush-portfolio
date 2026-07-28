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
   4. DASHBOARD TERMINAL & REAL-TIME LIVE NEWS ENGINE
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

// REAL-TIME DYNAMIC LIVE NEWS CHANNEL STREAMER (HINDI + ENGLISH)
async function initLiveNewsTickerSystem() {
    const wrapper = document.getElementById("liveNewsWrapper");
    if (!wrapper) return;

    let allLiveNews = [];
    let activeNewsIndex = 0;

    wrapper.innerHTML = `
        <div class="news-card" style="padding:15px 0;">
            <span class="news-tag" style="color:var(--accent-glow); font-size:0.75rem;">LIVE SATELLITE FEED ⚡</span>
            <h4 style="font-size:0.9rem; margin-top:8px; color:var(--text-main);">Fetching live breaking headlines from Google News...</h4>
        </div>
    `;

    async function fetchDynamicLiveFeeds() {
        const rssFeeds = [
            'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',  // Live English India
            'https://news.google.com/rss?hl=hi&gl=IN&ceid=IN:hi'       // Live Hindi Bharat
        ];

        let fetchedArticles = [];

        for (let url of rssFeeds) {
            try {
                const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
                const data = await res.json();
                
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    data.items.slice(0, 10).forEach(item => {
                        fetchedArticles.push({
                            title: item.title,
                            link: item.link,
                            pubDate: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'LIVE',
                            source: item.author || 'Google News'
                        });
                    });
                }
            } catch (err) {
                console.log("Live stream fetch issue, retrying...", err);
            }
        }

        if (fetchedArticles.length > 0) {
            allLiveNews = fetchedArticles.sort(() => Math.random() - 0.5);
        }
    }

    await fetchDynamicLiveFeeds();

    function displayNextNewsHeadline() {
        if (allLiveNews.length === 0) return;

        const currentStory = allLiveNews[activeNewsIndex];

        wrapper.innerHTML = `
            <div class="news-card fade-in" style="border-bottom: 1px solid var(--border-color); padding: 12px 0; transition: all 0.5s ease;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <span class="news-tag" style="color:var(--accent-glow); font-size:0.75rem; font-weight:bold; letter-spacing:0.5px;">LIVE NEWS CHANNEL 🔴</span>
                    <span style="font-size:0.7rem; background:rgba(239,68,68,0.2); color:#ef4444; border:1px solid #ef4444; padding:2px 8px; border-radius:10px; font-weight:bold;">${currentStory.pubDate}</span>
                </div>
                <h4 style="font-size:0.92rem; color:var(--text-main); margin-bottom:6px; line-height:1.4; font-weight:600;">${currentStory.title}</h4>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-satellite-dish"></i> ${currentStory.source}</span>
                    <a href="${currentStory.link}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-glow); font-size:0.78rem; text-decoration:none; font-weight:bold;">Read Full News →</a>
                </div>
            </div>
        `;

        activeNewsIndex = (activeNewsIndex + 1) % allLiveNews.length;
    }

    displayNextNewsHeadline();
    setInterval(displayNextNewsHeadline, 5000); // Cycles headlines every 5 seconds
    setInterval(fetchDynamicLiveFeeds, 300000);  // Refreshes RSS feeds every 5 minutes
}

let currentActiveMockEndpoint = "";
function simulateSwaggerSandbox(endpoint) {
    const box = document.getElementById("swaggerSandboxBox");
    const input = document.getElementById("sandboxUrlInput");
    const output = document.getElementById("sandboxResponseOutput");
    if(!box || !input || !output) return;

    currentActiveMockEndpoint = endpoint;
    input.value = "https://api.ayushsingh.tech" + endpoint;
    output.innerText = "// Click 'Execute' to fire sandbox compilation endpoints requests.";
    box.style.display = "block";
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function executeSandboxApiRequest() {
    const output = document.getElementById("sandboxResponseOutput");
    if(!output) return;

    output.innerText = "{ \"status\": \"Processing payload layers...\", \"timestamp\": " + Date.now() + " }";

    setTimeout(() => {
        if(currentActiveMockEndpoint.includes("auth")) {
            output.innerText = JSON.stringify({
                status: 200,
                message: "Authentication Authorization Token Generated",
                data: {
                    token_type: "Bearer",
                    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.portfolioMockTokenNode...",
                    expires_in: 3600
                }
            }, null, 4);
        } else {
            output.innerText = JSON.stringify({
                status: 200,
                execution_scope: "Data Processing Pipeline Node",
                metrics: {
                    status: "SUCCESS",
                    records_parsed: 4096,
                    latency_reduction: "45% Faster",
                    pipeline_state: "STABLE"
                }
            }, null, 4);
        }
        triggerSystemToast("Sandbox API Request Executed Successfully!");
    }, 900);
}

function compileAndOptimizeClientCode() {
    const rawCode = document.getElementById("aiInputCodeArea").value;
    const outputBox = document.getElementById("aiCompilerResponseOutput");
    if(!outputBox) return;

    if(rawCode.trim() === "") {
        outputBox.style.display = "block";
        outputBox.innerText = "Error: Input code block cannot be empty.";
        return;
    }

    outputBox.style.display = "block";
    outputBox.innerText = "[Compiling Optimization Matrix Model... Please Wait]";

    setTimeout(() => {
        if(rawCode.includes("for") && (rawCode.match(/for/g) || []).length > 1) {
            outputBox.innerText = `// AI System Optimization Node Result:\n// Input Pattern Detected: Nested O(n^2) Loops.\n// Refactored Solution Complexities: Reduced to O(n) Hash Alignment Matrix.\n\npublic List<Integer> optimizePipeline(int[] data) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for(int val : data) {\n        map.put(val, map.getOrDefault(val, 0) + 1);\n    }\n    return new ArrayList<>(map.keySet());\n}`;
        } else {
            outputBox.innerText = `// AI System Optimization Node Result:\n// Complexity Analysis: Execution pipeline is stable at O(n) or O(1).\n// Optimization Advice: Integrated G1GC garbage thresholds verified cleanly.`;
        }
        triggerSystemToast("Code compiled & array indices optimized!");
    }, 1100);
}

let waveAnimId = null;
function activateWaveTrackAnimation() {
    const canvas = document.getElementById("musicWaveCanvas");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    if(waveAnimId) cancelAnimationFrame(waveAnimId);
    triggerSystemToast("Audio Frequency Loop Sync Active! 🎵");

    let count = 0;
    function drawWave() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = document.body.classList.contains("light") ? "#2563eb" : "#4cc9ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i++) {
            const y = canvas.height / 2 + Math.sin(i * 0.05 + count) * 8 * Math.sin(i * 0.01);
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();
        count += 0.15;
        waveAnimId = requestAnimationFrame(drawWave);
    }
    drawWave();
}

function initVoiceCommandGateway() {
    const voiceBtn = document.getElementById("voiceCommandBtn");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        if(voiceBtn) {
            voiceBtn.addEventListener("click", () => {
                triggerSystemToast("Fallback: Please use HTTPS local proxies to open WebSpeech API APIs loops.");
            });
        }
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    if(voiceBtn) {
        voiceBtn.addEventListener("click", () => {
            voiceBtn.classList.add("listening-active");
            triggerSystemToast("AI Voice Node Active: Speak Command...");
            recognition.start();
        });
    }

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        triggerSystemToast(`Voice Command Input: "${command}"`);

        if (command.includes("skill")) {
            window.location.href = "#skills";
        } else if (command.includes("experience")) {
            window.location.href = "#experience";
        } else if (command.includes("project")) {
            window.location.href = "#projects";
        } else if (command.includes("about")) {
            window.location.href = "#about";
        } else if (command.includes("contact") || command.includes("email")) {
            window.location.href = "#contact";
        } else if (command.includes("light")) {
            document.body.classList.add("light");
            if(themeIcon) themeIcon.className = "fas fa-sun";
        } else if (command.includes("dark")) {
            document.body.classList.remove("light");
            if(themeIcon) themeIcon.className = "fas fa-adjust";
        } else {
            triggerSystemToast("Error: Unknown target voice configuration router.");
        }
    };

    recognition.onend = () => {
        if(voiceBtn) voiceBtn.classList.remove("listening-active");
    };
}


/* =======================================================
   5. ADVANCED AI INTERACTIVE CHATBOT ENGINE (AUTO-SCROLL FIXED)
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

// Robust Auto-Scroll Helper
function scrollChatToBottom() {
    if(!chatBody) return;
    setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 50);
}

// Quick Pill Click Handler
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

// Smart AI Intent Detection Engine
function generateSmartAiResponse(userText) {
    const text = userText.toLowerCase().trim();

    // 1. PROFANITY & ABUSE FILTER (Gaali / Rude Behavior)
    const profanityRegex = /(gaali|abuse|fuck|bitch|shit|stupid|idiot|chutiya|bakwas|pagal|crap|harami|bkl|mc|bc|gandu|saale|kamina)/i;
    if (profanityRegex.test(text)) {
        return "I request you to please maintain a respectful and professional tone! 🙏 I am here to assist you politely regarding Ayush's work, tech stack, or engineering inquiries. How can I help you nicely?";
    }

    // 2. LOVE, AFFECTION & COMPLIMENTS (Pyaar / Sweet Talk)
    const affectionRegex = /(love|pyar|pyaar|sweet|cute|awesome|great|amazing|like you|marry|handsome|smart|dil|best|love you|heart|dil se)/i;
    if (affectionRegex.test(text)) {
        return "Aww, thank you so much for such warm and sweet words! ❤️ I really appreciate your kindness. Feel free to ask anything about Ayush's skills, experience, or projects!";
    }

    // 3. ANGER & FRUSTRATION (Gussa)
    const angerRegex = /(angry|gussa|hate|worst|useless|bekar|problem|frustrated|furious|annoyed)/i;
    if (angerRegex.test(text)) {
        return "I am truly sorry if something didn't meet your expectation! 😔 Please let me know what went wrong or what information you are looking for—I will gladly help you out right away.";
    }

    // 4. RELIGION & FAITH (Dharmik Queries)
    const religionRegex = /(god|bhagwan|allah|jesus|religion|dharam|mandir|masjid|ram|krishna|waheguru|faith)/i;
    if (religionRegex.test(text)) {
        return "Ayush believes in hard work, technical excellence, unity, and mutual respect for all cultures and faiths! 🙏 How can I help you explore his backend development journey today?";
    }

    // 5. GREETINGS & SMALL TALK
    const greetingRegex = /^(hi|hello|hey|heyy|namaste|hlo|good morning|good evening|good afternoon|ssup|whats up|kaise ho|kaise)/i;
    if (greetingRegex.test(text)) {
        return "Hello! 👋 Welcome! I am Ayush's AI representative. How can I assist you today?";
    }

    // 6. TECHNICAL SKILLS & STACK
    if (text.includes("skill") || text.includes("java") || text.includes("spring") || text.includes("stack") || text.includes("technology") || text.includes("tech")) {
        return "Ayush has 5+ years of core experience specializing in Java 21, Spring Boot, Microservices Architecture, Kafka Event Streams, Redis Caching, and SQL Performance Tuning! ⚡";
    }

    // 7. EXPERIENCE & CAREER
    if (text.includes("experience") || text.includes("work") || text.includes("job") || text.includes("role") || text.includes("company") || text.includes("career")) {
        return "Ayush is a Senior Software Developer building high-performance, enterprise-grade distributed backend systems with 99.99% availability benchmarks! 💼";
    }

    // 8. PROJECTS & SANDBOX
    if (text.includes("project") || text.includes("auth") || text.includes("sandbox") || text.includes("pipeline") || text.includes("api")) {
        return "Ayush has built Enterprise Auth Platforms, High-Volume Data Pipelines, and OpenAPI Mock Sandboxes. You can interactively test them above in the Projects section! 🛠️";
    }

    // 9. CONTACT, EMAIL & HIRING
    if (text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach") || text.includes("call") || text.includes("phone") || text.includes("number")) {
        return "You can email Ayush directly at <b>aayushs821@gmail.com</b> 📧. Or type your email/phone number right here and I will save your message!";
    }

    // 10. SALARY / AVAILABILITY / LOCATION
    if (text.includes("salary") || text.includes("location") || text.includes("hyderabad") || text.includes("notice") || text.includes("available")) {
        return "Ayush is based out of Hyderabad, India, and is open to high-impact Senior Backend/Microservices roles. Feel free to send an email to discuss details! 📍";
    }

    // 11. GENERAL SMART FALLBACK
    return `Thanks for your message: "${userText}"! I'm constantly learning. To discuss this directly with Ayush, feel free to drop an email to aayushs821@gmail.com or leave your contact details here! ✉️`;
}

// Message Send Handler
if(sendChatBtn && chatInput && chatBody) {
    const sendClientMessage = () => {
        const userText = chatInput.value.trim();
        if(userText === "") return;
        
        // Render User Message
        const userBubble = document.createElement("div");
        userBubble.className = "chat-msg user";
        userBubble.style.cssText = "background: #2563eb; color: white; align-self: flex-end; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px; font-size: 13px; font-family: 'Poppins';";
        userBubble.innerText = userText;
        chatBody.appendChild(userBubble);
        
        chatInput.value = "";
        scrollChatToBottom();

        // Render AI Response
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
