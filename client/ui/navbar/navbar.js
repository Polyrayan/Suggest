import './navbar.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.navbar.onCreated(function () {
    this.subscribe('navbar');
});

Template.navbar.events({
    'click .js-open-login-modal'() {
        Modal.show('login_modal')
    },
    'click .js-logout'() {
        Meteor.logout();
    },
    'click .js-goto-create-project'() {
        if (Meteor.myGlobalFunctions.isConnected()){
            FlowRouter.go('/projects/create');
        }else{
            Session.set('redirection', '/projects/create');
            Modal.show('login_modal');
        }
    },
    'click .js-goto-my-courses'() {
        console.log("ok");
        if (Meteor.myGlobalFunctions.isConnected()){
            FlowRouter.go('/courses/'+Meteor.myGlobalFunctions.getUser().profile.section);
        }else{
            Modal.show('login_modal');
        }
    },
    'click .js-goto-project-list'() {
        if (Meteor.myGlobalFunctions.isConnected()){
            FlowRouter.go('/projects/');
        }else{
            Session.set('redirection', '/projects');
            Modal.show('login_modal');
        }
    },
    'click .js-goto-admin-page'() {
        if (Meteor.user().profile.admin === true){
            FlowRouter.go('/admin/sections/');
        }
    }
});

Template.navbar.helpers({
   admin(){
       return Meteor.user() && Meteor.user().profile && Meteor.user().profile.admin;
   }
});

Template.login_modal.onCreated(function () {
    this.autorun(() => {
        if (Meteor.userId()) {
            Modal.hide('login_modal');
            if (Session.get('redirection')){
                FlowRouter.go(Session.get('redirection'));
                Session.set('redirection',undefined);
            }
        }
    });
});