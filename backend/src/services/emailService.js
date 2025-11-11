const nodemailer = require('nodemailer');
const { email } = require('../config/env');

const transporter = nodemailer.createTransport({
  host: email.host,
  port: email.port,
  auth: {
    user: email.user,
    pass: email.pass,
  },
});

const sendAlertEmail = async (toEmail, zoneName, riskLevel, count) => {
  const mailOptions = {
    from: 'vesta-alert-system@yourdomain.com',
    to: toEmail,
    subject: `[High Priority] Mental Health Alert for Zone: ${zoneName}`,
    html: `
      <h3>Project Vesta Alert</h3>
      <p>A high-priority alert has been triggered for the zone you are monitoring: <strong>${zoneName}</strong>.</p>
      <p>The threshold of <strong>${count}</strong> posts with a risk level of "<strong>${riskLevel}</strong>" has been breached in the last hour.</p>
      <p>Please log in to the dashboard to review the situation.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Alert email sent to ${toEmail} for zone ${zoneName}`);
  } catch (error) {
    console.error('Error sending alert email:', error);
  }
};

module.exports = { sendAlertEmail };