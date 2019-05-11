import {taskUpsertSchema, Tasks} from '../collections';
import {check} from 'meteor/check';

Meteor.methods({
    insertTask(task){
        taskUpsertSchema.validate(task);
        let taskDoc = {
            content : task.content,
            projectId : task.projectId,
            creatorId : this.userId(),
            workerId : task.workerId,
            difficulty : task.difficulty
        };

        Tasks.insert(taskDoc);
    },
    updateTask(){

    },
    removeTask(){

    }
});