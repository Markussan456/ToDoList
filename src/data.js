
import eventlisteners from "./eventlist.js";
export const projects = [];

export class DataManager{
    constructor(){
this.currentprojiks = null;
this.currenttasky = null;
    }
    addproject(title){
        const project = {
            tituls : title,
            tasky :[],
            id : Date.now(),
        };
        
projects.push(project);
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
}
console.log(projects);
}
removetask(project,taskk){
   const index = project.tasky.findIndex(tasky => tasky.id === taskk.id)
   if(index !==-1){
    project.tasky.splice(index,1);
}
}
editcurrenttask(task,title,des,date,priority){
    task.titles = title;
    task.desc = des;
    task.datums = date;
    task.prioritate = priority;
  
}
}
const datamanger = new DataManager();
export default datamanger;