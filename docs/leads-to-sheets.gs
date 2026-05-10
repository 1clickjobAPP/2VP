/**
 * 2VP — Lead capture → Google Sheets
 *
 * This Google Apps Script receives JSON POSTs from /api/lead and appends a
 * row to the bound Google Sheet. Steps to deploy are in /docs/leads-to-sheets.md.
 *
 * Column order in the sheet must match COLUMNS below.
 */

const SHEET_NAME = 'Leads';

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
  // Write headers if the sheet is empty.
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
