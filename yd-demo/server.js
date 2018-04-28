let jsonServer = require('json-server');
let server  = jsonServer.create();
// let router = jsonServer.router('db.json'); 
let middlewares = jsonServer.defaults(); // 声明中间键的实例
let dbs = require("./mock/db.js"); // 重定向接口规则
server.use(middlewares);
server.use(jsonServer.bodyParser);
let api = '/api/v1/';
server.get(api+"customers",function(req,res){
    res.send(dbs.one);
})
// server.use(router);
server.listen(9999,function(){
    console.log("起一个后端的服务");
})
