import { Request, Response, NextFunction } from 'express';
import {client} from "../database/database";

const getTaskLists = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    try {
        const result = await client.query({rowMode: 'map', text: 'select * from task_list order by created_at desc'});

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

const addTaskList = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;


    //console.log(requestParams);

    if (!requestParams.name || !requestParams.description) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    try {
        const result = await client.query({rowMode: 'map', text: 'insert into task_list (name, description, created_at) values ($1, $2, now()) RETURNING  id, name, created_at, updated_at, description', values: [requestParams.name, requestParams.description]});

        //console.log(result);
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

const updateTaskList = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    //console.log(requestParams);

    if (!requestParams.id || !requestParams.name || !requestParams.description) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    try {
        const result = await client.query({rowMode: 'map', text: 'update task_list set name = $1, description = $2, updated_at = now() where id = $3 returning id, name, created_at, updated_at, description', values: [requestParams.name, requestParams.description, requestParams.id]});

        if (result.rows.length) {
            return res.status(200).json({
                tasks: result.rows[0],
            });
        }

    }
    catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};

const deleteTaskList = async (req: Request, res: Response, next: NextFunction) => {
    const requestParams = req.body;

    if (!requestParams.id) {
        return res.status(400).json({
            message: 'Not enough params',
        });
    }

    try {
        const tasks = await client.query({rowMode: 'map', text: 'select * from task where task_list_fk = $1', values: [Number(requestParams.id)]});

        if (tasks.rows.length > 0) {
            return res.status(409).json({
                error: 'Cannot delete list with tasks',
            });
        }

        const result = await client.query({rowMode: 'map', text: 'delete from task_list WHERE id = $1', values: [Number(requestParams.id)]});

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

export {getTaskLists, addTaskList, updateTaskList, deleteTaskList}