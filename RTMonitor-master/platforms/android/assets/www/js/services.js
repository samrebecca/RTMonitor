angular.module('bigred.services', ['ngResource'])

.factory('Stats', function ($resource) {
    return $resource('http://q1.sca.iu.edu:8080/overView',{}, {'query': {method: 'GET', isArray: false }});
})
.factory('CPUStats', function($resource){
	return $resource('http://q1.sca.iu.edu:8080/readStat', {}, {'query': {method: 'GET', isArray: false }});
})
.factory('UserData', function($resource){
	return $resource('http://localhost:5000/overview', {}, {'query': {method: 'GET', isArray: false }});
})
.factory('Motd', function($resource){
	return $resource('http://q1.sca.iu.edu:8080/readMotd', {}, {'query': {method: 'GET', isArray: false }});
})
.factory('UserStat', function($resource){
	return $resource('http://q1.sca.iu.edu:8080/readUserStat', {}, {'query': {method: 'GET', isArray: false }});
})
.factory('CPUStat', function($resource){
	return $resource('http://q1.sca.iu.edu:8080/readCPUStat', {}, {'query': {method: 'GET', isArray: false }});
})
.factory('GPUStat', function($resource){
	return $resource('http://q1.sca.iu.edu:8080/readGPUStat', {}, {'query': {method: 'GET', isArray: false }});
})
.factory('JobStat', function($resource){
	return $resource('http://q1.sca.iu.edu:8080/readJobStat', {}, {'query': {method: 'GET', isArray: false }});
});