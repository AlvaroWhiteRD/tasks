import  {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = 'task.db';
//const [db, setDb] = useState(null);


export async function GetDBConnection() {
  const db = await openDatabase({ name:DATABASE_NAME, location:'default'});
  return db;
}

export async function CreateTables (db){
  const query = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(250), time VARCHAR(50), is_finished integer)';

  const result = await db.executeSql(query);
  return result;
 }

 export async function InitDatabase(){
  const db = await GetDBConnection();
  await CreateTables(db); 
  //db.close();
 }
 
 export async function SaveTask(db, description){
    let  time = new Date();
    let is_finished = 1;
      try {
          const saveTask = `insert into tasks (time, description, is_finished) values('${time}', '${description}', '${is_finished}')`;
          const result = await db.executeSql(saveTask);
          return result; 

      } catch (error) {
        console.log(error + " error al guardar tarea");
      }
      
}

 export async function GetTasks(db){
  let tasks = [];
  let sql = "SELECT * FROM tasks WHERE is_finished<>0";
    
  try {
    const results = await db.executeSql(sql);
    results.forEach(function(resultSet){
    for(let index= 0; index < resultSet.rows.length; index++){
      tasks.push(resultSet.rows.item(index));
     }
  }); 

  return tasks;
  }catch(error){
    console.log(error + " error GetTasks");

  }  
  
 }

 export async function GetTasksCompleted(db){
  let tasks = [];
  let sql = "SELECT * FROM tasks WHERE is_finished<>1";
    
  try {
    const results = await db.executeSql(sql);
    results.forEach(function(resultSet){
    for(let index= 0; index < resultSet.rows.length; index++){
      tasks.push(resultSet.rows.item(index));
     }
  }); 

  return tasks;
  }catch(error){
    console.log(error + " error try GetTasks tasks");

  }  
  
 }

 export const DeleteTask = async (db, id)=>{
 
  try {console.log(id + " mi id");
    const deleteTask = `DELETE FROM tasks WHERE id=${id}`;
    const result = await db.executeSql(deleteTask);
    return result; 

    } catch (error) {
      console.log(error + " error al eliminar");
    }
 }

 export async function GetTaskId(db, id){
  let task = [];
  let sql = `SELECT * FROM tasks WHERE id=${Number(id)}`;
    
  try {
    const results = await db.executeSql(sql);
    results.forEach(function(resultSet){
    for(let index= 0; index < resultSet.rows.length; index++){
      task.push(resultSet.rows.item(index));
     }
  }); 

  return task;
  }catch(error){
    console.log(error + " error al mostrar esta tarea");

  }  
  
 }


 export async function UpdateTasks(db, id, isFinished){
  
  try {console.log(id + " mi id ");
    const updateTask = `UPDATE tasks SET is_finished = ${isFinished} WHERE id=${id}`;
    const result = await db.executeSql(updateTask);
    return result; 

    } catch (error) {
      console.log(error + " error al Actualizar");
    }
 }

