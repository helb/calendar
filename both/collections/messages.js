Messages = new Meteor.Collection("messages", {
    schema: new SimpleSchema({
        text: {
            type: String
        },
        user: {
            type: String
        },
        timestamp: {
            type: Date
        }
    })
});

Messages.allow({
    insert: function (userId, doc) {
        return !!userId;
    },
    update: function (userId, doc, fields, modifier) {
        if (userId === "E3JQT68t6a7BAYYng") {
                return true;
        }
        return false;
    },
    remove: function (userId, doc) {
        if (userId === "E3JQT68t6a7BAYYng") {
                return true;
        }
        return false;
    }
});