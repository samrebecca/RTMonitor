angular.module('bigred.controllers')
.controller('GPUCtrl', function($scope, GPUStat) {
   //GPU Nodes Graph for Number of GPU Nodes, Idle, Busy, Down and Running Nodes
      var gpunodes = {
        chart: {
          renderTo: 'gpunodesgraph',
          type: 'line',
          zoomType: 'x'
        },
        title: {
          text: 'GPU Nodes'
        },
        xAxis: {
          categories: []
        },
        yAxis:{
          title:{
            text: 'Number of GPU Nodes'
          }
        },
        series: [{
          name: 'Number of Running GPU Nodes',
          //showInLegend: true,
          lineWidth: 1,
          data: []
        },
        {
          name: 'Number of Busy GPU Nodes',
          //showInLegend: true,
          lineWidth: 1,
          data: []
        },
        {
          name: 'Number of Idle GPU Nodes',
          //showInLegend: true,
          lineWidth: 1,
          data: []
        },
        {
          name: 'Number of Down GPU Nodes',
          //showInLegend: true,
          lineWidth: 1,
          data: []
        },
        {
          name: 'Total Number of GPU Nodes',
          //showInLegend: true,
          lineWidth: 1,
          data: []
        }]
      };

      //Graph showing Number of GPU Users 
      var nogpuusers = {
        chart: {
          renderTo: 'rungpuusers',
          type: 'line',
          zoomType: 'x'

        },
        title:{
          text: 'GPU Users'
        },
        xAxis: {
          
          categories: []
            
        },
        yAxis:{
          title:{
            text:'Number of GPU Users'
          }
        },
        series: [{
          name: 'GPU Users',
          showInLegend: false,
          lineWidth: 1,
          data: []
        }]
      };


      //Graphs to view Running and Queued GPU Jobs
      var nogpujobs = {
        chart: {
          renderTo: 'gpujobs',
          type: 'line',
          zoomType: 'x'

        },
        title:{
          text: 'GPU Jobs Statistics'
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
      
      GPUStat.query().$promise.then(function(data) {


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
        gpunodes.xAxis.categories = str;
        gpunodes.series[0].data = data.runningGPUNodes;
        gpunodes.series[1].data = data.busyGPUNodes;
        gpunodes.series[2].data = data.idleGPUNodes;
        gpunodes.series[3].data = data.downGPUNodes;
        gpunodes.series[4].data = data.numberOfGPUNodes;
        var gpuNodesChart = new Highcharts.Chart(gpunodes);

        nogpuusers.xAxis.categories = str;
        nogpuusers.series[0].data = data.numberGPUUsers;
        var gpuUsersChart = new Highcharts.Chart(nogpuusers);

        nogpujobs.xAxis.categories = str;
        nogpujobs.series[0].data = data.queuedGPUJobs;
        nogpujobs.series[1].data = data.runningGPUJobs;
        var gpuJobsChart = new Highcharts.Chart(nogpujobs);

      });

})