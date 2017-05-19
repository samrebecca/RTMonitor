angular.module('bigred.controllers')
//Jobs Page Controller  
.controller('JobCtrl', function($scope, JobStat) {
      var runjobs = {
        chart: {
          renderTo: 'runningjobs',
          type: 'line',
          zoomType: 'x'

        },
        title:{
          text:'Running Jobs'
        },
        xAxis: {
          
          categories: []
            
        },
        yAxis:{
          title:{
            text:'Number of Jobs'
          }
        },
        series: [{
          name:'Running Jobs',
          showInLegend: false,
          lineWidth: 1,
          data: []
        }]
        
      };

       var qjobs = {
        chart: {
          renderTo: 'queuedjobs',
          type: 'line',
          zoomType: 'x'

        },
        title:{
          text:'Queued Jobs'
        },
        xAxis: {
          
          categories: []
            
        },
        yAxis:{
          title:{
            text:'Number of Jobs'
          }
        },
        series: [{
          name: 'Queued Jobs',
          showInLegend: false,
          lineWidth: 1,
          data: []
        }]
        
      };

      JobStat.query().$promise.then(function(data) {

        var str = data.tmstmp.slice();
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
        runjobs.xAxis.categories = str;
        runjobs.series[0].data = data.runningJobs;
        var runningJobsChart = new Highcharts.Chart(runjobs);

        qjobs.xAxis.categories = str;
        qjobs.series[0].data = data.queuedJobs;
        var queuedJobsChart = new Highcharts.Chart(qjobs);
      });

});