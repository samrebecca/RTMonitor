angular.module('bigred.controllers')
.controller('CPUCtrl', function($scope, CPUStat) {
      
      //CPU Nodes Graph for Number of CPU Nodes, Idle, Busy, Down and Running Nodes
      var cpunodes = {
        chart: {
          renderTo: 'cpunodesgraph',
          type: 'line',
          zoomType: 'x'
        },
        title: {
          text: 'CPU Nodes'
        },
        xAxis: {
          categories: []
        },
        yAxis:{
          title:{
            text: 'Number of CPU Nodes'
          }
        },
        series: [{
          name: 'Number of Running CPU Nodes',
          lineWidth: 1,
          data: []
        },
        {
          name: 'Number of Busy CPU Nodes',
          lineWidth: 1,
          data: []
        },
        {
          name: 'Number of Idle CPU Nodes',
          lineWidth: 1,
          data: []
        },
        {
          name: 'Number of Down CPU Nodes',
          lineWidth: 1,
          data: []
        },
        {
          name: 'Total Number of CPU Nodes',
          lineWidth: 1,
          data: []
        }]
      };

      //Graph to show number of CPU Users
      var nocpuusers = {
        chart: {
          renderTo: 'cpuusers',
          type: 'line',
          zoomType: 'x'

        },
        title:{
          text: 'CPU Users'
        },
        xAxis: {
          
          categories: []
            
        },
        yAxis:{
          title:{
            text:'Number of CPU Users'
          }
        },
        series: [{
          name: 'CPU Users',
          showInLegend: false,
          lineWidth: 1,
          data: []
        }]
      };

      //Graph to show Running and Queued CPU Jobs
      var nocpujobs = {
        chart: {
          renderTo: 'cpujobs',
          type: 'line',
          zoomType: 'x'

        },
        title:{
          text: 'CPU Jobs Statistics'
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
          lineWidth: 1,
          data: []

        },
        {
          name: 'Running Jobs',
          lineWidth: 1,
          data: []
        }]
        
      };

      //Puts data into graph options variable 'cpunodes'
      CPUStat.query().$promise.then(function(data) {




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

        // Load module after Highcharts is loaded
        cpunodes.xAxis.categories = str;
        cpunodes.series[0].data = data.runningCPUNodes;
        cpunodes.series[1].data = data.busyCPUNodes;
        cpunodes.series[2].data = data.idleCPUNodes;
        cpunodes.series[3].data = data.downCPUNodes;
        cpunodes.series[4].data = data.numberOfCPUNodes;
        var cpuNodesChart = new Highcharts.Chart(cpunodes);

        nocpuusers.xAxis.categories = str;
        nocpuusers.series[0].data = data.numberCPUUsers;
        var cpuUsersGraph = new Highcharts.Chart(nocpuusers);

        nocpujobs.xAxis.categories = str;
        nocpujobs.series[0].data = data.queuedCPUJobs;
        nocpujobs.series[1].data = data.runningCPUJobs;
        var cpuJobsGraph = new Highcharts.Chart(nocpujobs);
      });
});
