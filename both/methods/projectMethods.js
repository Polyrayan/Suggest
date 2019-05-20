import './functionMethods';

import {Projects, projectUpsertSchema, Tasks} from '../collections';
import {check} from "meteor/check";


Meteor.methods({
    insertProject(project){
        projectUpsertSchema.validate(project);
        Meteor.myMethodFunctions.isConnected();

        let projectDoc = {
            title: project.title,
            createdAt: new Date(),
            section : project.section,
            course : project.course,
            ownerId: Meteor.userId(),
            members: project.members
        };
        return Projects.insert(projectDoc);
    },
    updateProject(project){
        projectUpsertSchema.validate(project);
        Meteor.myMethodFunctions.isConnected();
        Projects.update({_id : project.projectId},
            {
                $set: {title: project.title, course: project.course}
            });
    },
    removeProject(projectId)
    {
        check(projectId, String);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAuthorizedToDeleteProject(projectId);
        //remove all tasks of the project
        const tasksFound = Tasks.find({projectId : projectId}).fetch();
        const ArrayTasks = tasksFound.map(task => task._id);
        for (let i = 0; i < ArrayTasks.length ; i++) {
            Meteor.call('removeTask', ArrayTasks[i]);
        }

        Projects.remove({_id : projectId});
    }
});