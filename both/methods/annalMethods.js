import './functionMethods';

import {Annals, annalUpsertSchema, Corrections} from '../collections';
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
        console.log(annal);
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

        const correctionsFound = Corrections.find({annalId : annalId}).fetch();
        const ArrayCorrections = correctionsFound.map(correction => correction._id);
        for (let i = 0; i < ArrayCorrections.length ; i++) {
            Meteor.call('removeCorrection', ArrayCorrections[i]);
        }
        Annals.remove({_id : annalId});
    }
});