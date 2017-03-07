//任务模型
var mongodb = require('./db');

function Task(task){
    this.id = task.id;
    this.name = task.name;
    this.detail = task.detail;
    this.status = task.status;
};

module.exports = Task;

Task.prototype.save = function save(callback){
    var task = {
        id: this.id,
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
            collection.ensureIndex('id', {unique: true});

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
            collection.findOne({id: taskId}, function(err, doc){
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

Task.getAll = function getAll(callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find(function(err, docs){
                mongodb.close();
                if(docs){
                    callback(err, docs);
                }else{
                    callback(err, null);
                }
            });
        });
    });
};

Task.prototype.update = function update(callback){
    var task = {
        id: this.id,
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
            collection.update({id: task.id},
                {$ser: {name: task.name, detail: task.detail, status: task.status}},
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
            collection.remove({id: taskId}, {safe: true}, function(err, result){
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