Template.messages.helpers({
  name: function(userId) {
    return nameFromId(userId);
  },
  messages: function() {
    return Messages.find({
      visible: {
        $ne: false
      }
    }, {
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
    if (Meteor.userId() == userId) {
      return true;
    } else {
      return false;
    }
  }
});

Template.messages.events({
  'click #btn-save-message': function(event) {
    Messages.insert({
      user:  Meteor.user()._id,
      text: $("#frm-message").val(),
      timestamp: new Date()
    });

    // reset:
    $("#frm-message").val("");
  },

  'click .btn-remove-message': function(event) {
    var id = event.currentTarget.attributes['data-message'].value;
    Messages.update({
      _id: id
    }, {
      $set:  {
        visible:  false
      }
    });
  }
});