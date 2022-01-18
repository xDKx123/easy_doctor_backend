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
        const result = await client.query({rowMode: 'map', text: 'SELECT * FROM task WHERE task_list_fk = $1 order by created_at desc', values: [Number(requestParams.task_list_id)]});

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

    /*if (!requestParams.name || !requestParams.completed || !requestParams.deadline || !requestParams.description || !requestParams.task_list_fk) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }*/

    try {
        const result = await client.query({rowMode: 'map', text: 'insert into task (name, completed,description, deadline, created_at, task_list_fk) values ($1, $2, $3, $4, now(), $5) returning id, name, completed, description, deadline, created_at, updated_at, task_list_fk', values: [requestParams.name, requestParams.completed.toString() === 'true', requestParams.description, requestParams.deadline, Number(requestParams.task_list_fk)]});

        if (result.rows.length) {
            return res.status(200).json({
                tasks: result.rows[0],
            });
        }

    }
    catch (e) {
        //console.log(e);
        return res.status(500).json({
            message: e,
        });
    }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    if (!requestParams.id || !requestParams.name || !requestParams.completed || !requestParams.deadline || !requestParams.description) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    //console.log(requestParams);

    try {
        const result = await client.query({rowMode: 'map', text: 'update task set name = $1, description = $2, completed = $3, deadline = $4, updated_at = now()where id = $5 returning id, name, completed, description, deadline, created_at, updated_at, task_list_fk', values: [requestParams.name, requestParams.description, Boolean(requestParams.completed),  requestParams.deadline, Number(requestParams.id)]});

        //console.log(result.rows);

        if (result.rows.length) {
            return res.status(200).json({
                tasks: result.rows[0],
            });
        }


    }
    catch (e) {
        //console.log(e);
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