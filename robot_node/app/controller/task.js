const r_task = require('../models').r_task;
const r_frame = require('../models').r_frame;
const ERROR = require('../../config/errorCode');

module.exports = {
  // 创建task
  async create(req, res) {
    let createdAt = Date.parse(new Date()) / 1000;
    let status = await r_task.create({
      type: req.body.type,
      frameNumber: req.body.frameNumber,
      gutterNumber: req.body.gutterNumber,
      vegetable: req.body.vegetable,
      direction: req.body.direction,
      createdAt: createdAt,
      updatedAt: createdAt,
      taskGroupId: req.body.taskGroupId
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
  async delete(req, res) {
    var id = req.query.id;
    let task = await r_task.findOne({
      where: {
        id: id
      }
    })
    if (!task) {
      return res.status(ERROR.NotFound).send({ success: false, message: 'task Not Found' });
    }
    task.update({
      status: 1
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).json({ success: true })
  },
  async getList(req, res) {
    let tasks = await r_task.findAll({
      where: {
        status: 0
      },
      include: [
        {
          model: r_frame
        }
      ]
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