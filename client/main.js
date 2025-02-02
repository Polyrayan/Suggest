import {Projects , Tasks , Courses , Annals , Corrections  } from '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import './ui/globalHelpers';
import './ui/globalFunctions';
import './startup/router';
import './ui/layout/layout';

if (Meteor.isDevelopment) {
    window.FlowRouter = FlowRouter;
    window.Projects = Projects;
    window.Tasks = Tasks;
    window.Courses = Courses;
    window.Annals = Annals;
    window.Corrections = Corrections;
}