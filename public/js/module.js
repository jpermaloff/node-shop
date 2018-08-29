angular
  .module("App", ["ngRoute"])
  .config(($routeProvider) => {
    $routeProvider
      .when("/cart", {
        template: "<cart></cart>"
      })
  });