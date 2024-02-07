let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arrayOfTasks = [];

// check data in local storage
if(window.localStorage.tasks){    
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
    addTaskToPage(arrayOfTasks);
}

//add task 
submit.onclick = function(){ 
    if(input.value !== ""){
        addTaskTOArray(input.value);
        input.value = "";
    }
}

// click on task element
tasks.addEventListener("click", (e)=>{
    // delete button
    if (e.target.classList.contains("del")){
        // Remove from page
        e.target.parentElement.remove();
        // Remove from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    }

    // Done state
    if(e.target.classList.contains("task")){
        // Toggle state of task 
        e.target.classList.toggle("done");
        // Toggle state in local Storage
        toggleStateWith(e.target.getAttribute("data-id"));
    }
})

function addTaskTOArray(tasktext) {
    //task data
    const task = {
        id : Date.now(),
        title: tasktext,
        completed: false,
    };
    //push task to array 
    arrayOfTasks.push(task);
    //add task to page
    addTaskToPage(arrayOfTasks);
    //add task to local stoarge
    addTaskToLocalStorage(arrayOfTasks);
}

function addTaskToPage(arrayOfTasks){
    //clear task 
    tasks.innerHTML = "";
    //loop to array and add each task 
    arrayOfTasks.forEach((task)  => {
        //make main div
        let div = document.createElement("div");
        div.className = "task";        
        //check if task done 
        if(task.completed){
            div.className = "task done";
        }
        //make id to each task
        div.setAttribute("data-id", task.id);  
        div.appendChild(document.createTextNode(task.title));        
        //make delete button
        const del = document.createElement("span");
        del.className = "del";
        del.appendChild(document.createTextNode("delete"));
        //append delete button to task div
        div.appendChild(del);
        //append task div to main tasks div
        tasks.appendChild(div);
    });    
}

function addTaskToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

// delete task 
function deleteTaskWith(dataId){
    arrayOfTasks = arrayOfTasks.filter(task => task.id != dataId);
    addTaskToLocalStorage(arrayOfTasks);
}

// Toggle state In Local Storage
function toggleStateWith(TaskId){
    for(i = 0; i< arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == TaskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }        
    }
    addTaskToLocalStorage(arrayOfTasks);
}