// Current date, Day of week, date month year format, or UK format.
const now = new Date();
const current_date = document.querySelector("#current-date");
const fulldateUK = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
}).format(now);
current_date.innerHTML = fulldateUK;

// Set the year for the copyright.
const copyright_year = document.querySelector("#copyright-year");
const year = now.getFullYear();
copyright_year.innerHTML = `${year}`;

// Set the last modified date.
const last_modified = document.querySelector("#last-modified");
last_modified.innerHTML = `${document.lastModified}`;

const toggleMenu = function () {
    console.log("It worked!");
    document.querySelector("#primaryNav").classList.toggle("open");
    document.querySelector("#hamburgerBtn").classList.toggle("open");
};

const hamburgerBtn = document.getElementById("hamburgerBtn");
hamburgerBtn.onclick = toggleMenu;
