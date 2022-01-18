import {it} from "mocha";
import {getTasks} from "../controllers/task";
import {NextFunction, Request} from "express";
import supertest from "supertest";
import {router} from "../main";
import {client} from "../database/database";
import {TaskList} from "../models/taskList";
import {Task} from "../models/task";

const assert = require('assert');

describe('task_list_integration_test', () => {
    client;
    describe('', () => {

        let newList: TaskList = new TaskList(0, 'new list', 'new list desc');
        let newTask: Task = new Task(0, 'new task', '2022-01-01 14:25:17.525015', true, 'new discription', newList.id);

        it('we create a new list', async () => {


            let {body, statusCode} = await supertest(router).post('/addTaskList').send(newList.toJSON());

            const retrievedData = body['tasks'];

            assert(statusCode, 200);
            newList.id = retrievedData.id;
            newTask.task_list_fk = retrievedData.id;
            assert.equal(retrievedData.name, newList.name);
            assert.equal(retrievedData.description, newList.description);
        });

        it('Update the created list', async  () => {
            newList.name = 'updated name';
            newList.description = 'updated description';

            let {body, statusCode} = await supertest(router).post('/updateTaskList').send(newList.toJSON());

            const retrievedData = body['tasks'];

            assert(statusCode, 200);
            assert.equal(retrievedData.id, newList.id);
            assert.equal(retrievedData.name, newList.name);
            assert.equal(retrievedData.description, newList.description);
        });

        it ('create new task', async () => {

            let {body, statusCode} = await supertest(router).post('/addTask').send(newTask.toJSON());

            const retrievedData = body['tasks'];

            newTask.id = retrievedData.id;

            assert(statusCode, 200);
            assert.equal(retrievedData.id, newTask.id);
            assert.equal(retrievedData.name, newTask.name);
            assert.equal(retrievedData.description, newTask.description);
        });

        it ('update new task', async () => {
            newTask.name = 'updated name';
            newTask.description = 'updated description';
            newTask.deadline = '2000-02-02 14:25:17.525015';

            let {body, statusCode} = await supertest(router).post('/updateTask').send(newTask.toJSON());

            const retrievedData = body['tasks'];

            assert(statusCode, 200);
            assert.equal(retrievedData.id, newTask.id);
            assert.equal(retrievedData.name, newTask.name);
            assert.equal(retrievedData.description, newTask.description);
        });

        it ('deleting list with items must return 409 status code', async () => {
            let {body, statusCode} = await supertest(router).post('/deleteTaskList').send({'id': newList.id});

            assert.equal(statusCode, 409);
        });

        it ('we delete the task', async () => {
            let {body, statusCode} = await supertest(router).post('/deleteTask').send({'id': newTask.id});

            assert.equal(statusCode, 200);
        });

        it ('Delete the created list', async () => {
            let {body, statusCode} = await supertest(router).post('/deleteTaskList').send({'id': newList.id});

            assert.equal(statusCode, 200);
        });
    });
});