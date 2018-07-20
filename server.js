const bodyParser = require('body-parser');
const express = require('express');
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))
app.use(express.static('views'));

app.get('/',function(req,res){
    res.render('index.html');   
});

let tasks = [{name: 'Pick up kids', complete: true}, {name: 'Pay Bills', complete: false}, {name: 'Do Laundry', complete: false}, 
        {name: 'Cook Dinner', complete: true}, {name: 'Wash car', complete: false}];

app.get('/getTasks', function(req,res){
    console.log('asked for tasks');

    res.json(tasks);
});

app.post('/newTask', function(req,res){
	console.log(req.body.name);
	let newTask = {name: req.body.name, complete: false};
    tasks.push(newTask);
    res.json(newTask); 
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})