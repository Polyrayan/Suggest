import './functionMethods';

import {Annals, annalUpsertSchema} from '../collections';
import {check} from "meteor/check";

Meteor.methods({
    insertAnnal(annal) {
        annalUpsertSchema.validate(annal);
        Meteor.myMethodFunctions.isConnected();

        let annalDoc = {
            type: annal.type,
            year: annal.year,
            course: annal.course,
            link: annal.link,
            creatorId: Meteor.userId(),
        };
        return Annals.insert(annalDoc);
    },
    updateAnnal(annal){
        annalUpsertSchema.validate(annal);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAuthorizedToEditAnnal(annal.annalId);
        Annals.update({_id : annal.annalId},
            {
                $set: {type: annal.type, year: annal.year, link: annal.link }
            });
    },
    removeAnnal(annalId)
    {
        check(annalId, String);
        Meteor.myMethodFunctions.isConnected();
        Meteor.myMethodFunctions.isAuthorizedToEditAnnal(annalId);
        Annals.remove({_id : annalId});
    }
});