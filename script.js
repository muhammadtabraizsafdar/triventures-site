// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');
        }
    });
});

// Premium AJAX Form Submission Handling
const form = document.getElementById('inquiryForm');
const formResponse = document.getElementById('formResponse');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the page from redirecting
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('.submit-btn');
        
        // Show loading state on button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerText = "Sending Request...";
        }

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success message
                formResponse.innerHTML = "✨ Your custom trip plan has been received! Our travel specialists will email you your itinerary shortly.";
                formResponse.className = "form-response success"; 
                form.reset(); // Clear the form fields
            } else {
                // Handle API error
                formResponse.innerHTML = json.message || "Something went wrong. Please try again.";
                formResponse.className = "form-response error";
            }
        })
        .catch(error => {
            // Handle network error
            formResponse.innerHTML = "Network error. Please check your internet connection.";
            formResponse.className = "form-response error";
        })
        .then(() => {
            // Restore button state
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerText = "Request Custom Itinerary";
            }
            // Remove hidden utility class if present
            formResponse.classList.remove('hidden');
        });
    });
}