/* =======================================================
   1. GLOBAL SYSTEM CONFIGURATIONS (MUST BE ON TOP)
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
            initLiveNewsTickerSystem(); 
            initVoiceCommandGateway(); 
        }, 600);
    });
}


/* =======================================================
   3. CORE UI ANIMATIONS & INTELLIGENT ROUTERS
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
   4. DASHBOARD TERMINAL & TICKER CHANGER LOGIC
======================================================= */

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

const breathTxtNode = document.getElementById("breathTxt");
if(breathTxtNode) {
    setInterval(() => {
        breathTxtNode.innerText = (breathTxtNode.innerText === "Inhale") ? "Exhale" : "Inhale";
    }, 4000);
}

function initLiveNewsTickerSystem() {
    const wrapper = document.getElementById("liveNewsWrapper");
    if(!wrapper) return;

    const rotatingFeeds = [
        { tag: "Global Tech", title: "OpenAI Releases GPT-5.6 Execution Context", desc: "Native token pipelines stream architectural logic rules instantly." },
        { tag: "National Infrastructure", title: "BSNL Live Satellite Nodes Deployed Across Clusters", desc: "Establishes secure telemetry backup links for critical grid operations." },
        { tag: "Silicon Matrix", title: "Meta Finalizes 14GW Custom Compute Architecture", desc: "Hardware accelerators scale cluster loop speeds to absolute peak efficiency." },
        { tag: "Open Source Nodes", title: "Spring Framework 7.0 Alpha Commits Verified", desc: "Integrates direct native compile strategies for Java 25 paradigms." }
    ];

    let currentIndex = 0;

    function renderActiveTickerCard() {
        wrapper.innerHTML = "";
        const item = rotatingFeeds[currentIndex];

        const card = document.createElement("div");
        card.className = "news-card fade-in";
        card.innerHTML = `<span class="news-tag">${item.tag}</span><h4 style='margin-top:5px;'>${item.title}</h4><p style='margin-top:5px; font-size:0.85rem;'>${item.desc}</p>`;
        
        wrapper.appendChild(card);
        currentIndex = (currentIndex + 1) % rotatingFeeds.length;
    }

    renderActiveTickerCard();
    setInterval(renderActiveTickerCard, 4500); 
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
   5. NEW FEATURES HARD LOGIC PARSERS
======================================================= */

// FEATURE: JSON JWT Token Claims Matrix Decoder
function loadMockEnterpriseJwtString() {
    document.getElementById("jwtRawInputArea").value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJheXVzaEBzaW5naC50ZWNoIiwibmFtZSI6IkF5dXNoIFNpbmdoIiwicm9sZXMiOlsiUk9MRV9TRU5JT1JfREVWIl0sImV4cCI6MTc4OTk5OTk5OX0.mockSignatureNode";
    triggerSystemToast("Mock JWT loaded into active matrix block!");
}

function handleClientJwtDecoding() {
    const input = document.getElementById("jwtRawInputArea").value.trim();
    const headBlock = document.getElementById("jwtHeaderOutputBlock");
    const payBlock = document.getElementById("jwtPayloadOutputBlock");
    if(!headBlock || !payBlock) return;

    if(!input || !input.includes(".")) {
        triggerSystemToast("Error: Invalid structured token payload sequence.");
        return;
    }

    const segments = input.split(".");
    try {
        // Safe base64 string decoding mapping
        const headerDecoded = atob(segments[0].replace(/-/g, '+').replace(/_/g, '/'));
        const payloadDecoded = atob(segments[1].replace(/-/g, '+').replace(/_/g, '/'));
        
        headBlock.innerText = JSON.stringify(JSON.parse(headerDecoded), null, 2);
        payBlock.innerText = JSON.stringify(JSON.parse(payloadDecoded), null, 2);
        triggerSystemToast("JWT Tokens decrypted and mapped successfully!");
    } catch(err) {
        headBlock.innerText = "{\n  \"error\": \"Malformed Header Segment\"\n}";
        payBlock.innerText = "{\n  \"error\": \"Payload Base64 Decoding Aborted\"\n}";
    }
}

// FEATURE: Asymmetric API Key Encryption Emulator Matrix
function emulateAsymmetricRsaCipher() {
    const txt = document.getElementById("asymmetricRawTextInput").value;
    const out = document.getElementById("asymmetricCipherOutputBlock");
    if(!out) return;

    if(!txt.trim()) {
        triggerSystemToast("Error: Encryption payload layer buffer empty.");
        return;
    }

    out.style.display = "block";
    out.innerText = "[Initializing Cryptographic RSA Handshake...]";

    setTimeout(() => {
        // Simulate public key cipher layer string output
        let scrambled = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv" + btoa(txt).substring(0, 45) + "...[Encrypted Client Segment]";
        out.innerText = "-----BEGIN RSA ENCRYPTED CIPHER BLOCK-----\n" + scrambled + "\n-----END RSA CIPHER BLOCK-----";
        triggerSystemToast("Asymmetric key cipher layer successfully compiled.");
    }, 800);
}

// FEATURE: Interactive REST Global Exception Mapper Simulator Console
function emulateRestGlobalException(statusCode) {
    const out = document.getElementById("restExceptionJsonConsoleBlock");
    if(!out) return;

    out.style.display = "block";
    
    let mockErrorObject = {
        timestamp: new Date().toISOString(),
        status: statusCode,
        error: statusCode === 404 ? "Not Found" : statusCode === 500 ? "Internal Server Error" : "Unauthorized",
        exception: statusCode === 404 ? "com.ayush.tech.exception.EntityNotFoundException" : statusCode === 500 ? "java.lang.NullPointerException" : "org.springframework.security.authentication.BadCredentialsException",
        message: statusCode === 404 ? "Requested database asset log matching ID index not found." : statusCode === 500 ? "Cannot invoke method because service layer data stream reference pipeline is null." : "Authentication handshake rejected: JWT signature payload validation failed.",
        path: "/api/v1/enterprise/resource/node"
    };

    out.innerText = JSON.stringify(mockErrorObject, null, 2);
    triggerSystemToast(`@ControllerAdvice Intercepted Status Code: ${statusCode}`);
}


/* =======================================================
   6. REVIEWS, CHATBOX & FOOTER UTILITIES
======================================================= */

function toggleCyberSecurityPanel() {
    const content = document.getElementById("cyberDropdownContentPane");
    const icon = document.getElementById("cyberChevronIcon");
    if(!content || !icon) return;
    
    content.classList.toggle("open");
    icon.classList.toggle("rotate-active");
}

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
                                <p style="margin-top: 8px;">${clientReview}</p>`;
        
        reviewsContainerStack.prepend(reviewCard);
        triggerSystemToast(`Success: Feedback submitted for ${clientName}! ✨`);
        reviewForm.reset();
    });
}

const chatBadge = document.getElementById("chatBadge");
const chatWidget = document.getElementById("chatWidget");
const chatHeader = document.getElementById("chatHeader");

if(chatBadge && chatWidget && chatHeader) {
    chatBadge.addEventListener("click", () => {
        chatWidget.classList.add("active");
    });
    chatHeader.querySelector(".fa-chevron-down").addEventListener("click", (e) => {
        e.stopPropagation();
        chatWidget.classList.remove("active");
    });
}

const sendChatBtn = document.getElementById("sendChatBtn");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

if(sendChatBtn && chatInput && chatBody) {
    const sendClientMessage = () => {
        if(chatInput.value.trim() === "") return;
        
        const userText = chatInput.value;
        const userBubble = document.createElement("div");
        userBubble.className = "chat-msg user";
        userBubble.style.cssText = "background: #2563eb; color: white; align-self: flex-end; max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 8px; font-size: 13px;";
        userBubble.innerText = userText;
        chatBody.appendChild(userBubble);
        
        chatInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const botBubble = document.createElement("div");
            botBubble.className = "chat-msg bot";
            botBubble.innerText = "Compiling response context layer... Ayush's core pipeline has buffered your log successfully. ⚡";
            chatBody.appendChild(botBubble);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
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
