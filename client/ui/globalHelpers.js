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
    return  Projects.findOne({_id : FlowRouter.getParam('projectId')}).members;
});

// use the @param section to @return all courses of this section
Template.registerHelper('courses',function (section) {
    return Courses.find({'section': section}).fetch();
});