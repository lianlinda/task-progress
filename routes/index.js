var task = require('../models/task.js');
/*
 * GET home page.
 */

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index');
	});

	app.post('/addTask', function(req, res){
		var newTask = new task({
            name: req.body.taskName,
            detail: req.body.detail,
            status: req.body.status
		})
		task.get(req.body.taskName, function(err, task){
			if(task){
				res.send(400, {error: '该任务已存在'});
			}
			if(err){
                res.send(500, {error: err});
			}
			newTask.save(function(err){
				if(err){
					res.send(500, {error: err});
				}else{
                    res.send(200);
				}
			})
		})
	});

    app.post('/updateTask', function(req, res){
        var newTask = new task({
            name: req.body.taskName,
            detail: req.body.detail,
            status: req.body.status
        })
        task.get(req.body.taskName, function(err, task){
            if(!task){
                res.send(400, {error: '该任务不存在'});
            }
            if(err){
                res.send(500, {error: err});
            }
            newTask.update(function(err){
            	if(err){
            		res.send(500, {error: err});
				}else{
            		res.send(200);
				}
			})
        })
    });

    app.post('/deleteTask', function(req, res){
    	task.deleteTask(req.body.taskName, function(err, result){
    		if(err){
    			res.send(500, {error: err});
			}else{
    			res.send(200, {data: result});
			}
		});
	});

    app.get('/checkTask', function(req, res){
    	task.get(req.body.taskName, function(err, task){
    		if(err){
    			res.send(500, {error: err});
			}else{
    			res.send(200, {data: task});
			}
		})
	});

    app.get('/getAllTask', function(req, res){
    	task.getAll(function(err, results){
    		if(err){
    			res.send(500, {error: err});
			}else{
    			res.send(200, results);
			}
		})
	});
}