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
                _id: ''
            }
        },
        addTask: {
            url: '/addTask',
            method: 'POST',
            param: {
                name: '',
                detail: '',
                status: ''
            }
        },
        updateTask: {
            url: '/updateTask',
            method: 'PUT',
            param: {
                _id: '',
                name: '',
                detail: '',
                status: ''
            }
        },
        deleteTask: {
            url: '/deleteTask',
            method: 'POST',
            param: {
                _id: ''
            }
        },
        getTabList: {
            url: '/getTabList',
            method: 'GET',
            isArray: true
        },
        checkTab: {
            url: '/checkTab',
            method: 'GET',
            param: {
                value: ''
            }
        },
        addTab: {
            url: '/addTab',
            method: 'POST',
            param: {
                name: '',
                value: ''
            }
        },
        updateTab: {
            url: '/updateTab',
            method: 'PUT',
            param: {
                name: '',
                value: ''
            }
        },
        deleteTab: {
            url: '/deleteTab',
            method: 'POST',
            param: {
                value: ''
            }
        },
    });
}]);