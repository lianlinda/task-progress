var task = require('../models/task.js');
var tab = require('../models/tab.js');
/*
 * GET home page.
 */

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index');
	});

	app.post('/addTask', function(req, res){
		var newTask = new task({
            name: req.body.name,
            detail: req.body.detail,
            status: req.body.status
		})
		task.get(req.body.name, function(err, task){
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

    app.put('/updateTask', function(req, res){
        var newTask = new task({
            name: req.body.name,
            detail: req.body.detail,
            status: req.body.status
        })
        task.get(req.body.name, function(err, task){
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
        task.get(req.body.name, function(err, task){
            if(!task){
                res.send(400, {error: '该任务不存在'});
            }
            if(err){
                res.send(500, {error: err});
            }
            task.deleteTask(req.body.name, function(err, result){
            	if(err){
                    res.send(500, {error: err});
                }else{
                    res.send(200, {data: result});
                }
            });
		});
	});

    app.get('/checkTask', function(req, res){
    	task.get(req.query.name, function(err, task){
    		if(err){
    			res.send(500, {error: err});
			}else{
    			res.send(200, {data: task});
			}
		})
	});

    app.get('/getTypeTaskList', function(req, res){
    	task.getTypeTaskList(req.query.status, function(err, results){
    		if(err){
    			res.send(500, {error: err});
			}else{
    			res.send(200, results);
			}
		})
	});

    app.get('/getTabList', function(req, res){
    	tab.get(function (err, results) {
			if(err){
				res.send(500, {error: err});
			}else{
				res.send(200, results);
			}
        })
	})
}