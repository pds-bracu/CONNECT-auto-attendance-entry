// Go to CONNECT --> Login --> Exam Controller --> Class Attendance --> Select Semester, Academic Degree, Course, Section --> Attendance Entry --> 3-dot menu --> Developer Tools
// Developer Tools (Ctrl+Shift+I) -> Sources -> Left Pane (may be hidden, click >>) -> Snippets -> New Snippet
// Paste the entire script, then replace the "allAbsences" object below (lines 12 to 17) with the content copied from your Google Sheet
// Remove any enclosing double quotes (" ") if the pasted content includes them
// Ctrl + Enter to run
//
// NOTE: Any student ID NOT listed under a date is automatically marked PRESENT for that date
// NOTE: Order of dates does not matter; incorrect dates or student IDs are simply skipped
// NOTE: If rerunning the script, REFRESH the page first. It may occasionally lag to load and cause errors
// NOTE: Removing a student ID from a date's list and rerunning will mark that student PRESENT again

const rawAbsences = {
    "09-06-2026": ["1000054019", "1000055270", "24301321"],
    "14-06-2026": ["24101282"],
    "07-07-2026": ["23201047", "25121017"],
    "16-06-2026": ["1000054189", "1000055270", "24201302", "24301306"],
};

// const rawAbsences = {
//     "09-06-2026": [""],
//     "14-06-2026": [""],
//     "07-07-2026": [""],
//     "": [],
// };

const allAbsences = Object.fromEntries(Object.entries(rawAbsences).filter(([key]) => key !== ""));

let studentIds = await getStudentIds();
for(let j=0; j<Object.keys(allAbsences).length; j++) {
    await selectAClass(Object.keys(allAbsences)[j]);
    let presentAbsentButtons = await getPresentAbsentButtons(studentIds);
    await inputAttendance(studentIds, allAbsences[Object.keys(allAbsences)[j]], presentAbsentButtons);
    await save();
}

async function getStudentIds() {
    document.getElementById("mat-select-value-13").click();
    let classes = document.querySelectorAll(".mat-mdc-option");
    classes[1].click();
    await sleep(3000);
    let studentRows = document.querySelectorAll(".regular-student-row");
    for (let attempt=0; attempt<3; attempt++) {
        if (studentRows.length>0) {
            break;
        }
        await sleep(2000);
        studentRows = document.querySelectorAll(".regular-student-row");
    }
    const studentIds = [];
    
    for (let i=0; i<studentRows.length; i++) {
        studentIds.push(studentRows[i].querySelectorAll(".text-center")[0].textContent.trim());
    }
    return studentIds;
}

async function selectAClass(date) {
    document.getElementById("mat-select-value-13").click();
    classes = document.querySelectorAll(".mat-mdc-option");
    let str = " Regular Class - " + date + " 11:00 AM - 12:20 PM ";
    for(let m=1; m<classes.length; m++) {
        if (classes[m].textContent == str) {
            classes[m].click();
            await sleep(2000);
            break;
        }
    }
}

async function getPresentAbsentButtons(studentIds) {
    await sleep(1000);
    let presentAbsentButtons = document.querySelectorAll(".mdc-radio__native-control");
    for (let attempt=0; attempt<3; attempt++) {
        if (presentAbsentButtons.length >= studentIds.length*2) {
            break;
        }
        await sleep(5000);
        presentAbsentButtons = document.querySelectorAll(".mdc-radio__native-control");
    }
    return presentAbsentButtons;
}

async function inputAttendance(studentIds, absentStudentIds, presentAbsentButtons) {
    for (let k=0; k<studentIds.length; k++) {
        if (absentStudentIds.includes(studentIds[k])) {
            presentAbsentButtons[2*k+1].scrollIntoView({behavior: "smooth", block: "center"});
            await sleep(1000);
            presentAbsentButtons[2*k+1].click();
            await sleep(1000);
        }
        else {
            presentAbsentButtons[2*k].click();
        }
    }
}

async function save() {
    let save = document.querySelector(".btn.btn-primary");
    save.scrollIntoView({behavior: "smooth", block: "center"});
    await sleep(1000);
    save.click();
    await sleep(3000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
