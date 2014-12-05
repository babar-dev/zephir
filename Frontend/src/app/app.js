angular.module( 'zephir', [
  'templates-app',
  'templates-common',
  'ui.router',
  'zephir.home',
  'zephir.settings',
  'zephir.stats'
])

.config(function AppConfig ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise( '/' );
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "home/home.tpl.html",
    controller: "HomeCtrl",
    controllerAs: "home"
  }).state('home.customer', {
    url: "customer/:id/",
    templateUrl: "customer/customer.tpl.html",
    controller: "CustomerCtrl",
    controllerAs: "ctm"
  }).state('home.customer.stats', {
    url: "stats",
    templateUrl: "stats/stats.tpl.html",
    controller: "StatsCtrl",
    controllerAs: "stat"
  })
  .state('home.customer.settings', {
    url: "settings",
    templateUrl: "settings/settings.tpl.html",
    controller: "SettingsCtrl",
    controllerAs: "setg"
  });
})

.run(function AppRun () {
})

.controller('AppCtrl', function AppCtrl (){
});
