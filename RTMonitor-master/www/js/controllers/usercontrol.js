angular.module('bigred.controllers')
//Users Page Controller
.controller('UserCtrl', function($scope, UserStat) {
  var nousers = {
        chart: {
          renderTo: 'users',
          type: 'line',
          zoomType: 'x'

        },
        xAxis: {
          
          categories: []
            
        },
        title: {
          text: 'CPU/GPU Users'
        },
        yAxis:{
          title:{
            text:'Number of Users'
          }
        },
        series: [{
          name: 'CPU Users',
          lineWidth: 1,
          data: []
        },
        {
          name: 'GPU Users',
          lineWidth: 1,
          data: []
        }]
        
      };

      UserStat.query().$promise.then(function(data) {

        var str = data.others.tmstmp.slice();
        var year = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
        for(x in str){
          str[x] = "20"+str[x];
          str[x] = str[x].replace("-","T");
          for( y in str[x]){
            str[x] = str[x].replace("/","-");
          }
          str[x] = str[x].concat(":00Z");
          var d = new Date(str[x]);
          str[x] = d.getDate()+" "+year[d.getMonth()]+" "+('0'+d.getHours()).slice(-2)+":"+('0'+d.getMinutes()).slice(-2);
        }
        nousers.xAxis.categories = str;
        nousers.series[0].data = data.cpu.numberCPUUsers;
        nousers.series[1].data = data.gpu.numberGPUUsers;
        var userStatsChart = new Highcharts.Chart(nousers);

      }, function(error){
          console.log("Cannot get data from server:" + error);
      });
});
