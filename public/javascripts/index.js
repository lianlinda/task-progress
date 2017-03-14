angular.module('progressApp').controller('progressCtrl',['$scope', 'indexAPI', function ($scope, indexAPI) {
    $scope.tempTask = {};//用于编辑任务时数据临时存储
    $scope.tempTab = {};
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
    $scope.saveEditTask = function(){
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
    $scope.getTabList = function(){
        indexAPI.getTabList()
            .$promise.then(function(data){
                $scope.tablist = data;
                /*if($scope.tablist.length <= 0){
                    $scope.addable = false;
                }else{
                    $scope.addable = true;
                }*/
            }, function(){
                /*$scope.addable = false;*/

        });
    };

    $scope.getTabDetail = function(item){
        indexAPI.checkTab({
            value: item.value
        }).$promise.then(function(data){
            $scope.tempTab = data.data;
        }, function(){

        })
    };

    $scope.addTab = function(){
        $scope.tempTab = {};
        $scope.edit = false;
        $('#addTab').modal('show');
    };

    $scope.editTab = function(item){
        $scope.edit = true;
        $('#addTab').modal('show');
        $scope.getTabDetail(item);
    };

    //确认是否删除tab
    $scope.isRemoveTab = function (item) {
        $('#removeTab').modal('show');
        $scope.tempTab = item;
    };

    $scope.removeTab = function(){
        indexAPI.deleteTab({
            value: $scope.tempTab.value
        }).$promise.then(function(){
            $('#removeTab').modal('hide');
            $scope.tempTab = {};
            $scope.getTabList();
            /*$scope.getTypeTaskList(1);*/
        }, function(){

        })
    };

    $scope.saveEditTab = function(){
        if($scope.edit){
            indexAPI.updateTab({
                name: $scope.tempTab.name,
                value: $scope.tempTab.value
            }).$promise.then(function (data) {
                console.log(data);
                $('#addTab').modal('hide');
                $scope.getTabList();
            },function(){

            });
        }else{
            indexAPI.addTab({
                name: $scope.tempTab.name,
                value: $scope.tempTab.value
            }).$promise.then(function (data) {
                console.log(data);
                $('#addTab').modal('hide');
                $scope.getTabList();
            },function(){

            });
        }
    };

    $scope.getTabList();
    /*$scope.getTypeTaskList(0);*/
}])