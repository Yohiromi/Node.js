document.addEventListener('DOMContentLoaded', function () {
    const inputs = {
        name: document.querySelector('[name="name"]'),
        image_url: document.querySelector('[name="image_url"]'),
        strength: document.querySelector('[name="strength"]'),
        speed: document.querySelector('[name="speed"]'),
        skill: document.querySelector('[name="skill"]'),
        fear_factor: document.querySelector('[name="fear_factor"]'),
        power: document.querySelector('[name="power"]'),
        intelligence: document.querySelector('[name="intelligence"]'),
        wealth: document.querySelector('[name="wealth"]')
    };

    const errors = {
        name: document.getElementById('name_error'),
        image_url: document.getElementById('image_url_error'),
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

    function isInputEmpty(value) {
        return value === '';
    }

    function isImageEmpty(input) {
        return !(input.files && input.files.length > 0);
    }

    function isNameDuplicate(value) {
        // 请确保传递到这个函数中的 allIds 是小写的
        const nameToCheck = value.replace(' ', '').toLowerCase();
        return allIds.includes(nameToCheck);
    }

    function isValueNumericAndInRange(value) {
        const number = parseFloat(value);
        return isNaN(number) || number < 0 || number > 100;
    }

    function validateInput(input, errorElement) {
        const value = input.value.trim();

        // 文件输入验证
        if (input.type === 'file' && isImageEmpty(input)) {
            errorElement.textContent = 'Image cannot be empty!';
            showValidationError(input, errorElement);
            return;
        }

        // 名称验证
        if (input.name === 'name') {
            if (isInputEmpty(value)) {
                errorElement.textContent = 'Name cannot be empty';
                showValidationError(input, errorElement);
                return;
            }
            if (isNameDuplicate(value)) {
                errorElement.textContent = 'Name already exists';
                showValidationError(input, errorElement);
                return;
            }
            // 为名称字段清除所有其他错误，因为它不是数值
            clearValidationError(input, errorElement);
            return;
        }

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
