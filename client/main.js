import {Projects , Comments } from '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './ui/globalHelpers';
import './startup/router';
import './ui/layout/layout';

if (Meteor.isDevelopment) {
    window.FlowRouter = FlowRouter;
    window.Projects = Projects;
    window.Comments = Comments;
}