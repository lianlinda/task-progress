//任务模型
var pool = require('./pool');

function Task(task){
    this.id = task.id;
    this.name = task.name;
    this.detail = task.detail;
    this.status = task.status;
};

module.exports = Task;

var sql, sqlParams;

Task.prototype.save = function save(callback){
    sql = 'INSERT INTO task(name,detail,status) VALUES (?,?,?)';
    sqlParams = [this.name, this.detail, this.status];
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, sqlParams, function(err){
                conn.release();
                callback(err);
            })
        }
    })
    
};

Task.get = function get(taskId, callback){
    sql = 'SELECT * FROM task WHERE id = ?';
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, taskId, function(err, vals){
                conn.release();
                callback(err, vals);
            })
        }
    })
};

Task.getTypeTaskList = function getTypeTaskList(type, callback){
    if(type){
        sql = 'SELECT * FROM task WHERE status = ?';
        pool.getConnection(function(err, conn){
            if(err){
                callback(err);
            }else{
                conn.query(sql, type, function(err, vals){
                    conn.release();
                    callback(err, vals);
                })
            }
        })
    }
};

Task.prototype.update = function update(callback){
    sql = 'UPDATE task SET name = ?, detail = ?, status = ? WHERE id = ?';
    sqlParams = [this.name, this.detail, this.status, this.id];
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, sqlParams, function(err, result){
                conn.release();
                if(result){
                    callback(err, result);
                }else{
                    callback(err, null);
                }
            })
        }
    })

};

Task.deleteTask = function deleteTask(taskId, callback) {
    sql = 'DELETE FROM task WHERE id = ?';
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, taskId, function(err, result){
                conn.release();
                if(result){
                    callback(err, result);
                }else{
                    callback(err, null);
                }
            })
        }
    })
};

//根据任务状态删除任务
Task.deleteByStatus = function deleteTask(taskStatus, callback) {
    sql = 'DELETE FROM task WHERE status = ?';
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, taskStatus, function(err, result){
                conn.release();
                if(result){
                    callback(err, result);
                }else{
                    callback(err, null);
                }
            })
        }
    })
};