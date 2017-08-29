angular.module('myApp')
.service('UsersService', ['$http', function($http) {

  function goHome(){
      return $http.get('/api/home')
      .then( allImages => {
        console.log('this is from our service ', allImages);
        return allImages.data;
      });
  }

function Login(){
  return $http.get('/api/login')
  .then(allUsers=>{
    return allUsers.data;
  });

  function Register(){
    return $http.post('/api/register')
    .then(Users=>{

    });
  }
}
  // function getAllUsers(){
  //   return $http.get('/api/users')
  //   .then((users) => {
  //     //console.log(users);
  //     return users;
  //   })
  // }

  // function getUserAndMessages(userId){
  //   //console.log('userId in GUAM: ', userId);
  //   return $http.get('/api/users/'+ userId)
  //   .then((user) => {
  //     //console.log('in getUserAndMessages:', user);
  //     return user;
  //   })
  // }

  // function createNewUser(newUser){
  //   return $http.post('/api/users', newUser)
  //   .then((user) => {
  //     //console.log('in services.js:', user.data);
  //     return user.data;
  //   })
  // }


  return {
    goHome: goHome,
    Login: Login,
    Register: Register
  };
}]);