document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
  
  
    function showError(input, message) {
      input.classList.add('is-invalid');
      const errorEl = document.getElementById(input.id + '-error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
    }
  

    function clearError(input) {
      input.classList.remove('is-invalid');
      const errorEl = document.getElementById(input.id + '-error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }
  

    function clearAllErrors() {
      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      form.querySelectorAll('.field-error').forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
      });
    }
  
  
    form.querySelectorAll('.form-control, .form-select, .form-check-input').forEach(input => {
      input.addEventListener('input', function () { clearError(this); });
      input.addEventListener('change', function () { clearError(this); });
    });
  
  
    form.addEventListener('reset', function () {
      clearAllErrors();
      const successEl = document.getElementById('formSuccess');
      if (successEl) successEl.style.display = 'none';
    });
  
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearAllErrors();
  
      let isValid = true;
  
      const fullname = document.getElementById('fullname');
      const fullnameValue = fullname.value.trim();
  
      if (fullnameValue === '') {
        showError(fullname, 'Введите фамилию и имя');
        isValid = false;
      } else if (fullnameValue.split(' ').filter(w => w.length > 0).length < 2) {
        showError(fullname, 'Введите фамилию и имя (минимум 2 слова)');
        isValid = false;
      }
  
      const phone = document.getElementById('phone');
      const phoneValue = phone.value.trim();
      const phoneDigits = phoneValue.replace(/\D/g, '');
  
      if (phoneValue === '') {
        showError(phone, 'Введите номер телефона');
        isValid = false;
      } else if (phoneDigits.length < 10) {
        showError(phone, 'Телефон должен содержать не менее 10 цифр');
        isValid = false;
      }
  
      const email = document.getElementById('email');
      const emailValue = email.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (emailValue === '') {
        showError(email, 'Введите email');
        isValid = false;
      } else if (!emailPattern.test(emailValue)) {
        showError(email, 'Введите корректный email (например: user@mail.ru)');
        isValid = false;
      }
  
      const agreement = document.getElementById('agreement');
      if (!agreement.checked) {
        showError(agreement, 'Необходимо согласиться на обработку данных');
        isValid = false;
      }
  
  
      if (isValid) {
        const formData = {
          fullname: fullnameValue,
          phone:    phoneValue,
          email:    emailValue,
          subject:  document.getElementById('subject').value || '(не выбрано)',
          message:  document.getElementById('message').value.trim() || '(не заполнено)',
        };
  
        const validEvent = new CustomEvent('formValid', { detail: formData });
        document.dispatchEvent(validEvent);
  
        const successEl = document.getElementById('formSuccess');
        if (successEl) successEl.style.display = 'block';

        form.reset();
      }
    });
  });