var express = require("express"),
	bodyParser= require("body-parser"),
    app       = express(),
    fileUpload = require('express-fileupload');
var PythonShell = require('python-shell'),
sys = require('sys');
var spawn = require("child_process").spawn;


app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(express.static(__dirname));

app.get("/", function(req, res){

	res.render("upload");
});
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  console.log(req.body);
  let sampleFile = req.files.sampleFile;
  var filename = req.files.sampleFile.name;
  var level = parseFloat(req.body.level);
  var claim = parseInt(req.body.claim);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+'/data/'+filename+'.csv', function(err) {
    if (err)
      return res.status(500).send(err);
 	
 /*	 var process = spawn('python',["./cart.py", filename]);
 	 process.stdout.on('data', function (data){
// Do something with the data returned from python script
	console.log(data);


});*/
  var options = {
  mode: 'text',
  pythonPath: "C:/Users/hp/Anaconda3-2/python.exe",
  pythonOptions: ['-u'],
  scriptPath: './',
  args: [filename, level]
};

var shell = new PythonShell('cart.py', options);
shell.on('message', function (message) {
	var len = message.length;
	message = message.slice(2, len-1);
	message = parseFloat(message);
	console.log(message);
 	var errorVal = parseFloat((message - claim)/claim);
 	var bluffStatus = true;
 	console.log(errorVal);
 	var says = {
 		state: "Overstated",
 		bluff: Math.abs(errorVal)*100,
 		bluffStatus: false
 	};
 	if(Math.abs(errorVal)>parseFloat(0.01))
 		says.bluffStatus = true
 	if(errorVal > parseFloat(0))
 		{
 			says.state = "Understated";

 }
 	res.render("answer", {message: message, claim: claim, says:says});

});

/*PythonShell.run('cart.py', options, function (err, results) {
  if (err) throw err;
// results is an array consisting of messages collected during execution
//  PythonShell.stdout.on('data', function (data){
// Do something with the data returned from python script
//console.log(data);
//var pyshell = ;
console.log(results);


 // (new PythonShell('cart.py')).stdout.on('data', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    //sys.print(message.toString());
//});

// end the input stream and allow the process to exit


});

*/
//res.send('File uploaded!');
  });
});

app.listen(3000, "localhost", function(err){
	console.log("Server on duty, Mallady!");
});








