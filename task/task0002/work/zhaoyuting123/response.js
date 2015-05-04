

var http = require('http');
 http.createServer(function(req,res){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader ('Access-Control-Allow-Credentials', true);
    res.setHeader ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader ('Access-Control-Allow-Headers', 'Content-Type');
     res.writeHead(200, {'Content-Type': 'application/json'});
     var result = ['aaaa','aaaassss','asdf','abc'];
     var obj = {};
     obj.data = result;
    res.end(JSON.stringify(obj));


}).listen(121,'127.0.0.1');
