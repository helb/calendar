requireLogin = function() {
    if (!Meteor.userId()) {
        Router.go('login');
    }
}

Router.route('/login', function() {
    this.render('login');
});

Router.route('/change-password', function() {
    onBeforeAction: requireLogin();
    this.render('change-password');
});

Router.route('/messages', function() {
    onBeforeAction: requireLogin();
    this.render('messages');
});

Router.route('/calendar', function() {
    onBeforeAction: requireLogin();
    this.render('calendar');
});

Router.route('/', function() {
    Router.go('calendar');
});
