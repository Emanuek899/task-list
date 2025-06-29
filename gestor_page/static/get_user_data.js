import { getToken, getUserData } from "./utils.js";

document.addEventListener("DOMContentLoaded", async function (){
    const token = getToken()
    const userData = await getUserData(token)
    const container = document.getElementById("username");
    container.innerText = `Bienvenido ${userData["username"]}`;
    container.style.color = "black";
});
