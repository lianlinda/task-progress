//任务模型
var mongodb = require('./db');
var ObjectId = require('mongodb').ObjectId;

function Task(task){
    this._id = task._id;
    this.name = task.name;
    this.detail = task.detail;
    this.status = task.status;
};

module.exports = Task;

Task.prototype.save = function save(callback){
    var task = {
        _id: this._id,
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

            collection.insert(task, {safe: true}, function(err, task){
                mongodb.close();
                callback(err, task);
            });
        });
    });
};

Task.get = function get(taskId, callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({_id: ObjectId(taskId)}, function(err, doc){
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
    if(type){
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
    }
};

Task.prototype.update = function update(callback){
    var task = {
        _id: this._id,
        name: this.name,
        detail: this.detail,
        status: this.status
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tasks',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({_id: ObjectId(task._id)},
                {$set: {name: task.name, detail: task.detail, status: task.status}},
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

Task.deleteTask = function deleteTask(taskId, callback) {
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            collection.remove({_id: ObjectId(taskId)}, {safe: true}, function(err, result){
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

//根据任务状态删除任务
Task.deleteByStatus = function deleteTask(taskStatus, callback) {
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            collection.remove({status: taskStatus}, {safe: true}, function(err, result){
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