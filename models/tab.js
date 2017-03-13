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
    }
};

Tab.get = function get(tabValue, callback){

};

Tab.update = function(tabValue, callback){

};

Tab.delete = function(tabValue, callback){

};