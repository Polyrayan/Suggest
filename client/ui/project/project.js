import './project.html';
import {Projects } from "../../../both";
import '../globalHelpers';
var members = [];

function deleteMemberId(memberId,members){
    Meteor.myGlobalFunctions.deleteElementFromArray(memberId,members)
}

function addAllMembers(myMembers){
    for (i = 0 ; i < members.length; i++){
        //find a way to use the global helper "getFullUserName" which already apply this function
        let user = Meteor.users.findOne({_id : members[i]});
        if(user && user.profile){
            myMembers = ' '+ myMembers + user.profile.firstName +' '+ user.profile.name + ', ';
        }
    }
    return myMembers;
}

Template.project_create_form.events({
    'submit .js-create-project'(event , instance){
        event.preventDefault();
        const title = event.target.title.value;
        const section = Meteor.user().profile.section;
        const course = event.target.course.value;
        members.push(Meteor.userId());
        Meteor.call('insertProject',{title : title , section : section , course : course , members : members},
            function (error , result) {
                if(!error){
                    event.target.title.value = '';
                    members = [];

                    FlowRouter.go('/projects/:projectId', {projectId : result});
                }
            });
    },
    'keyup .js-searchStudent'(event , instance){
        event.preventDefault();
        console.log(new RegExp('.*' + Session.get("searchStudent") + ' *.'));
        Session.set("searchStudent",document.getElementById("searchStudent").value);
    },
    'click .js-checkbox-member'(event){
        const memberId = event.target.value;
        if(event.target.checked){
            members.push(memberId);
        }else{
            deleteMemberId(memberId,members);
        }
        var myMembers = "";
        myMembers = addAllMembers(myMembers);
        document.getElementById("stringMyMembers").innerHTML = "Membre : Vous," + myMembers;
    }
});

Template.project_create_form.helpers({
    studentsOfMySection() {
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        if(user && user.profile && user.profile.section) {
            let searchStudent;
            if (document.getElementById("searchStudent")) {
                searchStudent = Session.set("searchStudent", document.getElementById("searchStudent").value);
            } else {
                searchStudent = Session.set("searchStudent", "");
            }
            return Meteor.users.find({
                    "profile.section": Meteor.user().profile.section,
                    $or: [{
                        "profile.name": {
                            $regex: new RegExp('.*' + Session.get("searchStudent") + ' *.'),
                            $options: 'im'
                        }
                    },
                        {
                            "profile.firstName": {
                                $regex: new RegExp('.*' + Session.get("searchStudent") + ' *.'),
                                $options: 'im'
                            }
                        }
                    ],
                    _id: {$not: Meteor.user()._id}
                },
                {sort: [['profile.name', 'asc']]}).fetch();
        }
    }
});

Template.project_list.helpers({
    projects(){
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        if(user && user.profile && user.profile.section){
            return Projects.find({ section : user.profile.section }).fetch();
        }else{
            return null;
        }
    }
});

Template.project_page.helpers({
    project() {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    },
    idealSizeGrid(number){
        return 12/number;
    },
    fewMembers(number){
        return number < 5 ;
    }
});

Template.project_edit_form.helpers({
    project() {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    },
});

Template.project_edit_form.events({
    'submit .js-edit-project'(event){
        event.preventDefault();

        const title = event.target.title.value;
        const course = event.target.course.value;

        Meteor.call('updateProject',{ title : title , course : course, projectId : FlowRouter.getParam('projectId')}
        ,function (error , result) {
            if(!error){
                FlowRouter.go('/projects/:projectId' , {projectId : FlowRouter.getParam('projectId')});
            }
        });
    },
    'click .js-delete-project'(){
        Meteor.call('removeProject', FlowRouter.getParam('projectId'), function (error , result) {
            if(!error){
                FlowRouter.go('/');
            }
        });
    },
    'click .js-edit-members'(event){
        // A FIXER
        event.preventDefault();
        const exMemberId = event.target.exMemberId.value;
        console.log(exMemberId);
        // const members = Projects.findOne({_id : FlowRouter.getParam('projectId')});

    }
});

Template.project_progress.helpers({
    percentage(projectId) {
        return (Meteor.myGlobalFunctions.getNbCompletedTasksOfThisProject(projectId) / Meteor.myGlobalFunctions.getNbTasksOfThisProject(projectId) * 100).toFixed(2);
    },
    fewPercentage(projectId){
        return (Meteor.myGlobalFunctions.getNbCompletedTasksOfThisProject(projectId) / Meteor.myGlobalFunctions.getNbTasksOfThisProject(projectId) * 100 < 2);
    }
});