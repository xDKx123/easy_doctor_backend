import { Request, Response, NextFunction } from 'express';
import {client} from "../database/database";

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    if (!requestParams.task_list_id) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    try {
        const result = await client.query({rowMode: 'map', text: 'SELECT * FROM task WHERE task_list_fk = $1', values: [Number(requestParams.task_list_id)]});

        return res.status(200).json({
            tasks: result.rows,
        });


    }
    catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const addTask = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    console.log(requestParams);

    /*if (!requestParams.name || !requestParams.completed || !requestParams.deadline || !requestParams.description || !requestParams.task_list_fk) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }*/

    try {
        const result = await client.query({rowMode: 'map', text: 'insert into task (name, completed,description, deadline, created_at, task_list_fk) values ($1, $2, $3, $4, now(), $5) returning id, name, completed, description, deadline, created_at, task_list_fk', values: [requestParams.name, requestParams.completed, requestParams.description, requestParams.deadline, Number(requestParams.task_list_fk)]});

        return res.status(200).json({
            tasks: result.rows,
        });

    }
    catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    if (!requestParams.id || !requestParams.name || !requestParams.completed || !requestParams.deadline || !requestParams.task_list_fk) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    try {
        const result = await client.query({rowMode: 'map', text: 'update task set name = $1, completed = $2, deadline = $3, updated_at = now(), task_list_fk=$4 where id = $5', values: [requestParams.name, requestParams.completed, requestParams.deadline, requestParams.task_list_fk, requestParams.id]});

        return res.status(200).json({
            tasks: result.rows,
        });

    }
    catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    if (!requestParams.id) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    try {
        const result = await client.query({rowMode: 'map', text: 'delete from task WHERE id = $1', values: [Number(requestParams.id)]});

        return res.status(200).json({
            tasks: result.rows,
        });

    }
    catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

export {getTasks, addTask, updateTask, deleteTask}