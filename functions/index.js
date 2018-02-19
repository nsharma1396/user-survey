const functions = require('firebase-functions');
var nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email confirmation when a user fills a new contact form
exports.sendEmailConfirmation = functions.database.ref('/survey-details/{uid}').onCreate((event) => {
  const snapshot = event.data;
  const data = snapshot.val();

  const mailOptions = {
    from: '"User-Survey"<user.surveyor@gmail.com>',
    to: data.email
  };


  // Building Email message.
  mailOptions.subject = 'Welcome and thank you!';
  mailOptions.html = '<h1>You just completed a new health survey with the following details :</h1><br\>'+
  'Name : <mark><b>'+
  data.name+'</b></mark><br\>Age Group : <mark><b>'+data.age+'</b></mark><br\>Gender : <mark><b>'+data.gender+'</b></mark><br\>Health life-style change care to be delivered as: <mark><b>'+
  data.preference+'</b></mark><br\>Comfort in sharing fitness information : <mark><b>'+data.comfort+'</b></mark><br\>Anything else to be specified : <mark><b>'+
  data.optional+'</b><br/><br/><h5>End of Mail.</h5>';

  return mailTransport.sendMail(mailOptions)
    .then(() => console.log('New contact form details sent'))
    .catch((error) => console.error('There was an error while sending the email to', error));
});
