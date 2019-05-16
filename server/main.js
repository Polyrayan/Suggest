import { Meteor } from 'meteor/meteor';

import '../both';

//To forbid users from making any modifications to their user document:
Meteor.users.deny({
    update(){ return true;}
});

Meteor.startup(() => {
  // code to run on server at startup
});