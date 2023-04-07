const url = "./data/fruits.json";
const orderDrinkButton = document.getElementById("order-drink");

const buildFruitData = (data) => {
    const fruitData = [];
    data.forEach((entry) => {
        // Build the records of Fruit data:
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
        //   }
        fruitData[entry.id] = entry;
    });
    return fruitData;
};

const populateSummary = (fruitData) => {
    const summarySection = document.getElementById("summary");
    if (summarySection) {
        const contactName = document.getElementById("contact-name");
        const contactEmail = document.getElementById("contact-email");
        const contactPhone = document.getElementById("contact-phone");
        const fruit1 = document.getElementById("fruit1");
        const fruit2 = document.getElementById("fruit2");
        const fruit3 = document.getElementById("fruit3");
        const specialInstructions = document.getElementById(
            "special-instructions"
        );

        if (contactName.value && contactEmail.value) {
            let carbohydrates = 0.0;
            let protein = 0.0;
            let fat = 0.0;
            let sugar = 0.0;
            let calories = 0;

            const listElement = document.createElement("ul");

            const itemOrderDate = document.createElement("li");

            const orderDate = new Date();
            const fulldateUK = new Intl.DateTimeFormat("en-UK", {
                dateStyle: "full",
            }).format(orderDate);
            itemOrderDate.innerText = `Order Date: ${fulldateUK}`;
            listElement.appendChild(itemOrderDate);

            const itemName = document.createElement("li");
            itemName.innerText = `Contact Name: ${contactName.value}`;
            listElement.appendChild(itemName);

            const itemEmail = document.createElement("li");
            itemEmail.innerText = `Contact Email: ${contactEmail.value}`;
            listElement.appendChild(itemEmail);

            if (contactPhone.value) {
                const itemPhone = document.createElement("li");
                itemPhone.innerText = `Contact Phone: ${contactPhone}`;
                listElement.appendChild(itemPhone);
            }
            if (fruit1.value) {
                const selectedFruit = fruitData[fruit1.value];
                carbohydrates += selectedFruit.nutritions.carbohydrates;
                protein += selectedFruit.nutritions.protein;
                fat += selectedFruit.nutritions.fat;
                sugar += selectedFruit.nutritions.sugar;
                calories += selectedFruit.nutritions.calories;
            }
            if (fruit2.value) {
                const selectedFruit = fruitData[fruit2.value];
                carbohydrates += selectedFruit.nutritions.carbohydrates;
                protein += selectedFruit.nutritions.protein;
                fat += selectedFruit.nutritions.fat;
                sugar += selectedFruit.nutritions.sugar;
                calories += selectedFruit.nutritions.calories;
            }
            if (fruit3.value) {
                const selectedFruit = fruitData[fruit3.value];
                carbohydrates += selectedFruit.nutritions.carbohydrates;
                protein += selectedFruit.nutritions.protein;
                fat += selectedFruit.nutritions.fat;
                sugar += selectedFruit.nutritions.sugar;
                calories += selectedFruit.nutritions.calories;
            }
            if (specialInstructions.value) {
                const itemSpecialInstructions = document.createElement("li");
                itemSpecialInstructions.innerText = `Special Instructions: ${specialInstructions.value}`;
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

            // Update the total number of drinks ordered.
            let currentNumber = Number(
                window.localStorage.getItem("number-drinks-ordered")
            );
            currentNumber += 1;
            localStorage.setItem("number-drinks-ordered", currentNumber);
            let numberOfDrinksOrdered = `Total number of drinks ordered: ${currentNumber}`;

            // store the new number of visits value
            localStorage.setItem("number-drinks-ordered", currentNumber);

            summarySection.appendChild(listElement);

            const paragraph = document.createElement("p");
            paragraph.innerText = `Thank you for your order. You will be contacted when it is ready.`;
            summarySection.appendChild(paragraph);

            const paragraphDrinksOrdered = document.createElement("p");
            paragraphDrinksOrdered.innerText = numberOfDrinksOrdered;
            summarySection.appendChild(paragraphDrinksOrdered);
        }
    }
};

const populateFruitsForm = (fruitData) => {
    const selectFruit1 = document.getElementById("fruit1");
    const selectFruit2 = document.getElementById("fruit2");
    const selectFruit3 = document.getElementById("fruit3");

    fruitData.forEach(
        (entry) => {
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
}; // end of function expression

async function loadFruitData() {
    const response = await fetch(url);
    const data = await response.json();
    const fruitData = buildFruitData(data);
    populateFruitsForm(fruitData);
}

async function loadSummaryData() {
    const response = await fetch(url);
    const data = await response.json();
    const fruitData = buildFruitData(data);
    populateSummary(fruitData);
}

loadFruitData();

if (orderDrinkButton) {
    orderDrinkButton.addEventListener("click", loadSummaryData);
}
