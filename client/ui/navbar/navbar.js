import './navbar.html'; 

Template.navbar.events({
    'click .js-open-login-modal'(event, instance) {
        Modal.show('login_modal')
    },
    'click .js-logout'(event, instance) {
        Meteor.logout();
    },
    'click .js-goto-create-project'(event, instance) {
        FlowRouter.go('/project/create');
    }
});

Template.login_modal.onCreated(function () {
    this.autorun(() => {
        if (Meteor.userId()) {
            Modal.hide('login_modal');
        }
    });
});