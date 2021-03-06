requireLogin = function() {
    if (!Meteor.userId()) {
        Router.go('login');
        pause();
    }
}

Router.configure({
    trackPageView: true
});

Router.route('/login', function() {
    this.render('login');
});

Router.route('/user-settings', function() {
    onBeforeAction: requireLogin();
    this.render('user_settings');
});

Router.route('/messages', function() {
    onBeforeAction: requireLogin();
    this.render('messages');
});

Router.route('/calendar', function() {
    onBeforeAction: requireLogin();
    this.render('calendar');
});

Router.route('/notes', function() {
    onBeforeAction: requireLogin();
    this.render('notes');
});

Router.route('/', function() {
    Router.go('calendar');
});
