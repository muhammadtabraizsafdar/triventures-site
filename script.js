// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('is-active');
    
    // Animate hamburger lines
    const bars = mobileMenu.querySelectorAll('.bar');
    if(mobileMenu.classList.contains('is-active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('is-active');
        document.querySelectorAll('.bar').forEach(bar => bar.style.transform = 'none');
        document.querySelectorAll('.bar')[1].style.opacity = '1';
    });
});

// Form Submission Handler
const form = document.getElementById('inquiryForm');
const formResponse = document.getElementById('formResponse');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Grab details
    const name = document.getElementById('name').value;
    const destination = document.getElementById('destination').value;
    
    // Show smooth confirmation feedback
    formResponse.textContent = `Thank you, ${name}! Your custom itinerary request for "${destination}" has been received. Our team will get back to you within 24 hours.`;
    formResponse.className = "form-response success";
    
    // Clear the inputs
    form.reset();
    
    // Auto-scroll response cleanly into window view
    formResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
});