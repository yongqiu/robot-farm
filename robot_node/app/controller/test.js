var express = require('express');
const r_role = require('../models').r_role;

module.exports = {
  create(req, res) {
    // console.log(req.body)
    var message = req.body.message;
    var name = req.body.name;
    req.io.sockets.emit("incomingMessage", { message: message, name: name });
    res.status(200).json({ message: "Message received" })
  },
  view(req, res) {
    req.io.sockets.emit("connect", { message: 'socket connect success' });
    res.render('index', { title: 'Express' });
  },
  async roleTest(req, res) {
    let roles = await r_role.findAll();
    res.status(200).json({ data: roles })
  },
  async GetAllAgvInfo(req, res) {
    let agvNames = ['AGV01', 'AGV02', 'AGV03', 'AGV04']
    let agvList = [];
    agvNames.forEach(item => {
      agvList.push({
        AgvName: item,
        RackNumBer: '101',
        Rfid: 1,
        Speed: 1,
        Voltage: 20,
        Status: 1,
        RunStatus: 1,
        BatteryNum: 5,
        Alarm: 'fjdskljflksdj',
        RunTimes: 2,
        IsOnline: 3
      })
    })
    res.status(200).json(agvList)
  }
};