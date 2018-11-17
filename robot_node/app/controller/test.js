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
    // return r_role
    //   .findAll()
    //   .then(roleItem => {
    //     res.status(200).json({ data: roleItem })
    //   })
    //   .catch(error => res.status(400).send(error));
  }
};