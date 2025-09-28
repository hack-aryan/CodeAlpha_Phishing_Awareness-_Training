// Phishing Awareness Training - Interactive JavaScript

// Application state
let appState = {
    currentSection: 'welcome',
    completedModules: [],
    moduleScores: {},
    finalScore: 0,
    userName: 'Participant'
};

// Final assessment questions
const finalQuestions = [
    {
        question: "What is the most common type of phishing attack?",
        options: ["Email phishing", "Smishing", "Vishing", "Whaling"],
        correct: 0,
        explanation: "Email phishing is the most common type, accounting for the majority of phishing attacks with 3.4 billion emails sent daily."
    },
    {
        question: "Which warning sign is most indicative of a phishing email?",
        options: ["Long email content", "Multiple recipients", "Generic greeting like 'Dear Customer'", "Large file attachments"],
        correct: 2,
        explanation: "Generic greetings are a major red flag as legitimate companies typically use your actual name."
    },
    {
        question: "What should you do if you receive a suspicious email from your bank?",
        options: ["Click the link to verify", "Call the bank using a number you find independently", "Reply asking for confirmation", "Forward to colleagues"],
        correct: 1,
        explanation: "Always verify through independent channels. Never use contact information provided in suspicious emails."
    },
    {
        question: "Which URL is most likely to be a phishing attempt?",
        options: ["https://www.amazon.com", "https://amaz0n-security.com", "https://secure.amazon.com", "https://amazon.co.uk"],
        correct: 1,
        explanation: "The URL uses '0' instead of 'o' and has an unusual domain structure, common in phishing attempts."
    },
    {
        question: "What social engineering tactic uses time pressure to make victims act quickly?",
        options: ["Authority", "Reciprocity", "Urgency", "Fear"],
        correct: 2,
        explanation: "Urgency tactics create artificial time pressure to bypass normal security thinking and decision-making."
    },
    {
        question: "According to recent statistics, AI-generated phishing emails have what success rate?",
        options: ["12%", "36%", "54%", "75%"],
        correct: 2,
        explanation: "AI-generated phishing emails have a 54% click rate compared to only 12% for human-written ones."
    },
    {
        question: "What percentage of data breaches are caused by phishing attacks?",
        options: ["15%", "25%", "36%", "50%"],
        correct: 2,
        explanation: "36% of data breaches are caused by phishing attacks, making it one of the leading causes."
    },
    {
        question: "Which is the BEST prevention strategy against phishing?",
        options: ["Using antivirus software", "Blocking all external emails", "Employee training and awareness", "Installing firewalls"],
        correct: 2,
        explanation: "Training and awareness are the most effective defenses since phishing relies on human psychology."
    },
    {
        question: "What was the loss amount in the Google and Facebook BEC scam?",
        options: ["$50 million", "$100 million", "$150 million", "$200 million"],
        correct: 1,
        explanation: "The Lithuanian scammer defrauded both Google and Facebook for $100 million over two years."
    },
    {
        question: "Multi-factor authentication is most important for which type of accounts?",
        options: ["Social media only", "Email and financial accounts", "Gaming accounts", "Shopping websites"],
        correct: 1,
        explanation: "Email and financial accounts are high-value targets that need the strongest protection MFA provides."
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateProgress();
});

function initializeApp() {
    // Load saved progress if available
    loadProgress();
    
    // Set initial active section
    showSection('welcome');
    
    // Initialize quiz questions
    initializeFinalAssessment();
    
    // Update navigation state
    updateNavigation();
}

function setupEventListeners() {
    // Navigation tab clicks
    const navTabs = document.querySelectorAll('.nav__tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            console.log('Clicking section:', section); // Debug log
            showSection(section);
        });
    });

    // Prevention checklist interactions
    const checkboxes = document.querySelectorAll('.prevention-check');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePreventionProgress);
    });
}

