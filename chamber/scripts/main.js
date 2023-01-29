// Current date
const d = new Date();
const current_date = document.querySelector("#current-date");
current_date.innerHTML = d;

// Set the year for the copyright.
const copyright_year = document.querySelector("#copyright-year");
const year = d.getFullYear();
copyright_year.innerHTML = `${year}`;

// Set the last modified date.
const last_modified = document.querySelector("#last-modified");
last_modified.innerHTML = `${document.lastModified}`;