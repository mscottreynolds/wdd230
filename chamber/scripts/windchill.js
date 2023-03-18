// Display weather.
const eTemperature = document.querySelector("#temperature");
// const ePressure = document.querySelector("#pressure");
const eConditions = document.querySelector("#conditions");
const eWindSpeed = document.querySelector("#wind-speed");
const eWindChill = document.querySelector("#wind-chill");
const eHumidity = document.querySelector("#humidity");

// Dummy data.
eTemperature.innerText = "N/A";
eWindSpeed.innerText = "N/A";
eWindChill.innerText = "N/A";

const importantValueThatBelongsToMe = "1eac79489b024d011d9f9333a77ad7d3";

// Change phrase to title case.
const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Calculate wind chill
// Note: https://www.weather.gov/media/epz/wxcalc/windChill.pdf
const calculateWindChill = (fahrenheit, mph) => {
    const windChill =
        35.74 +
        0.6215 * fahrenheit -
        35.75 * Math.pow(mph, 0.16) +
        0.4275 * fahrenheit * Math.pow(mph, 0.16);
    return windChill.toFixed(0);
};

// Display results from fetchWeather api call.
function displayResults(weatherData) {
    const currentTemp = weatherData.main.temp.toFixed(0);
    const currentHumidity = weatherData.main.humidity.toFixed(0);
    const currentPressure = weatherData.main.pressure.toFixed(0);
    const currentWindSpeed = weatherData.wind.speed.toFixed(1);
    let currentWindChill = "N/A";

    if (currentTemp <= 50 && currentWindSpeed > 3) {
        currentWindChill = `${calculateWindChill(currentTemp, currentWindSpeed)}°F`;
    }

    conditionsHTML = "";
    weatherData.weather.forEach((currentCondition) => {
        const currentIcon = `https://openweathermap.org/img/w/${currentCondition.icon}.png`;
        const currentDesc = toTitleCase(currentCondition.description);

        conditionsHTML += `<img src="${currentIcon}" alt="Image for current weather" loading="lazy" height="50"> ${currentDesc}<br>`;
    });

    eTemperature.innerHTML = `${currentTemp}°F`;
    // ePressure.innerHTML = `${currentPressure}hPa`;
    eConditions.innerHTML = conditionsHTML;
    eWindSpeed.innerHTML = `${currentWindSpeed}mph`;
    eWindChill.innerHTML = `${currentWindChill}`;
    eHumidity.innerHTML = `${currentHumidity}%`;
}

// Weather API provided by OpenWeather (TM), under Creative Commons Attribution-ShareAlike 4.0 International license (CC BY-SA 4.0) https://creativecommons.org/licenses/by-sa/4.0/.
// Data and database are open and licensed by Open Data Commons Open Database License (ODbL) https://opendatacommons.org/licenses/odbl/.

async function apiFetchWeather(urlAPI, specialValue) {
    try {
        const url = `${urlAPI}${specialValue}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data); // this is for testing the call
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Weather for Legacy Ranch Valley is the same as Herriman, UT  USA.
const herrimanWeatherAPI =
    "https://api.openweathermap.org/data/2.5/weather?q=herriman&units=imperial&appid=";

apiFetchWeather(herrimanWeatherAPI, importantValueThatBelongsToMe);
