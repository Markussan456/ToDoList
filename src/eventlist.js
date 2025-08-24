import datamanger from "./data.js";
import UiManagers from "./uirender.js";



class AddListeners{
    constructor(){
 this.createprojectbtn = document.getElementById("addprojbtn");
        this.projectform = document.getElementById("projectform");
        this.createprojbtn = document.getElementById("submitbtmprojform");
        this.taskform = document.getElementById("taskform");
         this.editingTask = null;
    }
   
    addlistenerss(){
        this.projectlistenr();
       this.projectpanellistener();
        this.taskform.addEventListener("submit",(event)=>{
event.preventDefault();
const formData = new FormData(this.taskform);
const title = formData.get("taskinp");
const desco = formData.get("descinp");
const dated = formData.get("dateinp");
const priority = formData.get("radioinp");

if(this.editingTask){
    datamanger.editcurrenttask(this.editingTask, title, desco, dated, priority);
     const proj = datamanger.getcurrentproj();
    const oldDiv = this.editingTask.div;
    const {taskdiv,deletonbtn,editbtn,hidebtn,desc,date} = UiManagers.appendtask(proj, this.editingTask);
    oldDiv.parentNode.replaceChild(taskdiv, oldDiv);
     this.tasklisteners(this.editingTask, taskdiv);
    this.deletetask(deletonbtn, taskdiv, this.editingTask, proj);
    this.edittask(editbtn, this.editingTask, proj, taskdiv);
this.hidetask(hidebtn,desc,date,deletonbtn,editbtn);
    this.editingTask = null; // reset
}else{
    this.newtask(title, desco, dated, priority);
}

this.taskform.classList.add("hidden");
this.taskform.reset();
    })
       
    }
projectlistenr(){
 this.projectform.addEventListener("submit",(event)=>{
            event.preventDefault();
                const formData = new FormData(this.projectform);
               const title = formData.get("ProjectName");
               const newproj = datamanger.addproject(title);
               const {projectDiv,addtaskbtn,deletebtn} = UiManagers.appendproject(newproj);
              this.projectlistener(newproj,projectDiv);
            UiManagers.hideprojectpanel();
            this.tasklistener(addtaskbtn,newproj);
            datamanger.currentproj(newproj);
            this.projectform.querySelector("#ProjectName").value = "";
            this.deleteproj(deletebtn,projectDiv);
        })
}
deleteproj(button,projectdivs){
    
button.addEventListener("click",()=>{
       const thecurrentproj = datamanger.getcurrentproj(); // grab it NOW
        if (!thecurrentproj) return;
    datamanger.removeproject(thecurrentproj);
projectdivs.remove();
})
}
projectpanellistener(){
    this.createprojectbtn.addEventListener("click",()=>{
        if(this.projectform.classList.contains("hidden")){
            UiManagers.showprojectpanel();
        }else if(!this.projectform.classList.contains("hidden")){
            UiManagers.hideprojectpanel();
        }
    })
}
projectlistener(project,projectdiv){
projectdiv.addEventListener("click",()=>{
    datamanger.currentproj(project);
});
}
    addproject(title){
datamanger.addproject(title);
datamanger.getprojects();
    }
    tasklistener(button,projik){
button.addEventListener("click",()=>{
    datamanger.currentproj(projik);
    
  if(this.taskform.classList.contains("hidden")){
            UiManagers.showtaskpanel();
        }else if(!this.taskform.classList.contains("hidden")){
            UiManagers.hidetaskpanel();
        }
   
})
    }
newtask(titles,descr,dates,prio){
    const currentp = datamanger.getcurrentproj();
    const task = datamanger.addtask(currentp,titles,descr,dates,prio);
    const {taskdiv,deletonbtn,editbtn,hidebtn,desc,date} = UiManagers.appendtask(currentp,task);
 
   this.tasklisteners(task,taskdiv);
    this.deletetask(deletonbtn,taskdiv,task,currentp);
    this.edittask(editbtn,task,currentp,taskdiv);
    this.hidetask(hidebtn,desc,date,deletonbtn,editbtn);
  
 
}
tasklisteners(task,taskdiv){
    if(taskdiv === null){
        console.log("taskdiv null");
    }else{
    taskdiv.addEventListener("click",()=>{
datamanger.currenttask(task);
    })
    }
}
hidetask(button,desc,date,deletbtn,editbtn){
    
    button.addEventListener("click",()=>{
        if(!((desc.classList.contains("hiddentask")&&date.classList.contains("hiddentask"))&&(deletbtn.classList.contains("hiddentask")&&editbtn.classList.contains("hiddentask")))){
            desc.classList.add("hiddentask");
            date.classList.add("hiddentask");
            deletbtn.classList.add("hiddentask");
            editbtn.classList.add("hiddentask");
        }else if((desc.classList.contains("hiddentask")&&date.classList.contains("hiddentask"))&&(deletbtn.classList.contains("hiddentask")&&editbtn.classList.contains("hiddentask"))){
            desc.classList.remove("hiddentask");
            date.classList.remove("hiddentask");
              deletbtn.classList.remove("hiddentask");
            editbtn.classList.remove("hiddentask");
        }
    })
}
deletetask(button,taskdivs,taskons,currentsprojekts){
    button.addEventListener("click",()=>{
        
        datamanger.currentproj(currentsprojekts);
        datamanger.removetask(currentsprojekts,taskons);
taskdivs.remove();
    });
}
edittask(button,task,currenp,taskdiv){
button.addEventListener("click",()=>{
   UiManagers.showtaskpanel();

    // prefill form
    document.querySelector("#taskinp").value = task.titles;
    document.querySelector("#descinp").value = task.desc;
    document.querySelector("#dateinp").value = task.datums;
    document.querySelector(`input[name="radioinp"][value="${task.prioritate}"]`).checked = true;

    // store what we’re editing
    this.editingTask = task;
    task.div = taskdiv; // keep reference to the old div
})
}
reattachlistenersproject(project,deletebtn,addtaskbtn,projectdiv){
this.projectlistener(project,projectdiv);
this.deleteproj(deletebtn,projectdiv);
this.tasklistener(addtaskbtn,project);
}
}

  const listener = new AddListeners();
document.addEventListener("DOMContentLoaded", () => {
  
    listener.addlistenerss();
    
});
export default listener;