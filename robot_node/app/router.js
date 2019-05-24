const socketTest = require('./controller/test.js');
const USER = require('./controller/user');
const AGV = require('./controller/agvInfo');
const MOVE = require('./controller/action_move');
const TASK = require('./controller/task');
const FRAME = require('./controller/frame');

// 定时开启
setInterval(() => {
    socketTest.RefreshAllAgvInfo()
}, 10000);


module.exports = (app) => {
    // app.use('/api/robot', require('./routes/api_robot'));
    // app.use('/', require('./routes/index.js'))
    app.get('/', socketTest.view);
    app.get('/getRole', socketTest.roleTest);


    // 假接口
    app.post('/agv/PostTaskMy', socketTest.PostTaskMy);
    app.post('/agv/PostActionMy', socketTest.PostActionMy);
    // 使用接口
    app.get('/api/robot/RefreshAllAgvInfo', socketTest.RefreshAllAgvInfo);  // 这个自动
    app.post('/api/robot/PostTask', socketTest.PostTask);
    app.post('/api/robot/PostAction', socketTest.PostAction);
    // start
    app.post('/api/robot/role/create', USER.postRoleInfo);
    app.post('/api/robot/role/update', USER.postRoleInfo);
    app.get('/api/robot/role/getList', USER.getRoleList);
    app.delete('/api/robot/role/delete', USER.deleteRole);
    // user
    app.post('/api/robot/login', USER.login);
    app.post('/api/robot/user/create', USER.postUserInfo);
    app.post('/api/robot/user/update', USER.postUserInfo);
    app.get('/api/robot/user/getList', USER.getUserList);
    app.delete('/api/robot/user/delete', USER.deleteUser);
    app.get('/api/robot/user/getbyId', USER.getUserbyId);
    //agv
    app.get('/api/robot/getAllAgvInfo', AGV.getAllAgvInfo);
    app.get('/api/robot/getAgvbyName', AGV.findByAgvName);
    app.post('/api/robot/PostAllAgvInfo', AGV.update)
    app.post('/api/robot/changeName', AGV.changeName)
    // move
    app.post('/api/robot/PostMove', MOVE.create);
    app.get('/api/robot/GetAllMove', MOVE.getList);
    app.post('/api/robot/UpdateMove', MOVE.update);
    app.get('/api/robot/GetMove', MOVE.getTaskByID);
    app.get('/api/robot/GetLastMove', MOVE.getLastTask);      // agv获取移动动作的接口
    // task
    app.post('/api/robot/CreateTask', TASK.create);
    app.get('/api/robot/GetAllTask', TASK.getList);
    app.post('/api/robot/UpdateTask', TASK.update);       // agv更新信息的接口
    app.get('/api/robot/GetTask', TASK.getTaskByID);
    app.delete('/api/robot/DeleteTask', TASK.delete);
    // frame
    app.post('/api/robot/PostFRAME', FRAME.create);
    app.get('/api/robot/GetAllFRAME', FRAME.getList);
    app.post('/api/robot/UpdateFRAME', FRAME.update);
    app.get('/api/robot/GetFRAME', FRAME.getTaskByID);


}