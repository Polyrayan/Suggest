import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


FlowRouter.route('/', {
    action() {
        BlazeLayout.render('layout', { main: 'home' });
    }
});

FlowRouter.route('/project/create', {
    action() {
        BlazeLayout.render('layout', { main: 'project_create_form' });
    }
});

FlowRouter.route('/project/:projectId', {
    action() {
        BlazeLayout.render('layout', { main: 'project_page' });
    }
});

FlowRouter.route('/project/:projectId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'project_edit_form' });
    }
});