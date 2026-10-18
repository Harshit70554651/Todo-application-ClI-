import fs from 'fs'
import readline from "readline"

const file = 'task.json'

if(!fs.existsSync(file)){
  fs.writeFileSync(file, JSON.stringify([]))
}
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

})

const loadTask = () => {
  const data = fs.readFileSync(file, "utf-8");
  return JSON.parse(data)
   
}

const saveTask = (task)=>{
  fs.writeFileSync(file, JSON.stringify(task, null, 2));

}
const showMenu = () =>{
  console.log('\n ============ To Do Application\n');
  console.log('1. Add Task');
  console.log("2. View Tasks");
  console.log("3. Delete Task");
  console.log("4. Exit\n");
  rl.question('Choose an Option:' ,handleMenu);
  
  
  
}
function handleMenu(option){
 switch(option){
  case '1' :
    rl.question('Enter Task:', (task)=>{
      const tasks = loadTask()
      tasks.push({task, done: false})
      saveTask(tasks);
      
      console.log("Task Added successFully");
 
      showMenu()
    });
    break

    case '2':
      const tasks = loadTask();
        
      if(tasks.length === 0){
        console.log('No Task Found');
        
      }else{
        tasks.forEach((t , index) => {
           console.log(`${index + 1} ${t.task}`);
           
        });
      }
      showMenu()
      break

      case "3":
        const allTasks = loadTask()

        if(allTasks.length ===0)
        {
           console.log("No Tasks To delete");
           showMenu()
           return;
        }

        console.log("Tasks");
        allTasks.forEach((t ,index)=>{
          console.log(`${index + 1}, ${t.task}`);
          
        });

 rl.question("Enter task Number to be Delete", (num)=>{
  const index = Number(num) - 1;
  if(index >= 0 && index < allTasks.length){
    allTasks.splice(index , 1);
    saveTask(allTasks)
    console.log("Task Deleted Successfully");
    
  }
  else{
    console.log("invaled Task Number.");
    
  }
   showMenu()
 })

 default:
  console.log("Invalid option. Please try again.");
  showMenu();
  break;
        
 }
}
showMenu();





