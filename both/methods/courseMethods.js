import './functionMethods';

import {courseUpsertSchema, Courses } from '../collections';
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
        Courses.remove({_id : courseId});
    }
});