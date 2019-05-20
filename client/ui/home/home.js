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

Template.home.helpers({
    sumUpIG3(){
        const nbProjects = Projects.find({section :"IG3"}).fetch();
        const nbCourses = Courses.find({section :"IG3"}).fetch();
        let arrayCourseId = nbCourses.map(course => course._id);
        const nbAnnals = Annals.find({course : {$in : arrayCourseId} }).fetch();
        let arrayAnnalId = nbAnnals.map(annals => annals._id);
        const nbCorrections = Annals.find({course : {$in : arrayAnnalId} }).fetch();
        console.log(nbCourses);
        console.log(nbAnnals);
        console.log(nbAnnals.length+' sujets '+nbCorrections.length+' corrections et '+nbProjects.length+' projets en IG3');
        return nbAnnals.length+' sujets '+nbCorrections.length+' corrections et '+nbProjects.length+' projets en IG3';
    }
});
