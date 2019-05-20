import './home.html';
import {Projects , Tasks , Courses , Annals , Corrections  } from '../both';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.home.onCreated(function () {
    this.subscribe('home.page');
});

Template.home.helpers({
    projects(){
        return Projects.find();
    },
});