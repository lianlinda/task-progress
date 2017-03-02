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

Task.get = function get(taskname, callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('tasks', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: taskname}, function(err, doc){
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