document.addEventListener("DOMContentLoaded", function() {
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener('click', registerUser);

    async function registerUser(event) {
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const datos = {
            'username': user,
            'password': password
        }
        const rel = await fetch('http://127.0.0.1:8000/Tareas-API-v1/nuevo-usuario/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        const respuesta = await rel.json();
        if(respuesta.detail == "succes"){
            localStorage.setItem('token', respuesta.token);
            window.location.href = "http://127.0.0.1:8000";
        }
        console.log(respuesta);
    }
});