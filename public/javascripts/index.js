angular.module('progressApp').controller('progressCtrl',['$scope', 'indexAPI', function ($scope, indexAPI) {
    $scope.tempTask = {};//用于编辑任务时数据临时存储
    $scope.tempTab = {};
    //获取指定类型的任务
    $scope.getTypeTaskList = function(type){
        if(type){
            indexAPI.getTypeTaskList({
                status: type
            })
                .$promise.then(function(data){
                $scope.allTasks = data;
            }, function(){

            })
        }else{
            $scope.allTasks = {};
        }
    };
    //检查任务名长度
    /*$scope.checkTaskName = function () {
        if($scope.newTask != null && $scope.newTask.length < 20){
            $scope.showError = false;
        }else{
            $scope.showError = true;
        }
    };*/
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
                _id: $scope.tempTask._id,
                name: $scope.tempTask.name,
                detail: $scope.tempTask.detail,
                status: $scope.tempTask.status
            }).$promise.then(function () {
                $('#addTask').modal('hide');
                $scope.getTypeTaskList($scope.tempTask.status);
            },function(){

            });
        }else{
            indexAPI.addTask({
                name: $scope.tempTask.name,
                detail: $scope.tempTask.detail,
                status: $scope.tempTask.status
            }).$promise.then(function () {
                $('#addTask').modal('hide');
                $scope.getTypeTaskList($scope.tempTask.status);
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
            _id: item._id
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
            _id: $scope.tempTask._id
        }).$promise.then(function(){
            $('#removeTask').modal('hide');
            $scope.tempTask = {};
            $scope.getTypeTaskList($scope.tempType);
        }, function(){

        })

    };
    $scope.getTabList = function(){
        indexAPI.getTabList()
            .$promise.then(function(data){
                $scope.tablist = data;
                if($scope.tablist.length <= 0){
                    $scope.addable = false;
                    $scope.tempType = '';
                }else{
                    $scope.addable = true;
                    $scope.tempType = $scope.tablist[0].value;
                }
                $scope.getTypeTaskList($scope.tempType);
            }, function(){
                $scope.addable = false;

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
        }, function(){

        })
    };

    $scope.saveEditTab = function(){
        if($scope.edit){
            indexAPI.updateTab({
                name: $scope.tempTab.name,
                value: $scope.tempTab.value
            }).$promise.then(function () {
                $('#addTab').modal('hide');
                $scope.getTabList();
            },function(){

            });
        }else{
            indexAPI.addTab({
                name: $scope.tempTab.name,
                value: $scope.tempTab.value
            }).$promise.then(function () {
                $('#addTab').modal('hide');
                $scope.getTabList();
            },function(){

            });
        }
    };

    //tab页添加active样式
    $scope.activeTab = function(item){
        if($scope.tempType){
            if(item.value == $scope.tempType){
                return 'active';
            }else{
                return '';
            }
        }
    }
    $scope.getTabList();
}])