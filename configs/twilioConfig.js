import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const sendSMS = async (to, message) => {
    try {
        const res = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to
        });
        return res;
    } catch (err) {
        console.error('SMS Error:', err.message);
        throw err;
    }
};

export default sendSMS;
