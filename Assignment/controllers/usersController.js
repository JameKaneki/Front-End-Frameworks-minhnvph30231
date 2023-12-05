const userValidate = (userInfo) => {
  let isClean = true
  const errors = {}
  Object.keys(userInfo).forEach((field) => {
    if (userInfo[`${field}`]?.trim() === '') {
      errors[`${field}`] = `${field} should not required`
      isClean = false
    }
  })
  return {
    isClean,
    errors
  }
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

  $scope.errors = {}

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
  }

  $scope.handleOnSubmit = () => {
    const { isClean, errors } = userValidate($scope.userInfo) 
    if ( !isClean ) {
      $scope.errors = errors
    } else {
      $http.post(apiLink,{
        ...$scope.userInfo
      })
      .then(res => {
        if(res.status = 200) {
          alert('add successfully')
          $scope.onCloseProp()
          $scope.userInfo = {}
          $scope.errors = {}
        }
      })
    }
    // validate data first 
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
    const { isClean, errors } = userValidate($scope.userInfo)
    if ( !isClean ) {
      $scope.errors = errors
    } else {
      $http.patch(`${apiLink}/${id}`, $scope.userInfo)
      .then(res => {
        if (res.status === 200) {
          alert('edit successfully')
          $scope.errors = {}
        } else {
          alert(`Bad request check your data`)
        }
      })
    }
  }
  getData()
}