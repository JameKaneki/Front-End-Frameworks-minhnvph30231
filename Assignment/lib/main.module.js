

const app = angular.module("myapp",["ngRoute"]);

app.config(($routeProvider) => {
  $routeProvider
  // .when('/home',{
  //   templateUrl: 'views/home.html'
  // })
  // .when("/albums",{
  //   templateUrl : 'views/albums.html',
  //   controller: albumsController,
  // })
  // .when("comments", {
  //   templateUrl: 'views/comments.html',
  //   controller: commentsController
  // })
  .when("/users", {
    templateUrl: 'views/users.html',
    controller: usersController
  })
  .when("/users/:id", {
    templateUrl: 'views/userDetail.html',
    controller: userDetailController
  })
})


