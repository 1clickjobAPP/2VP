"""Build the 2VP Lead Generation KPI dashboard workbook.

Run: python3 scripts/build_dashboard.py
Output: dashboards/2vp-lead-gen-dashboard.xlsx
"""

from datetime import date
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUTPUT = Path(__file__).resolve().parent.parent / "dashboards" / "2vp-lead-gen-dashboard.xlsx"

# ---------- styles ----------
NAVY = "1F3A5F"
GOLD = "C9A961"
LIGHT = "F4F1EA"
RED = "C0392B"
GREEN = "27AE60"
GREY = "7F8C8D"

THIN = Side(style="thin", color="BFBFBF")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)

H1 = Font(name="Calibri", size=18, bold=True, color="FFFFFF")
H2 = Font(name="Calibri", size=12, bold=True, color="FFFFFF")
BODY = Font(name="Calibri", size=11)
BODY_BOLD = Font(name="Calibri", size=11, bold=True)
WARN = Font(name="Calibri", size=11, bold=True, color="FFFFFF")

FILL_NAVY = PatternFill("solid", fgColor=NAVY)
FILL_GOLD = PatternFill("solid", fgColor=GOLD)
FILL_LIGHT = PatternFill("solid", fgColor=LIGHT)
FILL_RED = PatternFill("solid", fgColor=RED)
FILL_GREEN = PatternFill("solid", fgColor=GREEN)
FILL_GREY = PatternFill("solid", fgColor=GREY)

CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)
LEFT = Alignment(horizontal="left", vertical="center", wrap_text=True)


def set_col_widths(ws, widths):
    for i, w in enumerate(widths, start=1):
        ws.column_dimensions[get_column_letter(i)].width = w


def title_row(ws, row, text, span, fill=FILL_NAVY, font=H1, height=30):
    ws.row_dimensions[row].height = height
    ws.cell(row=row, column=1, value=text)
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=span)
    c = ws.cell(row=row, column=1)
    c.fill = fill
    c.font = font
    c.alignment = CENTER


def header_row(ws, row, headers, fill=FILL_GOLD, font=H2):
    for i, h in enumerate(headers, start=1):
        c = ws.cell(row=row, column=i, value=h)
        c.fill = fill
        c.font = font
        c.alignment = CENTER
        c.border = BORDER
    ws.row_dimensions[row].height = 22


def body_cell(ws, row, col, value=None, fill=None, font=BODY, align=LEFT, fmt=None):
    c = ws.cell(row=row, column=col, value=value)
    c.font = font
    c.alignment = align
    c.border = BORDER
    if fill:
        c.fill = fill
    if fmt:
        c.number_format = fmt
    return c


# ---------- sheets ----------
def build_readme(wb):
    ws = wb.create_sheet("README")
    set_col_widths(ws, [120])
    title_row(ws, 1, "2VP — Lead Generation KPI Dashboard", 1)

    lines = [
        ("How this workbook is organised", FILL_GOLD, H2),
        ("1. Rate Card — set the £ price for each deliverable type. Edit once, applies everywhere.", FILL_LIGHT, BODY),
        ("2. Weekly Tracker — Lilia logs each deliverable as it goes live. One row per item.", FILL_LIGHT, BODY),
        ("3. Weekly Summary — auto-totals submitted, approved, rejected, and payable amount.", FILL_LIGHT, BODY),
        ("4. Monthly Roll-up — week-by-week totals to spot trends and compare months.", FILL_LIGHT, BODY),
        ("5. Links & Credentials — accounts, profile URLs, login info (see security warning).", FILL_LIGHT, BODY),
        ("", None, BODY),
        ("Workflow", FILL_GOLD, H2),
        ("Mon–Sun: Lilia logs every published item in Weekly Tracker (date, type, link).", FILL_LIGHT, BODY),
        ("Friday 17:00: Lilia closes the week. Director reviews each row, marks Approved Y/N.", FILL_LIGHT, BODY),
        ("Saturday: Director confirms Total Payable on the Weekly Summary tab. Payment released.", FILL_LIGHT, BODY),
        ("", None, BODY),
        ("Counting rules", FILL_GOLD, H2),
        ("Item only paid if: published & live, logged here, original (not duplicate), on-brand.", FILL_LIGHT, BODY),
        ("Cross-posting same content (e.g. IG reel reused on FB) = 1 item unless re-edited per platform.", FILL_LIGHT, BODY),
        ("", None, BODY),
        ("SECURITY WARNING — Credentials sheet", FILL_RED, WARN),
        ("Do NOT commit real passwords to git. Keep filled copies of this file off the repo.", FILL_LIGHT, BODY_BOLD),
        ("For real credential storage use 1Password / Bitwarden / Google Password Manager.", FILL_LIGHT, BODY),
        ("This sheet is a TEMPLATE only — leave the password column blank in any committed copy.", FILL_LIGHT, BODY),
    ]
    for i, (text, fill, font) in enumerate(lines, start=3):
        c = ws.cell(row=i, column=1, value=text)
        c.font = font
        c.alignment = LEFT
        if fill:
            c.fill = fill
        ws.row_dimensions[i].height = 22 if font is H2 or font is WARN else 18


