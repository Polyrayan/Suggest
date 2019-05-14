import './course.html';
import {Courses} from "../../../both";


Template.course_list.helpers({
    courses(){
        return Courses.find({ section : FlowRouter.getParam('section') }).fetch();
    }
});