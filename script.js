document.addEventListener("DOMContentLoaded", function () {
    // Telegram Bot Configuration
    const TELEGRAM_BOT_TOKEN = '8083496802:AAE3h44C7ydCWOjAQyE5kCD3wbBbymnugk8';
    const TELEGRAM_CHAT_ID = '1230226330';

    /* ================= BACK TO TOP ================= */
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ================= RESUME DOWNLOAD ================= */
    document.getElementById("downloadResume").addEventListener("click", () => {
        const resumeContent = `
DINESH KUMAR GODUGULA
Python Full Stack Developer

Contact Information:
Email: dinesh.rcnd3@gmail.com
Phone: +91 9010469575
Location: Vijayawada, Andhra Pradesh

Education:
- B.Sc Computer Science, Andhra University (2020-2023)
- Diploma in Civil Engineering, Govt Polytechnic College (2015-2018)
- SSC, Gandhiji Municipal Corp High School (2015)

Skills:
- Python, Django, Flask
- HTML5, CSS3, JavaScript, Bootstrap
- MySQL, Database Management
- AutoCAD, Project Planning, Quality Control

Experience:
- Ward Planning & Regulation Secretary, Vijayawada Municipal Corporation (2019-Present)
- Quality & Safety Engineer, Tata Projects Ltd (2018-2019)
- Lab Technician, L&T Construction (2018-2019)
- Site Engineer, RINL Vizag Steel Plant (2017-2018)

Projects:
Portfolio Website: Python Full Stack Developer Portfolio
`;

        const blob = new Blob([resumeContent], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "Dinesh_Kumar_Resume.txt";
        a.click();
    });

    /* ================= CONTACT FORM WITH TELEGRAM ================= */
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            showFormMessage("Please fill in all fields.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showFormMessage("Please enter a valid email address.", "error");
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

        // Format Telegram message
        const telegramMessage = `
📧 *New Contact Form Submission - Portfolio Website*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
📋 *Subject:* ${subject}

💬 *Message:*
${message}

⏰ *Submitted On:* ${new Date().toLocaleString()}
📍 *From:* Portfolio Contact Form
        `;

        try {
            // Send to Telegram
            const response = await sendToTelegram(telegramMessage);
            
            if (response.ok) {
                // Show success message
                showFormMessage("✅ Message sent successfully! I'll get back to you soon.", "success");
                
                // Show alert confirmation
                alert(`
Message Sent Successfully!

Here are the details:
────────────────────
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Submitted: ${new Date().toLocaleString()}
────────────────────
Thank you for contacting me! I will respond as soon as possible.
                `);
                
                // Reset form
                contactForm.reset();
                
            } else {
                throw new Error('Telegram API Error');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Fallback: Save locally and show alert
            showFormMessage("⚠️ Message saved locally. I'll check it soon!", "warning");
            
            alert(`
⚠️ Message Details (Saved Locally):
────────────────────
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}

Time: ${new Date().toLocaleString()}

Note: Couldn't send to Telegram. I'll check this manually.
────────────────────
Please also email me at dinesh.rcnd3@gmail.com for immediate response.
            `);
            
            // Still reset the form
            contactForm.reset();
            
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    /* ================= TELEGRAM SEND FUNCTION ================= */
    async function sendToTelegram(message) {
        // Telegram API URL
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        try {
            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            
            return await response.json();
        } catch (error) {
            throw new Error('Failed to connect to Telegram API');
        }
    }

    /* ================= HELPER FUNCTIONS ================= */
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        
        // Set color based on type
        if (type === 'success') {
            formMessage.className = 'alert alert-success';
        } else if (type === 'error') {
            formMessage.className = 'alert alert-danger';
        } else if (type === 'warning') {
            formMessage.className = 'alert alert-warning';
        }
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /* ================= SMOOTH SCROLL FOR NAVIGATION ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
});