import express from "express";
import {addTaskList, deleteTaskList, getTaskLists, updateTaskList} from "../controllers/taskList";
import {addTask, deleteTask, getTasks, updateTask} from "../controllers/task";

const routes = express.Router();

routes.post('/getTaskLists', getTaskLists);
routes.post('/updateTaskList', updateTaskList);
routes.post('/deleteTaskList', deleteTaskList);
routes.post('/addTaskList', addTaskList);


routes.post('/getTasks', getTasks);
routes.post('/updateTask', updateTask);
routes.post('/deleteTask', deleteTask);
routes.post('/addTask', addTask);

export {routes};