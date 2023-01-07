// Set the year for the copyright.
const copyright_year = document.querySelector("#copyright-year");
const d = new Date();
const year = d.getFullYear();
copyright_year.innerHTML = `${year}`;

// Set the last modified date.
const last_modified = document.querySelector("#last-modified");
last_modified.innerHTML = `${document.lastModified}`;