import './course.html';
import {Courses} from "../../../both";


Template.course_list.helpers({
    courses(){
        return Courses.find({ section : FlowRouter.getParam('section') }).fetch();
    },
    coursesS1(){
        return Courses.find({ section : FlowRouter.getParam('section'), semester : 1  }).fetch();
    },
    coursesS2(){
        return Courses.find({ section : FlowRouter.getParam('section'), semester : 2 }).fetch();
    }
});

Template.course_single.helpers({
    containsAnnals(courseId){
        return !!Annals.findOne({course: courseId});
    }
});

Template.course_page.helpers({
    nbAnnals(){
        return Annals.find({course: FlowRouter.getParam('courseId')}).fetch().length;
    }
});

Template.course_page.events({
    'click .js-goto-create-annal'(){
        FlowRouter.go("/cours/:section/:courseId/annal/create", {section : FlowRouter.getParam('section'), courseId : FlowRouter.getParam('courseId')});
    }
});