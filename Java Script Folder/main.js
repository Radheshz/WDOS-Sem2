// Initialization and Variable Declarations
let currentRoomBooking = {}; 
let currentAdventureBooking = {}; 
let overallBookingCost = 0; 
let overallAdventureCost = 0; 

// Selecting DOM Elements
const roomBookingForm = document.getElementById('roomBookingForm');
const adventureBookingForm = document.getElementById('adventureBookingForm');
const overallRoomBookingElement = document.getElementById('overallRoomBooking');
const overallAdventureBookingElement = document.getElementById('overallAdventureBooking');
const totalCostElement = document.getElementById('totalCost');
const finalBookButton = document.getElementById('finalbook');
const loyaltyButton = document.getElementById('loyaltyButton');
const favoriteButton = document.getElementById('favoriteButton');


function calculateAndDisplayTotalCost() {
  const totalCost = overallBookingCost + overallAdventureCost;
  document.getElementById('totalCost').innerText = `Total Cost: ${totalCost.toFixed(2)}`;
}

function addToFavorites(item) {
 
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  favorites.push(item);


  localStorage.setItem('favorites', JSON.stringify(favorites));
}
function displayThankYouMessage() {
  alert('Thank you for booking!');
}

function saveToFavorites() {
  if (Object.keys(currentRoomBooking).length !== 0) {
    addToFavorites(currentRoomBooking);
    alert('Room booking saved to favorites!');
  } else if (Object.keys(currentAdventureBooking).length !== 0) {
    addToFavorites(currentAdventureBooking);
    alert('Adventure booking saved to favorites!');
  } else {
    alert('No booking details to save!');
  }
}
function displayLoyaltyPoints() {
  console.log(`Loyalty Points: ${loyaltyPoints}`);
  document.getElementById('loyaltyPointsDisplay').innerText = `Loyalty Points: ${loyaltyPoints}`;
}
// Function to handle room booking 
function handleRoomBooking(event) {
  event.preventDefault(); 

  const name = document.getElementById('firstname').value;
  const roomType = document.getElementById('roomType').value;
  const checkInDate = document.getElementById('checkInDate').value;
  const checkOutDate = document.getElementById('checkOutDate').value;
  const numAdults = parseInt(document.getElementById('numAdults').value);
  const numChildren = parseInt(document.getElementById('numChildren').value);
  const wifi = document.getElementById('wifi').checked;
  const poolView = document.getElementById('pool_view').checked;
  const gardenView = document.getElementById('garden_view').checked;
  const extraBed = document.getElementById('extra_bed').checked;

  // Update currentRoomBooking object 
  currentRoomBooking = {
    name,
    roomType,
    checkInDate,
    checkOutDate,
    numAdults,
    numChildren,
    wifi,
    poolView,
    gardenView,
    extraBed
  };

  // Calculate room booking cost
  let roomCost = 0;
 
  switch (roomType) {
    case 'single':
      roomCost = 25000 * (numAdults + numChildren);
      break;
    case 'double':
      roomCost = 35000 * (numAdults + numChildren);
      break;
    case 'triple':
      roomCost = 40000 * (numAdults + numChildren);
      break;
    default:
      roomCost = 0;
  }

  // Calculate additional costs based on extra requirements
  if (wifi) {
    roomCost += 0; 
  }
  if (poolView) {
    roomCost += 0; 
  }
  if (gardenView) {
    roomCost += 0
  }
  if (extraBed) {
    roomCost += 8000; 
  }
  
  // Check if the promo code entered t
  const promoCode = document.getElementById('promoCode').value;
  if (promoCode === 'Promo123') {
    const discount = 0.05 * roomCost;
    roomCost -= discount;
  } 

  // Update overall booking cost
  overallBookingCost += roomCost;
  overallRoomBookingElement.innerText = `Overall Room Booking Cost: ${overallBookingCost}`;

  addToFavorites(currentRoomBooking);

 

  document.getElementById('overallRoomBooking').innerText = `Overall Room Booking Cost: ${overallBookingCost}`;

  // Display current room booking details separately
  document.getElementById('roomBookingDetails').innerHTML = `
    <h3>Current Room Booking Details</h3>
    <p>Name: ${name}</p>
    <p>Room Type: ${roomType}</p>
    <p>Check-In Date: ${checkInDate}</p>
    <p>Check-Out Date: ${checkOutDate}</p>
    <p>Number of Adults: ${numAdults}</p>
    <p>Number of Children: ${numChildren}</p>
    <p>WiFi: ${wifi ? 'Yes' : 'No'}</p>
    <p>Pool View: ${poolView ? 'Yes' : 'No'}</p>
    <p>Garden View: ${gardenView ? 'Yes' : 'No'}</p>
    <p>Extra Bed: ${extraBed ? 'Yes' : 'No'}</p>
    <p>Total Room Cost: ${roomCost}</p>
  `;

  roomBookingForm.reset();
  calculateAndDisplayTotalCost();
}


