import './task.html';
import {Tasks , Projects } from "../../../both";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

// problem async
var members = getProject();
console.log(getProject());

function getProject() {
    return Projects.findOne({_id : FlowRouter.getParam('projectId')});
}


function getTasks() {
    return Tasks.find({projectId : FlowRouter.getParam('projectId')}).fetch();
}

// recuperer le poids des taches de chaque membre
function getAllWeights(){
    for(i = 0 ; i < members.length; i++){
        members[i].difficulty = 0;
    }
    for(i = 0 ; i < getTasks().length; i++){
        for(let j = 0 ; j < members.length; j++){
            if(getTasks()[i].workerId === members[j]._id){
                members[j].difficulty += getTasks()[i].difficulty;
            }
        }
    }
    return members;
}

function weigthOfTasks(memberId){
    var weigth = 0;
    for(i = 0 ; i < getTasks().length; i++){
        if (getTasks()[i].workerId === memberId) {
            weigth += getTasks()[i].difficulty;
            console.log(weigth);
        }
    }
}

Template.task_form.events({
    'submit .js-create-task'(event, instance){
        event.preventDefault();
        const membersAndWeights = getAllWeights();
        console.log(getMembers());
        console.log(getTasks());
        const content = event.target.content.value;
        const workerId = "TODO";
        const difficulty = event.target.difficulty.value;
        // calculer workerId
        // si automatique
        // // calculer celui qui a la plus petite somme ( task x difficulty)

        Meteor.call('insertTask',{
            content : content ,
            workerId : workerId ,
            difficulty : difficulty ,
            projectId : FlowRouter.getParam('projectId')
        });
        event.target.content.value = "";
    }
});