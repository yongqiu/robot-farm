const r_task = require('../models').r_task;
const r_frame = require('../models').r_frame;
const ERROR = require('../../config/errorCode');

module.exports = {
  // 创建task
  async create(req, res) {
    console.log(req.body)
    let createdAt = Date.parse(new Date()) / 1000;
    let status = await r_task.create({
      Type: req.body.type,
      FrameNumber: req.body.frameNumber,
      GutterNumber: req.body.gutterNumber,
      Vegetable: req.body.vegetable,
      Direction: req.body.direction,
      CreatedAt: createdAt,
      UpdatedAt: createdAt,
      TaskGroupId: req.body.TaskGroupId
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