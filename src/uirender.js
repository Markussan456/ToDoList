import projects from "./data";
import datamanger from "./data.js";
import eventlisteners from "./eventlist.js";

class UiManager{
    constructor(){
this.projcontainer = document.getElementById("projectcont");
 this.projectform = document.getElementById("projectform");
 this.taskform = document.getElementById("taskform");
    };
appendproject(project){
    const projectDiv = document.createElement("div");
   const addtaskbtn = document.createElement("button");
   const title = document.createElement("span");
   title.classList.add("projecttitle");
   addtaskbtn.id = project.id;
   addtaskbtn.textContent = "Add task";
    projectDiv.id = project.id;
    projectDiv.classList.add("project");
    title.textContent = project.tituls;
this.projcontainer.appendChild(projectDiv);
projectDiv.appendChild(title);
projectDiv.appendChild(addtaskbtn);

const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskunder");
    taskContainer.id = `tasks-${project.id}`; // unique id per project
    projectDiv.appendChild(taskContainer);

return {projectDiv ,addtaskbtn,taskContainer};

}
appendtask(project,task){
    const taskdiv = document.createElement("div");
    taskdiv.classList.add("taskdiv");
    taskdiv.id = task.id;
const title = document.createElement("span");
const desc = document.createElement("span");
const date = document.createElement("span");
const priority = document.createElement("span");

title.textContent = task.titles;
desc.textContent = task.desc;
date.textContent = task.datums;
priority.textContent = task.prioritate;
taskdiv.appendChild(title);
taskdiv.appendChild(desc);
taskdiv.appendChild(date);
taskdiv.appendChild(priority);
const projectTaskContainer = document.getElementById(`tasks-${project.id}`);
projectTaskContainer.appendChild(taskdiv);

}

hideprojectpanel(){
this.projectform.classList.add("hidden");
}
showprojectpanel(){
this.projectform.classList.remove("hidden");
}
hidetaskpanel(){
    this.taskform.classList.add("hidden");
}
showtaskpanel(){
    this.taskform.classList.remove("hidden");
}
}
const UiManagers = new UiManager();
export default UiManagers;