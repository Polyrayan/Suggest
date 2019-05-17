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

Template.registerHelper('getFullAnnalName', function(annalId){
    let annalFound = Annals.findOne({_id : annalId});
    const type = annalFound && annalFound.type;
    const course = annalFound && annalFound.course;
    const year = annalFound && annalFound.year;
    return type+' '+course+' '+year;
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

Template.registerHelper('getAnnalsOfThisCourse', function(){
    return  Meteor.myGlobalFunctions.getAnnalsOfThisCourse();
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

Template.registerHelper('splitLink', function (link) {
    return link.replace("view", "preview")
});

Template.registerHelper('getAnnal',function () {
    return Annals.findOne({_id : FlowRouter.getParam('annalId')});
});

Template.registerHelper('isAuthorizedToEditThisAnnal', function(annal){
    return Meteor.myGlobalFunctions.isAuthorizedToEditAnnal(annal._id);
});

Template.registerHelper('getCorrection',function () {
    return Meteor.myGlobalFunctions.getCorrection();
});

Template.registerHelper('isAuthorizedToEditThisCorrection', function(){
    return Meteor.myGlobalFunctions.isAuthorizedToEditCorrection();
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