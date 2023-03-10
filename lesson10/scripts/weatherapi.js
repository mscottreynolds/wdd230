// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherCondition = document.querySelector("#current-condition");

const importantValueThatBelongsToMe = "1eac79489b024d011d9f9333a77ad7d3";
const herrimanWeatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q=herriman&units=imperial&appid=";
const fairbanksWeatherApi =
    "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=";

async function apiFetch() {
    try {
        const url = `${fairbanksWeatherApi}${importantValueThatBelongsToMe}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // this is for testing the call
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(
        0
    )}</strong>`;

    let conditionHTML = "";

    weatherData.weather.forEach((currentCondition) => {
        const iconsrc = `https://openweathermap.org/img/w/${currentCondition.icon}.png`;
        const desc = toTitleCase(currentCondition.description);
        conditionHTML += `<figure><img src="${iconsrc}" alt="${desc}"><figcaption></figcaption>${desc}</figure>`;
    });
    weatherCondition.innerHTML = conditionHTML;
}

apiFetch();
