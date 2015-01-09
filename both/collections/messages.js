Messages = new Meteor.Collection("messages", {
    schema: new SimpleSchema({
        text: {
            type: String
        },
        user: {
            type: String
        },
        timestamp: {
            type: Date
        }
    })
});

Messages.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc, fields, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return false;
    }
});