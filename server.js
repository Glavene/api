
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';



var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
		host     : 'sql11.freesqldatabase.com',
		user     : 'sql11216060',
		password : 'fDtHLdH1r5',
		database : 'sql11216060',
	});
	
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", server_port " + server_port  );

});
	
app.get('/getdata',function(req,res){
	var dane = {
		"dane":""
	};	
	connection.query("SELECT * from foto",function(err, rows, fields){
		if(rows.length != 0){
			dane["dane"] = rows;
			res.json(dane);
		}else{
			dane["dane"] = 'No dane Found..';
			res.json(dane);
		}
	});
});

app.post('/writedata', urlencodedParser, function(req,res){
	
	 var temp = req.body.temper;
	var vdc = req.body.Vdc;
	var pdc = req.body.Pdc;
	 var vrms = req.body.Vrms;
	var irms = req.body.Irms;
	 var pac = req.body.Pac;
	var eac = req.body.Eac;
	var prom = req.body.prom;
	
    var post = {temp: temper, vdc: Vdc, pdc: Pdc, vrms: Vrms, irms: Irms, pas: Pac, eac: Eac, prom: prom};

	var query = connection.query('INSERT INTO foto SET ?', post, function (err, result) {
		if (!err) {
            console.log('Successfully added information.');
        } else {
            console.log(result);
            console.log('Was not able to add information to database.');
        }
	});
	
});
