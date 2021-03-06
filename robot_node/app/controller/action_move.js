const r_action_move = require('../models').r_action_move;
const ERROR = require('../../config/errorCode');

module.exports = {
    async create(req, res) {
        let createdAt = Date.parse(new Date()) / 1000;
        let status = await r_action_move.create({
            TaskType: req.body.TaskType,
            AGVName: req.body.AGVName,
            SourcePort: req.body.SourcePort,    // startPort
            DestPort: req.body.DestPort,    // endPort
            IsRead: req.body.IsRead,
            createdAt: createdAt,
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: status });
    },
    async update(req, res) {
        var TaskID = req.body.TaskID;
        let updatedAt = Date.parse(new Date()) / 1000;
        let status = await r_action_move.findOne({
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
        let tasks = await r_action_move.findAll({
            where: {
                status: 0
            }
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: tasks });
    },
    async getTaskByID(req, res) {
        var TaskID = req.query.TaskID;
        let task = await r_action_move.findOne({
            where: {
                TaskID: TaskID
            }
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: task });
    },
    async getLastTask(req, res) {
        // var TaskID = req.query.TaskID;
        let task = await r_action_move.findOne({
            where: {
                status: 0
            },
            order: [['createdAt', 'DESC']]
        }).catch(error => res.status(ERROR.BaseError).send(error));
        res.status(200).send({ success: true, data: task });
    }
};