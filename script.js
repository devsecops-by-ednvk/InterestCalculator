/* ------------ CALCULATION LOGIC (unchanged) ------------ */
let SimComEl = document.getElementById("SimCom");

let amountInputEl = document.getElementById("amountInput");
let rateInputEl = document.getElementById("rateInput");

let dayGivenInputValueEl = document.getElementById("dayGivenInputValue");
let monthGivenInputValueEl = document.getElementById("monthGivenInputValue");
let yearGivenInputValueEl = document.getElementById("yearGivenInputValue");

let dayRetInputValueEl = document.getElementById("dayRetInputValue");
let monthRetInputValueEl = document.getElementById("monthRetInputValue");
let yearRetInputValueEl = document.getElementById("yearRetInputValue");

let backYearEl = document.getElementById("backYear");
let backMonthEl = document.getElementById("backMonth");
let backDayEl = document.getElementById("backDay");

let interestEl = document.getElementById("interest");
let finalAmountEl = document.getElementById("finalAmount");
let resultMsgEl = document.getElementById("resultMsg");

let selectedInterest = null;
let days = 0,
    months = 0,
    years = 0,
    totalNumDays = 0;
let simpleInterest = 0,
    compoundInterest = 0,
    compoundYearlyInterest = 0,
    totalAmount = 0;

function todaysDate() {
    const today = new Date();
    dayRetInputValueEl.value = today.getDate();
    monthRetInputValueEl.value = today.getMonth() + 1;
    yearRetInputValueEl.value = today.getFullYear();
}

function movetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

function calculateCompoundInterest(days, months, years) {
    const principle = parseInt(amountInputEl.value);
    const rate = parseFloat(rateInputEl.value);

    compoundYearlyInterest = Math.pow(1 + rate / 100, years) * principle;
    const totalRemDays = months * 30 + days;

    compoundInterest =
        (((compoundYearlyInterest * (rate / 100)) / 12) / 30) * totalRemDays +
        compoundYearlyInterest - principle;

    totalAmount = principle + compoundInterest;
    interestEl.textContent = Math.round(compoundInterest).toFixed(2);
    finalAmountEl.textContent = Math.round(totalAmount);
}

function calculateSimpleInterest(days, months, years, totalNumDays) {
    const principle = parseInt(amountInputEl.value);
    const rate = parseFloat(rateInputEl.value);

    simpleInterest = (principle * (rate / 100) / 360) * totalNumDays;
    totalAmount = simpleInterest + principle;

    interestEl.textContent = Math.round(simpleInterest);
    finalAmountEl.textContent = Math.round(totalAmount);
}

function calculateTime() {
    let g_day = parseInt(dayGivenInputValueEl.value);
    let g_month = parseInt(monthGivenInputValueEl.value);
    let g_year = parseInt(yearGivenInputValueEl.value);

    let r_day = parseInt(dayRetInputValueEl.value);
    let r_month = parseInt(monthRetInputValueEl.value);
    let r_year = parseInt(yearRetInputValueEl.value);

    if (g_day > r_day) {
        days = r_day + 30 - g_day;
        r_month--;
    } else {
        days = r_day - g_day;
    }

    if (g_month > r_month) {
        months = r_month + 12 - g_month;
        r_year--;
    } else {
        months = r_month - g_month;
    }

    years = r_year - g_year;
    totalNumDays = years * 360 + months * 30 + days;

    backDayEl.textContent = days;
    backMonthEl.textContent = months;
    backYearEl.textContent = years;
}

SimComEl.addEventListener("change", e => {
    resultMsgEl.textContent = "";
    selectedInterest = e.target.value;
});

function calculatingButton() {
    if (!selectedInterest || selectedInterest === "none") {
        alert("Please fill the required fields");
        resultMsgEl.textContent = "Please select the interest type";
        resultMsgEl.style.color = "#dc3545";
        return;
    }

    calculateTime();

    if (selectedInterest === "SimpleInterest") {
        calculateSimpleInterest(days, months, years, totalNumDays);
    } else if (selectedInterest === "CompoundInterest") {
        calculateCompoundInterest(days, months, years);
    }
}

function resetButton() {
    amountInputEl.value = rateInputEl.value = "";
    dayGivenInputValueEl.value = monthGivenInputValueEl.value = yearGivenInputValueEl.value = "";
    dayRetInputValueEl.value = monthRetInputValueEl.value = yearRetInputValueEl.value = "";

    interestEl.textContent = finalAmountEl.textContent = "";
    backDayEl.textContent = backMonthEl.textContent = backYearEl.textContent = "";
    resultMsgEl.textContent = "";
}
