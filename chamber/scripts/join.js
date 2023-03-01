/* Update date-time on the submit form. */
(function () {
    const now = new Date();
    const joinDateTime = document.getElementById("date-time");

    joinDateTime.value=now.getTime();
})();