def build_rate_card(wb):
    ws = wb.create_sheet("Rate Card")
    set_col_widths(ws, [16, 22, 24, 14])
    title_row(ws, 1, "Rate Card — set £ rate per deliverable", 4)
    header_row(ws, 2, ["Key", "Item", "Platform", "Rate (£)"])

    rates = [
        ("IG-POST", "Post", "Instagram"),
        ("IG-REEL", "Reel", "Instagram"),
        ("IG-STORY", "Stories set", "Instagram"),
        ("FB-POST", "Post", "Facebook"),
        ("FB-REEL", "Reel", "Facebook"),
        ("FB-STORY", "Stories set", "Facebook"),
        ("TT-VIDEO", "Video", "TikTok"),
        ("GMB-POST", "GMB Post (per location)", "Google My Business"),
        ("LP", "Landing Page (location + service)", "Website"),
    ]
    for i, (key, item, platform) in enumerate(rates, start=3):
        body_cell(ws, i, 1, key, font=BODY_BOLD, align=CENTER)
        body_cell(ws, i, 2, item)
        body_cell(ws, i, 3, platform)
        body_cell(ws, i, 4, None, fill=FILL_LIGHT, align=CENTER, fmt='"£"#,##0.00')

    note_row = len(rates) + 4
    ws.cell(row=note_row, column=1, value="Edit Rate (£) column only. Keys are referenced by the Weekly Tracker.").font = Font(italic=True, color=GREY)
    ws.merge_cells(start_row=note_row, start_column=1, end_row=note_row, end_column=4)


