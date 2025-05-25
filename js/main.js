// Form validation with conditional handling
(function () {
  'use strict';
  var forms = document.querySelectorAll('.needs-validation');
  
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Check if form is valid FIRST
      if (form.checkValidity()) {
        // VALID FORM: Skip validation UI, show success directly
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success mt-3';
        successAlert.role = 'alert';
        successAlert.innerHTML = 'Thank you for your message! We will get back to you soon.';
        form.appendChild(successAlert);
        form.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => successAlert.remove(), 5000);
      } else {
        // INVALID FORM: Show errors
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach(field => {
          field.classList.add('is-invalid');
          const feedback = field.nextElementSibling;
          if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.style.display = 'block';
          }
        });
      }

      form.classList.add('was-validated');
    }, false);

    // Clear validation on input (keeps your existing real-time validation)
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', function() {
        if (this.checkValidity()) {
          this.classList.remove('is-invalid');
          const feedback = this.nextElementSibling;
          if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.style.display = 'none';
          }
        }
      });
    });
  });
})();