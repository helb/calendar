Meteor.startup(function() {
  return Meteor.methods({
    cleanMessages: function() {
      return Messages.remove({});
    },
    cleanNotes: function() {
      return Notes.remove({});
    },
  });
});