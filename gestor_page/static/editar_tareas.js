import { editTask, getToken } from './utils.js'
document.addEventListener("DOMContentLoaded", function() {
	const submitBtn = document.getElementById("updt-task-btn");
	submitBtn.addEventListener("click", async function () {
		const taskName = document.getElementById("task-name").value;
        const taskDesc = document.getElementById("task-desc").value;
        const taskId = document.body.dataset.id;
        const token = getToken();
        editTask(taskId, taskName, taskDesc, token);
        setTimeout(() => {
        	window.location.href = "http://127.0.0.1:8000";
        }, 3000)
	});
});