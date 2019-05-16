import SimpleSchema from 'simpl-schema';
import {check} from "meteor/check";

export const Projects = new Mongo.Collection('projects');
export const Tasks = new Mongo.Collection('tasks');
export const Courses = new Mongo.Collection('courses');
export const Annals = new Mongo.Collection('annals');
export const Corrections = new Mongo.Collection('corrections');

export const projectUpsertSchema = new SimpleSchema({
    title:      { type: String, max: 25},
    course:     { type: String, max: 10},
    members:    { type: Array, optional: true},
    'members.$':{ type: String },
    //special update
    section:    { type: String, optional: true, max: 3},
    projectId:  { type: String, optional: true }
},{ check });

export const taskUpsertSchema = new SimpleSchema({
    content:   {  type: String, max: 300},
    projectId: {  type: String , optional: true},
    workerId:  {  type: String },
    difficulty:{  type: Number },
    completed: {  type: Boolean},
    //special update
    creatorId: {  type: String, optional: true},
    taskId:    {  type: String, optional: true}
},{ check });

export const annalUpsertSchema = new SimpleSchema({
    type:       {  type: String, max: 10},
    year:       {  type: Number},
    link :      {  type: String},
    course:     {  type: String, optional: true},
    creatorId:  {  type: String, optional: true},
    //special update
    annalId:    {  type: String, optional: true}
},{ check });

