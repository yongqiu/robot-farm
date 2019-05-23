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
    app.get('/api/RefreshAllAgvInfo', socketTest.RefreshAllAgvInfo);  // 这个自动
    app.post('/api/PostTask', socketTest.PostTask);
    app.post('/api/PostAction', socketTest.PostAction);
    // start
    app.post('/api/role/create', USER.postRoleInfo);
    app.post('/api/role/update', USER.postRoleInfo);
    app.get('/api/role/getList', USER.getRoleList);
    app.delete('/api/role/delete', USER.deleteRole);
    // user
    app.post('/api/login', USER.login);
    app.post('/api/user/create', USER.postUserInfo);
    app.post('/api/user/update', USER.postUserInfo);
    app.get('/api/user/getList', USER.getUserList);
    app.delete('/api/user/delete', USER.deleteUser);
    app.get('/api/user/getbyId', USER.getUserbyId);
    //agv
    app.get('/api/getAllAgvInfo', AGV.getAllAgvInfo);
    app.get('/api/getAgvbyName', AGV.findByAgvName);
    app.post('/api/PostAllAgvInfo', AGV.update)
    app.post('/api/changeName', AGV.changeName)
    // move
    app.post('/api/PostMove', MOVE.create);
    app.get('/api/GetAllMove', MOVE.getList);
    app.post('/api/UpdateMove', MOVE.update);
    app.get('/api/GetMove', MOVE.getTaskByID);
    app.get('/api/GetLastMove', MOVE.getLastTask);      // agv获取移动动作的接口
    // task
    app.post('/api/CreateTask', TASK.create);
    app.get('/api/GetAllTask', TASK.getList);
    app.post('/api/UpdateTask', TASK.update);       // agv更新信息的接口
    app.get('/api/GetTask', TASK.getTaskByID);
    app.delete('/api/DeleteTask', TASK.delete);
    // frame
    app.post('/api/PostFRAME', FRAME.create);
    app.get('/api/GetAllFRAME', FRAME.getList);
    app.post('/api/UpdateFRAME', FRAME.update);
    app.get('/api/GetFRAME', FRAME.getTaskByID);


}