//Create your project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

// DOM Elements
const selectMovie = document.getElementById("selectMovie");
const movieNameEl = document.getElementById("movieName");
const moviePriceEl = document.getElementById("moviePrice");
const totalPriceEl = document.getElementById("totalPrice");
const numberOfSeatEl = document.getElementById("numberOfSeat");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");

const seats = document.querySelectorAll("#seatCont .seat");
const cancelBtn = document.getElementById("cancelBtn");
const proceedBtn = document.getElementById("proceedBtn");

// Default values
let currentMoviePrice = 7;
let selectedSeats = [];

// -----------------------------
// Populate Dropdown
// -----------------------------
moviesList.forEach((movie) => {
  const option = document.createElement("option");
  option.value = movie.price;
  option.textContent = movie.movieName;
  selectMovie.appendChild(option);
});

// Movie change event
selectMovie.addEventListener("change", function () {
  const selectedMovie = moviesList[selectMovie.selectedIndex];

  movieNameEl.textContent = selectedMovie.movieName;
  moviePriceEl.textContent = `$ ${selectedMovie.price}`;

  currentMoviePrice = selectedMovie.price;

  updatePrice();
});

// -----------------------------
// Seat Selection
// -----------------------------
seats.forEach((seat) => {
  if (!seat.classList.contains("occupied")) {
    seat.addEventListener("click", function () {
      if (!seat.classList.contains("selected")) {
        seat.classList.add("selected");
        selectedSeats.push(seat);
      } else {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter((s) => s !== seat);
      }

      updateSelectedSeats();
      updatePrice();
    });
  }
});

// -----------------------------
// Update Selected Seats UI
// -----------------------------
function updateSelectedSeats() {
  selectedSeatsHolder.innerHTML = "";

  if (selectedSeats.length === 0) {
    selectedSeatsHolder.innerHTML =
      '<span class="noSelected">No Seat Selected</span>';
  } else {
    selectedSeats.forEach((seat, index) => {
      const seatEl = document.createElement("div");
      seatEl.classList.add("selectedSeat");
      seatEl.textContent = `Seat ${index + 1}`;
      selectedSeatsHolder.appendChild(seatEl);
    });
  }

  numberOfSeatEl.textContent = selectedSeats.length;
}

// -----------------------------
// Update Price
// -----------------------------
function updatePrice() {
  const total = selectedSeats.length * currentMoviePrice;
  totalPriceEl.textContent = `$ ${total}`;
}

// -----------------------------
// Continue Button
// -----------------------------
proceedBtn.addEventListener("click", function () {
  if (selectedSeats.length === 0) {
    alert("Oops no seat Selected");
    return;
  }

  alert("Yayy! Your Seats have been booked");

  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });

  selectedSeats = [];

  resetSelection();
});

// -----------------------------
// Cancel Button
// -----------------------------
cancelBtn.addEventListener("click", function () {
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
  });

  selectedSeats = [];

  resetSelection();
});

// -----------------------------
// Reset UI
// -----------------------------
function resetSelection() {
  numberOfSeatEl.textContent = 0;
  totalPriceEl.textContent = "$ 0";
  selectedSeatsHolder.innerHTML =
    '<span class="noSelected">No Seat Selected</span>';
}