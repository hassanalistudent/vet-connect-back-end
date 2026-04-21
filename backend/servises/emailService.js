import {sendEmail} from "../config/email.js"

export async function sendVerificationEmail(email, token) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-email?token=${token}&email=${email}`;

  await sendEmail({
    to: email,
    subject: "Welcome to VetConnect – Verify Your Account",
    html: `
      <p>Dear User,</p>
      <p>Welcome to <strong>VetConnect</strong> – where healthy pets mean happy hearts!</p>
      <p>We’re excited to have you join our community. To get started, please verify your email address by clicking the link below:</p>
      <p><a href="${link}">Verify My Account</a></p>
      <p>This step helps us keep your account secure and ensures you don’t miss important updates about your appointments and pet care.</p>
      <p>Thank you for choosing VetConnect. We look forward to supporting you and your pets!</p>
      <p>Best regards,<br/>The VetConnect Team</p>
    `,
  });

  console.log("✅ Verification email sent to", email);
}

export async function sendPasswordResetEmail(email, token) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your VetConnect password",
    html: `<p>Click <a href="${link}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
  });

  console.log("✅ Password reset email sent to", email);
}

export async function sendAppointmentEmail(doctorEmail, doctorName, ownerName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/doctor/${appointment._id}/doctor-response`;

  await sendEmail({
    to: doctorEmail,
    subject: "New Appointment Scheduled",
    html: `
      <p>Dear Dr. ${doctorName},</p>
      <p>A new appointment has been scheduled with you.</p>
      <ul>
        <li><strong>Pet Owner:</strong> ${ownerName}</li>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view and respond to this appointment by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Appointment email sent to", doctorEmail);
}

export async function sendDoctorResponseEmail(ownerEmail, ownerName, doctorName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/petowner/${appointment._id}/owner_response`;

  // Dynamic subject line as a sentence
  let subject;
  switch (appointment.status) {
    case "Completed":
      subject = `Dr. ${doctorName} has completed your appointment`;
      break;
    case "Cancelled":
      subject = `Dr. ${doctorName} has cancelled your appointment`;
      break;
    case "Rescheduled":
      subject = `Dr. ${doctorName} has rescheduled your appointment`;
      break;
    case "Paid":
      subject = `Dr. ${doctorName} has verified payment for your appointment`;
      break;
    default:
      subject = `Dr. ${doctorName} has updated your appointment (${appointment.status})`;
  }

  await sendEmail({
    to: ownerEmail,
    subject,
    html: `
      <p>Dear ${ownerName},</p>
      <p>Dr. ${doctorName} has ${appointment.status} appointment.</p>
      <ul>
        <li><strong>Status:</strong> ${appointment.status}</li>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the updated appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Doctor response email sent to", ownerEmail);
}


export async function sendOwnerResponseEmail(doctorEmail, doctorName, ownerName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/doctor/${appointment._id}/doctor-response`;

  // Dynamic subject line as a sentence
  let subject;
  switch (appointment.status) {
    case "Accepted":
      subject = `${ownerName} has accepted the appointment`;
      break;
    case "Cancelled":
      subject = `${ownerName} has cancelled the appointment`;
      break;
    case "Scheduled":
      subject = `${ownerName} has scheduled the appointment`;
      break;
    default:
      subject = `${ownerName} has updated the appointment (${appointment.status})`;
  }

  await sendEmail({
    to: doctorEmail,
    subject,
    html: `
      <p>Dear Dr. ${doctorName},</p>
      <p>${ownerName} has ${appointment.status} the appointment.</p>
      <ul>
        <li><strong>Status:</strong> ${appointment.status}</li>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the updated appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Owner response email sent to", doctorEmail);
}


export async function sendReceiptReceivedEmail(ownerEmail, ownerName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/petowner/${appointment._id}/owner_response`;

  await sendEmail({
    to: ownerEmail,
    subject: "We Have Received Your Payment Receipt",
    html: `
      <p>Dear ${ownerName},</p>
      <p>We have successfully received your payment receipt for the appointment.</p>
      <p>Your payment will be confirmed in a few seconds once it is verified by our team.</p>
      <ul>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Receipt received email sent to", ownerEmail);
}


export async function sendPaymentConfirmationEmail(ownerEmail, ownerName, doctorName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/petowner/${appointment._id}/owner_response`;

  await sendEmail({
    to: ownerEmail,
    subject: `Payment Confirmed for Your Appointment with Dr. ${doctorName}`,
    html: `
      <p>Dear ${ownerName},</p>
      <p>Your payment receipt has been verified and the appointment is now marked as <strong>Paid</strong>.</p>
      <ul>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Payment confirmation email sent to", ownerEmail);
}

export async function sendDoctorPaymentNotificationEmail(doctorEmail, doctorName, ownerName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/doctor/${appointment._id}/doctor-response`;

  await sendEmail({
    to: doctorEmail,
    subject: `Payment Verified for Appointment with ${ownerName}`,
    html: `
      <p>Dear Dr. ${doctorName},</p>
      <p>The payment for your appointment with ${ownerName} has been verified and marked as <strong>Paid</strong>.</p>
      <ul>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Doctor payment notification email sent to", doctorEmail);
}

export async function sendAppointmentCompletionEmail(ownerEmail, ownerName, doctorName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/petowner/${appointment._id}/owner_response`;

  await sendEmail({
    to: ownerEmail,
    subject: `Your Appointment with Dr. ${doctorName} Has Been Completed`,
    html: `
      <p>Dear ${ownerName},</p>
      <p>Your appointment with Dr. ${doctorName} has been completed. Below is a summary of the visit:</p>
      <ul>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the full appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Appointment completion email sent to", ownerEmail);
}

export async function sendAppointmentCancelledEmailToDoctor(doctorEmail, doctorName, ownerName, appointment) {
  const link = `${process.env.FRONTEND_URL || "http://localhost:5173"}/doctor/${appointment._id}/doctor-response`;

  await sendEmail({
    to: doctorEmail,
    subject: `Appointment with ${ownerName} Has Been Cancelled`,
    html: `
      <p>Dear Dr. ${doctorName},</p>
      <p>The appointment with ${ownerName} has been cancelled.</p>
      <ul>
        <li><strong>Date:</strong> ${appointment.appointmentDate}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Type:</strong> ${appointment.appointmentType}</li>
        <li><strong>Charges:</strong> ${appointment.charges}</li>
      </ul>
      <p>You can view the appointment details by clicking the link below:</p>
      <p><a href="${link}">View Appointment</a></p>
      <p>Best regards,<br/>VetConnect Team</p>
    `,
  });

  console.log("✅ Cancellation email sent to doctor:", doctorEmail);
}