function handleAdventureBooking(event) {
  event.preventDefault(); 

  // Collect adventure booking form data 
  const adventureType = document.getElementById('adventureType').value;
  const participantType = document.querySelector('input[name="participantType"]:checked');
  const date = document.getElementById('date').value;
  const numParticipants = parseInt(document.getElementById('numParticipants').value);
  const contactEmail = document.getElementById('contactEmail').value;
  const contactPhone = document.getElementById('contactPhone').value;
  const needGuide = document.getElementById('needGuide').checked;

  // Update currentAdventureBooking 
  currentAdventureBooking = {
    adventureType,
    participantType,
    date,
    numParticipants,
    contactEmail,
    contactPhone,
    needGuide
  };

  // Calculate adventure booking cost
  let adventureCost = 0;

  switch (adventureType) {
    case 'architecture':
      if (participantType === 'localAdult') {
        adventureCost = 5000 * numParticipants;
      } else if (participantType === 'localKid') {
        adventureCost = 2000 * numParticipants;
      } else if (participantType === 'foreignAdult') {
        adventureCost = 10000 * numParticipants;
      } else if (participantType === 'foreignKid') {
        adventureCost = 5000 * numParticipants;
      }
      break;
  
    default:
      adventureCost = 0;
  }

  // Calculate additional costs based on needing a guide
  if (needGuide) {
    adventureCost += 1000 * numParticipants; 
  }

  // Update overall adventure booking cost
  overallAdventureCost += adventureCost;
  overallAdventureBookingElement.innerText = `Overall Adventure Booking Cost: ${overallAdventureCost}`;

  addToFavorites(currentAdventureBooking);

  
  document.getElementById('overallAdventureBooking').innerText = `Overall Adventure Booking Cost: ${overallAdventureCost}`;

  // Display current adventure booking details separately
  document.getElementById('adventureBookingDetails').innerHTML = `
    <h3>Current Adventure Booking Details</h3>
    <p>Adventure Type: ${adventureType}</p>
    <p>Date: ${date}</p>
    <p>Number of Participants: ${numParticipants}</p>
    <p>Contact Email: ${contactEmail}</p>
    <p>Contact Phone: ${contactPhone}</p>
    <p>Need Guide: ${needGuide ? 'Yes' : 'No'}</p>
    <p>Total Adventure Cost: ${adventureCost}</p>
  `;


  adventureBookingForm.reset();
  calculateAndDisplayTotalCost();
}


  roomBookingForm.addEventListener('submit', handleRoomBooking);


  adventureBookingForm.addEventListener('submit', handleAdventureBooking);


  finalBookButton.addEventListener('click', displayThankYouMessage);

  loyaltyButton.addEventListener('click', displayLoyaltyPoints);

  favoriteButton.addEventListener('click', saveToFavorites);






















