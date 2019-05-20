import './home.html';

Template.home.onCreated(function () {
    this.subscribe('home.page');
});

Template.home.helpers({
    projects(){
        return Projects.find();
    },
});