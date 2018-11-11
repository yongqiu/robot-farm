var express = require('express');
const r_agvInfo = require('../models').r_agvInfo;

module.exports = {
  async sendAgvInfo(req, res) {
    // console.log(req.body)
    // var message = req.body.message;
    // var name = req.body.name;
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