import moment from 'moment';
Template.registerHelper('getDisplayDateTime', function (date) {
    return   moment(date).format('DD/MM/YYYY à HH:mm');
});

Template.registerHelper('getFullUserName', function(userId){
   let user = Meteor.users.findOne({_id : userId});
   if(user && user.profile){
       return user.profile.firstName +' '+ user.profile.name;
   }
});

Template.registerHelper('getSection', function(userId){
    let user = Meteor.users.findOne({_id : userId});
    if(user && user.profile){
        return user.profile.section;
    }
});
/*
Template.registerHelper('getMembersOfThisProject', function(projectId){
    var myMembers = "";
    const members = Projects.findOne({_id : projectId}).members;
    for (i = 0 ; i < members.length ; i++){
        let user = Meteor.users.findOne({_id : members[i]});
        if(user && user.profile){
            myMembers = myMembers + user.profile.firstName +' '+ user.profile.name + ' ' ;
        }
    }
    return myMembers;
});
*/

Template.registerHelper('getMembersOfThisProject', function(projectId){
    const members = Projects.findOne({_id : projectId}).members;
    for (i = 0 ; i < members.length ; i++){
        let user = Meteor.users.findOne({_id : members[i]});
        if(user && user.profile){
            members[i] = user.profile.firstName +' '+ user.profile.name + ' ' ;
        }
    }
    return members;
});