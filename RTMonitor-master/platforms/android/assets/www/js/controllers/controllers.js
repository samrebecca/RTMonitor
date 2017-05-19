angular.module('bigred.controllers', ['bigred.services'])

.controller('AppCtrl', function($scope, $ionicModal, $cordovaInAppBrowser, $window, Stats, Motd) {

   $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });
  
   $scope.openModal = function() {
      $scope.modal.show();
      Motd.query().$promise.then(function(data){
       
        $scope.motd = data.motd;
      });

   };
  
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
  
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
  
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
  
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });

   $scope.openCas = function() {

      var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no',
      location: 'no',
      closebuttoncaption: 'Back',
      hardwareback: 'no'
      };
     $cordovaInAppBrowser.open('http://rtstats-devel.uits.indiana.edu/user/baoyu', '_blank', options)



      .then(function(event) {
       
          
      })
    
      .catch(function(event) {
         // error
      });
    };


  $scope.openBrowser = function() {
      var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
      };
      $cordovaInAppBrowser.open('http://status.uits.iu.edu', '_blank', options)
    
      .then(function(event) {
         // success
      })
    
      .catch(function(event) {
         // error
      });
   };

  $scope.doRefresh = function() {
      var result = Stats.query();       
      result.$promise.then(function(data){
        $scope.setOverviewStyle(result);
      
      }).finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
     });
  };

  $scope.setOverviewStyle = function(result){
        result.cpu["downpercent"] = Math.round((result.cpu.downCPUNodes[0]/result.cpu.numberOfCPUNodes[0]) * 100);
        result.cpu["busypercent"] = Math.round((result.cpu.busyCPUNodes[0]/result.cpu.numberOfCPUNodes[0]) * 100);
        result.cpu["idlepercent"] = 100 - (result.cpu["downpercent"] + result.cpu["busypercent"] );
        result.gpu["downpercent"] = Math.round((result.gpu.downGPUNodes/result.gpu.numberOfGPUNodes) * 100);
        result.gpu["busypercent"] = Math.round((result.gpu.busyGPUNodes/result.gpu.numberOfGPUNodes) * 100);
        result.gpu["idlepercent"] = 100 - (result.gpu["downpercent"] + result.gpu["busypercent"] );
        result.jobs["runningpercent"] = Math.round((result.jobs.runningJobs/(result.jobs.runningJobs[0]+ result.jobs.queuedJobs[0])) * 100);
        result.jobs["queuedpercent"] = Math.round((result.jobs.queuedJobs/(result.jobs.runningJobs[0]+ result.jobs.queuedJobs[0])) * 100);
        
        
        if(result.others.usersOnLogin1[0]<20){
          $scope.userStyle = {
          "width" : "35%",
          "padding-left": "5px"
          };
        }else{
           $scope.userStyle = {
            "width" : Number(result.others.usersOnLogin1[0] + 15) + "%",
            "padding-left": "5px"
            };
        }
        if(result.cpu["downpercent"] <26){
         
          $scope.cpuDownStyle = {
          "width" :  "26%",
          "padding-left": "5px"
          };

        }else
        {
          $scope.cpuDownStyle = {
          "width" : result.cpu["downpercent"] +"%"
          }; 
        }
       
        if(result.cpu["busypercent"]<20){
          $scope.cpuBusyStyle = {
          "width" :  "20%",
          "padding-left": "10px"
        };
        }
        else
          if(result.cpu["busypercent"]>=26 && result.cpu["busypercent"]<=46){
             $scope.cpuBusyStyle = {
                "width" :  "46%",
                "padding-left": "10px"
              };
          }
        else{
           $scope.cpuBusyStyle = {
            "width" : result.cpu["busypercent"] + "%"
            };
        }
        if(result.cpu["idlepercent"] <26){
         
          $scope.cpuIdleStyle = {
          "width" :  "26%",
          "padding-left": "5px"
          };

        }else
        {
          $scope.cpuIdleStyle = {
          "width" : result.cpu["idlepercent"] +"%"
          }; 
        }

        if(result.gpu["downpercent"] <26){
         
          $scope.gpuDownStyle = {
          "width" :  "26%",
          "padding-left": "5px"
          };

        }else
        {
          $scope.gpuDownStyle = {
          "width" : result.gpu["downpercent"] + "%"
          }; 
        }
        if(result.gpu["busypercent"] <20){
         
          $scope.gpuBusyStyle = {
          "width" :  "20%",
          "padding-left": "10px"
          };

        }
        else
          if(result.gpu["busypercent"]>=26 && result.gpu["busypercent"]<=46){
             $scope.gpuBusyStyle = {
                "width" :  "46%",
                "padding-left": "10px"
              };
          }
        else
        {
          $scope.gpuBusyStyle = {
          "width" : result.gpu["busypercent"] + "%"
          }; 
        }

        if(result.gpu["idlepercent"] <26){
         
          $scope.gpuIdleStyle = {
          "width" :  "26%",
          "padding-left": "5px"
          };

        }else
        {
          $scope.gpuIdleStyle = {
          "width" : result.gpu["idlepercent"] +"%"
          }; 
        }

        if(result.jobs["runningpercent"] <= 20){
          $scope.runningJobsStyle = {
          "width" :  "30%",
          "padding-left": "5px"
        };
        }
        else{
          $scope.runningJobsStyle = {
          "width" : result.jobs["runningpercent"] + "%",
          "padding-left": "5px"
          };
        }
        if(result.jobs["queuedpercent"] <= 20){
          $scope.queuedJobsStyle = {
          "width" :  "30%"
          
        };
        }
        else{
           $scope.queuedJobsStyle = {
          "width" : result.jobs["queuedpercent"] + "%"
            };
        }

       $scope.stats = result;   
  }
 
})


.controller('StatsCtrl', function($scope, Stats) {       
        $scope.doRefresh();
})

.controller('UserDataCtrl', function($scope, UserData) {       
        
        var hpsscount = 0, rfscount = 0, homecount = 0, dc2count = 0;
        var hpssstorage = 0, rfsstorage = 0, homestorage = 0, dc2storage = 0;
        var result = UserData.query();    
        result.$promise.then(function(data){
           
            for(var i=data.storage.length -1 ; i>= 0;i-- ){
              if(data.storage[i].system == "hpss" && data.storage["hpsscount"] == undefined){
                data.storage["hpsscount"] =  data.storage[i].files;
                data.storage["hpssstorage"] = Math.round(Number(data.storage[i].gigabytes));
              }
                
              if(data.storage[i].system == "DC2" && data.storage["dc2count"] == undefined){
                data.storage["dc2count"] = data.storage[i].files;
                data.storage["dc2storage"] =  Math.round(Number(data.storage[i].gigabytes));
              }
              if(data.storage[i].system == "home_directory" && data.storage["homestorage"] == undefined){
                data.storage["homecount"] = data.storage[i].files;
                data.storage["homestorage"] = Math.round(Number(data.storage[i].gigabytes));
              }
              if(data.storage[i].system == "rfs" && data.storage["rfscount"] == undefined){
                data.storage["rfscount"] = data.storage[i].files;
                data.storage["rfsstorage"] = Math.round(Number(data.storage[i].gigabytes));
              }
                
            }
           
            $scope.userdata = data;        
      })
})
