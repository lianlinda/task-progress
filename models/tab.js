//tab模型
var mongodb = require('./db');

function Tab(tab){
    this.value = tab.value;
    this.name = tab.name;
}

module.exports = Tab;

Tab.prototype.save = function save(callback){
    var tab = {
        value: this.value,
        name: this.name
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tabs', function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name', {unique: true});

            collection.insert(tab, {safe: true}, function(err, tab){
                mongodb.close();
                callback(err, tab);
            });
        });
    });
};

Tab.get = function get(callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tabs', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find().toArray(function(err, items){
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

Tab.update = function(tabValue, callback){
    var tab = {
        value: this.value,
        name: this.name
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tabs', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({value: tab.value},
                {value: tab.value, name: tab.name},
            function(err, result){
                mongodb.close();
                if(result){
                    callback(err, result);
                }else{
                    callback(err, null);
                }
            });
        });
    });
};

Tab.delete = function(tabValue, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('tabs', function(err, collection){
            collection.remove({value: tabValue}, {safe: true}, function(err, result){
                mongodb.close();
                if(result){
                    callback(err, result);
                }else{
                    callback(err, null);
                }
            });
        });
    });
};