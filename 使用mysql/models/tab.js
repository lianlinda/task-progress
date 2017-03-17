//tab模型
var connection = require('./connection');

//获取task模型
var task = require('./task');

var sql, sqlParams;

function Tab(tab){
    this.value = tab.value;
    this.name = tab.name;
}

module.exports = Tab;

Tab.prototype.save = function save(callback){
    sql = 'INSERT INTO tab(value, name) VALUES (?, ?)';
    sqlParams = [this.value, this.name];
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

Tab.getAll = function get(callback){

};

Tab.get = function get(tabValue, callback){

};

Tab.prototype.update = function(callback){
    var tab = {
        value: this.value,
        name: this.name
    };

};

Tab.delete = function(tabValue, callback){

};