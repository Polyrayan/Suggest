import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


FlowRouter.route('/', {
    action() {
        BlazeLayout.render('layout', { main: 'home' });
    }
});
// project
FlowRouter.route('/project', {
    action() {
        BlazeLayout.render('layout', { main: 'project_list' });
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

// task
FlowRouter.route('/project/:projectId/task/:taskId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'task_edit_form' });
    }
});

// course
FlowRouter.route('/cours/:section', {
    action() {
        BlazeLayout.render('layout', { main: 'course_list' });
    }
});
// admin
FlowRouter.route('/admin', {
    action() {
        BlazeLayout.render('layout', { main: 'admin_page' });
    }
});