angular.module('progressApp').controller('progressCtrl',['$scope', 'indexAPI', function ($scope, indexAPI) {
    /*$scope.allTasks = [];*/
    $scope.editable = false;
    $scope.tempTask = {};//用于编辑任务时数据临时存储
    $scope.index = -1;
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
        /*$scope.allTasks.push({id: $scope.id, taskName: $scope.newTask, taskTime: new Date(), isFinished: false});
        $scope.id += 1;
        $scope.newTask = '';
        $scope.isAllFinished();*/
        console.log($scope.new);
        indexAPI.addTask({
            taskName: $scope.taskName,
            detail: $scope.taskDetail,
            status: $scope.taskStatus
        }).$promise.then(function (data) {
            console.log(data);
            $('#addTask').modal('hide');
        },function(/*data*/){
            /*console.log(data.data.error);*/
        });
    };
    //查看任务
    $scope.check = function(index){
        indexAPI.checkTask({
            taskName: $scope.allTasks[index].name
        }).$promise.then(function(data){
            console.log(data);
            $scope.taskName = data.name;
            $scope.taskDetail = data.detail;
            $scope.taskStatus = data.status;
        }, function(){

        })
    }
    //编辑任务
    $scope.editTask = function (index) {
        /*$scope.tempTask.taskName = $scope.allTasks[index].taskName;
        $scope.index = index;*/
        indexAPI.updateTask({
            taskName: $scope.taskName,
            detail: $scope.taskDetail,
            status: $scope.taskStatus
        })
    };
    //更新任务
    $scope.updateTask = function () {
        if($scope.allTasks[$scope.index].taskName != $scope.tempTask.taskName){
            $scope.allTasks[$scope.index].taskName = $scope.tempTask.taskName;
            $scope.allTasks[$scope.index].taskTime = new Date();
        }
    };
    //确认是否删除任务
    $scope.isRemoveTask = function ($index) {
        $scope.tempTask.taskName = $scope.allTasks[$index].taskName;
        $scope.index = $index;
    };
    //删除任务
    $scope.removeTask = function () {
        $scope.allTasks.splice($scope.index, 1);

    };
    //删除所有任务
    $scope.removeAllTasks = function () {
        $scope.allTasks = [];
        $scope.finishAll = false;
    };
    //计算全部任务的数量
    $scope.countAll = function () {
        return $scope.allTasks.length;
    };
    //计算未完成任务的数量
    $scope.countUnfinished = function () {
        var count = 0;
        angular.forEach($scope.allTasks, function(task){
            if(!task.isFinished){
                count += 1;
            }
        });
        return count;
    };
    //计算已完成任务的数量
    $scope.countFinished = function () {
        var count = 0;
        angular.forEach($scope.allTasks, function(task){
            if(task.isFinished){
                count += 1;
            }
        });
        return count;
    };
    //标记全部为已完成
    $scope.finishAllTask = function () {
        if($scope.finishAll){
            angular.forEach($scope.allTasks, function(task){
                if(task.isFinished){
                    task.beforeIsFinished = true;
                }
                task.isFinished = true;
            });
        }else{
            angular.forEach($scope.allTasks, function(task){
                if(task.beforeIsFinished){
                    task.isFinished = true;
                }else{
                    task.isFinished = false;
                }
                delete task.beforeIsFinished;
            });
        }
    };
    //检验是否全部已完成
    $scope.isAllFinished = function () {
        if($scope.countUnfinished() > 0){
            $scope.finishAll = false;
        }else{
            $scope.finishAll = true;
        }
    };
    $scope.hasTask = function () {
        if($scope.allTasks.length <= 0){
            return false;
        }else {
            return true;
        }
    };

    $scope.getTypeTaskList(0);
}])