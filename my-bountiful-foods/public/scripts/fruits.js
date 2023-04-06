const url = "./data/fruits.json";
const orderDrinkButton = document.getElementById("order-drink");

var fruitData = {};

const populateSummary = (fruitData) => {
    const summarySection = document.getElementById("summary");
    if (summarySection) {
        // Read the URL Search parameters and populate Summary section.
        const urlParams = new URLSearchParams(window.location.search);
        const contactName = urlParams.get("contact-name");
        const contactEmail = urlParams.get("contact-email");
        const contactPhone = urlParams.get("contact-phone");
        const fruit1 = urlParams.get("fruit1");
        const fruit2 = urlParams.get("fruit2");
        const fruit3 = urlParams.get("fruit3");
        const specialInstructions = urlParams.get("special-instructions");

        if (contactName && contactEmail) {
            let carbohydrates = 0.0;
            let protein = 0.0;
            let fat = 0.0;
            let sugar = 0.0;
            let calories = 0;

            const listElement = document.createElement("ul");
            const itemName = document.createElement("li");
            itemName.innerText = `Contact Name: ${contactName}`;
            listElement.appendChild(itemName);

            const itemEmail = document.createElement("li");
            itemEmail.innerText = `Contact Email: ${contactEmail}`;
            listElement.appendChild(itemEmail);

            if (contactPhone) {
                const itemPhone = document.createElement("li");
                itemPhone.innerText = `Contact Phone: ${contactPhone}`;
                listElement.appendChild(itemPhone);
            }
            if (fruit1) {
                const selectedFruit = fruitData[fruit1];
                carbohydrates += selectedFruit.nutritions.carbohydrates;
                protein += selectedFruit.nutritions.protein;
                fat += selectedFruit.nutritions.fat;
                sugar += selectedFruit.nutritions.sugar;
                calories += selectedFruit.nutritions.calories;
            }
            if (fruit2) {
                const selectedFruit = fruitData[fruit2];
                carbohydrates += selectedFruit.nutritions.carbohydrates;
                protein += selectedFruit.nutritions.protein;
                fat += selectedFruit.nutritions.fat;
                sugar += selectedFruit.nutritions.sugar;
                calories += selectedFruit.nutritions.calories;
            }
            if (fruit3) {
                const selectedFruit = fruitData[fruit3];
                carbohydrates += selectedFruit.nutritions.carbohydrates;
                protein += selectedFruit.nutritions.protein;
                fat += selectedFruit.nutritions.fat;
                sugar += selectedFruit.nutritions.sugar;
                calories += selectedFruit.nutritions.calories;
            }
            if (specialInstructions) {
                const itemSpecialInstructions = document.createElement("li");
                itemSpecialInstructions.innerText = `Special Instructions: ${specialInstructions}`;
                listElement.appendChild(itemSpecialInstructions);
            }

            // Now add the values from the fruits selected.
            const itemCarbohydrates = document.createElement("li");
            itemCarbohydrates.innerText = `Carbohydrates: ${carbohydrates}`;
            listElement.appendChild(itemCarbohydrates);
            const itemProtein = document.createElement("li");
            itemProtein.innerText = `Protein: ${protein}`;
            listElement.appendChild(itemProtein);
            const itemFat = document.createElement("li");
            itemFat.innerText = `Fat: ${fat}`;
            listElement.appendChild(itemFat);
            const itemSugar = document.createElement("li");
            itemSugar.innerText = `Sugar: ${sugar}`;
            listElement.appendChild(itemSugar);
            const itemCalories = document.createElement("li");
            itemCalories.innerText = `Calories: ${calories}`;
            listElement.appendChild(itemCalories);

            summarySection.appendChild(listElement);

            const paragraph = document.createElement("p");
            paragraph.innerText = `Thank you for your order. You will be contacted when it is ready.`;
            summarySection.appendChild(paragraph);
        }
    }
};

if (orderDrinkButton) {
    orderDrinkButton.addEventListener("click", populateSummary);
}

const populateFruitsForm = (data) => {

    const selectFruit1 = document.getElementById("fruit1");
    const selectFruit2 = document.getElementById("fruit2");
    const selectFruit3 = document.getElementById("fruit3");


    data.forEach(
        (entry) => {
            // Build the records of Fruit data

            // {
            //     "genus": "Malus",
            //     "name": "Apple",
            //     "id": 6,
            //     "family": "Rosaceae",
            //     "order": "Rosales",
            //     "nutritions": {
            //       "carbohydrates": 11.4,
            //       "protein": 0.3,
            //       "fat": 0.4,
            //       "calories": 52,
            //       "sugar": 10.3
            //     }
            //   },
            fruitData[entry.id] = entry;

            // Now build the option elements for each of the 3 select elements.
            const fruit1 = document.createElement("option");
            fruit1.value = `${entry.id}`;
            fruit1.textContent = `${entry.name}`;
            selectFruit1.appendChild(fruit1);

            const fruit2 = document.createElement("option");
            fruit2.value = `${entry.id}`;
            fruit2.textContent = `${entry.name}`;
            selectFruit2.appendChild(fruit2);

            const fruit3 = document.createElement("option");
            fruit3.value = `${entry.id}`;
            fruit3.textContent = `${entry.name}`;
            selectFruit3.appendChild(fruit3);
        } // end of forEach loop
    );

    // Now populate the summary if anything was submitted on the URL.

    populateSummary(fruitData);
}; // end of function expression

async function loadFruitData() {
    const response = await fetch(url);
    const data = await response.json();

    populateFruitsForm(data);
}

loadFruitData();

