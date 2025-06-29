import { showTasks } from "./get_tasks.js"

export function getToken() {
    const token = localStorage.getItem("token");
    return token;
}

export async function getUserData(token) {
    const userData = await fetch("http://127.0.0.1:8000/Tareas-API-v1/datos-de-usuario/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${token}`
        },
    });
    if (!userData.ok) {
        const context = {
            "detail": "Somwthing gone wrong while the petition"
        };
        return context;
    }
    const respuesta = await userData.json();  
    return respuesta;
}

export async function addTask(token, taskName, taskDesc){
    const task = {
        "nombre_tarea": taskName,
        "descripcion": taskDesc,
    };
    const res = await fetch("http://127.0.0.1:8000/Tareas-API-v1/agregar-tarea/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(task)
    });
    if (!res.ok) {
        console.error({"error wwhile adding task": res.status});
    } else {
        const context = {
            "status": "succes while adding",
            "status_code": res.status
        }
        console.log()
    }
    await showTasks();
}

export async function getTasks(token) {
    const res = await fetch('http://127.0.0.1:8000/Tareas-API-v1/ver-tareas/',{
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${token}`
        }
    });
    const respuesta = await res.json();
    if (respuesta.detail) {
        return "No homeworks yet";
    } else {
        return respuesta;
    }
}

export async function deleteTask(token, id) {
    const response = await fetch(`http://127.0.0.1:8000/Tareas-API-v1/borrar-tarea/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    if (response.ok) {
        await showTasks();
        return true;
    }
    return false;
}
 
export async function logOut(token) {
    const rel = await fetch("http://127.0.0.1:8000/Tareas-API-v1/cerrar-sesion/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    });
    if (rel.ok) {
        localStorage.removeItem("token");
        window.location.href = "http://127.0.0.1:8000";
    } else {
        console.log("error");
    }
}

export async function editTask(pk, taskName, taskDesc, token) {
    const task = {
        "nombre_tarea": taskName,
        "descripcion": taskDesc,
    };
    try {
        const res = await fetch(`http://127.0.0.1:8000/Tareas-API-v1/edit-task/${pk}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(task)
        });

        if (!res.ok) {
            const context = {
                "Status": "Error while updating",
                "Status-Code": res.status
            };
            console.error(context);
        } else{
            const context = {
                "Status": "Success updating", 
                "Status-Code": res.status};
            console.log(context);
        }
    } catch (error) {
        const context = {
            "Status": "Unexpected error",
            "Error": error
        };
        console.error(context);
    }
}


export async function changePass(token ,oldPass, newPass, confirmPass) {
    try {
        const pass = {
        "actual-pass": oldPass,
        "new-pass": newPass,
        "confirm-pass": confirmPass
        }
        const response = await fetch("http://127.0.0.1:8000/Tareas-API-v1/change-password/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(pass)
        });
        const res = await response.json();
        if (!response.ok) {
            console.error(`${res.error}, status: ${response.status}`);
            if (response.status === 400 || response.status === 401) {
                return response;
            }
        } else {
            console.log(`${res.message}, ${response.status}`);
            return response;
        }
    } catch (error) {
        console.error({"Status": "Unexpected error", "Error": error});
    }
}