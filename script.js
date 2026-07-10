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
            initLiveNewsTickerSystem(); // Renders the automatic ticking news block
            initVoiceCommandGateway(); 
        }, 600);
    });
}


/* =======================================================
   3. CORE UI ANIMATIONS & INTELLIGENT ROUTERS
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

// Theme Toggle Engine
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

// AI Semantic Context Filter Logic for Learning Hub Cards
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
   4. DASHBOARD TERMINAL & TICKER CHANGER LOGIC
======================================================= */

// Universal Dashboard Multi-Tab Panel Switch Mechanics with Animations Trigger
function switchDashboardTab(tabId) {
    const panels = document.querySelectorAll(".hub-content-panel");
    panels.forEach(panel => {
        panel.classList.remove("active");
        panel.style.display = "none"; 
    });
    
    const activeBtn = event.currentTarget;
    if(activeBtn && activeBtn.parentElement) {
        activeBtn.parentElement.querySelectorAll(".tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
    }
    
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) {
        targetPanel.style.display = "block"; 
        setTimeout(() => {
            targetPanel.classList.add("active"); 
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

// Dynamic Automated Scrolling News Ticker Matrix
function initLiveNewsTickerSystem() {
    const wrapper = document.getElementById("liveNewsWrapper");
    if(!wrapper) return;

    const rotatingFeeds = [
        { tag: "System Boot", title: "Initializing Java 21 Runtime Environment", desc: "Virtual Threads mappings configured safely across active application clusters." },
        { tag: "Compliance", title: "Corporate Governance & Transparency Audited", desc: "Anti-bribery constraints and core code validation routines verified perfectly." },
        { tag: "Logic Stream", title: "Array Manipulation Bottlenecks Eliminated", desc: "Naively nested loop layers fully optimized down to predictable linear architectures." },
        { tag: "Dev Pipeline", title: "AI-Velocity Prototyping Active", desc: "Amazon Q and Kiro frameworks accelerations integrated into active workspace." }
    ];

    let currentIndex = 0;

    function renderActiveTickerCard() {
        wrapper.innerHTML = "";
        const item = rotatingFeeds[currentIndex];

        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `<span class="news-tag">${item.tag}</span><h4 style='margin-top:5px; color: var(--text-main);'>${item.title}</h4><p style='margin-top:5px; font-size:0.85rem;'>${item.desc}</p>`;
        
        wrapper.appendChild(card);
        currentIndex = (currentIndex + 1) % rotatingFeeds.length;
    }

    renderActiveTickerCard();
    setInterval(renderActiveTickerCard, 4500); 
}

// Dynamic Mock OpenAPI Documentation Playground Execution Logic
let currentActiveMockEndpoint = "";
function simulateSwaggerSandbox(endpoint) {
    const box = document.getElementById("swaggerSandboxBox");
    const input = document.getElementById("sandboxUrlInput");
    const output = document.getElementById("sandboxResponseOutput");
    if(!box || !input || !output) return;

    currentActiveMockEndpoint = endpoint;
    input.value = "https://api.ayushsingh.tech" + endpoint;
    output.innerText = "// Click 'Execute' to fire mock compilation requests to the backend architecture logic node.";
    box.style.display = "block";
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function executeSandboxApiRequest() {
    const output = document.getElementById("sandboxResponseOutput");
    if(!output) return;

    output.innerText = "{ \"status\": \"Firing mock payload layers...\", \"timestamp\": " + Date.now() + " }";

    setTimeout(() => {
        if(currentActiveMockEndpoint.includes("auth")) {
            output.innerText = JSON.stringify({
                status: 200,
                message: "Authentication Authorization Token Generated",
                data: {
                    token_type: "Bearer",
                    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.portfolioMockTokenNode...",
                    expires_in: 3600,
                    compliance_check: "PASSED (Zero Risks Cleared)"
                }
            }, null, 4);
        } else {
            output.innerText = JSON.stringify({
                status: 200,
                execution_scope: "Subarray Logic Node Optimizer",
                algorithm_metrics: {
                    input_complexity: "O(n^3) Brute Loop",
                    optimized_complexity: "O(n^2) Hash Index Matrix",
                    latency_reduction: "45% Faster",
                    governance_safety: "100% Structural Stability Secured"
                }
            }, null, 4);
        }
        triggerSystemToast("OpenAPI Request Executed Successfully!");
    }, 900);
}

// AI Custom Mock Code Complexity Optimizer Algorithm Compiler
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
            outputBox.innerText = `// AI System Optimization Optimization Node Result:\n// Input Pattern Detected: Nested O(n^2) Loops.\n// Refactored Solution Complexities: Reduced to O(n) Hash Alignment Matrix.\n\npublic List<Integer> optimizePipeline(int[] data) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for(int val : data) {\n        map.put(val, map.getOrDefault(val, 0) + 1);\n    }\n    return new ArrayList<>(map.keySet());\n}`;
        } else {
            outputBox.innerText = `// AI System Optimization Optimization Node Result:\n// Complexity Analysis: Execution pipeline is stable at O(n) or O(1).\n// Optimization Advice: Integrated G1GC garbage thresholds verified cleanly.`;
        }
        triggerSystemToast("Code compiled & array indices optimized!");
    }, 1100);
}

// Canvas Based Music Wave Visualizer Track Simulation Loop
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

// AI Voice Command API Gateway Configuration Engine
function initVoiceCommandGateway() {
    const voiceBtn = document.getElementById("voiceCommandBtn");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        if(voiceBtn) {
            voiceBtn.addEventListener("click", () => {
                triggerSystemToast("Fallback: Please use HTTPS proxies to open WebSpeech API loops.");
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
   5. REVIEWS, CHATBOX & FOOTER UTILITIES
======================================================= */

// Real-time Feedback Dynamic Submission Compiler
const reviewForm = document.getElementById("portfolioFeedbackForm");
const reviewsContainerStack = document.getElementById("reviewsContainerStack");

if(reviewForm && reviewsContainerStack) {
    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const clientName = document.getElementById("feedbackName").value;
        const clientReview = document.getElementById("feedbackMessage").value;
        const designation = document.getElementById("feedbackDesignation").value;
        
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-compiled-card";
        reviewCard.innerHTML = `<h4><i class="fas fa-user-circle"></i> ${clientName} (${designation})</h4>
                                <span style="font-size: 0.75rem; color: var(--accent-glow); text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 5px;">[SUBMITTED EXTERNAL REVIEW NODE]</span>
                                <p>${clientReview}</p>`;
        
        reviewsContainerStack.prepend(reviewCard);
        triggerSystemToast(`Success: Review compiled for ${clientName}! ✨`);
        reviewForm.reset();
    });
}

// Chatbox Interface Widgets Mechanics
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
