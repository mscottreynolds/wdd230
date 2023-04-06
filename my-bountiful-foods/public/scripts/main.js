// Current date, Day of week, date month year format, or UK format.
const now = new Date();
const current_date = document.querySelector("#current-date");
if (current_date) {
    const fulldateUK = new Intl.DateTimeFormat("en-UK", {
        dateStyle: "full",
    }).format(now);
    current_date.innerHTML = fulldateUK;
}

// Set the year for the copyright.
const copyright_year = document.querySelector("#copyright-year");
if (copyright_year) {
    const year = now.getFullYear();
    copyright_year.innerHTML = `${year}`;
}

// Set the last modified date.
const last_modified = document.querySelector("#last-modified");
if (last_modified) {
    last_modified.innerHTML = `${document.lastModified}`;
}

const toggleMenu = function () {
    document.querySelector("#primaryNav").classList.toggle("open");
    document.querySelector("#hamburgerBtn").classList.toggle("open");
};

const hamburgerBtn = document.getElementById("hamburgerBtn");
if (hamburgerBtn) {
    hamburgerBtn.onclick = toggleMenu;
}

/* Update number of drinks ordered card.5 */
(function () {
    const numberOfDrinksOrdered = document.querySelector(
        "#total-drinks-ordered"
    );
    if (numberOfDrinksOrdered) {
        let currentNumber = Number(
            window.localStorage.getItem("number-drinks-ordered")
        );
        numberOfDrinksOrdered.textContent = `Total number of drinks ordered: ${currentNumber}`;
    }
})();
