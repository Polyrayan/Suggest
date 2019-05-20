import './functionMethods';

import {courseUpsertSchema, Courses, Annals , Projects , Corrections} from '../collections';
import {check} from 'meteor/check';

Meteor.methods({
    insertCourse(course){
        courseUpsertSchema.validate(course);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAdmin();
        let courseDoc = {
            _id : course.id,
            section : course.section,
            project : course.project,
            semester : course.semester
        };
        Courses.insert(courseDoc);
    },
    updateCourse(course){
        courseUpsertSchema.validate(course);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAdmin();
        Courses.update({_id : course.id},
            {
                $set: {
                    section : course.section,
                    project : course.project,
                    semester : course.semester,
                    _id : course.id
                }
            });
    },
    removeCourse(courseId){
        check(courseId, String);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAdmin();
        //remove all annals of this course
        const annalsFound = Annals.find({course : courseId}).fetch();
        const arrayAnnal = annalsFound.map(annal => annal._id);
        for (let i = 0; i < arrayAnnal.length ; i++){
            Meteor.call('removeAnnal', arrayAnnal[i]);
        }
        //remove all projects of this course
        const projectsFound = Projects.find({course : courseId}).fetch();
        const arrayProject = projectsFound.map(project => project._id);
        for (let i = 0; i < arrayProject.length ; i++){
            Meteor.call('removeProject', arrayProject[i]);
        }
        //remove course
        Courses.remove({_id : courseId});
    }
});