const r_task = require('../models').r_task;
const ERROR = require('../../config/errorCode');

module.exports = {
  async create(req, res) {
    let createdAt = Date.parse(new Date()) / 1000;
    let status = await r_task.create({
      type: req.body.type,
      frameNumber: req.body.frameNumber,
      gutterNumber: req.body.gutterNumber,
      vegetable: req.body.vegetable,
      direction: req.body.direction,
      createdAt: createdAt,
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).send({ success: true, data: status });
  },
  async update(req, res) {
    var id = req.body.id;
    let updatedAt = Date.parse(new Date()) / 1000;
    let status = await r_task.findOne({
      where: {
        id: id
      }
    })

    if (status) {
      status.update({
        type: req.body.type,
        frameNumber: req.body.frameNumber,
        gutterNumber: req.body.gutterNumber,
        vegetable: req.body.vegetable,
        direction: req.body.direction,
        isFinished: req.body.isFinished,
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
    var id = req.query.id;
    let task = await r_task.findOne({
      where: {
        id: id
      }
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).send({ success: true, data: task });
  }
};