nameFromId = function(userId) {
  return Meteor.users.find({
    _id: userId
  }).fetch()[0].profile.name;
}

userColorFromId = function(userId) {
  return Meteor.users.find({
    _id: userId
  }).fetch()[0].profile.color;
}
