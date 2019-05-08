import './project.html';
import {Projects} from "../../../both";

Template.project_create_form.events({
    'submit .js-create-project'(event , instance){
        event.preventDefault();

        const title = event.target.title.value;

        let projectDoc = {
            title: title,
            createdAt: new Date(),
            ownerId: Meteor.userId()
        };

        Projects.insert(projectDoc);
        event.target.title.value = '';
    }
});

Template.project_list.helpers({
    projects(){
        return Projects.find().fetch();
    }
});

Template.project_page.helpers({
    project() {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    }
});

Template.project_edit_form.helpers({
    project() {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    }
});

Template.project_edit_form.events({
    'submit .js-edit-project'(event, instance){
        event.preventDefault();

        const title = event.target.title.value;

        Projects.update({_id : FlowRouter.getParam('projectId')}, { $set: {title: title}});

        FlowRouter.go('/project/:projectId' , {projectId : FlowRouter.getParam('projectId')});
    },
    'click .js-delete-project'(event , instance){
        Projects.remove({_id : FlowRouter.getParam('projectId')});

        FlowRouter.go('/');
    }
});