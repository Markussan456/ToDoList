
import eventlisteners from "./eventlist.js";
export const projects = [];

export class DataManager{
    constructor(){
this.currentprojiks = null;
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
getcurrentproj(){
    return this.currentprojiks;
}
}
const datamanger = new DataManager();
export default datamanger;