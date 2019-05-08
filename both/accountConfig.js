T9n.setLanguage('fr');

let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');

AccountsTemplates.addField({
    _id: 'firstName',
    type: 'text',
    displayName: 'Prenom',
    placeholder: 'Prenom',
    required: true,
    minLength : 3,
});

AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Nom',
    placeholder: 'Nom',
    required: true,
    minLength : 3,
});

AccountsTemplates.addField({
    _id: "section",
    type: "select",
    displayName: "Section",
    select: [
        {
            text: "IG3",
            value: "IG3",
        },
        {
            text: "IG4",
            value: "IG4",
        },
        {
            text: "IG5",
            value: "IG5",
        },
    ],
});

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);