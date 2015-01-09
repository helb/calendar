Template.chat.helpers({
  name: function(userId){
    return userId;
  },
  messages: function(){
    return Messages.find({}, {sort: {timestamp: -1}});
  },
  date: function(timestamp){
    return moment(timestamp).calendar();
  }
});

Template.chat.events({
  'keydown #chatmessage' : function(event) {
    if (event.type === 'keydown' && event.which === 13) { // 13 == enter
      if (event.currentTarget.value.replace(/\s/g, '').length){
      Messages.insert({user: Meteor.user()._id, text: event.currentTarget.value, timestamp: new Date()});

      // reset:
      event.currentTarget.value = "";
      event.currentTarget.focus();
      }
    }
  }
});

Template.chat.rendered = function() {
  if(!this._rendered) {
    this._rendered = true;
    document.getElementById("chatmessage").placeholder="Napiš zprávu a odešli Enterem";
  }
}