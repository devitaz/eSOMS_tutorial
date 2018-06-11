/////////////////////////////////////////////////////////////////////////////////////////////
//			Modules & Server Setup
/////////////////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var fs = require('fs');

var mysql = require('mssql');
var config = {
	server: 'psegds-dev',
	user: 'ERoundsAdmin',
    password: 'SUPERSECRETPASSWORD',
	port: '5123'
};
var sqlserver;
var sqlrequest;

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', 2376);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////////////////////////////////////////////////////////////
//			Functions to Convert SQL Query Results to the .handlebars View Files
/////////////////////////////////////////////////////////////////////////////////////////////
//	NOTE: These functions only run once, and at the initial page load. These functions force all page content to be refreshed 
//	each time the webpage is loaded. This ensures that all updates are visible immediately and automatically

// Queries database for the page contents & returns data to the callback function
function querypage(page, callback) {
	var sql = "SELECT BodyContent, DataType FROM [EROUNDS_ADMIN].[dbo].[HTMLPage] WHERE Page = " + page + " ORDER BY Line";
	sqlrequest.query(sql, function(err, rows) {
		if(err) {
			console.error("\nerror: server.js num_of_rows() function\n");
			console.log(err);
			return;
		}
		else {
			callback(rows);
		}		
	});
}
//  Function constructs each line of the partials. It takes the data from the SQL table & creates the appropriate html tag
function constructHTML(code, content)
{
    //  NOTE: adding a 'space' to the end of code is necessary when using the Substring method because str.Length must be greater 
	//	than the last index value. By design, some 'h1's do not require an 'id' so their lengths are 2 which is equal to the last 
	//	index of the Substring() function. 
	if((code + " ").substring(0, 2) == "h1")        //  handles dynamically changing 'h1' ids which are necessary for jump-to links
        return "<" + code + ">" + content + "</h1>";
    switch (code)
    {
        case "p":
			return "<p>" + content + "</p>";
        case "AsIs":
			return content;
        case "img":
            return "<img class=\"desktop-prtscr-img\" src=\"img/" + content + ".png\" alt=\"\" />";
        case "imgmesa":
            return "<img class=\"mesa-prtscr-img\" src=\"img/" + content + ".png\" alt=\"\" />"; 
        case "divmain":
            return "<div class=\"main-content-" + content + "\">";
        case "divopen":
            return "<br><br><div class=\"column1-unit-" + content + "\">";
        case "divclose":
            return "<br></div>";
        case "li":
            return "<li>" + content + "</li>";
        case "note":
            return "<p class=\"hangingindent\"><i>" + content + "</i></p>";
        case "break":
            return "<br><br></div><hr class=\"clear-contentunit-" + content + "\" /><hr class=\"clear-contentunit-" + content + "\" /><div class=\"column1-unit-" + content + "\"><br><br>";
        case "pagetitle":
            return "<h1 class=\"pagetitle\">" + content + "</h1>";
        default:
            return "<h1>server.js error: switch statement - no case found</h1>";
    }
}
//  Function create the appropriate view file & writes the corresponding HTML encoded content to the file
function writefile(filename, content) {
	var path = "views/" + filename + ".handlebars";
	var HTMLEncoded = [];
	
	for(var i in content) {
		HTMLEncoded[i] = constructHTML(content[i].DataType,content[i].BodyContent);
	}
	fs.writeFile(path, HTMLEncoded.join('\n'), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(filename + " was saved!");
	});
}

//	Function opens connection to the database, calls the querypage() function to retrieve raw page content from the database, & 
//	then calls the writefile() function using the raw page data as a parameter 
function retrieveData() {
	sqlserver = new mysql.Connection(config); 
	sqlrequest = new mysql.Request(sqlserver);
	var pagetitle = ['home', 'eSOMSLogin', 'sync', 'manage-rights', 'data-trends', 'create-tour', 'create-tour-record', 'modify-tour-record', 'change-status', 'search-equip', 'manage-equip', 'modify-equip' ];
	var TOTAL_NUM_PAGES = pagetitle.length; 
	sqlserver.connect(function (err) {
		if(err) {
			console.log(err);
			return;
		}
		var func = [];
		for(let i = 0; i < TOTAL_NUM_PAGES; i++) {
		//	this looks like magic... it is
			querypage(i+1, function(rows) {	//	Function is a callback - querypage() cannot execute until callback has returned
				(function(index) {		 	//	This is a special function which is necessary to fix a closure issue for the loop 
					writefile(pagetitle[index], rows);	
				})(i);
			});
		}
		sqlserver.close();
	});
}
/////////////////////////////////////////////////////////////////////////////////////////////
//			Render Page via GET Requests
/////////////////////////////////////////////////////////////////////////////////////////////

//	This GET Request is only executed when the page is initially loaded. It will only be executed subsequently if the website is
//	closed and then reopened or if the webpage is refreshed. The only difference between this request & the 'home' page request is
//	that this request executes the functions necessary to retrieve the website's page content from the database.
app.get('/', function(req, res){
	res.render('home', {
		showHeader: true,
		initialLoad: true,
		isHome: true,
		nextPage: "eSOMSLogin"
	}, retrieveData());		// Uses retrieveData() as a callback function. Render cannot begin until retrieveData() has returned
});
app.get('/home', function(req, res){
	res.render('home', {
		showHeader: true,
		isHome: true,
		nextPage: "eSOMSLogin"
	});
});
app.get('/eSOMSLogin', function(req, res){
	res.render('eSOMSLogin', {
		prevPage: "home",
		nextPage: "sync"
	});
});
app.get('/sync', function(req, res){
	res.render('sync', {
		prevPage: "eSOMSLogin",
		nextPage: "manage-rights"
	});
});
app.get('/manage-rights', function(req, res){
	res.render('manage-rights', {
		prevPage: "sync",
		nextPage: "data-trends"
	});
});
app.get('/data-trends', function(req, res){
	res.render('data-trends', {
		prevPage: "manage-rights",
		nextPage: "create-tour"
	});
});
app.get('/create-tour', function(req, res){
	res.render('create-tour', {
		prevPage: "data-trends",
		nextPage: "create-tour-record"
	});
});
app.get('/create-tour-record', function(req, res){
	res.render('create-tour-record', {
		prevPage: "create-tour",
		nextPage: "modify-tour-record"
	});
});
app.get('/modify-tour-record', function(req, res){
	res.render('modify-tour-record', {
		prevPage: "create-tour-record",
		nextPage: "change-status"
	});
});
app.get('/change-status', function(req, res){
	res.render('change-status', {
		prevPage: "modify-tour-record",
		nextPage: "search-equip"
	});
});
app.get('/search-equip', function(req, res){
	res.render('search-equip', {
		prevPage: "change-status",
		nextPage: "manage-equip"
	});
});
app.get('/manage-equip', function(req, res){
	res.render('manage-equip', {
		prevPage: "search-equip",
		nextPage: "modify-equip"
	});
});
app.get('/modify-equip', function(req, res){
	res.render('modify-equip', {
		prevPage: "manage-equip",
		isLastPage: true
	});
});

//	renders server error page 
app.use(function(req,res){
	res.status(404);
	res.render('404');
});
//	renders programming error page 
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});