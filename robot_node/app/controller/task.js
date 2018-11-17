const r_task = require('../models').r_task;
const ERROR = require('../../config/errorCode');

module.exports = {
    async create(req, res) {
        let createdAt = Date.parse(new Date()) / 1000;
        let status = await r_task.create({
            TaskType: req.body.TaskType,
            AGVName: req.body.AGVName,
            SourcePort: req.body.SourcePort,
            DestPort: req.body.DestPort,
            IsRead: req.body.IsRead,
            createdAt: createdAt,
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: status });
    },
    async update(req, res) {
        var TaskID = req.body.TaskID;
        console.log(TaskID)
        let updatedAt = Date.parse(new Date()) / 1000;
        let status = await r_task.findOne({
            where: {
                TaskID: TaskID
            }
        })

        if (status) {
            status.update({
                IsRead: req.body.IsRead,
                updatedAt: updatedAt
            }).catch(error => res.status(ERROR.BaseError).send(error));
            res.status(200).send({ success: true, data: status })
        } else {
            return res.status(ERROR.NotFound).send({
                message: 'task Not Found',
            });
        }
    },
    async getList(req, res) {
        let tasks = await r_task.findAll({
            where: {
                status: 0
            }
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: tasks });
    },
    async getTaskByID(req, res) {
        var TaskID = req.query.TaskID;
        let task = await r_task.findOne({
            where: {
                TaskID: TaskID
            }
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: task });
    }
};