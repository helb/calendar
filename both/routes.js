Router.route('/login', function () {
  this.render('login');
});

Router.route('/messages', function () {
  this.render('messages');
});

Router.route('/calendar', function () {
  this.render('calendar');
});

Router.route('/', function () {
  Router.go('calendar');
});