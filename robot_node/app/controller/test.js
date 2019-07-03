var express = require('express');
const r_role = require('../models').r_role;
const AGV = require('./agvInfo');
var request = require('request');
var PostTaskUrl = 'http://127.0.0.1:3000/agv/PostTaskMy'
var PostActionUrl = 'http://127.0.0.1:3000/agv/PostTaskMy'
var GetAllAgvInfoUrl = 'http://127.0.0.1:3000/api/robot/getAllAgvInfo'

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
  async RefreshAllAgvInfo(req, res) {
    var e = request({
      url: GetAllAgvInfoUrl,
      method: 'GET',
    }, async (error, response, body) => {
      console.log(body)
      // let date = Date.parse(new Date()) / 1000;
      // JSON.parse(body).forEach(async (element) => {
      //   AGV.updateAvgInfo(element)
      // });
    });

    // req.io.sockets.emit("getAgvInfo", { success: true, type: 1, data: req.body });
    // res.status(200).send({ success: true, data: status });
  },
  async PostTaskMy(req, res) {
    res.status(200).send('success')
  },
  async PostTask(req, res) {
    var e = request({
      url: PostTaskUrl,
      method: 'POST',
      body: JSON.stringify(req.body)
      // headers: { 'Content-Type': 'text/json' }
    }, function (error, response, body) {
      res.status(200).json({ data: req.body })
    });
  },
  async PostActionMy(req, res) {
    res.status(200).json
  },
  async PostAction(req, res) {
    var e = request({
      url: PostActionUrl,
      method: 'POST',
      body: JSON.stringify(req.body)
      // headers: { 'Content-Type': 'text/json' }
    }, function (error, response, body) {
      res.status(200).json({ data: req.body })
    });
  }
};