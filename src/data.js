
import eventlisteners from "./eventlist.js";
import UiManagers from "./uirender.js";
import listener from "./eventlist.js";
const STORAGE_KEY = "projects";
export let projects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

export class DataManager{
    constructor(){
this.currentprojiks = null;
this.currenttasky = null;
this.renderprojects();
    }
    addproject(title){
        const project = {
            tituls : title,
            tasky :[],
            id : Date.now(),
        };
        
projects.push(project);
this.saveProjects();
console.log(projects);
return project;
    }
     addtask(currentp,title,description,dates,priority){
        const taskIndex = currentp.tasky.length;
const task = {
    titles:title,
    desc:description,
    datums:dates,
    prioritate:priority,
    id: `task-${currentp.id}-${taskIndex}` // unique DOM id
};
currentp.tasky.push(task);
this.saveProjects();
return task;
        }
        currentproj(projekts){
this.currentprojiks = projekts;
console.log("Selected project:", this.currentprojiks);
}
currenttask(task){
    this.currenttasky = task;
    console.log("selected task:",this.currenttasky);
}
getcurrenttask(){
    return this.currenttasky;
}
getcurrentproj(){
    return this.currentprojiks;
}
removeproject(projectk){
const index = projects.findIndex(project => project.id === projectk.id)
if(index !==-1){
    projects.splice(index,1);
    this.saveProjects();
}
console.log(projects);
}
removetask(project,taskk){
   const index = project.tasky.findIndex(tasky => tasky.id === taskk.id)
   if(index !==-1){
    project.tasky.splice(index,1);
    this.saveProjects();
}
}
editcurrenttask(task,title,des,date,priority){
    task.titles = title;
    task.desc = des;
    task.datums = date;
    task.prioritate = priority;
  this.saveProjects();
}
saveProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}
renderprojects(){
     import("./eventlist.js").then(({ default: listener }) => {
        if (projects.length > 0){
        projects.forEach(projectk => {
            const {projectDiv ,addtaskbtn,deletebtn,project} = UiManagers.appendproject(projectk);
            listener.reattachlistenersproject(project,deletebtn,addtaskbtn,projectDiv);
             if (projectk.tasky && projectk.tasky.length > 0) {
            projectk.tasky.forEach(task => {
                const { taskdiv, deletonbtn, editbtn, hidebtn, desc, date } = UiManagers.appendtask(projectk, task);

                // Attach task listeners
                listener.tasklisteners(task, taskdiv);
                listener.deletetask(deletonbtn, taskdiv, task, projectk);
                listener.edittask(editbtn, task, projectk, taskdiv);
                listener.hidetask(hidebtn, desc, date, deletonbtn, editbtn);
            });
        }
        });
    }
    });
  
}
}
const datamanger = new DataManager();
export default datamanger;