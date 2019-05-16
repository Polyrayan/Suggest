import './annal.html';

Template.annal_single.events({
   'click .js-go-to-create-annal'(){
       FlowRouter.go("cours/:sectionId/:courseId/annal/create");
   },
    'click .js-go-to-edit-annal'(){
        FlowRouter.go("cours/:sectionId/:courseId/annal/:annalId/edit");
    }

});

Template.annal_create_form.events({
    'submit .js-create-annal'(event) {
        event.preventDefault();
        const type = event.target.type.value;
        const year = parseInt(event.target.year.value);
        const link = event.target.link.value;
        const course = FlowRouter.getParam("courseId");
        Meteor.call('insertAnnal', {type: type, year: year, link: link, course: course},
            function (error, result) {
                if (!error) {
                    event.target.year.value = '';
                    event.target.link.value = '';
                    FlowRouter.go("/cours/:section/:courseId/annal/:annalId", {
                        section: FlowRouter.getParam('section'),
                        courseId: FlowRouter.getParam('courseId'),
                        annalId: result
                    });
                }
            });
    }
});

Template.annal_edit_form.events({
    'submit .js-edit-annal'(event) {
        event.preventDefault();

        const type = event.target.type.value;
        const year = parseInt(event.target.year.value);
        const link = event.target.link.value;

        Meteor.call('updateAnnal', {type: type, year: year, link: link, annalId: FlowRouter.getParam('annalId')}
            , function (error) {
                if (!error) {
                    FlowRouter.go("/cours/:section/:courseId/annal/:annalId", {
                        section: FlowRouter.getParam('section'),
                        courseId: FlowRouter.getParam('courseId'),
                        annalId: FlowRouter.getParam('annalId'),
                    });
                }
            });
    },
    'click .js-delete-annal'() {
        Meteor.call('removeAnnal', FlowRouter.getParam('annalId'), function (error) {
            if (!error) {
                FlowRouter.go("/cours/:section/:courseId/annal/", {
                    section: FlowRouter.getParam('section'),
                    courseId: FlowRouter.getParam('courseId'),
                });
            }
        });
    }
});