def build_weekly_tracker(wb):
    ws = wb.create_sheet("Weekly Tracker")
    set_col_widths(ws, [12, 8, 14, 22, 22, 42, 12, 12, 12, 30])
    title_row(ws, 1, "Weekly Tracker — log every published deliverable", 10)

    # week meta
    ws.cell(row=2, column=1, value="Week starting (Mon):").font = BODY_BOLD
    ws.cell(row=2, column=1).alignment = LEFT
    ws.cell(row=2, column=2, value="").alignment = CENTER
    ws.cell(row=2, column=2).number_format = "yyyy-mm-dd"
    ws.cell(row=2, column=2).fill = FILL_LIGHT
    ws.cell(row=2, column=2).border = BORDER

    headers = ["Date", "Day", "Key", "Item (auto)", "Platform (auto)", "Link / Proof", "Rate £ (auto)", "Approved Y/N", "Pays £", "Notes"]
    header_row(ws, 4, headers)

    # 60 data rows
    first = 5
    last = first + 59
    for r in range(first, last + 1):
        # Date
        body_cell(ws, r, 1, fmt="yyyy-mm-dd", align=CENTER)
        # Day - formula from date
        body_cell(ws, r, 2, value=f'=IF(A{r}="","",TEXT(A{r},"ddd"))', align=CENTER)
        # Key (validated dropdown)
        body_cell(ws, r, 3, fill=FILL_LIGHT, align=CENTER)
        # Item (lookup)
        body_cell(ws, r, 4, value=f'=IFERROR(IF(C{r}="","",VLOOKUP(C{r},\'Rate Card\'!A:D,2,FALSE)),"")')
        # Platform (lookup)
        body_cell(ws, r, 5, value=f'=IFERROR(IF(C{r}="","",VLOOKUP(C{r},\'Rate Card\'!A:D,3,FALSE)),"")')
        # Link
        body_cell(ws, r, 6)
        # Rate (lookup)
        body_cell(
            ws, r, 7,
            value=f'=IFERROR(IF(C{r}="","",VLOOKUP(C{r},\'Rate Card\'!A:D,4,FALSE)),"")',
            align=CENTER, fmt='"£"#,##0.00'
        )
        # Approved
        body_cell(ws, r, 8, fill=FILL_LIGHT, align=CENTER)
        # Pays
        body_cell(
            ws, r, 9,
            value=f'=IF(AND(UPPER(H{r})="Y",ISNUMBER(G{r})),G{r},0)',
            align=CENTER, fmt='"£"#,##0.00'
        )
        # Notes
        body_cell(ws, r, 10)

    # totals row
    tot = last + 2
    ws.cell(row=tot, column=1, value="TOTALS").font = BODY_BOLD
    ws.cell(row=tot, column=1).alignment = CENTER
    ws.cell(row=tot, column=1).fill = FILL_GOLD
    ws.merge_cells(start_row=tot, start_column=1, end_row=tot, end_column=6)
    body_cell(ws, tot, 7, value=f'=SUMPRODUCT((G{first}:G{last}<>"")*1)', align=CENTER, font=BODY_BOLD, fill=FILL_LIGHT)
    body_cell(ws, tot, 8, value=f'=COUNTIF(H{first}:H{last},"Y")', align=CENTER, font=BODY_BOLD, fill=FILL_LIGHT)
    body_cell(ws, tot, 9, value=f'=SUM(I{first}:I{last})', align=CENTER, font=BODY_BOLD, fill=FILL_GREEN, fmt='"£"#,##0.00')
    body_cell(ws, tot, 10, value="Items submitted | Approved | Total payable")

    # data validations
    key_dv = DataValidation(
        type="list",
        formula1="='Rate Card'!$A$3:$A$11",
        allow_blank=True,
        showErrorMessage=True,
        errorTitle="Invalid key",
        error="Pick a key from the Rate Card.",
    )
    key_dv.add(f"C{first}:C{last}")
    ws.add_data_validation(key_dv)

    yn_dv = DataValidation(
        type="list",
        formula1='"Y,N"',
        allow_blank=True,
        showErrorMessage=True,
    )
    yn_dv.add(f"H{first}:H{last}")
    ws.add_data_validation(yn_dv)

    ws.freeze_panes = "A5"


def build_weekly_summary(wb):
    ws = wb.create_sheet("Weekly Summary")
    set_col_widths(ws, [10, 16, 16, 16, 18, 20])
    title_row(ws, 1, "Weekly Summary — Director sign-off", 6)

    header_row(ws, 3, ["Week #", "Week Start", "Items Submitted", "Items Approved", "Total Payable £", "Paid Y/N"])

    for i in range(1, 13):
        r = 3 + i
        body_cell(ws, r, 1, value=f"W{i}", align=CENTER, font=BODY_BOLD)
        body_cell(ws, r, 2, fmt="yyyy-mm-dd", align=CENTER, fill=FILL_LIGHT)
        body_cell(ws, r, 3, align=CENTER)
        body_cell(ws, r, 4, align=CENTER)
        body_cell(ws, r, 5, align=CENTER, fmt='"£"#,##0.00', fill=FILL_LIGHT)
        body_cell(ws, r, 6, align=CENTER, fill=FILL_LIGHT)

    paid_dv = DataValidation(type="list", formula1='"Y,N"', allow_blank=True)
    paid_dv.add("F4:F15")
    ws.add_data_validation(paid_dv)

    note = 17
    ws.cell(row=note, column=1, value="Fill this each Friday after reviewing the Weekly Tracker. Copy totals from the tracker bottom row.").font = Font(italic=True, color=GREY)
    ws.merge_cells(start_row=note, start_column=1, end_row=note, end_column=6)


