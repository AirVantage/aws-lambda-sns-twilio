var conf = require('./conf.js');
var twilio = require('twilio')(conf.twilio.account_sid, conf.twilio.auth_token);


exports.handler = function(event, context) {

    function sendSMS(message, context) {
        twilio.sms.messages.post({
            to: conf.sms.to,
            from: conf.sms.from,
            body: message.substr(0, 160)
        }, function(err, text) {
            if (err) {
                context.fail("unable to send SMS: " + JSON.stringify(err) + " message: " + message);
            } else {
                console.log('You sent: ' + JSON.stringify(text));
                context.succeed('SMS sent');
            }
        });
    }

    event.Records.forEach(function(record) {
        console.log(record);
        if ("arn:aws:sns:EXAMPLE" === record.Sns.TopicArn) {
            sendSMS(record.Sns.Subject, context);
        } else {
            console.log("record ignored");
            context.done(null, null);
        }
    });
};
