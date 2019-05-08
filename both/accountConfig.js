T9n.setLanguage('fr');

let email = AccountsTemplates.removeField('email');
let password = AccountsTemplates.removeField('password');

AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: 'Nom',
    placeholder: 'Nom',
    required: true,
    minLenght : 3,
});

AccountsTemplates.addField(email);
AccountsTemplates.addField(password);