angular
  .module("App", ["ngRoute"])
  .config(($routeProvider) => {
    $routeProvider
      .when("/shoes", {
        template: "<shoes></shoes>"
      })
      .when("/clothes", {
        template: "<clothes></clothes>"
      })
      .when("/accessories", {
        template: "<accessories></accessories>"
      })
  });