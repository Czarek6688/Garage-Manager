let addCarButton = document.getElementById("add-car");
let brand = document.getElementById("brand");
let model = document.getElementById("model");
let year = document.getElementById("year");
let mileage = document.getElementById("mileage");
let price = document.getElementById("price");
let carList = document.getElementById("car-list");
let searchInput = document.getElementById("search-car");
let brandFilter = document.getElementById("brand-filter");
let mileageFilter = document.getElementById("mileage-filter");
let resetFiltersButton = document.getElementById("reset-filters");

const displayData = function () {
  let cars = JSON.parse(localStorage.getItem("cars")) || [];

  const currentBrand = brandFilter.value;
  const currentMileage = mileageFilter.value;
  if (currentBrand !== "all") {
    cars = cars.filter(function (car) {
      return car.brand === currentBrand;
    });
  }

  if (currentMileage !== "all") {
  cars = cars.filter(function (car) {
    const carMileage = Number(car.mileage);

    if (currentMileage === "0-50000") {
      return carMileage <= 50000;
    }

    if (currentMileage === "50001-100000") {
      return carMileage >= 50001 && carMileage <= 100000;
    }

    if (currentMileage === "100001-150000") {
      return carMileage >= 100001 && carMileage <= 150000;
    }

    if (currentMileage === "150001-200000") {
      return carMileage >= 150001 && carMileage <= 200000;
    }

    if (currentMileage === "200001-plus") {
      return carMileage >= 200001;
    }
  });
  
}



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
      let cars = JSON.parse(localStorage.getItem("cars")) || [];

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

  let cars = JSON.parse(localStorage.getItem("cars")) || [];

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

brandFilter.addEventListener("change", function () {
  displayData();
});

mileageFilter.addEventListener("change", function () {
  displayData();
});

resetFiltersButton.addEventListener("click", function () {
  brandFilter.value = "all";
  mileageFilter.value = "all";
  displayData();
});

displayData();
