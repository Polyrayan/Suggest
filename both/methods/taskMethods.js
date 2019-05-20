import './functionMethods';

import {taskUpsertSchema, Tasks } from '../collections';
import {check} from 'meteor/check';

Meteor.methods({
    insertTask(task){
        taskUpsertSchema.validate(task);
        Meteor.myMethodFunctions.isConnected();
        let taskDoc = {
            content : task.content,
            projectId : task.projectId,
            creatorId : Meteor.userId(),
            workerId : task.workerId,
            difficulty : task.difficulty,
            completed : task.completed
        };
        Tasks.insert(taskDoc);
    },
    updateTask(task){
        taskUpsertSchema.validate(task);
        Meteor.myMethodFunctions.isConnected();

        Tasks.update({_id : task.taskId},
            {
                $set: {
                    content: task.content,
                    difficulty : task.difficulty,
                    workerId: task.workerId,
                    completed: task.completed
                }
            });
    },
    removeTask(taskId){
        check(taskId, String);
        Meteor.myMethodFunctions.isConnected();
        //Meteor.myMethodFunctions.isAuthorizedToDeleteTask(projectId);
        Tasks.remove({_id : taskId});
    }
});