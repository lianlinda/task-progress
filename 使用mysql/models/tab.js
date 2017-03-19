//tab模型
var pool = require('./pool');

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

Tab.getAll = function get(callback){
    sql = 'SELECT * FROM tab';
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, function(err,vals){
                conn.release();
                callback(err, vals);
            })
        }
    })
};

Tab.get = function get(tabValue, callback){
    sql = 'SELECT * FROM tab WHERE value = ?';
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, tabValue, function(err, vals){
                conn.release();
                callback(err, vals);
            })
        }
    })
};

Tab.prototype.update = function(callback){
    sql = 'UPDATE tab SET name = ? WHERE value = ?';
    sqlParams = [this.name, this.value];
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

Tab.delete = function(tabValue, callback){
    sql = 'DELETE FROM tab WHERE value = ?';
    pool.getConnection(function(err, conn){
        if(err){
            callback(err);
        }else{
            conn.query(sql, tabValue, function(err, result){
                conn.release();
                if(result){
                    task.deleteByStatus(tabValue, callback);
                }else{
                    callback(err, null);
                }
            })
        }
    })
};