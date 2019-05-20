import './home.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Annals, Courses , Projects , Corrections , Tasks } from "../../../both";
Template.home.onCreated(function () {
    this.subscribe('home.page');
});

Template.home.helpers({
    projects(){
        return Projects.find();
    },
});