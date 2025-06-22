const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'Test123!@#';

const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const submitBtn = document.getElementById('submitBtn');
const passwordToggle = document.querySelector('.password-toggle');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqLowercase = document.getElementById('req-lowercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

let isFormValid = false;
let isSubmitting = false;

let isPopCatOpen = false;
const CAT_CLOSED_URL = 'assets/cat-closed.png';
const CAT_OPEN_URL = 'assets/cat-open.png';

document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    loadSavedData();
    setupEventListeners();
    setupPopCatOnClick();
    setupPulsatingHint();
});

const initializeForm = () => {
    updateSubmitButton();
    validatePassword(passwordInput.value);
};

const setupEventListeners = () => {
    emailInput.addEventListener('input', (e) => {
        validateEmail(e.target.value);
        updateSubmitButton();
    });

    passwordInput.addEventListener('input', (e) => {
        validatePassword(e.target.value);
        updateSubmitButton();
    });

    passwordToggle.addEventListener('click', togglePasswordVisibility);

    authForm.addEventListener('submit', handleFormSubmit);

    emailInput.addEventListener('blur', saveFormData);
    passwordInput.addEventListener('blur', saveFormData);
    rememberCheckbox.addEventListener('change', saveFormData);

    authForm.addEventListener('keydown', handleKeyboardNavigation);
};

const setupPopCatOnClick = () => {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.form-container')) {
            return;
        }

        const catImage = document.createElement('img');
        catImage.className = 'pop-cat-image';

        isPopCatOpen = !isPopCatOpen;
        catImage.src = isPopCatOpen ? CAT_OPEN_URL : CAT_CLOSED_URL;

        catImage.style.left = e.pageX + 'px';
        catImage.style.top = e.pageY + 'px';

        document.body.appendChild(catImage);

        setTimeout(() => {
            catImage.remove();
        }, 700);
    });
};

const setupPulsatingHint = () => {
    const hint = document.getElementById('pulsatingHint');
    const form = document.querySelector('.form-container');

    if (!hint || !form) return;

    form.addEventListener('mouseenter', () => {
        hint.classList.add('hidden');
    });

    form.addEventListener('mouseleave', () => {
        hint.classList.remove('hidden');
    });
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    
    if (!email) {
        showError(emailError, 'Email или телефон обязателен');
        return false;
    }
    
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
        showError(emailError, 'Введите корректный email или телефон');
        return false;
    }
    
    clearError(emailError);
    return true;
};

const validatePassword = (password) => {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    updateRequirement(reqLength, requirements.length);
    updateRequirement(reqUppercase, requirements.uppercase);
    updateRequirement(reqLowercase, requirements.lowercase);
    updateRequirement(reqNumber, requirements.number);
    updateRequirement(reqSpecial, requirements.special);

    const isValid = Object.values(requirements).every(req => req);
    
    if (!password) {
        showError(passwordError, 'Пароль обязателен');
        return false;
    }
    
    if (!isValid) {
        showError(passwordError, 'Пароль не соответствует требованиям');
        return false;
    }
    
    clearError(passwordError);
    return isValid;
};

const updateRequirement = (element, isValid) => {
    if (isValid) {
        element.classList.add('valid');
    } else {
        element.classList.remove('valid');
    }
};

const showError = (element, message) => {
    element.textContent = message;
    element.style.display = 'block';
};

const clearError = (element) => {
    element.textContent = '';
    element.style.display = 'none';
};

const togglePasswordVisibility = () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const eyeIcon = passwordToggle.querySelector('.eye-icon');
    if (type === 'text') {
        eyeIcon.innerHTML = `
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        `;
    } else {
        eyeIcon.innerHTML = `
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        `;
    }
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
        showFormError('Пожалуйста, исправьте ошибки в форме');
        shakeForm();
        return;
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        await submitForm();
    } else {
        showFormError('Неверный email или пароль. Используйте: test@example.com / Test123!@#');
        shakeForm();
    }
};

const submitForm = async () => {
    isSubmitting = true;
    updateSubmitButton();

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (rememberCheckbox.checked) {
        saveFormData();
    }

    showSuccessMessage();

    setTimeout(() => {
        authForm.reset();
        isSubmitting = false;
        updateSubmitButton();
        clearFormData();
    }, 3000);
};

const updateSubmitButton = () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    isFormValid = validateEmail(email) && validatePassword(password);
    
    const canAttemptSubmit = email.length > 0 && password.length > 0;
    submitBtn.disabled = !canAttemptSubmit || isSubmitting;
    
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    if (isSubmitting) {
        btnText.textContent = 'Вход...';
        spinner.hidden = false;
    } else {
        btnText.textContent = 'Войти';
        spinner.hidden = true;
    }
};

const showFormError = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    const form = document.getElementById('authForm');
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
};

const showSuccessMessage = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        color: #16a34a;
        padding: 0.75rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = 'Успешный вход! Перенаправление...';
    
    const form = document.getElementById('authForm');
    form.insertBefore(successDiv, form.firstChild);
};

const shakeForm = () => {
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.add('shake');
    setTimeout(() => {
        formContainer.classList.remove('shake');
    }, 820);
};

const saveFormData = () => {
    if (rememberCheckbox.checked) {
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
            remember: true
        };
        localStorage.setItem('authFormData', JSON.stringify(formData));
    } else {
        clearFormData();
    }
};

const loadSavedData = () => {
    const savedData = localStorage.getItem('authFormData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (data.remember) {
                emailInput.value = data.email || '';
                passwordInput.value = data.password || '';
                rememberCheckbox.checked = true;
            }
        } catch (error) {
            console.error('Ошибка загрузки сохраненных данных:', error);
            clearFormData();
        }
    }
};

const clearFormData = () => {
    localStorage.removeItem('authFormData');
};

const handleKeyboardNavigation = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
        e.preventDefault();
        if (!submitBtn.disabled) {
            handleFormSubmit(e);
        }
    }
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const debouncedEmailValidation = debounce(validateEmail, 300);
const debouncedPasswordValidation = debounce(validatePassword, 300);

emailInput.addEventListener('input', (e) => {
    debouncedEmailValidation(e.target.value);
    updateSubmitButton();
});

passwordInput.addEventListener('input', (e) => {
    debouncedPasswordValidation(e.target.value);
    updateSubmitButton();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        saveFormData,
        loadSavedData,
        clearFormData
    };
}