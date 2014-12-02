angular.module( 'zephir', [
  'templates-app',
  'templates-common',
  'ui.router'
])

.config(function AppConfig ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise( '/' );
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "home/home.tpl.html",
    controller: "HomeCtrl",
    controllerAs: "home"
  }).state('home.stats', {
    url: "/stats",
    templateUrl: "stats/stats.tpl.html",
    controller: "StatsCtrl",
    controllerAs: "stat"
  })
  .state('home.settings', {
    url: "/settings",
    templateUrl: "settings/settings.tpl.html",
    controller: "SettingsCtrl",
    controllerAs: "setg"
  });
})

.run(function AppRun () {
})

.controller('AppCtrl', function AppCtrl (){
});
