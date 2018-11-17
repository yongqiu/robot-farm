const socketTest = require('./controller/test.js');
const USER = require('./controller/user');
const AGV = require('./controller/agvInfo');
const TASK = require('./controller/task');

module.exports = (app) => {
    // app.use('/api/robot', require('./routes/api_robot'));
    // app.use('/', require('./routes/index.js'))
    app.get('/', socketTest.view);
    app.post('/message', socketTest.create);
    app.get('/getRole', socketTest.roleTest);
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
    app.post('/api/GetAllAgvInfo', AGV.sendAgvInfo);
    app.get('/api/getAgvbyName', AGV.findByAgvName);
    // task
    app.post('/api/PostTask', TASK.create);
    app.get('/api/GetAllTask', TASK.getList);
    app.post('/api/UpdateTask', TASK.update);
    app.get('/api/PostTask', TASK.getTaskByID);


}