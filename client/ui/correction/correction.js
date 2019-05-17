import './correction.html';

Template.correction_create_form.events({
    'submit .js-create-correction'(event) {
        event.preventDefault();
        const link = event.target.link.value;
        const reliability = event.target.reliability.value;
        const like = {
            membersId : []
        };
        const dislike = {
            membersId : []
        };

        Meteor.call('insertCorrection', {
                link: link,
                reliability: reliability,
                like : like,
                dislike : dislike,
                annalId : FlowRouter.getParam('annalId'),
                creatorId : Meteor.userId()
            },
            function (error) {
                if (!error) {
                    event.target.link.value = '';
                    event.target.reliability.value = '';
                    Meteor.myGlobalFunctions.gotoAnnalPage();
                }
            });
    }
});

Template.correction_page.events({
    'click .js-goto-annal-page'() {
        Meteor.myGlobalFunctions.gotoAnnalPage();
    },
    'click .js-goto-create-correction'() {
        Meteor.myGlobalFunctions.gotoCreateCorrection()
    },
    'click .js-goto-edit-correction'(){
        Meteor.myGlobalFunctions.gotoEditCorrection();
    },
    'click .js-like-correction'(){
        let membersWhoLiked = Meteor.myGlobalFunctions.getMembersWhoLiked();
        let membersWhoDisliked = Meteor.myGlobalFunctions.getMembersWhoDisliked();
        // if user never rated this correction
        if(!Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && !Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()){
            membersWhoLiked.push(Meteor.userId());
        }
        // if user disliked the correction
        else if(!Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
            Meteor.myGlobalFunctions.deleteElementFromArray(Meteor.userId(),membersWhoDisliked);
            membersWhoLiked.push(Meteor.userId());
        }
        // if user already liked the correction and click maybe it means that he wants to unlike it
        else if(Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && !Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
            Meteor.myGlobalFunctions.deleteElementFromArray(Meteor.userId(),membersWhoLiked);
        }
        const like = {
            membersId : membersWhoLiked
        };
        const dislike = {
            membersId : membersWhoDisliked
        };
        Meteor.call('updateLikeDislikeCorrection', {
            like : like,
            dislike : dislike,
            correctionId: Meteor.myGlobalFunctions.getCorrection()._id,
        });
    },
    'click .js-dislike-correction'(){
        let membersWhoLiked = Meteor.myGlobalFunctions.getMembersWhoLiked();
        let membersWhoDisliked = Meteor.myGlobalFunctions.getMembersWhoDisliked();
        // if user never rated this correction
        if(!Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && !Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()){
            membersWhoDisliked.push(Meteor.userId());
        }
        // if user liked the correction
        else if(Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && !Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
            Meteor.myGlobalFunctions.deleteElementFromArray(Meteor.userId(),membersWhoLiked);
            membersWhoDisliked.push(Meteor.userId());
        }
        // if user already disliked the correction and click : maybe it means that he wants to undislike it
        else if(!Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
            Meteor.myGlobalFunctions.deleteElementFromArray(Meteor.userId(),membersWhoDisliked);
        }
        const like = {
            membersId : membersWhoLiked
        };
        const dislike = {
            membersId : membersWhoDisliked
        };
        Meteor.call('updateLikeDislikeCorrection', {
            like : like,
            dislike : dislike,
            correctionId: Meteor.myGlobalFunctions.getCorrection()._id,
        });
    }
});

Template.correction_edit_form.events({
    'submit .js-edit-correction'(event){
        event.preventDefault();

        const link = event.target.link.value;
        const reliability = event.target.reliability.value;
        const correctionId = FlowRouter.getParam('correctionId');
        Meteor.call('updateCorrection', {
                reliability: reliability,
                link: link,
                correctionId: correctionId,
                //creatorId : Corrections.findOne({_id : correctionId}).creatorId // need it for for the isAuthorized method
            }
            , function (error) {
                if (!error) {
                    Meteor.myGlobalFunctions.gotoCorrectionPage();
                }
            });
    },
    'click .js-delete-correction'() {
        Meteor.call('removeCorrection', FlowRouter.getParam('correctionId'), function (error) {
            if (!error) {
                Meteor.myGlobalFunctions.gotoAnnalPage();
            }
        });
    }
});