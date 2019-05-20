import './course.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Annals, Courses , Projects , Corrections , Tasks } from "../../../both";

Template.course_list.onCreated(function () {
    this.subscribe('courses.list', FlowRouter.getParam('section'));
});

Template.course_list.helpers({
    courses(){
        return Courses.find({ section : FlowRouter.getParam('section') }).fetch();
    }
});

Template.course_single.helpers({
    containsAnnals(courseId){
        return !!Annals.findOne({course: courseId});
    }
});

Template.course_single.events({
    'click .js-goto-filter-project'(event) {
        event.preventDefault();
        FlowRouter.go('/projects');
    }
});

Template.course_page.helpers({
    nbAnnals(){
        return Annals.find({course: FlowRouter.getParam('courseId')}).fetch().length;
    }
});

Template.course_page.events({
    'click .js-goto-create-annal'(){
        const route = '/courses/' + FlowRouter.getParam('section') + '/' + FlowRouter.getParam('courseId') + '/annals/create';
        if (Meteor.myGlobalFunctions.isConnected()) {
            FlowRouter.go(route);
        }
        else {
            Session.set('redirection', route);
            Modal.show('login_modal');
        }    }
});

Template.course_page.helpers({
    admin(){
        return Meteor.user().profile.admin === true;
    }
});

Template.course_create_form.events({
    'submit .js-create-course'(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const section = FlowRouter.getParam('section');
        const semester = parseInt(event.target.semester.value);
        let project = (event.target.project.value === "yes");

        Meteor.call('insertCourse', {id: name, section: section, project: project, semester: semester},
            function (error) {
                if (!error) {
                    event.target.name.value = '';
                    event.target.project.value = '';
                    event.target.semester.value = '';
                    FlowRouter.go('/admin/sections/:section/courses',{section : FlowRouter.getParam('section')});
                }
            });
    }
});
Template.course_edit_form.onCreated(function () {
    this.subscribe('course.edit', FlowRouter.getParam('courseId'));
});

Template.course_edit_form.events({
    'submit .js-edit-course'(event) {
        event.preventDefault();

        const name = event.target.name.value;
        const section = FlowRouter.getParam('section');
        const semester = parseInt(event.target.semester.value);
        let project = (event.target.project.value === "yes");

        Meteor.call('updateCourse', {id: name, section: section, project: project, semester: semester}
            , function (error, result) {
                if (!error) {
                    FlowRouter.go('/admin/sections/:section/courses',{section : FlowRouter.getParam('section')});
                }
            });
    },
    'click .js-goto-admin-section'(){
        if(Meteor.myGlobalFunctions.isAdmin()){
            FlowRouter.go('/admin/sections/:section/courses',{section : FlowRouter.getParam('section')});
        }else{
            FlowRouter.go('/');
        }
    }
});

Template.course_edit_form.helpers({
    course(){
        return Courses.findOne({_id : FlowRouter.getParam('courseId')});
    },
    admin(){
        return Meteor.user().profile.admin === true;
    }
});