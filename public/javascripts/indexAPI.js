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
                id: ''
            }
        },
        addTask: {
            url: '/addTask',
            method: 'POST',
            param: {
                id: '',
                taskName: '',
                detail: '',
                status: ''
            }
        },
        updateTask: {
            url: '/updateTask',
            method: 'POST',
            param: {
                id: '',
                taskName: '',
                detail: '',
                status: ''
            }
        },
        deleteTask: {
            url: '/deleteTask',
            method: 'POST',
            param: {
                id: ''
            }
        }
    });
}]);