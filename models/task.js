//任务模型
var mongodb = require('./db');

function Task(task){
    this.name = task.name;
    this.detail = task.detail;
    this.status = task.status;
};

module.exports = Task;

Task.prototype.save = function save(callback){
    var task = {
        name: this.name,
        detail: this.detail,
        status: this.status
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name', {unique: true});

            collection.insert(task, {safe: true}, function(err, task){
                mongodb.close();
                callback(err, task);
            });
        });
    });
};

Task.get = function get(taskName, callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: taskName}, function(err, doc){
                mongodb.close();
                if(doc){
                    var task = new Task(doc);
                    callback(err, task);
                }else{
                    callback(err, null);
                }
            });
        });
    });
};

Task.getTypeTaskList = function getTypeTaskList(type, callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find({status: type}).toArray(function(err, items){
                mongodb.close();
                if(items){
                    callback(err, items);
                }else{
                    callback(err, null);
                }
            });
        });
    });
};

Task.prototype.update = function update(callback){
    var task = {
        name: this.name,
        detail: this.detail,
        status: this.status
    };
    mongodb.open(function(err, db){
        if(err){
            console.log(err);
            return callback(err);
        }
        db.collection('tasks',function(err,collection){
            if(err){
                mongodb.close();
            }
            collection.update({name: task.name},
                {name: task.name, detail: task.detail, status: task.status},
                function(err, result){
                    mongodb.close();
                    if(result){
                        callback(err, result);
                    }else{
                        callback(err, null);
                    }
            })
        })
    })
};

Task.deleteTask = function deleteTask(taskName, callback) {
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            collection.remove({name: taskName}, {safe: true}, function(err, result){
                mongodb.close();
                if(result){
                    callback(err, result);
                }else{
                    callback(err, null);
                }
            })
        })
    })
};