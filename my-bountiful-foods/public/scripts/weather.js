// Display weather.
const eTemperature = document.querySelector("#w-temperature");
const eConditions = document.querySelector("#w-conditions");
const eWindSpeed = document.querySelector("#w-wind-speed");
const eWindChill = document.querySelector("#w-wind-chill");
const eHumidity = document.querySelector("#w-humidity");

// Dummy data.
// Wrap the elements in if statements so no error is generated
// if the element isn't included on the HTML page.
if (eTemperature) {
    eTemperature.innerText = "N/A";
}
if (eConditions) {
    eConditions.innerText = "n/a";
}
if (eWindSpeed) {
    eWindSpeed.innerText = "N/A";
}
if (eWindChill) {
    eWindChill.innerText = "N/A";
}
if (eHumidity) {
    eHumidity.innerText = "N/A";
}

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
    // const currentPressure = weatherData.main.pressure.toFixed(0);
    const currentWindSpeed = weatherData.wind.speed.toFixed(1);
    let currentWindChill = "N/A";

    if (currentTemp <= 50 && currentWindSpeed > 3) {
        currentWindChill = `${calculateWindChill(
            currentTemp,
            currentWindSpeed
        )}°F`;
    }

    conditionsHTML = "";
    weatherData.weather.forEach((currentCondition) => {
        const currentIcon = `https://openweathermap.org/img/w/${currentCondition.icon}.png`;
        const currentDesc = toTitleCase(currentCondition.description);

        conditionsHTML += `<img class="w-icon" src="${currentIcon}" alt="Image for current weather" loading="lazy" height="50" width="50"> ${currentDesc}<br>`;
    });

    if (eTemperature) {
        eTemperature.innerHTML = `${currentTemp}°F`;
    }
    if (eConditions) {
        eConditions.innerHTML = conditionsHTML;
    }
    if (eWindSpeed) {
        eWindSpeed.innerHTML = `${currentWindSpeed}mph`;
    }
    if (eWindChill) {
        eWindChill.innerHTML = `${currentWindChill}`;
    }
    if (eHumidity) {
        eHumidity.innerHTML = `${currentHumidity}%`;
    }
}

// Weather API provided by OpenWeather (TM), under Creative Commons Attribution-ShareAlike 4.0 International license (CC BY-SA 4.0) https://creativecommons.org/licenses/by-sa/4.0/.
// Data and database are open and licensed by Open Data Commons Open Database License (ODbL) https://opendatacommons.org/licenses/odbl/.
async function apiFetchWeather(cityID, specialValue) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=imperial&appid=${specialValue}`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        // console.table(data); // Uncomment this for testing the call
        displayResults(data);
    } else {
        throw Error(await response.text());
    }
}

// Weather for Legacy Ranch Valley is the same as Herriman, UT  USA.
const carlsbadID = "5334223";
const herrimanID = "5775782";
apiFetchWeather(carlsbadID, importantValueThatBelongsToMe);

// Use OpenWeatherMap.org for forcast widget.
if (document.querySelector("#openweathermap-widget-11")) {
    // Following code was supplied by OpenWeatherMap.org.
    window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
    window.myWidgetParam.push({
        id: 11,
        cityid: carlsbadID,
        appid: importantValueThatBelongsToMe,
        units: "imperial",
        containerid: "openweathermap-widget-11",
    });
    (function () {
        var script = document.createElement("script");
        script.async = true;
        script.charset = "utf-8";
        script.src =
            "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(script, s);
    })();
}
