// Spotlight two to three chamber members who have silver or gold status.
// Pick at random.

const url = "data/data.json";

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

const displaySpotlight = (directory) => {
    // console.log(directory);
    // console.log("table follows:");
    // console.table(directory);

    const cards = document.querySelector("#spotlight div.cards"); // select the output container element

    let spotlightCount = 0;
    const filtered = directory
        .filter((item) => {
            return (item.membershipLevel == "silver" || item.membershipLevel == "gold");
        });
    // console.log(`filtered = ${filtered}`);
    // console.table(filtered);
    filtered.forEach(
            (entry) => {
                const random = Math.random() >= 0.5;
                if (random && spotlightCount < 2) {
                    // Display two random records to spotlight.
                    spotlightCount += 1;
                    // console.log(entry);
                    // Create elements to add to the div.cards element
                    const card = document.createElement("section");
                    const name = document.createElement("h3");
                    const description = document.createElement("p");
                    const picture = document.createElement("img");
                    picture.setAttribute("class", "box-shadow");
                    const infoList = document.createElement("ul");
                    const address = document.createElement("li");
                    const cityStateZip = document.createElement("li");
                    const phone = document.createElement("li");
                    const href = document.createElement("a");
                    // const membershipLevel = document.createElement("li");

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
                    picture.setAttribute("width", "100");
                    address.textContent = `${entry.address}`;
                    cityStateZip.textContent = `${entry.city}, ${entry.state}  ${entry.zip}`;
                    phone.textContent = `${entry.phone}`;
                    // membershipLevel.textContent = `${membershipToText(
                    //     entry.membershipLevel
                    // )}`;

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
                    card.appendChild(name);
                    card.appendChild(picture);
                    card.appendChild(description);
                    card.appendChild(infoList);
                    // card.appendChild(address);
                    // card.appendChild(cityStateZip);
                    card.appendChild(href);

                    cards.appendChild(card);
                }
            
            } // end of forEach loop
        );
}; // end of function expression

async function getDirectoryData() {
    const response = await fetch(url);
    const data = await response.json();

    displaySpotlight(data.directory);
}

getDirectoryData();
