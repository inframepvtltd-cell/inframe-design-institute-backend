import twilio from 'twilio'

// Use your actual Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID   // e.g., 'ACxxxxxxxxxxxxxxxx'
const authToken = process.env.TWILIO_AUTH_TOKEN     // e.g., 'xxxxxxxxxxxxxxxx'
const client = twilio(accountSid, authToken)

// This number must be from your Twilio account
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER  // e.g., '+15017122661'

// Utility to send SMS
const sendSMS = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,  // Must be Twilio verified number
      to: to                     // Must be in '+91...' format
    })
    return res
  } catch (err) {
    console.error('SMS Error:', err.message)
    throw err // Optional: rethrow to handle in calling function
  }
}

export default sendSMS
