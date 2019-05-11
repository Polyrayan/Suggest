import SimpleSchema from 'simpl-schema';
import {check} from "meteor/check";

export const Projects = new Mongo.Collection('projects');
export const Tasks = new Mongo.Collection('tasks');
export const Courses = new Mongo.Collection('courses');

export const projectUpsertSchema = new SimpleSchema({
    title:      { type: String, max: 25},
    course:     { type: String, max: 10},
    members:    { type: Array},
    'members.$':{ type: String },
    //special update
    section:    { type: String, optional: true, max: 3},
    projectId:  { type: String, optional: true }
},{ check });

export const taskUpsertSchema = new SimpleSchema({
    content:   {  type: String, max: 300},
    projectId: {  type: String },
    creatorId: {  type: String },
    workerId:  {  type: String },
    difficulty:{  type: Number },
    //special update
    taskId:    {  type: String, optional: true}
},{ check });