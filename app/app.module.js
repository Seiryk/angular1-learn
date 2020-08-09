angular.module('TodoApp', ['ngComponentRouter', 'Login', 'Main'])
.config(function($locationProvider) {
  $locationProvider.html5Mode(false);
})
.value('$routerRootComponent', 'app')
.constant('userName', 'USER')
.factory('store', ['$window', function ($window) {
  return {
    set(key, val) {
      $window.localStorage.setItem(key, JSON.stringify(val))
    },
    get(key) {
      const val = $window.localStorage.getItem(key);
      return val ? JSON.parse(val) : val
    },
    remove(key) {
      if (key) $window.localStorage.removeItem(key);
      else localStorage.clear();
    },
  }
}])
.factory('authUtils', [
  'store', 'userName', '$rootRouter',
  function (store, userName, $rootRouter) {
  return {
    authCheck() {
      const userData = store.get(userName)
        if (userData) $rootRouter.navigate(['Main'])
        else $rootRouter.navigate(['Login'])
    },
    logOut() {
      const userData = store.remove(userName)
      $rootRouter.navigate(['Login'])
    },
    logIn(userObj = {}) {
      const users = store.get('USERS') || [];
      const isExist = users.some(el => el.email === userObj.email)

      if (isExist) {
        store.set('USER', userObj);
        $rootRouter.navigate(['Main'])
        return true;
      } else return false;
    },
    SignUp(userObj = {}) {
      const users = store.get('USERS') || [];
      const isExist = users.some(el => el.email === userObj.email)

      if (isExist) return false
      store.set('USER', userObj);
      store.set('USERS', [...users, userObj]);
      $rootRouter.navigate(['Main'])
      return true
    },
  }
}])

.component('app', {
  templateUrl: 'app.html',
  $routeConfig: [
    {path: '/login', name: 'Login', component: 'login'},
    {path: '/main', name: 'Main', component: 'main'}
  ]
});