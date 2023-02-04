const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", function () {
    const value = input.value;
    if (value != "") {
        const listItem = document.createElement("li");
        listItem.textContent = value;

        const listButton = document.createElement("button");
        listButton.textContent = "X";
        listItem.append(listButton);

        list.append(listItem);

        listButton.addEventListener("click", function () {
            list.removeChild(listItem);
        });
        input.value = "";
    }
    input.focus();
});
