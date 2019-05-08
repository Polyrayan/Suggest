import './project.html';
import {Projects } from "../../../both";

var members = [];

function deleteMemberId(memberId){
    for(i = 0 ; i < members.length; i++){
        if(members[i] === memberId){
            members.splice(i,1);
        }
    }
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
        const ownerId = Meteor.userId();
        const subject = event.target.subject.value;
        members.push(ownerId);
        let projectDoc = {
            title: title,
            createdAt: new Date(),
            section : section,
            subject : subject,
            ownerId: ownerId,
            members: members
        };
        Projects.insert(projectDoc);
        event.target.title.value = '';
        FlowRouter.go('/');
    },
    'keyup  .js-searchStudent'(event , instance){
        event.preventDefault();
        Session.set("searchStudent",document.getElementById("searchStudent").value);
    },
    'click .js-checkbox-member'(event){
        const memberId = event.target.value;
        if(event.target.checked){
            members.push(memberId);
        }else{
            deleteMemberId(memberId);
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
                searchStudent = Session.set("searchStudent", " ");
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
    idealSizeGrid(array){
        console.log(parseInt(12/array.length));
        return 12/array.length;
    },
    fewMembers(array){
        return array.length < 5 ;
    }
});

Template.project_edit_form.helpers({
    project() {
        return Projects.findOne({_id : FlowRouter.getParam('projectId')});
    }
});

Template.project_edit_form.events({
    'submit .js-edit-project'(event, instance){
        event.preventDefault();

        const title = event.target.title.value;

        Projects.update({_id : FlowRouter.getParam('projectId')}, { $set: {title: title}});

        FlowRouter.go('/project/:projectId' , {projectId : FlowRouter.getParam('projectId')});
    },
    'click .js-delete-project'(event , instance){
        Projects.remove({_id : FlowRouter.getParam('projectId')});

        FlowRouter.go('/');
    }
});