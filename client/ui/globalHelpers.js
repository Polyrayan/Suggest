import moment from 'moment';
import {Courses} from "../../both";
Template.registerHelper('getDisplayDateTime', function (date) {
    return   moment(date).format('DD/MM/YYYY à HH:mm');
});

Template.registerHelper('getFullUserName', function(userId){
   let user = Meteor.users.findOne({_id : userId});
   if(user && user.profile){
       return user.profile.firstName +' '+ user.profile.name;
   }
});

Template.registerHelper('getUserSection', function(){
    let user = Meteor.users.findOne({_id : Meteor.userId()});
    if( user && user.profile){
        return user.profile.section;
    }
});

Template.registerHelper('getUserId', function(userId){
    if(Meteor.userId()){
        return Meteor.userId();
    }
});

Template.registerHelper('getStringMembersOfThisProject', function(projectId){
    const members = Projects.findOne({_id : projectId}).members;
    for (i = 0 ; i < members.length ; i++){
        let user = Meteor.users.findOne({_id : members[i]});
        if(user && user.profile){
            members[i] = user.profile.firstName +' '+ user.profile.name + ' ' ;
        }
    }
    return members;
});

Template.registerHelper('getMembersOfThisProject', function(){
    return  Meteor.myGlobalFunctions.getMembersOfThisProject();
});

// use the @param section to @return all courses of this section
Template.registerHelper('courses',function (section) {
    return Courses.find({'section': section}).fetch();
});
// use the @param section to @return all courses of this section in which students have to do a Projects
Template.registerHelper('coursesWithProjects',function (section) {
    return Courses.find({'section': section , 'project' : true}).fetch();
});

// get tasks which have this @param projectId
Template.registerHelper('getNbTasksOfThisProject', function (projectId) {
   return Meteor.myGlobalFunctions.getNbTasksOfThisProject(projectId);
});

Template.registerHelper('getNbCompletedTasksOfThisProject', function (projectId) {
    return Meteor.myGlobalFunctions.getNbCompletedTasksOfThisProject(projectId);
});