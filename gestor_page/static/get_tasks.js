import { getToken, getTasks, deleteTask } from "./utils.js";

export async function showTasks(first=0, second=5) {
    const token = getToken();
    const tasks = await getTasks(token);
    const container = document.getElementById("task-list");
    container.style.color = "black";
    container.innerHTML = '';
    if (tasks.staus === 404 || tasks.lenght === 0) {
        container.innerHTML = "No tasks available";
    }
    
    // pagination buttons functionality
    const nextBtn = document.createElement("button");
    const lastBtn = document.createElement("button");
    nextBtn.innerText = "next";
    lastBtn.innerText = "last";
    nextBtn.addEventListener("click", async () => {
        await showTasks(first + 5, second + 5);
    });
    lastBtn.addEventListener("click", async () => {
        await showTasks(first - 5, second - 5);
    });
    tasks.reverse();
    const group  = tasks.slice(first, second);

    // task elements creation
    group.forEach(task => {
        const divTask = document.createElement("div");
        divTask.classList.add("div-tarea");
        divTask.innerText = `Homework: ${task.nombre_tarea}\nDescription: ${task.descripcion}`;
        
        // delete button functionality
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn", "btn", "btn-primary", "m-2");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", async function() {
            const confirmation = confirm("Delete?");
            if (!confirmation) return;
            const deletedTask = deleteTask(token, task.id)
            if (deletedTask === true) {
                divTask.remove();
            }
        });
        
        // edit button functionality
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn", "btn", "btn-primary", "m-2");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", async function () {
            setTimeout(() => {
                window.location.href = `http://127.0.0.1:8000/update-task/${task.id}`
            }, 2000)
            return;
        });

        divTask.appendChild(editBtn);
        divTask.appendChild(deleteBtn);
        container.appendChild(divTask);
    });
    container.appendChild(lastBtn);
    container.appendChild(nextBtn);
}

showTasks();
