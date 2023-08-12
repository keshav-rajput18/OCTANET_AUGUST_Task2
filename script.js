const taskInput = document.getElementById('task');
const deadlineInput = document.getElementById('deadline');
const priorityInput = document.getElementById('priority');
const labelsInput = document.getElementById('labels');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const completedCountElement = document.getElementById('completedCount');
const remainingCountElement = document.getElementById('remainingCount');

addTaskButton.addEventListener('click', addTask);

taskList.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
    const taskItem = event.target.closest('.task');
    taskItem.classList.toggle('done');
    updateProgress();
}
});

function addTask() {
const taskText = taskInput.value.trim();
if (taskText !== '') {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task');
    const priorityClass = priorityInput.value;
    taskItem.innerHTML = `
    <input type="checkbox" class="task-checkbox">
    <label>${taskText}</label>
    <div class="task-details">
        <span class="deadline">Deadline: ${deadlineInput.value}</span>
        <span class="priority ${priorityClass}">Priority: ${priorityInput.options[priorityInput.selectedIndex].text}</span>
        <span class="labels">Labels: ${labelsInput.value}</span>
    </div>
    <button class="delete">Delete</button>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
    taskInput.focus();
    deadlineInput.value = '';
    priorityInput.selectedIndex = 0;
    labelsInput.value = '';
    updateProgress();

    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
    taskItem.remove();
    updateProgress();
    });
}
}

function updateProgress() {
const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
const totalTasks = document.querySelectorAll('.task-checkbox').length;
const remainingTasks = totalTasks - completedTasks;

completedCountElement.textContent = completedTasks;
remainingCountElement.textContent = remainingTasks;
}
