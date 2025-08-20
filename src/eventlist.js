import datamanger from "./data.js";
import UiManagers from "./uirender.js";



class AddListeners{
    constructor(){
 this.createprojectbtn = document.getElementById("addprojbtn");
        this.projectform = document.getElementById("projectform");
        this.createprojbtn = document.getElementById("submitbtmprojform");
        this.taskform = document.getElementById("taskform");
    }
   
    addlistenerss(){
        this.projectlistenr();
       this.projectpanellistener();
        this.taskform.addEventListener("submit",(event)=>{
event.preventDefault();
const formData = new FormData(this.taskform);
const title = formData.get("taskinp");
const desc = formData.get("descinp");
const date = formData.get("dateinp");
const priority = formData.get("radioinp");
this.newtask(title,desc,date,priority);
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
    const thecurrentproj = datamanger.getcurrentproj();
button.addEventListener("click",()=>{
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
    const {taskdiv,deletonbtn,editbtn} = UiManagers.appendtask(currentp,task);
    this.tasklisteners(task,taskdiv);
    this.deletetask(deletonbtn,taskdiv,task,currentp);
    this.eidttask(editbtn,task,currentp,taskdiv);
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
deletetask(button,taskdivs,taskons,currentsprojekts){
    button.addEventListener("click",()=>{
        
        datamanger.currentproj(currentsprojekts);
        datamanger.removetask(currentsprojekts,taskons);
taskdivs.remove();
    });
}
eidttask(button,task,currenp,taskdiv){
button.addEventListener("click",()=>{
 datamanger.currentproj(currenp);
 datamanger.editcurrenttask(task,"cock","ppussij","lol","shiko");
 const { taskdiv: newDiv, deletonbtn, editbtn } = UiManagers.appendtask(currenp, task);
 taskdiv.parentNode.insertBefore(newDiv, taskdiv);
this.tasklisteners(task,newDiv);
this.deletetask(deletonbtn,newDiv,task,currenp);
this.eidttask(editbtn,task,currenp,newDiv);
taskdiv.remove();
})
}
}

  const listener = new AddListeners();
document.addEventListener("DOMContentLoaded", () => {
  
    listener.addlistenerss();
    
});
export default listener;