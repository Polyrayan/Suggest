import {Projects, Tasks , Annals , Courses , Corrections} from "../../both";

Meteor.myGlobalFunctions = {
    // User
    isAdmin : function () {
        const user = Meteor.users.findOne({_id : Meteor.userId()});
        return !!(user && user.profile && user.profile.admin);
    },
    isConnected : function () {
      return !!Meteor.userId();
    },
    getUser : function () {
        return Meteor.user();
    },

    //Project
    getProjectOfThisPage: function () {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    },
    getProjectWithId : function (projectId) {
        return  Projects.findOne({_id : projectId});
    },
    getMembersOfThisProject : function(){
        let project = Projects.findOne({_id : FlowRouter.getParam('projectId')});
        return project && project.members;
    },
    getAnnalsOfThisCourse : function(){
        return  Annals.find({course : FlowRouter.getParam('courseId')}).fetch();
    },
    getNbTasksOfThisProject : function(projectId){
        return Tasks.find({projectId : projectId }).fetch().length;
    },
    getNbCompletedTasksOfThisProject : function(projectId){
        return Tasks.find({projectId : projectId, completed : true}).fetch().length;
    },


    // Task
    getTasksOfThisMemberOfThisProject : function (projectId,userId) {
        return Tasks.find({projectId : projectId, workerId : userId}).fetch();
    },
    // find the member who has the least task to do ( tasks x difficulties)
    getBestMemberToAssignItNewTask(projectId){
        const members = Meteor.myGlobalFunctions.getMembersOfThisProject();
        let taskMinFound = -1;
        let BestUserFound = undefined;
        // for each member of this project
        console.log("nb membre " + members.length);
        for (i = 0; i < members.length; i++) {
            let sumTasks = 0;
            let TasksOfThisMember = Meteor.myGlobalFunctions.getTasksOfThisMemberOfThisProject(projectId, members[i]);
            if (TasksOfThisMember) {
                let j = 0;
                //for each task of this member
                console.log("nb tache de " + members[i] + " : " + TasksOfThisMember.length);
                for (j = 0; j < TasksOfThisMember.length; j++) {
                    sumTasks += TasksOfThisMember[j].difficulty;
                    console.log("sumTasks " + sumTasks);
                }
            }
            console.log(sumTasks);
            if (BestUserFound === undefined || taskMinFound > sumTasks) {
                BestUserFound = members[i];
                console.log("New BestUser " + BestUserFound);
                taskMinFound = sumTasks;
            }
        }
        return BestUserFound;
    }

};