// Set your anniversary date here (YYYY, MM-1, DD)
// Note: Months are 0-indexed (0 = January, 11 = December)
const anniversaryDate = new Date(2022, 11, 16); // January 1, 2023

// Update the displayed start date
document.getElementById('start-date').textContent = anniversaryDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

function updateCounter() {
    const now = new Date();
    const diff = now - anniversaryDate; // Difference in milliseconds
    
    // Calculate time difference
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    // Calculate years and remaining days
    const anniversaryThisYear = new Date(now.getFullYear(), anniversaryDate.getMonth(), anniversaryDate.getDate());
    let years = now.getFullYear() - anniversaryDate.getFullYear();
    let remainingDays = Math.floor((now - anniversaryThisYear) / (1000 * 60 * 60 * 24));
    
    if (remainingDays < 0) {
        years--;
        const lastYearAnniversary = new Date(now.getFullYear() - 1, anniversaryDate.getMonth(), anniversaryDate.getDate());
        remainingDays = Math.floor((now - lastYearAnniversary) / (1000 * 60 * 60 * 24));
    }
    
    // Calculate months and remaining days after full years
    let months = years * 12;
    let tempDate = new Date(anniversaryDate);
    tempDate.setFullYear(tempDate.getFullYear() + years);
    
    while (tempDate < now) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate <= now) {
            months++;
        } else {
            tempDate.setMonth(tempDate.getMonth() - 1);
            break;
        }
    }
    
    // Calculate remaining days after full months
    remainingDays = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    
    // Update the display
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours % 24;
    document.getElementById('minutes').textContent = minutes % 60;
    document.getElementById('seconds').textContent = seconds % 60;
}

// Update the counter every second
setInterval(updateCounter, 1000);

// Initial update
updateCounter();


// Floating hearts animation
function createHearts() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random position
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    
    // Random size
    const size = Math.random() * 15 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    // Random animation duration
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    
    // Random opacity
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create hearts container
const heartsContainer = document.createElement('div');
heartsContainer.classList.add('floating-hearts');
document.body.appendChild(heartsContainer);

// Generate hearts periodically
setInterval(createHearts, 300);