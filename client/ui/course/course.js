import './course.html';
import {Annals, Courses} from "../../../both";


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
    },
    nbAnnal(courseId){
        return Annals.find({course : courseId}).fetch().length
    },
    nbProject(courseId){
        return Projects.find({course : courseId}).fetch().length
    },
    nbCorrections(courseId){
          let sum = 0;
          const annals = Annals.find({course : courseId}).fetch();
          for (i = 0; i < annals.length ; i++){
              sum += Corrections.find({annalId : annals[i]._id }).fetch().length;
          }
          return sum
    }
});

Template.course_page.helpers({
    nbAnnals(){
        return Annals.find({course: FlowRouter.getParam('courseId')}).fetch().length;
    }
});

Template.course_page.events({
    'click .js-goto-create-annal'(){
        const route = '/courses/' + FlowRouter.getParam('section') + '/' + FlowRouter.getParam('courseId') + '/annals/create';
        if (Meteor.myGlobalFunctions.isConnected()) {
            FlowRouter.go(route);
        }
        else {
            Session.set('redirection', route);
            Modal.show('login_modal');
        }    }
});