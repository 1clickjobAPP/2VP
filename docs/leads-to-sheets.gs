/**
 * 2VP — Lead capture → Google Sheets + email notifications
 *
 * Receives JSON POSTs from /api/lead, appends a row to the bound Google
 * Sheet, then fires two emails:
 *   1. Internal alert → NOTIFY_EMAIL (default: hi@2vp.uk)
 *   2. Confirmation reply → the lead's own email
 *
 * Both emails are wrapped so a mail failure never blocks the sheet write.
 * Setup walkthrough: docs/leads-to-sheets.md.
 */

const SHEET_NAME = 'Leads';

// Internal address that gets a notification on every lead.
const NOTIFY_EMAIL = 'hi@2vp.uk';

// Set to false to stop sending the confirmation email back to the lead.
const SEND_CONFIRMATION_TO_LEAD = true;

// Used as the From / signature name on outbound emails.
const SENDER_NAME = '2VP Construction';
const SUPPORT_PHONE = '020 8050 8968';

const COLUMNS = [
  'Received',
  'Area',
  'Area slug',
  'Tier',
  'Name',
  'Email',
  'Phone',
  'Postcode',
  'Project type',
  'Budget',
  'Message',
  'Source URL',
  'Referer',
  'IP',
  'User agent',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      body.receivedAt || new Date().toISOString(),
      body.areaName || '',
      body.areaSlug || '',
      body.areaTier || '',
      body.name || '',
      body.email || '',
      body.phone || '',
      body.postcode || '',
      body.projectType || '',
      body.budget || '',
      body.message || '',
      body.source || '',
      body.referer || '',
      body.ip || '',
      body.userAgent || '',
    ]);

    sendInternalNotification_(body);
    if (SEND_CONFIRMATION_TO_LEAD) {
      sendLeadConfirmation_(body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, info: '2VP lead webhook is live. POST JSON to submit a lead.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length)
      .setFontWeight('bold')
      .setBackground('#0a3d62')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendInternalNotification_(body) {
  try {
    const subject = 'New 2VP lead — ' +
      (body.name || 'Unknown') + ', ' +
      (body.areaName || 'unknown area') +
      ' (' + (body.projectType || 'no type') + ')';

    const lines = [
      'New lead from the 2vp.uk area landing pages.',
      '',
      'Area:         ' + (body.areaName || '') + '  (tier: ' + (body.areaTier || '') + ')',
      'Project type: ' + (body.projectType || ''),
      'Budget:       ' + (body.budget || ''),
      '',
      'Name:     ' + (body.name || ''),
      'Email:    ' + (body.email || ''),
      'Phone:    ' + (body.phone || ''),
      'Postcode: ' + (body.postcode || ''),
      '',
      'Message:',
      body.message || '(none)',
      '',
      'Source page: ' + (body.source || ''),
      'Received:    ' + (body.receivedAt || ''),
      'IP:          ' + (body.ip || ''),
      '',
      'Reply to this email to contact the lead directly.',
    ];

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: lines.join('\n'),
      replyTo: body.email || NOTIFY_EMAIL,
      name: SENDER_NAME,
    });
  } catch (err) {
    // Don't break the sheet write if email fails — Apps Script daily quota
    // is 100 emails/day on free Gmail, 1500/day on Workspace.
    console.error('Internal email failed:', err);
  }
}

function sendLeadConfirmation_(body) {
  try {
    if (!body.email) return;

    const firstName = (body.name || '').split(' ')[0] || 'there';
    const areaName = body.areaName || 'your area';
    const calcUrl = body.areaSlug
      ? 'https://2vp.uk/calculator?area=' + encodeURIComponent(body.areaSlug)
      : 'https://2vp.uk/calculator';

    const subject = 'Thanks for getting in touch with 2VP — your ' + areaName + ' project';

    const lines = [
      'Hi ' + firstName + ',',
      '',
      'Thanks for requesting a survey in ' + areaName + ' via 2vp.uk. We\'ve',
      'received your details and a project manager will be in touch within',
      'one working day to confirm availability and walk you through the',
      'next steps.',
      '',
      'In the meantime, you can sharpen your numbers with our calculator:',
      calcUrl,
      '',
      'Or call us directly: ' + SUPPORT_PHONE,
      '',
      'Your enquiry summary:',
      '  Project:  ' + (body.projectType || ''),
      '  Budget:   ' + (body.budget || ''),
      '  Postcode: ' + (body.postcode || ''),
      '',
      'Best,',
      'The 2VP team',
      NOTIFY_EMAIL + ' · ' + SUPPORT_PHONE,
    ];

    MailApp.sendEmail({
      to: body.email,
      subject: subject,
      body: lines.join('\n'),
      replyTo: NOTIFY_EMAIL,
      name: SENDER_NAME,
    });
  } catch (err) {
    console.error('Confirmation email failed:', err);
  }
}
