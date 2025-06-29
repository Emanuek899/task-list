document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");
    const submitBtn = document.getElementById("submit-btn");
    const passwordMatchMessage = document.createElement("div")
    passwordMatchMessage.style.backgroundColor = "red";
    passwordMatchMessage.style.width = "200px";
    passwordMatchMessage.style.height = "200px";

    passwordField.addEventListener("input", checkPassword);
    confirmPasswordField.addEventListener("input", checkPassword);

    function checkPassword() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        if (password != confirmPassword) {
            passwordMatchMessage.display = "block"
            if (!document.contains(passwordMatchMessage)) {
                confirmPasswordField.parentNode.appendChild(passwordMatchMessage);
            }
            submitBtn.disabled = true;
        } else {
            passwordMatchMessage.remove()
            submitBtn.disabled = false;
        }
    }
});