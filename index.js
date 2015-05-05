console.log('Loading function');
var twilio = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');

exports.handler = function(event, context) {
    event.Records.forEach(function(record) {
        if ("arn:aws:sns:EXAMPLE" === record.Sns.TopicArn) {
            twilio.sms.messages.post({
                to: '+3367898988',
                from: '+1646678690876',
                body: record.Sns.Message
            }, function(err, text) {
                console.log('You sent: ' + text.body);
                if (err) {
                    context.fail(err);
                }
                context.succeed('SMS sent');
            });
        } else {
            context.done(null, null);
        }
    });
};
