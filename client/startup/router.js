import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//home
FlowRouter.route('/', {
    action() {
        BlazeLayout.render('layout', { main: 'home' });
    }
});

// project
//list of project
FlowRouter.route('/project', {
    action() {
        BlazeLayout.render('layout', { main: 'project_list' });
    }
});
// form to crate a project
FlowRouter.route('/project/create', {
    action() {
        BlazeLayout.render('layout', { main: 'project_create_form' });
    }
});
//page of the project
FlowRouter.route('/project/:projectId', {
    action() {
        BlazeLayout.render('layout', { main: 'project_page' });
    }
});
// form to edit a project
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

// annal
//an annal list of a course
FlowRouter.route('/cours/:section/:courseId/annal', {
    action() {
        BlazeLayout.render('layout', { main: 'course_page' });
    }
});
//form to create an annal
FlowRouter.route('/cours/:section/:courseId/annal/create', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_create_form' });
    }
});
//page of an annal
FlowRouter.route('/cours/:section/:courseId/annal/:annalId', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_page' });
    }
});
//form to edit an annal
FlowRouter.route('/cours/:section/:courseId/annal/:annalId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_edit_form' });
    }
});

//correction
//list of corrections of an annal
FlowRouter.route('/cours/:section/:courseId/annal/:annalId', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_page' });
    }
});
//form to create correction
FlowRouter.route('/cours/:section/:courseId/annal/:annalId/correction/create', {
    action() {
        BlazeLayout.render('layout', { main: 'correction_create_form' });
    }
});
//page of one correction
FlowRouter.route('/cours/:section/:courseId/annal/:annalId/correction/:correctionId', {
    action() {
        BlazeLayout.render('layout', { main: 'correction_page' });
    }
});
//form to edit a correction
FlowRouter.route('/cours/:section/:courseId/annal/:annalId/correction/:correctionId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'correction_edit_form' });
    }
});

// admin
FlowRouter.route('/admin', {
    action() {
        BlazeLayout.render('layout', { main: 'admin_page' });
    }
});