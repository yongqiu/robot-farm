var express = require('express');
const r_agvInfo = require('../models').r_agvInfo;
const ERROR = require('../../config/errorCode');
var request = require('request');

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

let updateAvgInfo = async (param) => {
  let updatedAt = Date.parse(new Date()) / 1000;
  let status = await r_agvInfo.findOne({
    where: {
      AgvName: param.AgvName
    },
    order: [['createdAt', 'DESC']]
  })
  let requier = {
    AgvName: param.AgvName != undefined ? param.AgvName : status.dataValues.AgvName,
    RackNumBer: param.RackNumBer != undefined ? param.RackNumBer : status.dataValues.RackNumBer,
    Rfid: param.Rfid != undefined ? param.Rfid : status.dataValues.Rfid,
    Speed: param.Speed != undefined ? param.Speed : status.dataValues.Speed,
    Voltage: param.Voltage != undefined ? param.Voltage : status.dataValues.Voltage,
    Status: param.Status != undefined ? param.Status : status.dataValues.Status,
    RunStatus: param.RunStatus != undefined ? param.RunStatus : status.dataValues.RunStatus,
    BatteryNum: param.BatteryNum != undefined ? param.BatteryNum : status.dataValues.BatteryNum,
    Alarm: param.Alarm != undefined ? param.Alarm : status.dataValues.Alarm,
    RunTimes: param.RunTimes != undefined ? param.RunTimes : status.dataValues.RunTimes,
    RackContent: param.RackContent != undefined ? param.RackContent : status.dataValues.RackContent,
    IsActive: param.IsActive != undefined ? param.IsActive : status.dataValues.IsActive,
    updatedAt: updatedAt
  }
  let res = await status.update(requier).catch(error => res.status(ERROR.BaseError).send(error));
  return res;
}



module.exports = {
  async sendAgvInfo(req, res) {
    createAgvInfo(req, res)
  },
  async update(req, res) {
    let status = await updateAvgInfo(req.body)
    console.log(status)
    if (status) {
      // status.update(param).catch(error => res.status(ERROR.BaseError).send(error));
      // req.io.sockets.emit("getAgvInfo", { success: true, type: 1, data: param });
      res.status(200).send({ success: true, data: req.body })
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
  },
  async createAgvInfoList(){
    var e = request({
      url: `http://127.0.0.1:3000/agv/GetAllTask`,
      method: 'GET',
    }, async (error, response, body) => {
      let date = Date.parse(new Date()) / 1000;
      JSON.parse(body).forEach(async (element) => {
        updateAvgInfo(element)
      });
    });

    // req.io.sockets.emit("getAgvInfo", { success: true, type: 1, data: req.body });
    // res.status(200).send({ success: true, data: status });
  }
};
