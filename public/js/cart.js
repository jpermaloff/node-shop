"use strict"
const cart = {
template: `
<section class="getBtn">
  <button ng-click="$ctrl.getAllItems();">Get Items</button>
  </section>
  <form ng-submit="$ctrl.postCartItem($ctrl.newItem);">
    <input type="text" ng-model="$ctrl.newItem.product" placeholder="product">
    <input type="text" ng-model="$ctrl.newItem.price" placeholder="Price">
    <input type="text" ng-model="$ctrl.newItem.quantity" placeholder="Quantity">
    <button>Add Item</button>
  </form>
  <p ng-repeat="item in $ctrl.shoppingCart track by $index">{{ item }}
    <button ng-click="$ctrl.deleteCartItem($ctrl.shoppingCart[$index].id);">X</button>
    <button ng-click="$ctrl.updateCartItem($ctrl.shoppingCart[$index].id, $ctrl.newItem);">Update</button>
  </p>
  `,
  controller: function($http) {
    const vm = this;

    vm.getAllItems = () => {
     $http({
        url: "/api/shop/cart",
        method: "GET"                 
     }).then((response) => {
        vm.shoppingCart = response.data;         
     })
    }

    vm.deleteCartItem = function (index) {
        $http({
            url: "/api/shop/cart/" + index,
            method: "DELETE"
        }).then(function (response) {
            vm.shoppingCart = response.data;
        })                
    }

    vm.updateCartItem = (index, newItem) => {
        $http({
            url: "/api/shop/cart/" + index,
            method : "PUT",
            data: newItem                                
        }).then((response) => { 
            vm.shoppingCart = response.data                                          
        });                                                                
    }        

    vm.postCartItem = (newItem) => {
        $http({
            url: "api/shop/cart/",
            method: "POST",
            data: newItem                                                                                                                        
        }).then((response) => {
            vm.shoppingCart = response.data;                        
        });                
    }
  }
}

angular.module("App")
.component("cart", cart);