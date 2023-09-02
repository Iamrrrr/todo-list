const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const add=document.getElementById("adding");

add.addEventListener("click",addTask);
function addTask(event){
    taskForm.classList.add('active');

    const close=document.getElementById("close");
    close.addEventListener("click",closeTask);

    const submit=document.getElementById("submit");
    submit.addEventListener("click", addTaskList);
}

function closeTask(event){
    taskForm.classList.remove('active');
}




function addTaskList(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("desc").value;
    const priority = document.querySelector('input[name="priority"]:checked').value;


    if(title==""){
        alert("Please enter the title");
        return false;
    }

    else if(description==""){
        alert("Please enter the description");
        return false;
    }

    const newTask = document.createElement("div");
    newTask.classList.add("taskList");

    newTask.innerHTML = `
    <div class="tasks" id="tasks">
        <div class="content">
            <input type="text" class="text" value="${title}" readonly/>
        </div>
        <div class="description">
            <input type="text" class="shortdesc" value="${description}" readonly />
        </div>
        <div class="priorities">
            <input type="text" class="prioritytext" value="${priority}" readonly/>
        </div>
        <div class="status">
            <input type="text" id="statustext" class="statustext" value="PENDING" readonly />
        </div> 
        <div class="action">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
     </div>   
    `;

    taskList.appendChild(newTask);

    document.getElementById("title").value = '';
    document.getElementById("desc").value = '';
    closeTask();

    const status=newTask.querySelector(".statustext");
    const newPriority=newTask.querySelector(".prioritytext");
    status.addEventListener("click",()=>{
        if(status.value=="PENDING"){
            status.value="COMPLETED";
            status.classList.add('activeStatus');
        }
        else{
            status.value="PENDING";
            status.classList.remove('activeStatus');
        }
    }
    );

    newPriority.addEventListener("click",()=>
    {
        if(newPriority.value=="High"){
            newPriority.value="Medium";
        }
        else if(newPriority.value=="Medium"){
            newPriority.value="Low";
        }
        else{
            newPriority.value="High";
        }
    });

    const editTask=newTask.querySelector(".edit");
    editTask.addEventListener("click", () => {
        const newTitle = prompt("Edit Title:", newTask.querySelector(".text").value);
        const newDescription = prompt("Edit Description:", newTask.querySelector(".shortdesc").value);


        if (newTitle !="") {
             newTask.querySelector(".text").value = newTitle;
        }

        if (newDescription !="") {
            newTask.querySelector(".shortdesc").value = newDescription;
        }

    });



    const deleteTask = newTask.querySelector(".delete");
    deleteTask.addEventListener("click", () => {
         taskList.removeChild(newTask);
    });
}



