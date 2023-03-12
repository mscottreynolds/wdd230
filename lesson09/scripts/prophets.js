const url =
    "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";

const displayProphets = (prophets) => {
    // console.log(prophets);
    // console.log("table follows:");
    // console.table(prophets); // note that we reference the prophet array of the data object given the structure of the json file

    const cards = document.querySelector("div.cards"); // select the output container element

    prophets.forEach(
        (prophet) => {
            // Create elements to add to the div.cards element
            let card = document.createElement("section");
            let h2 = document.createElement("h2");
            let portrait = document.createElement("img");
            let birthdate = document.createElement("p");
            let birthplace = document.createElement("p");

            // Build the h2 content out to show the prophet's full name - finish the template string
            h2.textContent = `${prophet.name} ${prophet.lastname}`;

            birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
            birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

            // Build the image portrait by setting all the relevant attribute
            portrait.setAttribute("src", prophet.imageurl);
            portrait.setAttribute(
                "alt",
                `Portait of ${prophet.name} ${prophet.lastname}`
            );
            portrait.setAttribute("loading", "lazy");
            // portrait.setAttribute("width", "324");
            portrait.setAttribute("height", "200");

            // Append the section(card) with the created elements
            card.appendChild(h2);
            card.appendChild(birthdate);
            card.appendChild(birthplace);
            card.appendChild(portrait);

            cards.appendChild(card);
        } // end of forEach loop
    );
}; // end of function expression

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();

    displayProphets(data.prophets);
}

getProphetData();
