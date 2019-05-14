import './navbar.html'; 
import '../globalFunctions';
Template.navbar.events({
    'click .js-open-login-modal'() {
        Modal.show('login_modal')
    },
    'click .js-logout'() {
        Meteor.logout();
    },
    'click .js-goto-create-project'() {
        if (Meteor.myGlobalFunctions.isConnected()){
            FlowRouter.go('/project/create');
        }else{
            Session.set('redirection', '/project/create');
            Modal.show('login_modal');
        }
    },
    'click .js-goto-my-courses'() {
        if (Meteor.myGlobalFunctions.isConnected()){
            FlowRouter.go('/cours/'+Meteor.myGlobalFunctions.getUser().profile.section);
        }else{
            Modal.show('login_modal');
        }
    },

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