const shoes = {
    template: `
    <button ng-click="$ctrl.getShoes();">Get Shoes</button>
    <form ng-submit="$ctrl.postShoe($ctrl.newShoe);">
      <input type="text" ng-model="$ctrl.newShoe.brand" placeholder="Brand">
      <input type="text" ng-model="$ctrl.newShoe.size" placeholder="Size">
      <input type="text" ng-model="$ctrl.newShoe.color" placeholder="Color">
      <input type="text" ng-model="$ctrl.newShoe.price" placeholder="Price">
      <button>Add Shoe</button>
    </form>
    <p ng-repeat="shoe in $ctrl.shoeList track by $index">{{ shoe }}
      <button ng-click="$ctrl.deleteShoe($ctrl.shoeList[$index].id);">X</button>
    </p>
    
  `,
    controller: function($http) {
        const vm = this;
        vm.getShoes = () => {
            $http({
                url: "/api/shop/shoes",
                method: "GET"
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        vm.deleteShoe = (index) => {
            $http({
                url: "/api/shop/shoes/" + index,
                method: "DELETE"
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        vm.updateShoe = (index, newShoe) => {
            $http({
                url: "/api/shop/shoes/" + index,
                method: "PUT",
                data: newShoe
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        vm.postShoe = (newShoe) => {
            $http({
                url: "/api/shop/shoes/",
                method: "POST",
                data: newShoe
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
    }
}

angular
    .module("App")
    .component("shoes", shoes);