import { Meteor } from 'meteor/meteor';

import '../both';

//to deny update of users because we could still edit it even if the package insecure has been deleted
Meteor.users.deny({
    update(){ return true;}
});

Meteor.startup(() => {
  // code to run on server at startup
});