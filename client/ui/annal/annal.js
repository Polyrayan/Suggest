import './annal.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Annals, Courses , Projects , Corrections , Tasks } from "../../../both";
Template.annal_list.onCreated(function () {
    this.subscribe('annals.list', FlowRouter.getParam('courseId'));
});
Template.annal_page.events({
    'click .js-goto-annal-list'() {
        FlowRouter.go("/courses/:section/:courseId/annals/", {
            section: FlowRouter.getParam('section'),
            courseId: FlowRouter.getParam('courseId')});
    }
});

Template.annal_create_form.events({
    'submit .js-create-annal'(event) {
        event.preventDefault();
        const type = event.target.type.value;
        const year = parseInt(event.target.year.value);
        const link = event.target.link.value;
        const course = FlowRouter.getParam("courseId");
        Meteor.call('insertAnnal', {type: type, year: year, link: link, course: course},
            function (error, result) {
                if (!error) {
                    event.target.year.value = '';
                    event.target.link.value = '';
                    FlowRouter.go("/courses/:section/:courseId/annals/:annalId", {
                        section: FlowRouter.getParam('section'),
                        courseId: FlowRouter.getParam('courseId'),
                        annalId: result
                    });
                }
            });
    }
});

Template.annal_edit_form.onCreated(function () {
    this.subscribe('annal.page', FlowRouter.getParam('annalId'));
});

Template.annal_edit_form.events({
    'submit .js-edit-annal'(event) {
        event.preventDefault();

        const type = event.target.type.value;
        const year = parseInt(event.target.year.value);
        const link = event.target.link.value;

        Meteor.call('updateAnnal', {type: type, year: year, link: link, annalId: FlowRouter.getParam('annalId')}
            , function (error) {
                if (!error) {
                    FlowRouter.go("/courses/:section/:courseId/annals/:annalId", {
                        section: FlowRouter.getParam('section'),
                        courseId: FlowRouter.getParam('courseId'),
                        annalId: FlowRouter.getParam('annalId'),
                    });
                }
            });
    },
    'click .js-delete-annal'() {
        const annalId = FlowRouter.getParam('annalId');
        Meteor.call('removeAnnal', annalId, function (error) {
            if (!error) {
                FlowRouter.go("/courses/:section/:courseId/annals/", {
                    section: FlowRouter.getParam('section'),
                    courseId: FlowRouter.getParam('courseId'),
                });
            }
        });
    },
    'click .js-goto-annal-page'(){
        return Meteor.myGlobalFunctions.gotoAnnalPage();
    }
});

Template.annal_page.onCreated(function (){
    this.subscribe('annal.page', FlowRouter.getParam('annalId'));
});

Template.annal_page.events({
    'click .js-goto-create-correction'() {
        Meteor.myGlobalFunctions.gotoCreateCorrection();
    }
});

Template.annal_single.helpers({
    nbCorrection(annalId){
        return Corrections.find({annalId: annalId}).fetch().length;
    }
});

Template.annal_single.events({
    'click .js-goto-create-correction'(event) {
        const route = '/courses/' + FlowRouter.getParam('section') + '/' + FlowRouter.getParam('courseId') + '/annals/' + $(event.currentTarget).val() + '/corrections/create';
        if (Meteor.myGlobalFunctions.isConnected()){
            FlowRouter.go(route);
        }
        else {
            Session.set('redirection', route);
            Modal.show('login_modal');
        }
    }
});