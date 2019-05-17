import {Projects , Tasks , Courses , Annals , Corrections  } from '../../both';

Meteor.myMethodFunctions = {
    isConnected : function(){
        if (!Meteor.userId()){
            throw new Meteor.Error('User-not-connected',"user must be connected to do this");
        }
    },
    isAuthorizedToDeleteProject : function (projectId) {
        let projectFound = Projects.findOne({_id: projectId});
        if(!projectFound.ownerId !== Meteor.userId()){
            throw new Meteor.Error('User-not-authorized',"user must be the owner of the project to do this");
        }
    },
    isAuthorizedToEditAnnal : function(annalId){
        let annalFound = Annals.findOne({_id: annalId});
        if (!annalFound.creatorId === Meteor.userId() && !Meteor.myGlobalFunctions.isAdmin()){
            throw new Meteor.Error('User-not-authorized',"user must be an admin or at least the owner of the annal");
        }
    },
    isAuthorizedToEditCorrection : function(correctionId){
        let correctionFound = Corrections.findOne({_id: correctionId});
        if(!correctionFound.creatorId === Meteor.userId() && !Meteor.myGlobalFunctions.isAdmin()){
            throw new Meteor.Error('User-not-authorized',"user must be an admin or at least the owner of the annal");
        }
    },
    isMemberOfThisProject : function(projectId){
        let projectFound = Projects.findOne({_id: projectId});
        let members = projectFound && projectFound.members;
        let userId = Meteor.userId();
        let isMember = false;
        for (let i = 0 ; i < members.length; i++){
            if(members[i] === userId){
                isMember = true;
            }
        }
        if(!isMember){
            throw new Meteor.Error('User-not-authorized',"user must be a member of the project to do this");
        }
    }
};

