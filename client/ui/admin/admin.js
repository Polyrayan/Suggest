import './admin.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Annals, Courses , Projects , Corrections , Tasks } from "../../../both";

Template.admin_course_list.onCreated(function () {
    this.subscribe('admin.course.list', FlowRouter.getParam('section'));
});

Template.admin_course_single.onCreated(function () {
    this.subscribe('courses.list', FlowRouter.getParam('section'));
});

Template.admin_page.helpers({
    admin(){
        return Meteor.user().profile.admin === true;
    }
});

Template.admin_page.events({
    'click .js-goto-admin-ig3'(event){
        event.preventDefault();
        if (Meteor.user().profile.admin){
            FlowRouter.go('/admin/sections/IG3/courses');
        }else{
            FlowRouter.go('/');
        }
    },
    'click .js-goto-admin-ig4'(event){
        event.preventDefault();
        if (Meteor.user().profile.admin){
            FlowRouter.go('/admin/sections/IG4/courses');
        }else{
            FlowRouter.go('/');
        }
    },
    'click .js-goto-admin-ig5'(event){
        event.preventDefault();
        if (Meteor.user().profile.admin){
            FlowRouter.go('/admin/sections/IG5/courses');
        }else{
            FlowRouter.go('/');
        }
    },
});

Template.admin_course_list.helpers({
    courses() {
        return Courses.find().fetch();
    },admin(){
        return Meteor.user().profile.admin === true;
    }
});

Template.admin_course_single.events({
    'click .js-edit-course'(event){
        event.preventDefault();
        const courseId = $(event.currentTarget).val();
        if (Meteor.user().profile.admin){
            FlowRouter.go('/admin/sections/:section/courses/:courseId/edit',{
                section : FlowRouter.getParam('section'),
                courseId : courseId
            });
        }else{
            FlowRouter.go('/');
        }
    },
    'click .js-delete-course'(event){
        event.preventDefault();
        const courseId = $(event.currentTarget).val();
        if (Meteor.user().profile.admin){
            Meteor.call('removeCourse', courseId, function (error) {
                if(!error){
                    FlowRouter.go('/admin/sections/:section/courses/',{section : FlowRouter.getParam('section')});
                }
            });
        }
    }
});