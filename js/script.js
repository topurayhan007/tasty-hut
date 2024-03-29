const loadMeals = async (searchText, index) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  // console.log("asdsa", url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMeals(data.meals, index);
  } catch (error) {
    console.log(error);
  }
};

const displayMeals = (meals, index) => {
  const mealsContainer = document.getElementById("meals-container");
  const showAllButton = document.getElementById("btn-show-all");
  const warningLabel = document.getElementById("warning-label");

  mealsContainer.innerHTML = "";
  // console.log(index, meals.length);
  if (meals && index < meals.length) {
    meals = meals.slice(0, index);
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  if (!meals) {
    warningLabel.classList.remove("hidden");
  } else {
    warningLabel.classList.add("hidden");
  }

  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");

    mealDiv.innerHTML = `
    <div
            class="flex md:flex-col lg:flex-row items-center bg-white border border-2 border-gray-200 rounded-xl hover:bg-gray-50"
          >
            <img
              src="${meal.strMealThumb}"
              class="object-cover w-1/2 md:w-full rounded-tl-lg rounded-bl-lg md:rounded-tr-lg md:rounded-bl-none lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-tr-none h-60 lg:h-72"
              alt=""
            />
            <div
              class="flex flex-col justify-between gap-2 p-4 md:p-4 leading-normal text-left"
            >
              <h4 class="text-md md:text-2xl text-[#403F3F] font-bold">
              ${meal.strMeal}
              </h4>
              <p
                class="text-[#706F6F] text-sm md:text-lg font-normal md:mt-4 md:mb-6"
              >
                There are many variations of passages of available, but the
                majority have suffered.
              </p>
              <h5
                onclick="loadMealDetails(${meal.idMeal})"
                class="text-[#FFC107] font-semibold cursor-pointer underline underline-offset-4 md:mb-2 lg:mb-0"
              >
                View Details
              </h5>
            </div>
          </div>
    `;

    mealsContainer.appendChild(mealDiv);
  });
};

const returnSearchText = () => {
  const searchText = document.getElementById("search-field").value;
  return searchText;
};

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      loadMeals(returnSearchText(), 6);
    }
  });

const searchMeals = () => {
  const searchText = returnSearchText();
  loadMeals(searchText, 6);
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  loadMeals(returnSearchText());
});

// Modal script
const openModal = () => {
  // Show modal backdrop and dialog
  document.getElementById("modalBackdrop").classList.remove("hidden");
  document.getElementById("modalDialog").classList.remove("hidden");
  // Disable body scrolling
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  // Hide modal backdrop and dialog
  document.getElementById("modalBackdrop").classList.add("hidden");
  document.getElementById("modalDialog").classList.add("hidden");
  // Enable body scrolling
  document.body.style.overflow = "auto";
};

const loadMealDetails = (id) => {
  // console.log(id);
  openModal();
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (details) => {
  const modalTitle = document.getElementById("modal-title");
  const modalImg = document.getElementById("modal-img");
  const modalCategory = document.getElementById("modal-category");
  const modalArea = document.getElementById("modal-area");
  const modalInstr = document.getElementById("modal-instruction");
  const modalYoutube = document.getElementById("modal-youtube");

  modalTitle.innerText = details.strMeal;
  modalImg.setAttribute("src", details.strMealThumb);
  modalCategory.innerText = details.strCategory;
  modalArea.innerText = details.strArea;
  modalInstr.innerText = details.strInstructions;
  modalYoutube.href = details.strYoutube;
  modalYoutube.innerText = details.strYoutube;
};
