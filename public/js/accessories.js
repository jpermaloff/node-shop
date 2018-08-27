"use strict"
const accessories = {
// This template is setting up the view. The four inputs have ng-models that specify which key each input is adding to/updating.
// The ng submit on the form is responsible for creating the new accessory object that then gets added to the accessoryList array (hence no ng-click is needed on the add accessory button).
// Inside the p tag, we are ng-repeating all of the accessories in the accessory list and tracking them by index so that we can later access that index number when we click on the update or delete button for a given item
template: `
  <button ng-click="$ctrl.getAccessories();">Get Accessories</button>
  <form ng-submit="$ctrl.postAccessory($ctrl.newAccessory);">
    <input type="text" ng-model="$ctrl.newAccessory.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newAccessory.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newAccessory.material" placeholder="Material">
    <input type="text" ng-model="$ctrl.newAccessory.price" placeholder="Price">
    <button>Add Accessory</button>
  </form>
  <p ng-repeat="accessory in $ctrl.accessoriesList track by $index">{{ accessory }}
    <button ng-click="$ctrl.deleteAccessory($ctrl.accessoriesList[$index].id);">X</button>
    <button ng-click="$ctrl.updateAccessory($ctrl.accessoriesList[$index].id, $ctrl.newAccessory);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;
    // the getAccessories method is making a request to get the data from our accessorries.js route. The data is then being set equal to a variable vm.accessories list that is referenced in the template above
    vm.getAccessories = () => {
     $http({
        url: "/api/shop/accessories",
        method: "GET"                 
     }).then((response) => {
        vm.accessoriesList = response.data;         
     })
    }
   // the deleteAccessory method is making receiving an updated array after the item to be deleted is spliced 
    vm.deleteAccessory = function (index) {
        $http({
            url: "/api/shop/accessories/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.accessoriesList = response.data;
        })                
    }
      // the updateAccessory method is receiving an updated array after the values of an object's keys have been updated  
    vm.updateAccessory = (index, newAccessory) => {
        $http({
            url: "/api/shop/accessories/" + index,
            method : "PUT",
            data: newAccessory                                
        }).then((response) => { 
            vm.accessoriesList = response.data                                          
        });                                                                
    }        
// the postAccessory method is receiving an updated array after a new object is added
    vm.postAccessory = (newAccessory) => {
        $http({
            url: "api/shop/accessories/",
            method: "POST",
            data: newAccessory                                                                                                                        
        }).then((response) => {
            vm.accessoriesList = response.data;                        
        });                
    }
  }
}

angular.module("App").component("accessories", accessories);