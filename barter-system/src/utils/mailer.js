import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "baibhav.malaviya@gmail.com",
		pass: process.env.MAIL_PASS,
	},
});

/**
 * Sends an email to a specified recipient
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text email body
 * @param {string} [html] - Optional HTML email body
 * @param {Array} [attachments] - Optional array of attachment objects
 * @returns {Promise} - Resolves with email send info or rejects with error
 */
const sendEmail = async ({ to, subject, text, html, attachments = [] }) => {
	try {
		const mailOptions = {
			from: "baibhav.malaviya@gmail.com", // sender address
			to, // recipient address
			subject,
			text,
			...(html && { html }), // only include html if provided
			...(attachments.length > 0 && { attachments }),
		};

		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent: ${info.messageId}`);
		return info;
	} catch (error) {
		console.error("Error sending email:", error);
		throw error; // re-throw to allow handling by the caller
	}
};

export default sendEmail;

/**
    // Simple text email
    await sendEmail({
    to: "recipient@example.com",
    subject: "Hello there",
    text: "This is a test email."
    });

    // Email with HTML content
    await sendEmail({
    to: "recipient@example.com",
    subject: "HTML Email Test",
    text: "This is fallback text for email clients that don't support HTML.",
    html: "<h1>Hello</h1><p>This is an <b>HTML</b> email.</p>"
    });

    // Email with attachments
    await sendEmail({
    to: "recipient@example.com",
    subject: "Email with attachment",
    text: "Please find the attached file.",
    attachments: [
        {
        filename: "document.pdf",
        path: "/path/to/document.pdf"
        }
    ]
    });
 */
