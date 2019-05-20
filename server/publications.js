import {Projects , Tasks , Courses, Annals , Corrections} from '../both';
import {check} from "meteor/check";

Meteor.publish('projects.list',function (skip,limit , courseFilter) {
    check(skip, Number);
    check(limit, Number);
    check(courseFilter, Match.Maybe(String)); // null or String

    if (courseFilter === null || courseFilter === ''){
        Counts.publish(this,'projectsCount', Projects.find());
        return [
            Projects.find({section : Meteor.user().profile.section}, { sort: { createdAt : -1}, skip: skip, limit: limit}),
            Meteor.users.find({}, {fields: {profile: 1}}),
            Courses.find({section : Meteor.user().profile.section , project : true})
        ];
    }else{
        Counts.publish(this,'projectsCount', Projects.find({course : courseFilter}));
        return [
            Projects.find({section : Meteor.user().profile.section , course : courseFilter}, { sort: { createdAt : -1}, skip: skip, limit: limit}),
            Meteor.users.find({}, {fields: {profile: 1}}),
            Courses.find({section : Meteor.user().profile.section , project : true})
        ];
    }

});

Meteor.publish('project.single', function (projectId) {
    check(projectId, String );
    // get cursors
    let projectCursor = Projects.find({_id: projectId});
    let taskCursor = Tasks.find({projectId: projectId});
    let courseCursor = Courses.find({project : true});
    // get membersId of this project
    let arrayMembersId = Projects.findOne({_id: projectId}).members;

    return[
        projectCursor,
        taskCursor,
        courseCursor,
        Meteor.users.find({_id : {$in : arrayMembersId}}, {fields: {profile: 1}})
    ]
});

Meteor.publish('project.create', function () {
    // get cursors
    const SECTION = Meteor.user().profile.section;
    let courseCursor = Courses.find({project : true, section: SECTION});

    return[
        courseCursor,
        Meteor.users.find({'profile.section': SECTION }, {fields: {profile: 1}})
    ]
});

Meteor.publish('courses.list', function (section) {
    check(section, String );
    // get cursors
    let courseCursor = Courses.find({section: section});
    let arrayCourse = courseCursor.fetch();
    let arrayCourseId = arrayCourse.map(course => course._id);

    let projectCursor = Projects.find({section : section});

    let annalCursor = Annals.find({course : {$in : arrayCourseId}});
    let arrayAnnal = annalCursor.fetch();
    let arrayAnnalId = arrayAnnal.map(annal => annal._id);

    let correctionCursor = Corrections.find({annalId : {$in : arrayAnnalId}});

    return[
        courseCursor,
        projectCursor,
        annalCursor,
        correctionCursor
    ]
});
Meteor.publish('annals.list', function (course) {
    check(course, String );
    // get cursors
    let annalCursor = Annals.find({course : course});
    let arrayAnnal = annalCursor.fetch();
    let arrayUsersId = arrayAnnal.map(annal => annal.creatorId);
    let arrayAnnalId = arrayAnnal.map(annal => annal._id);
    let correctionCursor = Corrections.find({annalId : {$in : arrayAnnalId}});
    return[
        annalCursor,
        correctionCursor,
        Meteor.users.find({_id : {$in : arrayUsersId} }, {fields: {profile: 1}})
    ]
});

Meteor.publish('annal.page', function (annalId) {
    check(annalId, String);
    // get cursors
    let annalCursor = Annals.find({_id : annalId});
    let correctionCursor = Corrections.find({annalId : annalId});

    let arrayCorrection = correctionCursor.fetch();
    let arrayUsersId = arrayCorrection.map(user => user.creatorId);
    arrayUsersId.push(Annals.findOne({_id : annalId}).creatorId);

    return[
        annalCursor,
        correctionCursor,
        Meteor.users.find({_id : {$in : arrayUsersId} }, {fields: {profile: 1}})
    ]
});

Meteor.publish('correction.create', function (annalId) {
    check(annalId, String);
    // get cursors
    return Annals.find({_id : annalId});
});

Meteor.publish('correction.page', function (correctionId) {
    check(correctionId, String);
    // get cursors
    let correctionFound = Corrections.findOne({_id : correctionId});
    let Annal = Annals.find({_id : correctionFound.annalId});
    return [
        Corrections.find({_id : correctionId}),
        Annal
        ]
});

Meteor.publish('admin.page', function () {
    let courseCursor = Courses.find();

    if(Meteor.user().profile.admin === true){
        return [
            courseCursor
        ]
    }else{
        return []
    }
});

Meteor.publish('admin.course.list', function (section) {
    check(section, String);
    let courseCursor = Courses.find({section : section});
    return [
        courseCursor
    ]
});

Meteor.publish('navbar', function () {
    return Meteor.users.find({_id : Meteor.userId() }, {fields: {profile: 1}})
});

Meteor.publish('course.edit', function (courseId) {
    check(courseId, String);
    return Courses.find({_id : courseId});

});

Meteor.publish('home.page', function () {
    let user = Meteor.userId();
    if(user){
        let userFound = Meteor.users.find({_id : user});
        let projectFound = Projects.find({ members: { $all: [user] }});
        return [
            userFound,
            projectFound
        ]
    }else{
        return [
            Projects.find({},{fields : {section : 1}}),
            Courses.find({}, {fields : {section : 1}}),
            Annals.find({},{fields : {course : 1}}),
            Corrections.find({},{fields : {annalId : 1}})
        ]
    }


});
