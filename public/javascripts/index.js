angular.module('progressApp').controller('progressCtrl',['$scope', 'indexAPI', function ($scope, indexAPI) {
    $scope.tempTask = {};//用于编辑任务时数据临时存储
    //获取指定类型的任务
    $scope.getTypeTaskList = function(type){
        indexAPI.getTypeTaskList({
            status: type
        })
            .$promise.then(function(data){
                $scope.allTasks = data;
            }, function(){

        })
    };
    //检查任务名长度
    $scope.checkTaskName = function () {
        if($scope.newTask != null && $scope.newTask.length < 20){
            $scope.showError = false;
        }else{
            $scope.showError = true;
        }
    };
    //添加任务
    $scope.addTask = function () {
        $scope.tempTask = {};
        $scope.check = false;
        $scope.edit = false;
        $('#addTask').modal('show');
    };
    $scope.saveEdit = function(){
        if($scope.edit){
            indexAPI.updateTask({
                name: $scope.tempTask.name,
                detail: $scope.tempTask.detail,
                status: $scope.tempTask.status
            }).$promise.then(function (data) {
                console.log(data);
                $('#addTask').modal('hide');
                $scope.getTypeTaskList(0);
            },function(){

            });
        }else{
            indexAPI.addTask({
                name: $scope.tempTask.name,
                detail: $scope.tempTask.detail,
                status: $scope.tempTask.status
            }).$promise.then(function (data) {
                console.log(data);
                $('#addTask').modal('hide');
                $scope.getTypeTaskList(0);
            },function(){

            });
        }
    };
    //查看任务
    $scope.checkTask = function(item){
        $scope.check = true;
        $('#addTask').modal('show');
        $scope.getTaskDetail(item);
    }
    //编辑任务
    $scope.editTask = function (item) {
        $scope.check = false;
        $scope.edit = true;
        $('#addTask').modal('show');
        $scope.getTaskDetail(item);
    };
    $scope.getTaskDetail = function(item){
        indexAPI.checkTask({
            name: item.name
        }).$promise.then(function(data){
            $scope.tempTask = data.data;
        }, function(){

        })
    };
    //确认是否删除任务
    $scope.isRemoveTask = function (item) {
        $('#removeTask').modal('show');
        $scope.tempTask = item;
    };
    //删除任务
    $scope.removeTask = function () {
        indexAPI.deleteTask({
            name: $scope.tempTask.name
        }).$promise.then(function(){
            $('#removeTask').modal('hide');
            $scope.tempTask = {};
            $scope.getTypeTaskList(0);
        }, function(){

        })

    };

    $scope.getTypeTaskList(0);
}])