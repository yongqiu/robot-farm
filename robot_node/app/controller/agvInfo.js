var express = require('express');
const r_agvInfo = require('../models').r_agvInfo;
const ERROR = require('../../config/errorCode')

let createAgvInfo = async (req, res) => {
  let date = Date.parse(new Date()) / 1000;
  let status = await r_agvInfo.create({
    AgvName: req.body.AgvName,
    RackNumBer: req.body.RackNumBer,
    Rfid: req.body.Rfid,
    Speed: req.body.Speed,
    Voltage: req.body.Voltage,
    Status: req.body.Status,
    RunStatus: req.body.RunStatus,
    BatteryNum: req.body.BatteryNum,
    Alarm: req.body.Alarm,
    RunTimes: req.body.RunTimes,
    createdAt: date
  }).catch(error => res.status(ERROR.BaseError).send(error));

  req.io.sockets.emit("getAgvInfo", { success: true, type: 1, data: req.body });
  res.status(200).send({ success: true, data: status });
};

module.exports = {
  async sendAgvInfo(req, res) {
    createAgvInfo(req, res)
  },
  async update(req, res) {
    var AgvName = req.body.AgvName;
    let updatedAt = Date.parse(new Date()) / 1000;
    let status = await r_agvInfo.findOne({
      where: {
        AgvName: AgvName
      },
      order: [['createdAt', 'DESC']]
    })
    let param = {
      AgvName: req.body.AgvName != undefined ? req.body.AgvName : status.dataValues.AgvName,
      RackNumBer: req.body.RackNumBer != undefined ? req.body.RackNumBer : status.dataValues.RackNumBer,
      Rfid: req.body.Rfid != undefined ? req.body.Rfid : status.dataValues.Rfid,
      Speed: req.body.Speed != undefined ? req.body.Speed : status.dataValues.Speed,
      Voltage: req.body.Voltage != undefined ? req.body.Voltage : status.dataValues.Voltage,
      Status: req.body.Status != undefined ? req.body.Status : status.dataValues.Status,
      RunStatus: req.body.RunStatus != undefined ? req.body.RunStatus : status.dataValues.RunStatus,
      BatteryNum: req.body.BatteryNum != undefined ? req.body.BatteryNum : status.dataValues.BatteryNum,
      Alarm: req.body.Alarm != undefined ? req.body.Alarm : status.dataValues.Alarm,
      RunTimes: req.body.RunTimes != undefined ? req.body.RunTimes : status.dataValues.RunTimes,
      RackContent: req.body.RackContent != undefined ? req.body.RackContent : status.dataValues.RackContent,
      IsActive: req.body.IsActive != undefined ? req.body.IsActive : status.dataValues.IsActive,
      updatedAt: updatedAt
    }
    if (status) {
      status.update(param).catch(error => res.status(ERROR.BaseError).send(error));
      req.io.sockets.emit("getAgvInfo", { success: true, type: 1, data: param });
      res.status(200).send({ success: true, data: param })
    } else {
      // createAgvInfo(req, res)
      return res.status(ERROR.NotFound).send({
        success: false,
        message: 'agv Not Found',
      });
    }
  },
  async findByAgvName(req, res) {
    let AgvName = req.query.AgvName;
    let status = await r_agvInfo.findOne({
      where: {
        AgvName: AgvName
      },
      order: [['createdAt', 'DESC']],
    }).catch(error => res.status(ERROR.BaseError).send(error));
    res.status(200).send({ success: true, data: status });
  }
};