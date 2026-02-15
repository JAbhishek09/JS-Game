let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let dragElement = null;

function addTask(title,desc,column) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>`;
    column.appendChild(div);
    div.addEventListener("dragstart", (e) => {
        dragElement = div;
      });

  const deleteButton = div.querySelector("button");
  deleteButton.addEventListener("click", () => {
    div.remove();
    updateTaskCount();
  });

      return div;
}
function updateTaskCount(){
    columns.forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");
    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    count.innerText = tasks.length;
    // const todoTasks=todo.querySelectorAll(".task");
  });
}

if (localStorage.getItem("tasksData")) {
  const data = JSON.parse(localStorage.getItem("tasksData"));
//   console.log(data);
  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
     addTask(task.title, task.desc, column);
    });
    // const tasks = column.querySelectorAll(".task");
    // const count = column.querySelector(".right");
    // count.innerText = tasks.length;
    updateTaskCount();
  }
}
// console.log(todo, progress, done);
const tasks = document.querySelectorAll(".task");
tasks.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    // console.log("dragging",e.target);
    dragElement = task;
  });
});
// progress.addEventListener("dragenter",(e)=>{
//     // e.preventDefault();
//     // console.log("dragover",e.target);
//     progress.classList.add("hover-over");
// });
// progress.addEventListener("dragleave",(e)=>{
//     // e.preventDefault();
//     // console.log("dragover",e.target);
//     progress.classList.remove("hover-over");
// });
// todo.addEventListener("dragenter",(e)=>{
//     // e.preventDefault();
//     // console.log("dragover",e.target);
//     todo.classList.add("hover-over");
// }
// );
// todo.addEventListener("dragleave",(e)=>{
//     // e.preventDefault();
//     // console.log("dragover",e.target);
//     todo.classList.remove("hover-over");
// });
// done.addEventListener("dragenter",(e)=>{
//     // e.preventDefault();
//     // console.log("dragover",e.target);
//     done.classList.add("hover-over");
// });
// done.addEventListener("dragleave",(e)=>{
//     // e.preventDefault();
//     // console.log("dragover",e.target);
//     done.classList.remove("hover-over");
// });

function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    // console.log("dragover",e.target);
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    // console.log("dragover",e.target);
    column.classList.remove("hover-over");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    //isse cursor ke neeche ek plus wala icon aayega jiska matlab hai ki aap is element ke upar drop kar sakte ho
  });
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
    // console.log("dropped",e);
    //abhi toroblem kya hai jab mai drop kruga toh event fire nah hoga kyuki
    //by default jo humara browser hai woh kisi bhi element ko kisi bhi dusre element ke upar drop karne ki permission nah deta hai
    //  toh humein drop event ko fire karne ke liye dragenter aur dragover event me e.preventDefault() call krna padta hai tabhi drop event fire hoga
    console.log("dropped ", dragElement, column);
        updateTaskCount();
  });
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// Modal Related logic
const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");
toggleModalButton.addEventListener("click", () => {
  // const modal=document.querySelector("#modal");
  modal.classList.toggle("active");
});
modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});
addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;
   addTask(taskTitle,taskDesc,todo);
  updateTaskCount();
 
  modal.classList.remove("active");

document.querySelector("#task-title-input").value="";
document.querySelector("#task-desc-input").value="";
});
