import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//home
FlowRouter.route('/', {
    action() {
        BlazeLayout.render('layout', { main: 'home' });
    }
});

// project
//list of projects
FlowRouter.route('/projects', {
    action() {
        BlazeLayout.render('layout', { main: 'project_list' });
    }
});

FlowRouter.route('/projects/page/:page', {
    action() {
        BlazeLayout.render('layout', { main: 'project_list' });
    }
});
// form to crate a project
FlowRouter.route('/projects/create', {
    action() {
        BlazeLayout.render('layout', { main: 'project_create_form' });
    }
});
//page of the project
FlowRouter.route('/projects/:projectId', {
    action() {
        BlazeLayout.render('layout', { main: 'project_page' });
    }
});
// form to edit a project
FlowRouter.route('/projects/:projectId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'project_edit_form' });
    }
});

// task
FlowRouter.route('/projects/:projectId/tasks/:taskId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'task_edit_form' });
    }
});

// course
FlowRouter.route('/courses/:section', {
    action() {
        BlazeLayout.render('layout', { main: 'course_list' });
    }
});

// annal
//an annal list of a course
FlowRouter.route('/courses/:section/:courseId/annals', {
    action() {
        BlazeLayout.render('layout', { main: 'course_page' });
    }
});
//form to create an annal
FlowRouter.route('/courses/:section/:courseId/annals/create', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_create_form' });
    }
});
//page of an annal
FlowRouter.route('/courses/:section/:courseId/annals/:annalId', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_page' });
    }
});
//form to edit an annal
FlowRouter.route('/courses/:section/:courseId/annals/:annalId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_edit_form' });
    }
});

//correction
//list of corrections of an annal
FlowRouter.route('/courses/:section/:courseId/annals/:annalId', {
    action() {
        BlazeLayout.render('layout', { main: 'annal_page' });
    }
});
//form to create correction
FlowRouter.route('/courses/:section/:courseId/annals/:annalId/corrections/create', {
    action() {
        BlazeLayout.render('layout', { main: 'correction_create_form' });
    }
});
//page of one correction
FlowRouter.route('/courses/:section/:courseId/annals/:annalId/corrections/:correctionId', {
    action() {
        BlazeLayout.render('layout', { main: 'correction_page' });
    }
});
//form to edit a correction
FlowRouter.route('/courses/:section/:courseId/annals/:annalId/corrections/:correctionId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'correction_edit_form' });
    }
});

// admin
FlowRouter.route('/admin/sections/', {
    action() {
        BlazeLayout.render('layout', { main: 'admin_page' });
    }
});

FlowRouter.route('/admin/sections/:section/courses', {
    action() {
        BlazeLayout.render('layout', { main: 'admin_course_list' });
    }
});

FlowRouter.route('/admin/sections/:section/courses/:courseId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'course_edit_form' });
    }
});

FlowRouter.route('/admin/sections/:section/courses/:courseId/edit', {
    action() {
        BlazeLayout.render('layout', { main: 'course_edit_form' });
    }
});