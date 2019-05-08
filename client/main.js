import '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './startup/router';
import './ui/layout/layout';

if (Meteor.isDevelopment) {
    window.FlowRouter = FlowRouter;
}