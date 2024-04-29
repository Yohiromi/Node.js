document.addEventListener('DOMContentLoaded', function () {

    const inputs = {
        strength: document.querySelector('[name="strength"]'),
        speed: document.querySelector('[name="speed"]'),
        skill: document.querySelector('[name="skill"]'),
        fear_factor: document.querySelector('[name="fear_factor"]'),
        power: document.querySelector('[name="power"]'),
        intelligence: document.querySelector('[name="intelligence"]'),
        wealth: document.querySelector('[name="wealth"]')
    };

    const errors = {
        strength: document.getElementById('strength_error'),
        speed: document.getElementById('speed_error'),
        skill: document.getElementById('skill_error'),
        fear_factor: document.getElementById('fear_factor_error'),
        power: document.getElementById('power_error'),
        intelligence: document.getElementById('intelligence_error'),
        wealth: document.getElementById('wealth_error')
    };

    const submitButton = document.getElementById('submit'); // Assume there's one submit button in your form

    Object.keys(inputs).forEach(key => {
        validateInput(inputs[key], errors[key]);
    });
    checkFormValidity(); // Check form validity at the start


    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', function () {
            validateInput(this, errors[key]);
            checkFormValidity();
        });
        inputs[key].addEventListener('focus', function () {
            validateInput(this, errors[key]);
            checkFormValidity();
        });
    });

    function isValueNumericAndInRange(value) {
        const number = parseFloat(value);
        return isNaN(number) || number < 0 || number > 100;
    }

    function validateInput(input, errorElement) {
        const value = input.value.trim();

        // 对数值输入字段执行数值范围验证
        if (['strength', 'speed', 'skill', 'fear_factor', 'power', 'intelligence', 'wealth'].includes(input.name)) {
            if (isValueNumericAndInRange(value)) {
                errorElement.textContent = 'Illegal input!';
                showValidationError(input, errorElement);
                return;
            }
        }

        clearValidationError(input, errorElement);
    }


    function showValidationError(input, errorElement) {
        errorElement.style.display = 'block';
        input.classList.add('invalid');
    }

    function clearValidationError(input, errorElement) {
        errorElement.style.display = 'none';
        input.classList.remove('invalid');
    }


    function checkFormValidity() {
        const anyInvalid = Array.from(document.querySelectorAll('input, select')).some(input => input.classList.contains('invalid'));
        submitButton.disabled = anyInvalid;
        if (anyInvalid) {
            submitButton.style.cursor = 'not-allowed';
        } else {
            submitButton.style.cursor = 'pointer';
        }
    }
});
