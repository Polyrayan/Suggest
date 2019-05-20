import moment from 'moment';
import {Projects, Tasks , Annals , Courses , Corrections} from "../../both";
import {FlowRouter} from "meteor/ostrio:flow-router-extra";

Template.registerHelper('getDisplayDateTime', function (date) {
    return moment(date).format('DD/MM/YYYY');
});

Template.registerHelper('getFullUserName', function(userId){
   let user = Meteor.users.findOne({_id : userId});
   if(user && user.profile){
       return user.profile.firstName +' '+ user.profile.name;
   }
});

Template.registerHelper('getFullAnnalName', function(annalId){
    let annalFound = Annals.findOne({_id : annalId});
    const type = annalFound && annalFound.type;
    const course = annalFound && annalFound.course;
    const year = annalFound && annalFound.year;
    return type+' '+course+' '+year;
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

Template.registerHelper('getAnnalsOfThisCourse', function(){
    return  Meteor.myGlobalFunctions.getAnnalsOfThisCourse();
});

// use the @param section to @return all courses of this section
Template.registerHelper('courses',function (section) {
    return Courses.find({'section': section}).fetch();
});

Template.registerHelper('myCourses',function () {

    const section = Meteor.user() && Meteor.user().profile &&  Meteor.user().profile.section;
    return Courses.find({ section: Meteor.user().profile.section}).fetch();
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

Template.registerHelper('splitLink', function (link) {
    return link.replace("view", "preview")
});

Template.registerHelper('getAnnal',function () {
    return Annals.findOne({_id : FlowRouter.getParam('annalId')});
});

Template.registerHelper('getCorrection',function () {
    return Meteor.myGlobalFunctions.getCorrection();
});

Template.registerHelper('isAuthorizedToEditThisAnnal', function(annal){
    return Meteor.myGlobalFunctions.isAuthorizedToEditAnnal(annal._id);
});

Template.registerHelper('getCorrectionsOfThisAnnal', function () {
    return Meteor.myGlobalFunctions.getCorrectionsOfThisAnnal();
});

Template.registerHelper('getNbLike', function (correctionId) {
    return Meteor.myGlobalFunctions.getNbLike(correctionId);
});

Template.registerHelper('getNbDislike', function (correctionId) {
    return Meteor.myGlobalFunctions.getNbDislike(correctionId);
});

Template.registerHelper('isAuthorizedToEditThisCorrection', function(){
    return Meteor.myGlobalFunctions.isAuthorizedToEditCorrection();
});

Template.registerHelper('isAuthorizedToEditProject', function(){
    return Meteor.myGlobalFunctions.isAuthorizedToEditProject();
});

Template.registerHelper('isAuthorizedToEditTask', function(){
    return Meteor.myGlobalFunctions.isAuthorizedToEditTask();
});

Template.registerHelper('login', function(){
    return Modal.show('login_modal');
});

Template.registerHelper('coursesS1', function(){
    return Courses.find({ section : FlowRouter.getParam('section'), semester : 1  }).fetch();
});

Template.registerHelper('coursesS2', function(){
    return Courses.find({ section : FlowRouter.getParam('section'), semester : 2 }).fetch();
});

Template.registerHelper('nbAnnal', function(courseId){
    return Meteor.myGlobalFunctions.nbAnnal(courseId)
});

Template.registerHelper('nbProject', function(courseId){
    return Meteor.myGlobalFunctions.nbProject(courseId)
});

Template.registerHelper('nbCorrections', function(courseId){
    return Meteor.myGlobalFunctions.nbCorrections(courseId)
});

Template.registerHelper('redirect', function(){
    return Meteor.myGlobalFunctions.redirect();
});