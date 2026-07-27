let addCarButton = document.getElementById("add-car");
let brand = document.getElementById("brand");
let model = document.getElementById("model");
let year = document.getElementById("year");
let mileage = document.getElementById("mileage");
let price = document.getElementById("price");
let carList = document.getElementById("car-list");
let searchInput = document.getElementById("search-car");

const displayData = function () {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];

  carList.innerHTML = "";

  cars.forEach(function (car, index) {
    const newItem = document.createElement("li");

    newItem.textContent = `Marka: ${car.brand} | Model: ${car.model} | Rok: ${car.year} | Przebieg: ${car.mileage} km | Cena: ${car.price} zł`;

    newItem.classList.add("new-li");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("delete-button");

    newItem.appendChild(deleteButton);
    carList.appendChild(newItem);

    deleteButton.addEventListener("click", function () {
      const cars = JSON.parse(localStorage.getItem("cars")) || [];

      cars.splice(index, 1);

      localStorage.setItem("cars", JSON.stringify(cars));

      displayData();
    });
  });
};

addCarButton.addEventListener("click", function () {
  if (
    brand.value.trim() === "" ||
    model.value.trim() === "" ||
    year.value.trim() === "" ||
    mileage.value.trim() === "" ||
    price.value.trim() === ""
  ) {
    alert("Wpisz wszystkie dane");
    return;
  }

  const newCar = {
    brand: brand.value.trim(),
    model: model.value.trim(),
    year: year.value,
    mileage: mileage.value,
    price: price.value,
  };

  const cars = JSON.parse(localStorage.getItem("cars")) || [];

  cars.push(newCar);

  localStorage.setItem("cars", JSON.stringify(cars));

  displayData();

  brand.value = "";
  model.value = "";
  year.value = "";
  mileage.value = "";
  price.value = "";

  brand.focus();
});

searchInput.addEventListener("input", function () {
  const searchedText = searchInput.value.toLowerCase();

  const allCars = document.querySelectorAll("#car-list li");

  allCars.forEach(function (car) {
    const carText = car.textContent.toLowerCase();

    if (carText.includes(searchedText)) {
      car.style.display = "block";
    } else {
      car.style.display = "none";
    }
  });
});

displayData();
