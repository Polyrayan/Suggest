import {Corrections, correctionUpdateLikeDislikeSchema, correctionInsertSchema , correctionUpdateSchema  } from "../collections";
import {check} from "meteor/check";

Meteor.methods({
    insertCorrection(correction) {
        correctionInsertSchema.validate(correction);
        Meteor.myMethodFunctions.isConnected();

        return Corrections.insert({
            link: correction.link,
            reliability: correction.reliability,
            like: correction.like,
            dislike: correction.dislike,
            creatorId: correction.creatorId,
            annalId: correction.annalId
        });
    },
    updateCorrection(correction){
        correctionUpdateSchema.validate(correction);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAuthorizedToEditCorrection(correction.correctionId);
        Corrections.update({_id : correction.correctionId},
            {
                $set: { link: correction.link, reliability: correction.reliability }
            });
    },
    updateLikeDislikeCorrection(correction){
        correctionUpdateLikeDislikeSchema.validate(correction);
        console.log(correction);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAuthorizedToEditCorrection(correction.correctionId);
        Corrections.update({_id : correction.correctionId},
            {
                $set: { 'like.membersId' : correction.like.membersId , 'dislike.membersId': correction.dislike.membersId }
            });
    },
    removeCorrection(correctionId)
    {
        check(correctionId, String);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAuthorizedToEditCorrection(correctionId);
        Corrections.remove({_id : correctionId});
    }
});