import nodemailer from "nodemailer";

export const contactUs = async (req, res) => {

try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }       
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Us Message from ${name}`,
        html:`<p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong><br/> ${message}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
} catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message" });
}

}