def build_monthly(wb):
    ws = wb.create_sheet("Monthly Roll-up")
    set_col_widths(ws, [14, 16, 18, 18, 18, 18])
    title_row(ws, 1, "Monthly Roll-up", 6)
    header_row(ws, 3, ["Month", "Weeks Reported", "Items Approved", "Total Paid £", "Avg / Week £", "Notes"])

    months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"]
    for i, m in enumerate(months, start=4):
        body_cell(ws, i, 1, m, font=BODY_BOLD, align=CENTER)
        body_cell(ws, i, 2, align=CENTER, fill=FILL_LIGHT)
        body_cell(ws, i, 3, align=CENTER, fill=FILL_LIGHT)
        body_cell(ws, i, 4, align=CENTER, fmt='"£"#,##0.00', fill=FILL_LIGHT)
        body_cell(ws, i, 5, value=f'=IFERROR(D{i}/B{i},"")', align=CENTER, fmt='"£"#,##0.00')
        body_cell(ws, i, 6)


def build_credentials(wb):
    ws = wb.create_sheet("Links & Credentials")
    set_col_widths(ws, [22, 40, 26, 22, 22, 26])
    title_row(ws, 1, "Links & Credentials", 6)

    # warning banner
    ws.row_dimensions[2].height = 32
    ws.cell(row=2, column=1, value=(
        "DO NOT COMMIT REAL PASSWORDS TO GIT. "
        "Use 1Password / Bitwarden for actual credential storage. "
        "This template should remain blank in the password column when committed."
    ))
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=6)
    c = ws.cell(row=2, column=1)
    c.font = WARN
    c.fill = FILL_RED
    c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

    # public links section
    ws.cell(row=4, column=1, value="Public profile links (safe to share)").font = H2
    ws.cell(row=4, column=1).fill = FILL_NAVY
    ws.merge_cells(start_row=4, start_column=1, end_row=4, end_column=6)
    ws.row_dimensions[4].height = 22

    header_row(ws, 5, ["Service", "URL", "Handle / Page name", "Notes", "Owner", "Last Updated"])

    public_services = [
        "2VP Website",
        "Instagram",
        "Facebook page",
        "TikTok",
        "Google My Business",
        "YouTube (if any)",
        "LinkedIn (company)",
    ]
    for i, s in enumerate(public_services, start=6):
        body_cell(ws, i, 1, s, font=BODY_BOLD)
        for col in range(2, 7):
            body_cell(ws, i, col, fill=FILL_LIGHT)

    # credentials section
    cred_start = 6 + len(public_services) + 2
    ws.cell(row=cred_start, column=1, value="Credentials (LEAVE BLANK in committed copy)").font = H2
    ws.cell(row=cred_start, column=1).fill = FILL_RED
    ws.merge_cells(start_row=cred_start, start_column=1, end_row=cred_start, end_column=6)
    ws.row_dimensions[cred_start].height = 22

    header_row(ws, cred_start + 1, ["Service", "Login URL", "Username / Email", "Password", "2FA method", "Last Updated"])

    cred_services = [
        "Website admin (WordPress / CMS)",
        "Hosting panel",
        "Domain registrar",
        "Instagram",
        "Facebook page",
        "TikTok",
        "Google My Business",
        "Google Workspace / email",
        "Certatech account",
        "Snap Website account",
        "Ad accounts (Google Ads)",
        "Ad accounts (Meta Ads)",
    ]
    for i, s in enumerate(cred_services, start=cred_start + 2):
        body_cell(ws, i, 1, s, font=BODY_BOLD)
        body_cell(ws, i, 2, fill=FILL_LIGHT)
        body_cell(ws, i, 3, fill=FILL_LIGHT)
        # password column kept blank, marked
        c = body_cell(ws, i, 4, value="(blank — store in password manager)", align=CENTER)
        c.font = Font(italic=True, color=GREY)
        body_cell(ws, i, 5, fill=FILL_LIGHT)
        body_cell(ws, i, 6, fill=FILL_LIGHT, fmt="yyyy-mm-dd")


def build():
    wb = Workbook()
    wb.remove(wb.active)
    build_readme(wb)
    build_rate_card(wb)
    build_weekly_tracker(wb)
    build_weekly_summary(wb)
    build_monthly(wb)
    build_credentials(wb)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    wb.save(OUTPUT)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
