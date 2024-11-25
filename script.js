const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
successMessage.style.display = 'block';

// Função para exibir erros
const showError = (fieldId, errorMessage) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    if (errorElement) errorElement.textContent = errorMessage;
};

// Função para limpar os erros existentes
const clearErrors = () => {
    document.querySelectorAll('.error').forEach(el => (el.textContent = ''));
};

// Função de validação de campos
const validateField = (field, fieldId, errorMessage) => {
    if (!field.value.trim()) {
        showError(fieldId, errorMessage);
        return false;
    }
    return true;
};

// Função para validar email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError('email', 'A valid email is required.');
        return false;
    }
    return true;
};

// Função de validação do formulário
const validateForm = () => {
    const fields = [
        { field: form.firstName, id: 'firstName', error: 'First name is required.' },
        { field: form.lastName, id: 'lastName', error: 'Last name is required.' },
        { field: form.message, id: 'message', error: 'Message is required.' },
    ];

    let isValid = true;

    // Limpa os erros antes da validação
    clearErrors();

    // Valida campos gerais
    fields.forEach(({ field, id, error }) => {
        if (!validateField(field, id, error)) isValid = false;
    });

    // Valida email
    if (!validateEmail(form.email)) isValid = false;

    // Valida queryType (tipo de consulta)
    if (!form.querySelector('input[name="queryType"]:checked')) {
        showError('queryType', 'Please select a query type.');
        isValid = false;
    }

    // Valida consentimento
    if (!form.consent.checked) {
        alert('You must consent to be contacted.');
        isValid = false;
    }

    return isValid;
};

// Evento de envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        successMessage.style.display = 'block';
        form.reset();
    }
});