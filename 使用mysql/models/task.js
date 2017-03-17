//任务模型
var connection = require('./connection');

function Task(task){
    this.id = task.id;
    this.name = task.name;
    this.detail = task.detail;
    this.status = task.status;
};

module.exports = Task;

var sql, sqlParams;

Task.prototype.save = function save(callback){
    sql = 'INSERT INTO task(name, detail, status) VALUES (?, ?, ?)';
    sqlParams = [this.name, this.detail, this.status];
    connection.connect(function (err) {
        if(err){
            return callback(err);
        }
        connection.query(sql, sqlParams, function(err, result){
            connection.end();
            if(err){
                return callback(err);
            }
        })
    });
    
};

Task.get = function get(taskId, callback){

};

Task.getTypeTaskList = function getTypeTaskList(type, callback){
    if(type){

    }
};

Task.prototype.update = function update(callback){
    var task = {
        id: this.id,
        name: this.name,
        detail: this.detail,
        status: this.status
    };

};

Task.deleteTask = function deleteTask(taskId, callback) {

};

//根据任务状态删除任务
Task.deleteByStatus = function deleteTask(taskStatus, callback) {

};