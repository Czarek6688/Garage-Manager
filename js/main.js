let addCarButton = document.getElementById("add-car");
let brand = document.getElementById("brand");
let model = document.getElementById("model");
let year = document.getElementById("year");
let mileage = document.getElementById("mileage");
let price = document.getElementById("price");
let carList = document.getElementById("car-list");

addCarButton.addEventListener("click", function () {
  if (
    brand.value.trim() === "" ||
    model.value.trim() === "" ||
    year.value.trim() === "" ||
    mileage.value.trim() === "" ||
    price.value.trim() === ""
  ) {
    alert("Wpisz dane");
    return;
  }
  const newItem = document.createElement("li");
  newItem.textContent = `Marka: ${brand.value} | Model: ${model.value} | Rok: ${year.value} | Przebieg: ${mileage.value} | Cena: ${price.value}`;
  newItem.classList.add("new-li");
  carList.appendChild(newItem);
});
