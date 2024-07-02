const listContainer = document.getElementById('list-container');
const inputBox = document.getElementById('input-box');
const prioritySelect = document.getElementById('priority');

function addTask(){
    if(inputBox.value === ''){
        alert("Enter a Task");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML=inputBox.value;
        li.setAttribute('data-priority', prioritySelect.value);
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    sortTasks();
    inputBox.value = "";
    saveTask();

}

listContainer.addEventListener("click",function(e){
    
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveTask();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveTask();        
    }
});



function saveTask(){
      localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML =localStorage.getItem("data");
    addEventListenersToSpans();
}
function sortTasks() {
    let tasks = Array.from(listContainer.children);
    tasks.sort((a, b) => a.getAttribute('data-priority') - b.getAttribute('data-priority'));
    listContainer.innerHTML = '';
    tasks.forEach(task => listContainer.appendChild(task));
}
function addEventListenersToSpans() {
    const spans = document.querySelectorAll('li > span');
    spans.forEach(span => {
        span.addEventListener('click', function () {
            this.parentElement.remove();
            saveTask();
        });
    });
}
showTask()