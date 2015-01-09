Template.chat.helpers({
  name: function(userId) {
    return Meteor.users.find({_id: userId}).fetch()[0].profile.name;
  },
  messages: function() {
    return Messages.find({}, {
      sort: {
        timestamp: -1
      }
    });
  },
  date:   function(timestamp) {
    return moment(timestamp).calendar();
  },
  color: function(userId) {
    if (userId == "axcZ8cvRQvYnSxDLi") {
      return "yellow";
    } else {
      return "teal";
    }
  },
  isMyMessage: function(userId) {
    if(Meteor.userId() == userId){
      return true;
    } else {
      return false;
    }
  }
});

Template.chat.events({
  'click #btn-save-message': function(event) {
    Messages.insert({
      user:  Meteor.user()._id,
      text: $("#frm-message").val(),
      timestamp: new Date()
    });

    // reset:
    $("#frm-message").val("");
  }
});