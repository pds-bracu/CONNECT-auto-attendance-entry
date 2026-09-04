# Auto Attendance Entry in CONNECT

## Overview

This script automates the process of entering attendance (absences) into the CONNECT system. **The order of the dates does not matter.** The script compares student IDs against those enrolled in CONNECT to ensure accurate attendance assignment, and **any student ID not listed as absent is automatically marked Present**. Any date or student ID that doesn't match CONNECT's records is simply skipped.

## Features

- Automatically detects and matches student IDs from your attendance sheet with those in CONNECT.
- Marks every student not explicitly listed as absent as **Present** by default.
- Supports multiple absence dates in a single run.
- Skips any unmatched/incorrect date or student ID without throwing an error.
- Allows overwriting previously entered attendance by rerunning the script.
- Automatically scrolls the page to bring the relevant button into view before clicking.
- Simple execution process (watch the attached demonstration video for guidance).

## Usage

### Step 1: Fill in the Attendance Google Sheet

- Make a copy of the provided **Attendance Record** template.
- Fill in your attendance data by following the instructions written inside the sheet itself.
- Use the formula provided in the sheet (in any cell) to automatically generate the `allAbsences` dictionary from your data.

### Step 2: Execute the Script

- Go to `CONNECT` → `Login` → `Exam Controller` → `Class Attendance` → select `Semester`, `Academic Degree`, `Course`, and `Section` → `Attendance Entry` → `3-dot menu` → `Developer Tools` (`Ctrl + Shift + I`)
- Navigate to the `Sources` tab
- In the left pane (may be hidden, click `>>` if needed), go to `Snippets`
- Create a **New Snippet**
- Paste the entire [script](script.js)
- Copy the cell where the formula was applied in your Google Sheet
- Paste and replace **lines 12–17** (the `allAbsences` block) in the script with the content copied from your sheet. If the pasted content is wrapped in double quotes (`" "`), **remove them** before running
- Press `Ctrl + Enter` to run the [script](script.js)
- Verify and **Save** the attendance in CONNECT

## Notes

- Any student ID **not** listed under a date in `allAbsences` is automatically marked **Present** for that date.
- The order of dates inside `allAbsences` does not matter.
- Any date or student ID that doesn't match CONNECT's records is silently skipped — no error is thrown.
- If you need to rerun the script (e.g., to fix a mistake), **always refresh the page first**. The page can occasionally lag to load, and rerunning without refreshing may cause errors as the script gets ahead of the page.
- Removing a student ID from a date's list and rerunning the script **will mark that student Present again** for that date.
- After running the [script](script.js), you can still **manually modify attendance** until final submission.
- The [script](script.js) edits the page dynamically. **Always verify attendance manually** before submitting.
- Don't trust the [script](script.js) 100% - **double-check that all attendance is entered correctly** for each student.

## License

This project is open-source and available for use and modification as needed.

## Disclaimer

Use at your own risk. The author is not responsible for any issues arising from misuse of the script.

🔗 Refer to this [video](#) if you need help.
