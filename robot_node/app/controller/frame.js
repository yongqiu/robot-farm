const r_frame = require('../models').r_frame;
const ERROR = require('../../config/errorCode');

module.exports = {
  async create(req, res) {
    let createdAt = Date.parse(new Date()) / 1000;
    let status = await r_frame.create({
      colNumber: req.body.colNumber,
      colLow: req.body.colLow,
      colHigh: req.body.colHigh,
      rowNumber: req.body.rowNumber,
      rowLow: req.body.rowLow,
      rowHigh: req.body.rowHigh,
      stopAgv1: req.body.stopAgv1,
      stopAgv2: req.body.stopAgv2,
      stopWait: req.body.stopWait,
      createdAt: createdAt,
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).send({ success: true, data: status });
  },
  async update(req, res) {
    var id = req.body.id;
    let updatedAt = Date.parse(new Date()) / 1000;
    let status = await r_frame.findOne({
      where: {
        id: id
      }
    })

    if (status) {
      status.update({
        colNumber: req.body.colNumber,
        colLow: req.body.colLow,
        colHigh: req.body.colHigh,
        rowNumber: req.body.rowNumber,
        rowLow: req.body.rowLow,
        rowHigh: req.body.rowHigh,
        stopAgv1: req.body.stopAgv1,
        stopAgv2: req.body.stopAgv2,
        stopWait: req.body.stopWait,
        updatedAt: updatedAt
      }).catch(error => res.status(ERROR.BaseError).send(error));
      res.status(200).send({ success: true, data: status })
    } else {
      return res.status(ERROR.NotFound).send({
        message: 'frame Not Found',
      });
    }
  },
  async getList(req, res) {
    let tasks = await r_frame.findAll({
      where: {
        status: 0
      }
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).send({ success: true, data: tasks });
  },
  async getTaskByID(req, res) {
    var id = req.query.id;
    let task = await r_frame.findOne({
      where: {
        id: id
      }
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).send({ success: true, data: task });
  }
};