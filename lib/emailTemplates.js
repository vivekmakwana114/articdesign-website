export function getAdminEmailHtml({
  fullName,
  companyName,
  email,
  phone,
  message,
}) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>New Lead Submission</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 24px auto;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 24px 24px 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }
        .header {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 12px;
          margin-bottom: 16px;
          text-align: center;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          color: #111827;
        }
        .subtitle {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }
        .label {
          font-size: 12px;
          text-transform: uppercase;
          color: #9ca3af;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }
        .value {
          font-size: 15px;
          color: #111827;
          font-weight: 500;
        }
        .section {
          margin-bottom: 16px;
        }
        .card {
          background-color: #f9fafb;
          border-radius: 10px;
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
        }
        .message {
          white-space: pre-wrap;
          font-size: 14px;
          color: #374151;
          line-height: 1.5;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
        }
        .pill {
          display: inline-block;
          font-size: 14px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: .08em;
          background: #fff0eb;
          color: #ff6634;
          border-radius: 999px;
          padding: 4px 10px;
          margin-top: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="pill">New Lead Submission</p>
          <p class="subtitle">Here are the details submitted from your website contact form.</p>
        </div>

        <div class="section">
          <div class="label">Name</div>
          <div class="card">
            <div class="value">${fullName}</div>
          </div>
        </div>

        <div class="section">
          <div class="label">Company</div>
          <div class="card">
            <div class="value">${companyName || "N/A"}</div>
          </div>
        </div>

        <div class="section">
          <div class="label">Email</div>
          <div class="card">
            <div class="value">${email}</div>
          </div>
        </div>

        <div class="section">
          <div class="label">Phone</div>
          <div class="card">
            <div class="value">${phone}</div>
          </div>
        </div>

        <div class="section">
          <div class="label">Message</div>
          <div class="card">
            <div class="message">${message
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br />")}</div>
          </div>
        </div>

        <div class="footer">
          You’re receiving this email because someone submitted the contact form on your website.
        </div>
      </div>
    </body>
  </html>
  `;
}

export function getUserEmailHtml({
  fullName,
  message,
}) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Thank you for contacting us</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background-color: #f3f4f6;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 24px auto;
          background-color: #ffffff;
          border-radius: 16px;
          padding: 24px 24px 18px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          border: 1px solid #e5e7eb;
        }
        .header {
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          background: #ff6634;
          color: #ffffff;
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .title {
          font-size: 22px;
          font-weight: 600;
          color: #111827;
          margin: 12px 0 4px;
        }
        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
        .section {
          margin-bottom: 18px;
        }
        .greeting {
          font-size: 15px;
          color: #111827;
          margin-bottom: 8px;
        }
        .text {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
        }
        .highlight-box {
          margin-top: 12px;
          border-radius: 12px;
          border: 1px dashed #ff6634;
          background: #fff0eb;
          padding: 12px 14px;
        }
        .highlight-title {
          font-size: 13px;
          font-weight: 600;
          color: #ff6634;
          margin-bottom: 6px;
        }
        .message {
          font-size: 13px;
          color: #4b5563;
        }
        .footer {
          margin-top: 18px;
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
        }
        .brand {
          font-weight: 600;
          color: #ff6634;
        }
        .cta {
          margin-top: 14px;
          text-align: center;
        }
        .cta-button {
          display: inline-block;
          padding: 10px 18px;
          border-radius: 999px;
          background: #fff0eb;
          color: #ff6634;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="badge">Thank you</span>
          <h1 class="title">We’ve received your message</h1>
          <p class="subtitle">Our team will review it and get back to you shortly.</p>
        </div>

        <div class="section">
          <p class="greeting">Hi ${fullName || "there"},</p>
          <p class="text">
            Thanks for taking the time to contact us. This email is just to let you know
            that your message safely reached our inbox. We’ll respond as soon as possible.
          </p>
        </div>

        <div class="section highlight-box">
          <div class="highlight-title">Here’s a copy of what you sent:</div>
          <div class="message">
            ${message
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br />")}
          </div>
        </div>

        <div class="cta">
          <a href="https://sgscompany.com" class="cta-button">Visit our website</a>
        </div>

        <div class="footer">
          Warm regards,<br />
          <span class="brand">SGS Company</span><br/>
          You can reply to this email if you need to add more details.
        </div>
        <div style="opacity: 0; font-size: 1px; color: transparent; height: 1px; overflow: hidden;">
          ${new Date().getTime()}
        </div>
      </div>
    </body>
  </html>
  `;
}
