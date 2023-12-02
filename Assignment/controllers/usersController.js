const initUserInfo = {
  id: null,
  name: '',
  email: '',
  address: {},
  company: {}
}

window.usersController = function($scope,$http){
  $scope.title = "student"
  const apiLink = `http://localhost:3000/users`
  const getData = () => {
    $http
  .get(apiLink)
  .then(req => {
    if(req.status === 200) {
      $scope.users = req.data
    }
  })
  }

  $scope.PropStatus = 'hidden'

  $scope.onOpenProp = () => {
    $scope.PropStatus = 'block'
  }

  $scope.onCloseProp = () => {
    $scope.PropStatus = 'hidden'
  }
  // user info
  $scope.userInfo = initUserInfo

  $scope.onAddUser = () => {
    $scope.onOpenProp()
    $scope.userInfo = initUserInfo
    console.log(initUserInfo)
  }

  $scope.handleOnSubmit = (event) => {
    // validate data first 
    $http.post(apiLink,{
      ...$scope.userInfo
    })
    .then(res => {
      if(res.status = 200) {
        alert('add successfully')
        $scope.onCloseProp()
        $scope.userInfo = {}
      }
    })
  }

  $scope.onEditingUserInfo = (data) => {
    $scope.userInfo = data
    $scope.onOpenProp()
  }

  $scope.handleRemoveUserAction = (id) => {
    $http.delete(`${apiLink}/${id}`)
    .then(res => {
      if(res.status === 200) {
        alert('removed user')
      } else {
        alert(`Internal server`)
      }
    })
  }

  $scope.handleEditUserAction = (id) => {
    $http.patch(`${apiLink}/${id}`, $scope.userInfo)
    .then(res => {
      if (res.status === 200) {
        alert('edit successfully')
      } else {
        alert(`Bad request check your data`)
      }
    })
  }
  getData()
}