// assets/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');
    const choice1 = document.getElementById('choice1');
    const choice2 = document.getElementById('choice2');
    let currentStep = 0;

    nextButton.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            steps[currentStep].classList.add('exit');
            steps[currentStep].addEventListener('transitionend', function handleTransitionEnd() {
                steps[currentStep].classList.remove('active', 'exit');
                steps[currentStep].removeEventListener('transitionend', handleTransitionEnd);
                currentStep++;
                updateForm();
            });
        }
    });

    backButton.addEventListener('click', () => {
        steps[currentStep].classList.add('exit');
        steps[currentStep].addEventListener('transitionend', function handleTransitionEnd() {
            steps[currentStep].classList.remove('active', 'exit');
            steps[currentStep].removeEventListener('transitionend', handleTransitionEnd);
            currentStep--;
            updateForm(true);
        });
    });

    choice1.addEventListener('change', () => {
        choice2.innerHTML = '<option value="">Select...</option>';
        if (choice1.value === 'option1') {
            choice2.innerHTML += '<option value="option1A">Option 1A</option>';
            choice2.innerHTML += '<option value="option1B">Option 1B</option>';
        } else if (choice1.value === 'option2') {
            choice2.innerHTML += '<option value="option2A">Option 2A</option>';
            choice2.innerHTML += '<option value="option2B">Option 2B</option>';
        }
    });

    const form = document.getElementById('dynamicStepForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });

    function updateForm(isBack = false) {
        steps[currentStep].classList.add('active');
        if (isBack) {
            steps[currentStep].style.transform = 'translateX(-100%)';
            setTimeout(() => {
                steps[currentStep].style.transform = 'translateX(0)';
            }, 0);
        } else {
            steps[currentStep].style.transform = 'translateX(100%)';
            setTimeout(() => {
                steps[currentStep].style.transform = 'translateX(0)';
            }, 0);
        }

        backButton.style.display = currentStep > 0 ? 'block' : 'none';
        nextButton.style.display = currentStep < steps.length - 1 ? 'block' : 'none';
        submitButton.style.display = currentStep === steps.length - 1 ? 'block' : 'none';
    }

    function validateStep(step) {
        if (step === 0) {
            return choice1.value !== '';
        } else if (step === 1) {
            return choice2.value !== '';
        } else if (step === 2) {
            return document.getElementById('finalInput').value !== '';
        }
        return true;
    }

    updateForm();
});
