"use strict"
const clothes = {
// This template is setting up the view. The four inputs have ng-models that specify which key each input is adding to/updating.
// The ng submit on the form is responsible for creating the new udatedItem object that then gets added to the clothesList array (hence no ng-click is needed on the add item button).
// Inside the p tag, we are ng-repeating all of the items in the clothesList array and tracking them by index so that we can later access that index number when we click on the update or delete button for a given item
template: `
  <button ng-click="$ctrl.getClothes();">Get Clothes</button>
  <form ng-submit="$ctrl.postItem($ctrl.newItem);">
    <input type="text" ng-model="$ctrl.newItem.brand" placeholder="Brand">
    <input type="text" ng-model="$ctrl.newItem.type" placeholder="Type">
    <input type="text" ng-model="$ctrl.newItem.material" placeholder="Material">
    <input type="text" ng-model="$ctrl.newItem.price" placeholder="Price">
    <button>Add Item</button>
  </form>
  <p ng-repeat="item in $ctrl.clothesList track by $index">{{ item }}
    <button ng-click="$ctrl.deleteItem($ctrl.clothesList[$index].id);">X</button>
    <button ng-click="$ctrl.updateItem($ctrl.clothesList[$index].id, $ctrl.newItem);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;
    // the getClothes method is making a request to get the data from our accessorries.js route. The data is then being set equal to a variable vm.accessories list that is referenced in the template above
    vm.getClothes = () => {
     $http({
        url: "/api/shop/clothes",
        method: "GET"                 
     }).then((response) => {
        vm.clothesList = response.data;         
     })
    }
    // the deleteItem method is receiving an updated array after the item to be deleted is spliced
    vm.deleteItem = function (index) {
        $http({
            url: "/api/shop/clothes/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.clothesList = response.data;
        })                
    }
    // the updateItem method is receiving an updated array after the values of an object's keys have been updated
    vm.updateItem = (index, newItem) => {
        $http({
            url: "/api/shop/clothes/" + index,
            method : "PUT",
            data: newItem                                
        }).then((response) => { 
            vm.clothesList = response.data                                          
        });                                                                
    }        
// the postItem method is receiving an updated array after a new object is added
    vm.postItem = (newItem) => {
        $http({
            url: "api/shop/clothes/",
            method: "POST",
            data: newItem                                                                                                                        
        }).then((response) => {
            vm.clothesList = response.data;                        
        });                
    }
  }
}

angular.module("App").component("clothes", clothes);