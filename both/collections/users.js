Meteor.users.allow({
    remove: function(userId, doc) {
        return true;
    }
});