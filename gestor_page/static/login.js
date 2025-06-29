async function logIn(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const datos = {
        'username': user,
        'password': password
    }
    let respuesta;
    try {
        const rel = await fetch('http://127.0.0.1:8000/Tareas-API-v1/iniciar-sesion/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        respuesta = await rel.json()
    } catch (error) {
        console.log({'Request error': error})
    }

    if (respuesta.status === false) {
        context = {
            'status': 'invalid credentials'
        };
        console.log(context);
        const popup = document.getElementById("popup");
        popup.style.display = "flex";
        setTimeout(() => {
            popup.style.display = "none";
        }, 5000)
    } else {
        localStorage.setItem('token', respuesta.token)
        console.log({"status": 'redirect to dashboard'})
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:8000";
        }, 5000);
    }
}

addEventListener("DOMContentLoaded", function() {
    const logBtn = document.getElementById("logBtn");
    logBtn.addEventListener("click", logIn);
});