function showSection(sectionId) {
    console.log('Showing section:', sectionId); // Debug log
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('section--active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('section--active');
        appState.currentSection = sectionId;
        
        console.log('Section shown:', sectionId); // Debug log
        
        // Update navigation
        updateNavigation();
        
        // Special handling for assessment
        if (sectionId === 'assessment') {
            resetAssessment();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        console.error('Section not found:', sectionId); // Debug log
    }
}

function updateNavigation() {
    const navTabs = document.querySelectorAll('.nav__tab');
    
    navTabs.forEach(tab => {
        const section = tab.dataset.section;
        
        // Remove all state classes
        tab.classList.remove('nav__tab--active', 'nav__tab--completed');
        
        // Add active class
        if (section === appState.currentSection) {
            tab.classList.add('nav__tab--active');
        }
        
        // Add completed class
        if (appState.completedModules.includes(section)) {
            tab.classList.add('nav__tab--completed');
        }
        
        // All sections are now accessible - removing restrictions for testing
        tab.style.opacity = '1';
        tab.style.pointerEvents = 'auto';
    });
}

function startTraining() {
    showSection('module1');
}

function completeModule(moduleNumber) {
    const moduleId = `module${moduleNumber}`;
    
    if (!appState.completedModules.includes(moduleId)) {
        appState.completedModules.push(moduleId);
        saveProgress();
        updateProgress();
        updateNavigation();
        
        // Show success message
        showModuleCompletionMessage(moduleNumber);
        
        // Auto-advance to next module or assessment
        setTimeout(() => {
            const nextModule = `module${moduleNumber + 1}`;
            if (moduleNumber < 5) {
                showSection(nextModule);
            } else {
                showSection('assessment');
            }
        }, 2000);
    }
}

function showModuleCompletionMessage(moduleNumber) {
    // Create temporary success message
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <div style="background: rgba(var(--color-success-rgb), 0.1); 
                    color: var(--color-success); 
                    padding: var(--space-16); 
                    border-radius: var(--radius-base); 
                    margin: var(--space-16) 0; 
                    text-align: center;
                    border: 1px solid rgba(var(--color-success-rgb), 0.3);">
            ✅ Module ${moduleNumber} completed successfully!
        </div>
    `;
    
    // Insert after module content
    const moduleSection = document.getElementById(`module${moduleNumber}`);
    const moduleContent = moduleSection.querySelector('.module-content');
    if (moduleContent) {
        moduleContent.appendChild(message);
        
        // Remove after animation
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
}

function checkQuizAnswer(questionNumber, correctAnswer) {
    const selectedAnswer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
    const feedback = document.querySelector(`[data-module="${questionNumber}"] .quiz-feedback`);
    
    if (!selectedAnswer) {
        feedback.style.display = 'block';
        feedback.className = 'quiz-feedback incorrect';
        feedback.textContent = 'Please select an answer first.';
        return;
    }
    
    const isCorrect = selectedAnswer.value === correctAnswer;
    
    feedback.style.display = 'block';
    feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedback.innerHTML = '✅ Correct! Well done.';
        // Store quiz score
        appState.moduleScores[`module${questionNumber}`] = 1;
    } else {
        feedback.innerHTML = `❌ Incorrect. The correct answer helps you stay safe from phishing attacks.`;
        appState.moduleScores[`module${questionNumber}`] = 0;
    }
    
    saveProgress();
}

function checkWebsite(element, type) {
    const statusElement = element.querySelector('.website-status');
    
    if (type === 'real') {
        element.classList.add('safe');
        statusElement.textContent = 'SAFE - Legitimate website';
    } else {
        element.classList.add('dangerous');
        statusElement.textContent = 'DANGEROUS - Phishing attempt';
    }
    
    // Remove click handler
    element.style.pointerEvents = 'none';
}

function updateProgress() {
    const totalModules = 5;
    const completedCount = appState.completedModules.length;
    const progressPercent = Math.round((completedCount / totalModules) * 100);
    
    const progressPercentElement = document.getElementById('progress-percent');
    const progressFillElement = document.getElementById('progress-fill');
    
    if (progressPercentElement) {
        progressPercentElement.textContent = `${progressPercent}%`;
    }
    if (progressFillElement) {
        progressFillElement.style.width = `${progressPercent}%`;
    }
}

function updatePreventionProgress() {
    const checkboxes = document.querySelectorAll('.prevention-check');
    const checkedCount = document.querySelectorAll('.prevention-check:checked').length;
    
    if (checkedCount === checkboxes.length) {
        // All items checked - show completion message
        const message = document.createElement('div');
        message.className = 'prevention-complete';
        message.innerHTML = `
            <div style="background: rgba(var(--color-success-rgb), 0.1); 
                        color: var(--color-success); 
                        padding: var(--space-16); 
                        border-radius: var(--radius-base); 
                        margin: var(--space-16) 0; 
                        text-align: center;
                        border: 1px solid rgba(var(--color-success-rgb), 0.3);">
                🎉 Excellent! You've mastered the daily security checklist.
            </div>
        `;
        
        const checklistContainer = document.querySelector('.prevention-checklist');
        if (checklistContainer && !checklistContainer.querySelector('.prevention-complete')) {
            checklistContainer.appendChild(message);
        }
    }
}

// Final Assessment Functions
let currentQuestionIndex = 0;
let userAnswers = [];

function initializeFinalAssessment() {
    currentQuestionIndex = 0;
    userAnswers = new Array(finalQuestions.length).fill(undefined);
    loadQuestion();
    updateQuestionCounter();
}

function loadQuestion() {
    const question = finalQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('quiz-question');
    
    if (!questionContainer) {
        console.error('Quiz question container not found');
        return;
    }
    
    questionContainer.innerHTML = `
        <h3>Question ${currentQuestionIndex + 1}</h3>
        <p>${question.question}</p>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <label>
                    <input type="radio" name="final-q${currentQuestionIndex}" value="${index}">
                    ${option}
                </label>
            `).join('')}
        </div>
    `;
    
    // Restore previous answer if exists
    if (userAnswers[currentQuestionIndex] !== undefined) {
        const radio = questionContainer.querySelector(`input[value="${userAnswers[currentQuestionIndex]}"]`);
        if (radio) radio.checked = true;
    }
    
    updateNavigationButtons();
}

function updateQuestionCounter() {
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    
    if (currentQuestionElement) {
        currentQuestionElement.textContent = currentQuestionIndex + 1;
    }
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = finalQuestions.length;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (nextBtn && submitBtn) {
        if (currentQuestionIndex === finalQuestions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        saveCurrentAnswer();
        currentQuestionIndex--;
        loadQuestion();
        updateQuestionCounter();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < finalQuestions.length - 1) {
        saveCurrentAnswer();
        currentQuestionIndex++;
        loadQuestion();
        updateQuestionCounter();
    }
}

function saveCurrentAnswer() {
    const selected = document.querySelector(`input[name="final-q${currentQuestionIndex}"]:checked`);
    if (selected) {
        userAnswers[currentQuestionIndex] = parseInt(selected.value);
    }
}

function submitAssessment() {
    saveCurrentAnswer();
    
    // Check if all questions are answered
    const unansweredQuestions = [];
    for (let i = 0; i < finalQuestions.length; i++) {
        if (userAnswers[i] === undefined) {
            unansweredQuestions.push(i + 1);
        }
    }
    
    if (unansweredQuestions.length > 0) {
        alert(`Please answer all questions. Missing: Question ${unansweredQuestions.join(', ')}`);
        return;
    }
    
    // Calculate score
    let correctAnswers = 0;
    for (let i = 0; i < finalQuestions.length; i++) {
        if (userAnswers[i] === finalQuestions[i].correct) {
            correctAnswers++;
        }
    }
    
    const score = Math.round((correctAnswers / finalQuestions.length) * 100);
    appState.finalScore = score;
    
    // Show results
    showAssessmentResults(score, correctAnswers);
    saveProgress();
}

function showAssessmentResults(score, correctAnswers) {
    const quizElement = document.getElementById('final-quiz');
    const resultsElement = document.getElementById('assessment-results');
    
    if (quizElement) quizElement.style.display = 'none';
    if (resultsElement) resultsElement.style.display = 'block';
    
    const scoreElement = document.getElementById('final-score');
    const feedbackElement = document.getElementById('score-feedback');
    const certificateSection = document.getElementById('certificate-section');
    
    if (scoreElement) {
        scoreElement.textContent = `${score}%`;
    }
    
    if (feedbackElement) {
        if (score >= 80) {
            feedbackElement.textContent = `Excellent! You answered ${correctAnswers} out of ${finalQuestions.length} questions correctly. You're well-prepared to identify and prevent phishing attacks.`;
            feedbackElement.className = 'score-feedback pass';
            if (certificateSection) certificateSection.style.display = 'block';
        } else {
            feedbackElement.textContent = `You scored ${score}% (${correctAnswers}/${finalQuestions.length}). Review the training materials and try again to earn your certificate.`;
            feedbackElement.className = 'score-feedback fail';
            if (certificateSection) certificateSection.style.display = 'none';
        }
    }
}

function retakeAssessment() {
    const quizElement = document.getElementById('final-quiz');
    const resultsElement = document.getElementById('assessment-results');
    
    if (resultsElement) resultsElement.style.display = 'none';
    if (quizElement) quizElement.style.display = 'block';
    
    resetAssessment();
}

function resetAssessment() {
    currentQuestionIndex = 0;
    userAnswers = new Array(finalQuestions.length).fill(undefined);
    initializeFinalAssessment();
}

function downloadCertificate() {
    // Prompt for name
    const name = prompt("Enter your name for the certificate:", appState.userName);
    if (!name) return;
    
    appState.userName = name;
    saveProgress();
    
    // Show certificate modal
    showCertificateModal(name);
}

function showCertificateModal(name) {
    const modal = document.getElementById('certificate-modal');
    const nameElement = document.getElementById('certificate-name');
    const scoreElement = document.getElementById('certificate-score');
    const dateElement = document.getElementById('certificate-date');
    
    if (nameElement) nameElement.textContent = name;
    if (scoreElement) scoreElement.textContent = `${appState.finalScore}%`;
    if (dateElement) dateElement.textContent = new Date().toLocaleDateString();
    
    if (modal) modal.classList.remove('hidden');
}

function closeCertificate() {
    const modal = document.getElementById('certificate-modal');
    if (modal) modal.classList.add('hidden');
}

function printCertificate() {
    window.print();
}

// Progress persistence
function saveProgress() {
    try {
        localStorage.setItem('phishing-training-progress', JSON.stringify(appState));
    } catch (e) {
        console.warn('Could not save progress:', e);
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('phishing-training-progress');
        if (saved) {
            const savedState = JSON.parse(saved);
            appState = { ...appState, ...savedState };
        }
    } catch (e) {
        console.warn('Could not load saved progress:', e);
    }
}

// Utility functions for interactive features
function animateElement(element, animationClass) {
    if (element) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, 1000);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (appState.currentSection === 'assessment') {
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.getElementById('prev-btn');
            if (prevBtn && !prevBtn.disabled) {
                previousQuestion();
            }
        } else if (e.key === 'ArrowRight') {
            if (currentQuestionIndex < finalQuestions.length - 1) {
                nextQuestion();
            }
        }
    }
});

