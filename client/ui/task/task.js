import './task.html';

import {Tasks , Projects } from "../../../both";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.task_form.events({
    'submit .js-create-task'(event, instance){
        event.preventDefault();
        if(Session.get('showManualForm')){
            const bestMemberFound = event.target.manualChoice.value;
            const content = event.target.content.value;
            const difficulty = parseInt(event.target.difficulty.value);
            Meteor.call('insertTask',{
                content : content ,
                workerId : bestMemberFound ,
                difficulty : difficulty ,
                creatorId : Meteor.userId(),
                projectId : FlowRouter.getParam('projectId'),
                completed : false
            });
        }else{
            const bestMemberFound = Meteor.myGlobalFunctions.getBestMemberToAssignItNewTask(FlowRouter.getParam('projectId'));
            const content = event.target.content.value;
            const difficulty = parseInt(event.target.difficulty.value);
            Meteor.call('insertTask',{
                content : content ,
                workerId : bestMemberFound ,
                difficulty : difficulty ,
                creatorId : Meteor.userId(),
                projectId : FlowRouter.getParam('projectId'),
                completed : false
            });
        }
        event.target.content.value = "";

    },'click .js-checkbox-manual-form'(){
        if(Session.get('showManualForm')){
            Session.set('showManualForm', false);
        }else{
            Session.set('showManualForm', true);
        }
    },
});

Template.task_list.helpers({
    tasks(memberId){
        return Tasks.find({ workerId : memberId }).fetch();
    }
});

Template.task_manual.helpers({
    showManualForm(){
        return Session.get('showManualForm');
    }
});

Template.task_edit_form.events({
    'submit .js-edit-task'(event){
        event.preventDefault();
        const content = event.target.content.value;
        const difficulty = parseInt(event.target.difficulty.value);
        const workerId = event.target.workerId.value;
        let completed = false;

        if (event.target.completed.value === "yes") {
            completed = true;
        }

        Meteor.call('updateTask',{
                content: content,
                difficulty: difficulty,
                workerId: workerId,
                completed: completed,
                taskId : FlowRouter.getParam('taskId'),
                projectId : FlowRouter.getParam('projectId')
            }
            ,function (error, result) {
                if(!error){
                    FlowRouter.go('/project/:projectId' , {projectId : FlowRouter.getParam('projectId')});
                }else{
                    console.log(error);
                }
            });
    },
    'click .js-delete-task'(){
        Meteor.call('removeTask', FlowRouter.getParam('taskId'), function (error , result){
            if(!error){
                FlowRouter.go('/project/:projectId' , {projectId : FlowRouter.getParam('projectId')});
            }
        });
    },
});

Template.task_edit_form.helpers({
    task() {
        return Tasks.findOne({_id : FlowRouter.getParam('taskId')});
    },
});