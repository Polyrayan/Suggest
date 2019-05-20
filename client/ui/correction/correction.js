import './correction.html';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Annals, Courses , Projects , Corrections , Tasks } from "../../../both";
Template.correction_list.helpers({
    corrections(){
        return Corrections.find().fetch();
    }
});

Template.correction_create_form.onCreated(function () {
    this.subscribe('correction.create', FlowRouter.getParam('annalId'));
});

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
    },'click .js-goto-annal-page'(){
        Meteor.myGlobalFunctions.gotoAnnalPage();
    }
});

Template.correction_page.onCreated(function () {
    this.subscribe('correction.page', FlowRouter.getParam('correctionId'));
});

Template.correction_page.helpers({
    goodLink(correction) {
        const link = correction && correction.link;
        if(link){
            return(link.includes('/open?id=') || link.includes('file/d') || link.includes('/view') && link.includes('https://drive.google.com'));
        }else{
            return false
        }
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
        if(Meteor.myGlobalFunctions.isConnected()) {
            let membersWhoLiked = Meteor.myGlobalFunctions.getMembersWhoLiked();
            let membersWhoDisliked = Meteor.myGlobalFunctions.getMembersWhoDisliked();
            // if user never rated this correction
            if (!Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && !Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
                membersWhoLiked.push(Meteor.userId());
            }
            // if user disliked the correction
            else if (!Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
                Meteor.myGlobalFunctions.deleteElementFromArray(Meteor.userId(), membersWhoDisliked);
                membersWhoLiked.push(Meteor.userId());
            }
            // if user already liked the correction and click maybe it means that he wants to unlike it
            else if (Meteor.myGlobalFunctions.userAlreadyLikedCorrection() && !Meteor.myGlobalFunctions.userAlreadyDislikedCorrection()) {
                Meteor.myGlobalFunctions.deleteElementFromArray(Meteor.userId(), membersWhoLiked);
            }
            const like = {
                membersId: membersWhoLiked
            };
            const dislike = {
                membersId: membersWhoDisliked
            };
            Meteor.call('updateLikeDislikeCorrection', {
                like: like,
                dislike: dislike,
                correctionId: Meteor.myGlobalFunctions.getCorrection()._id,
            });
        } else{
            Modal.show('login_modal');
        }

    },
    'click .js-dislike-correction'(){
        if(Meteor.myGlobalFunctions.isConnected()) {
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
        }else{
            Modal.show('login_modal');
        }
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
