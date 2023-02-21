/* Update last visit, or number of visits. */
(function () {
    const now = new Date();
    const visitsDisplay = document.querySelector("#last-visit");

    // get the stored value in localStorage
    let numVisits = Number(window.localStorage.getItem("visits-ls"));

    // determine if this is the first visit or display the number of visits.
    if (numVisits !== 0) {
        visitsDisplay.textContent = ` | Number of visits: ${numVisits}`;
    } else {
        visitsDisplay.textContent = ` | This is your first visit!`;
    }

    // increment the number of visits.
    numVisits++;
    // store the new number of visits value
    localStorage.setItem("visits-ls", numVisits);
})();
