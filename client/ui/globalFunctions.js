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
    isAuthorizedToEditAnnal : function(annalId){
        let annalFound = Annals.findOne({_id: annalId});
        return !!(annalFound.creatorId === Meteor.userId() || Meteor.myGlobalFunctions.isAdmin());
    },
    isAuthorizedToEditCorrection : function(){
        let correctionFound = Corrections.findOne({_id: FlowRouter.getParam('correctionId')});
        let creatorId = correctionFound && correctionFound.creatorId;
        return !!(creatorId === Meteor.userId() || Meteor.myGlobalFunctions.isAdmin());
    },
    //Project
    getProjectOfThisPage: function () {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    },
    getProjectWithId : function (projectId) {
        return  Projects.findOne({_id : projectId});
    },
    deleteElementFromArray : function(element,array){
        for(i = 0 ; i < array.length; i++){
            if(array[i] === element){
                array.splice(i,1);
            }
        }
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
    getBestMemberToAssignItNewTask : function(projectId){
        const members = Meteor.myGlobalFunctions.getMembersOfThisProject();
        let taskMinFound = -1;
        let BestUserFound = undefined;
        // for each member of this project
        for (i = 0; i < members.length; i++) {
            let sumTasks = 0;
            let TasksOfThisMember = Meteor.myGlobalFunctions.getTasksOfThisMemberOfThisProject(projectId, members[i]);
            if (TasksOfThisMember) {
                let j = 0;
                //for each task of this member
                for (j = 0; j < TasksOfThisMember.length; j++) {
                    sumTasks += TasksOfThisMember[j].difficulty;
                }
            }
            if (BestUserFound === undefined || taskMinFound > sumTasks) {
                BestUserFound = members[i];
                taskMinFound = sumTasks;
            }
        }
        return BestUserFound;
    },
    // Corrections
    getCorrectionsOfThisAnnal : function(){
        return  Corrections.find({annalId : FlowRouter.getParam('annalId')}).fetch();
    },
    getCorrection : function(){
        return Corrections.findOne({_id : FlowRouter.getParam('correctionId')});
    },
    getNbLike : function(correctionId){
        const correctionFound = Corrections.findOne({correctionId : correctionId});
        return correctionFound && correctionFound.like.membersId.length;
    },
    getNbDislike : function(correctionId){
        const correctionFound = Corrections.findOne({correctionId : correctionId});
        return correctionFound && correctionFound.dislike.membersId.length;
    },
    gotoAnnalPage : function () {
        FlowRouter.go("/courses/:section/:courseId/annals/:annalId", {
            section: FlowRouter.getParam('section'),
            courseId: FlowRouter.getParam('courseId'),
            annalId: FlowRouter.getParam('annalId'),
        });
    },
    gotoCorrectionPage : function () {
        FlowRouter.go("/courses/:section/:courseId/annals/:annalId/corrections/:correctionId", {
            section: FlowRouter.getParam('section'),
            courseId: FlowRouter.getParam('courseId'),
            annalId: FlowRouter.getParam('annalId'),
            correctionId: FlowRouter.getParam('correctionId'),
        });
    },
    gotoCreateCorrection : function () {
        const route = '/courses/' + FlowRouter.getParam('section') + '/' + FlowRouter.getParam('courseId') + '/annals/' + FlowRouter.getParam('annalId') + '/corrections/create';
        if (Meteor.myGlobalFunctions.isConnected()) {
            FlowRouter.go(route);
        }
        else {
            Session.set('redirection', route);
            Modal.show('login_modal');
        }
    },
    gotoEditCorrection : function () {
        if (Meteor.myGlobalFunctions.isAuthorizedToEditCorrection()) {
            FlowRouter.go("/courses/:section/:courseId/annals/:annalId/corrections/:correctionId/edit", {
                section: FlowRouter.getParam('section'),
                courseId: FlowRouter.getParam('courseId'),
                annalId: FlowRouter.getParam('annalId'),
                correctionId: FlowRouter.getParam('correctionId'),
            });
        }
        else {
            throw Meteor.errorMessage('unauthorized');
        }
    },
    getMembersWhoLiked : function(){
        const correctionFound = Corrections.findOne({_id : FlowRouter.getParam('correctionId')});
        return  correctionFound && correctionFound.like && correctionFound.like.membersId;
    },
    getMembersWhoDisliked : function(){
        const correctionFound = Corrections.findOne({_id : FlowRouter.getParam('correctionId')});
        return  correctionFound && correctionFound.dislike && correctionFound.dislike.membersId;
    },
    userAlreadyLikedCorrection : function () {
        const userId = Meteor.userId();
        const membersWhoLiked = Meteor.myGlobalFunctions.getMembersWhoLiked();
        let alreadyLiked = false;
        for (let i = 0; i < membersWhoLiked.length ; i++){
            if (membersWhoLiked[i] === userId){
                alreadyLiked = true;
            }
        }
        return alreadyLiked
    },
    userAlreadyDislikedCorrection : function () {
        const userId = Meteor.userId();
        const membersWhoDisliked = Meteor.myGlobalFunctions.getMembersWhoDisliked();
        let alreadyDisliked = false;
        for (let i = 0; i < membersWhoDisliked.length ; i++){
            if (membersWhoDisliked[i] === userId){
                alreadyDisliked = true;
            }
        }
        return alreadyDisliked
    }

};