// DOM Elements
const loginScreen = document.getElementById('login-screen');
const otpScreen = document.getElementById('otp-screen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const otpLoginBtn = document.getElementById('otp-login-btn');
const otpInputs = document.querySelectorAll('.otp-digit');
const verifyOtpBtn = document.getElementById('verify-otp-btn');
const resendOtpBtn = document.getElementById('resend-otp-btn');
const logoutBtn = document.getElementById('logout-btn');
const chatBtn = document.getElementById('chat-btn');
const closeChat = document.getElementById('close-chat');
const chatWidget = document.getElementById('chat-widget');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const chatMessages = document.getElementById('chat-messages');
const emergencyBtn = document.getElementById('emergency-btn');
const emergencyModal = document.getElementById('emergency-modal');
const closeEmergency = document.getElementById('close-emergency');
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const registrationForm = document.getElementById('registration-form');
const sendEmailBtn = document.getElementById('send-email-btn');
const devicesList = document.getElementById('devices-list');
const userName = document.getElementById('user-name');

// Sample user data
let currentUser = { 
    name: "Gondal", 
    id: "USR12345",
    email: "alex@example.com",
    phone: "+1234567890"
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set user name
    if (userName) userName.textContent = currentUser.name;
    
    // Set OTP phone number
    document.getElementById('otp-phone').textContent = currentUser.phone;
    
    // Setup OTP input navigation
    setupOtpInputs();
    
    // Load sample devices
    loadSampleDevices();
});

// ================== AUTHENTICATION ==================
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation (replace with real auth)
    if ((identifier === currentUser.phone || identifier === currentUser.email) && password === 'password123') {
        showDashboard();
    } else {
        alert('Invalid credentials. Use phone/email: ' + currentUser.phone + ' or ' + currentUser.email + ' and password: password123');
    }
});

otpLoginBtn?.addEventListener('click', () => {
    loginScreen.classList.add('hidden');
    otpScreen.classList.remove('hidden');
    startResendTimer();
});

verifyOtpBtn?.addEventListener('click', () => {
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    if (otp === '123456') { // Demo OTP
        showDashboard();
    } else {
        alert('Invalid OTP. Use 123456 for demo.');
    }
});

// OTP Input Navigation
function setupOtpInputs() {
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
}

// OTP Resend Timer
let countdown = 60;
function startResendTimer() {
    resendOtpBtn.disabled = true;
    const timer = setInterval(() => {
        countdown--;
        resendOtpBtn.textContent = `Resend OTP (${countdown}s)`;
        
        if (countdown <= 0) {
            clearInterval(timer);
            resendOtpBtn.disabled = false;
            resendOtpBtn.textContent = 'Resend OTP';
            countdown = 60;
        }
    }, 1000);
}

// ================== DASHBOARD ==================
function showDashboard() {
    loginScreen.classList.add('hidden');
    otpScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

logoutBtn?.addEventListener('click', () => {
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
});

// Navigation Tabs
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active tab
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.dataset.tab;
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            }
        });
    });
});

// ================== DEVICE REGISTRATION ==================
registrationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        imei: document.getElementById('device-imei').value,
        type: document.getElementById('device-type').value,
        brand: document.getElementById('device-brand').value,
        model: document.getElementById('device-model').value,
        os: document.getElementById('os-version').value,
        mobile: document.getElementById('mobile-number').value,
        email: document.getElementById('primary-email').value,
        emergency: document.getElementById('emergency-contact').value,
        purpose: document.getElementById('device-purpose').value,
        location: document.getElementById('device-location').value
    };
    
    // Add to devices list
    addDeviceToList(formData);
    
    // Show success
    alert('Device registered successfully!');
    registrationForm.reset();
});

// Add device to list
function addDeviceToList(device) {
    const deviceElement = document.createElement('div');
    deviceElement.className = 'device-card';
    deviceElement.innerHTML = `
        <div class="device-info">
            <h3>${device.brand} ${device.model}</h3>
            <p>IMEI: ${device.imei} • ${device.type}</p>
            <p>${device.mobile} • ${device.email}</p>
        </div>
        <div class="device-actions">
            <button title="Edit"><span class="material-icons">edit</span></button>
            <button title="Delete"><span class="material-icons">delete</span></button>
        </div>
    `;
    devicesList.insertBefore(deviceElement, devicesList.firstChild);
}

// Load sample devices
function loadSampleDevices() {
    const sampleDevices = [
        {
            imei: '356938035643809',
            type: 'smartphone',
            brand: 'Samsung',
            model: 'Galaxy S23',
            os: 'Android 13',
            mobile: '+1234567890',
            email: 'user@example.com',
            emergency: '+1987654321'
        },
        {
            imei: 'A12345678901234',
            type: 'laptop',
            brand: 'Apple',
            model: 'MacBook Pro',
            os: 'macOS Sonoma',
            mobile: '+1234567890',
            email: 'user@example.com',
            emergency: '+1987654321'
        }
    ];
    
    sampleDevices.forEach(device => addDeviceToList(device));
}

// Send Email Confirmation
sendEmailBtn?.addEventListener('click', () => {
    const email = document.getElementById('primary-email').value;
    if (email) {
        alert(`Confirmation email sent to ${email}!`);
    } else {
        alert('Please enter a valid email address.');
    }
});

// ================== LIVE CHAT ==================
chatBtn?.addEventListener('click', () => {
    chatWidget.classList.toggle('hidden');
});

closeChat?.addEventListener('click', () => {
    chatWidget.classList.add('hidden');
});

sendChat?.addEventListener('click', () => {
    sendMessage();
});

chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message sent';
        userMsg.textContent = message;
        chatMessages.appendChild(userMsg);
        
        // Auto-reply after delay
        setTimeout(() => {
            const replies = [
                "Thanks for your message! How else can I assist?",
                "Our team will review your request shortly.",
                "Is there anything specific about your device you need help with?",
                "We're here to help! Please provide more details if needed."
            ];
            const reply = replies[Math.floor(Math.random() * replies.length)];
            
            const botMsg = document.createElement('div');
            botMsg.className = 'message received';
            botMsg.textContent = reply;
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// ================== EMERGENCY CONTACTS ==================
emergencyBtn?.addEventListener('click', () => {
    emergencyModal.classList.remove('hidden');
});

closeEmergency?.addEventListener('click', () => {
    emergencyModal.classList.add('hidden');
});

// Call emergency services
document.querySelectorAll('.emergency-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const service = btn.classList[1];
        let number;
        
        switch(service) {
            case 'police':
            case 'ambulance':
            case 'fire':
                number = '911';
                break;
            case 'it-support':
                number = '800-123-4567';
                break;
        }
        
        if (confirm(`Call ${service} at ${number}?`)) {
            // In real app, this would trigger a call
            alert(`Calling ${number}... (Demo only)`);
        }
        emergencyModal.classList.add('hidden');
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === emergencyModal) {
        emergencyModal.classList.add('hidden');
    }
});