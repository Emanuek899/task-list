import { logOut, getToken } from "./utils.js";

addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.getElementById("logout-btn");
    const token = getToken()
    logoutBtn.addEventListener("click", async function () {
        logOut(token);
    });
});