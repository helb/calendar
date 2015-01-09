Meteor.startup(function() {
  return Meteor.methods({
    cleanChat: function() {
      return Messages.remove({});
    },
  });
});