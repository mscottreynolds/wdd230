const url = "data/data.json";
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("div.cards");

gridbutton.addEventListener("click", () => {
    // example using arrow function
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
}

const membershipToText = (level) => {
    let membership = "n/a";
    if (level == "np") {
        membership = "Non Profit Organization";
    } else if (level == "bronze") {
        membership = "Bronze";
    } else if (level == "silver") {
        membership = "Silver";
    } else if (level == "gold") {
        membership = "Gold";
    }
    return membership;
};

const displayDirectory = (directory) => {
    // console.log(directory);
    // console.log("table follows:");
    // console.table(directory); // note that we reference the prophet array of the data object given the structure of the json file

    const cards = document.querySelector("div.cards"); // select the output container element

    directory.forEach(
        (entry) => {
            // console.log(entry);
            // Create elements to add to the div.cards element
            const card = document.createElement("section");
            const name = document.createElement("h3");
            const description = document.createElement("p");
            const picture = document.createElement("img");
            const infoList = document.createElement("ul");
            const address = document.createElement("li");
            const cityStateZip = document.createElement("li");
            const phone = document.createElement("li");
            // const url = document.createElement("");
            const href = document.createElement("a");
            const membershipLevel = document.createElement("li");

            // "name": "Worship Services",
            // "address": "124 Legacy Ranch Ln.",
            // "city": "Legacy Ranch",
            // "state": "UT",
            // "zip": "84000",
            // "phone": "234-555-6790",
            // "url": "https://worship.legacyranch.group",
            // "imageurl": "images/worship.webp",
            // "membershipLevel": "np",
            // "description": "Come worship with us."

            name.textContent = `${entry.name}`;
            description.textContent = `${entry.description}`;
            picture.setAttribute("src", entry.imageurl);
            picture.setAttribute("alt", entry.description);
            picture.setAttribute("loading", "lazy");
            picture.setAttribute("width", "200");
            address.textContent = `${entry.address}`;
            cityStateZip.textContent = `${entry.city}, ${entry.state}  ${entry.zip}`;
            phone.textContent = `${entry.phone}`;
            membershipLevel.textContent = `${membershipToText(
                entry.membershipLevel
            )}`;

            href.setAttribute("href", entry.url);
            href.textContent = `Website`;
            href.setAttribute("target", "_blank");
            // url.appendChild(href);

            // infoList.appendChild(description);
            infoList.appendChild(address);
            infoList.appendChild(cityStateZip);
            infoList.appendChild(phone);
            // infoList.appendChild(membershipLevel);
            // infoList.appendChild(url);

            // Append the section(card) with the created elements
            card.appendChild(picture);
            card.appendChild(description);
            card.appendChild(name);
            card.appendChild(infoList);
            card.appendChild(href);

            cards.appendChild(card);
        } // end of forEach loop
    );
}; // end of function expression

async function getDirectoryData() {
    const response = await fetch(url);
    const data = await response.json();

    displayDirectory(data.directory);
}

getDirectoryData();
