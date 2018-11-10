var express = require('express');
var router = express.Router();
var app = express();
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
  roleTest(req, res) {
    console.log(r_role)
    return r_role
      .findAll()
      .then(roleItem => {
        res.status(200).json({ data: roleItem })
      })
      .catch(error => res.status(400).send(error));
  }
};


/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
//   var socket = res.socket;
//   // console.log(res.io)


//   /*
//    When a user changes his name, we are expecting an event called "nameChange"
//    and then we'll emit an event called "nameChanged" to all participants with
//    the id and new name of the user who emitted the original message
//    */
//   socket.on("nameChange", function (data) {
//     _.findWhere(participants, { id: socket.id }).name = data.name;
//     io.sockets.emit("nameChanged", { id: data.id, name: data.name });
//   });

//   /*
//    When a client disconnects from the server, the event "disconnect" is automatically
//    captured by the server. It will then emit an event called "userDisconnected" to
//    all participants with the id of the client that disconnected
//    */
//   socket.on("disconnect", function () {
//     participants = _.without(participants, _.findWhere(participants, { id: socket.id }));
//     io.sockets.emit("userDisconnected", { id: socket.id, sender: "system" });
//   });
// });

// router.get("/message", function (req, res, next) {
//   // console.log(req.body)
//   // var message = req.body.message;
//   // var name = req.body.name;
//   // console.log(req.io)
//   // req.io.sockets.emit("incomingMessage", { message: message, name: name });

//   //Looks good, let the client know
//   // res.json(200, { message: "Message received" });
//   // res.status(200).json({ message: req })
//   res.json({ result: res })

// });

// module.exports = router;
