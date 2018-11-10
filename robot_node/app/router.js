const socketTest = require('./routes/index.js');

module.exports = (app) => {
    app.use('/api/robot', require('./routes/api_robot'));
    // app.use('/', require('./routes/index.js'))
    app.get('/', socketTest.view);
    app.post('/message', socketTest.create);
    app.get('/getRole', socketTest.roleTest);
}