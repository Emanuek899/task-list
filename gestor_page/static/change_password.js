import { changePass, getToken } from "./utils.js";
document.addEventListener("DOMContentLoaded", async () => {
    const changeBtn = document.getElementById("change-btn");
    const newPassInput = document.getElementById("new-pass");
    const confirmPassInput = document.getElementById("confirm-pass");
    const container = document.getElementById("match-message");
    confirmPassInput.addEventListener("input", () => {
        if (confirmPassInput.value != newPassInput.value) {
            changeBtn.classList.add("disable");
            container.style.display = "flex";
            container.style.backgroundColor = "red"
            container.innerText = "Password doesn't match"; 
        } else {
            const container = document.getElementById("match-message");
            changeBtn.classList.remove("disable");
            container.style.display = "flex";
            container.style.backgroundColor = "green";
            container.innerText = "Password match";
        }
    })
    changeBtn.addEventListener("click", async () => {
        const token = getToken();
        const oldPassInput = document.getElementById("actual-pass");
        const confirmation = await changePass(token, oldPassInput.value, newPassInput.value, confirmPassInput.value); 
        if (confirmation.status === 401) {
            const wrongPass = document.getElementById("old-pass-match");
            container.style.display = "none";
            wrongPass.style.display = "block";
            newPassInput.value = "";
            confirmPassInput.value = "";
        } else if (confirmation.status === 200) {
            setTimeout(() => {
                window.location.href = "http://127.0.0.1:8000";
            }, 3000)
        }
    });
}) 