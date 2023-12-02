const initUserInfo = {
  id: null,
  name: '',
  email: '',
  address: {},
  company: {}
}
window.userDetailController = function($scope,$http,$location){
  const apiLink = `http://localhost:3000/users`
  $scope.data = initUserInfo

  const getPath = () => {
    const urlSpread = $location.url().split('/')
    const id = urlSpread[urlSpread.length - 1]
    if (id) {
      $http.get(`${apiLink}/${id}`)
      .then(res => {
        $scope.data = res.data
        console.log(res.data)
      })
    }
  }
  $scope.title = 'User Detail abc'
  getPath()

}