// Print styles for certificate
const printStyles = `
    @media print {
        body * {
            visibility: hidden;
        }
        .certificate, .certificate * {
            visibility: visible;
        }
        .certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
        }
        .modal-actions {
            display: none !important;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = printStyles;
document.head.appendChild(styleSheet);

// Enhanced accessibility features
function setupAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('button, input, select');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label')) {
            const text = element.textContent || element.value || element.placeholder;
            if (text) {
                element.setAttribute('aria-label', text.trim());
            }
        }
    });
    
    // Announce section changes to screen readers
    const sectionsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const element = mutation.target;
                if (element.classList.contains('section--active')) {
                    const title = element.querySelector('h2');
                    if (title) {
                        announceToScreenReader(`Now viewing: ${title.textContent}`);
                    }
                }
            }
        });
    });
    
    document.querySelectorAll('.section').forEach(section => {
        sectionsObserver.observe(section, { attributes: true });
    });
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Initialize accessibility features when DOM is loaded
document.addEventListener('DOMContentLoaded', setupAccessibility);

// Auto-save progress periodically
setInterval(saveProgress, 30000); // Save every 30 seconds

// Analytics and engagement tracking
function trackEngagement(action, details) {
    console.log(`Training Action: ${action}`, details);
    // In a real application, this would send data to analytics
}

// Export functions for potential external use
window.PhishingTraining = {
    showSection,
    completeModule,
    checkQuizAnswer,
    downloadCertificate,
    trackEngagement
};