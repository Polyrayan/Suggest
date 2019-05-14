Meteor.myMethodFunctions = {
    isConnected : function(){
        console.log();
        if (!Meteor.userId()){
            throw new Meteor.Error('User-not-connected',"user must be connected to do this");
        }
    },
    isAuthorizedToDeleteProject : function (projectId) {
        let projectFound = Projects.findOne({_id: projectId});
        if(!projectFound.ownerId !== Meteor.userId()){
            throw new Meteor.Error('User-not-authorized',"user must be the owner of the project to do this");
        }
    },isMemberOfThisProject : function(projectId){
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

