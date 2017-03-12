/**
 * Created by hzlty on 2017/3/2.
 */
angular.module('progressApp',['ngResource']).factory('indexAPI', ['$resource', function($resource){
    return $resource('', {}, {
        getTypeTaskList: {
            url: '/getTypeTaskList',
            method: 'GET',
            param: {
                status: ''
            },
            isArray: true //返回来的是array类型
        },
        checkTask: {
            url: '/checkTask',
            method: 'GET',
            param: {
                taskName: ''
            }
        },
        addTask: {
            url: '/addTask',
            method: 'POST',
            param: {
                taskName: '',
                detail: '',
                status: ''
            }
        },
        updateTask: {
            url: '/updateTask',
            method: 'POST',
            param: {
                taskName: '',
                detail: '',
                status: ''
            }
        },
        deleteTask: {
            url: '/deleteTask',
            method: 'POST',
            param: {
                taskName: ''
            }
        }
    });
}]);