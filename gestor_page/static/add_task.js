import { getToken, addTask } from "./utils.js";
import { showTasks } from "./get_tasks.js"
document.addEventListener("DOMContentLoaded", function (){
    const btn = document.getElementById("add-task-btn");
    btn.addEventListener("click", async function () {
        const taskNameInput = document.getElementById("task-name");
        const taskDescriptionInput = document.getElementById("task-desc");
        const taskName = taskNameInput.value;
        const taskDescription = taskDescriptionInput.value;
        const token = getToken();
        addTask(token, taskName, taskDescription);
        setTimeout(() => {
            taskNameInput.value = "";
            taskDescriptionInput.value = "";
        }, 3000);
        await showTasks();
    });
}); 