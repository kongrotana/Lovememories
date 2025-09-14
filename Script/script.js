// Note: Months are 0-indexed (0 = January, 11 = December)
const anniversaryDate = new Date(2022, 11, 16); // December 16, 2022

// Update the displayed start date
document.getElementById('start-date').textContent = anniversaryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

function updateCounter() {
    const now = new Date();
    let years = now.getFullYear() - anniversaryDate.getFullYear();
    let months = now.getMonth() - anniversaryDate.getMonth();
    let days = now.getDate() - anniversaryDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days = prevMonth.getDate() + days;
    }

    if (months < 0) {
        years--;
        months = 12 + months;
    }
    
    // Now calculate total seconds, minutes, and hours
    const totalSeconds = Math.floor((now - anniversaryDate) / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    // Get the remaining seconds, minutes, and hours
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    // Update the display
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
// Update the counter every second
setInterval(updateCounter, 1000);

// Initial update
updateCounter();

// Night Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const modeText = document.getElementById('mode-text');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    modeText.textContent = 'Light Mode';
    updateModeIcon(true);
}

modeToggle.addEventListener('click', () => {
    // Toggle dark-mode class on body
    document.body.classList.toggle('dark-mode');
    
    // Update button text and icon
    const isDarkMode = document.body.classList.contains('dark-mode');
    modeText.textContent = isDarkMode ? 'Light Mode' : 'Night Mode';
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update icon
    updateModeIcon(isDarkMode);
});

function updateModeIcon(isDarkMode) {
    if (isDarkMode) {
        modeIcon.innerHTML = '<path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path>';
    } else {
        modeIcon.innerHTML = '<path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path>';
    }
}

// Floating hearts animation
function createHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartCount = 20; // Number of hearts to maintain
    
    // Function to create a single heart with random properties
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random properties
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0% to 100% of viewport width
        const startBottom = Math.random() * 100; // Start at random vertical positions
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 5; // 0s to 5s delay
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}vw`;
        heart.style.bottom = `${startBottom}vh`; // Start from random vertical position
        heart.style.opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        // Remove heart after animation completes
        heart.addEventListener('animationend', function() {
            heart.remove();
            // Create a new heart to replace this one
            setTimeout(createHeart, Math.random() * 3000); // Delay before creating new heart
        });
        
        heartsContainer.appendChild(heart);
    }
    
    // Create initial hearts
    for (let i = 0; i < heartCount; i++) {
        setTimeout(createHeart, i * 300); // Stagger creation
    }
}

// Calendar functionality
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthYear = document.getElementById('current-month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const anniversaryMessage = document.getElementById('anniversary-message');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Check if today is anniversary and show message
function checkAnniversary() {
    const today = new Date();
    if (today.getMonth() === anniversaryDate.getMonth() && today.getDate() === anniversaryDate.getDate()) {
        anniversaryMessage.textContent = "Happy Anniversary Day! ❤️";
        anniversaryMessage.style.display = 'block';
        
        // Add celebration effect
        setTimeout(() => {
            anniversaryMessage.style.transform = 'scale(1.1)';
            anniversaryMessage.style.transition = 'transform 0.3s ease';
        }, 100);
        
        setTimeout(() => {
            anniversaryMessage.style.transform = 'scale(1)';
        }, 400);
        
        // Create extra hearts for celebration
        for (let i = 0; i < 30; i++) {
            setTimeout(createHeart, i * 100);
        }
    } else {
        anniversaryMessage.textContent = '';
        anniversaryMessage.style.display = 'none';
    }
}

// Initialize calendar
function initCalendar() {
    updateCalendar();
    
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
}

function updateCalendar() {
    // Update month/year display
    currentMonthYear.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day-header');
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and total days in month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    const today = new Date();
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        
        // Check if it's today
        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Check if it's the 16th of any month
        if (day === 16) {
            dayElement.classList.add('anniversary-hover');
            
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.classList.add('anniversary-tooltip');
            tooltip.textContent = 'Our Anniversary';
            dayElement.appendChild(tooltip);
        }
        
        calendarGrid.appendChild(dayElement);
    }
}
// Start everything when page loads
window.addEventListener('load', () => {
    createHearts();
    initCalendar();
    checkAnniversary();
    updateCounter();
});