Template.menu.helpers({
  activeRoute: function(name) {
    if(Router.current().route.getName() == name){
      return true;
    } else {
      return false;
    }
  }
});

Template.menu.events({
  'click #menu-logout': function(event) {
    Meteor.logout();
    Router.go('login');
  },

  'click #menu-user': function(event) {
    Router.go('change-password');
  }
});
