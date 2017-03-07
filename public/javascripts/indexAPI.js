/**
 * Created by hzlty on 2017/3/2.
 */
angular.module('progressApp',['ngResource']).factory('indexAPI', ['$resource', function($resource){
    return $resource('', {}, {
        getAllTask: {
            url: '/getAllTask',
            method: 'GET'
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