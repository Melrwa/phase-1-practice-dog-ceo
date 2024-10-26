console.log('%c HI', 'color: firebrick')
// Challenge 1
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Function to fetch and display dog images
function fetchDogImages() {
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const dogImageContainer = document.getElementById('dog-image-container');
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Dog image';
        dogImageContainer.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching dog images:', error));
}

// Function to fetch and display dog breeds
function fetchDogBreeds() {
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const dogBreeds = data.message;
      const dogBreedsList = document.getElementById('dog-breeds');

      // Add each breed to the <ul>
      for (const breed in dogBreeds) {
        const li = document.createElement('li');
        li.textContent = breed;
        li.style.cursor = 'pointer'; // Change cursor to pointer for better UX
        li.addEventListener('click', () => {
          li.style.color = 'blue'; // Change font color on click
        });
        dogBreedsList.appendChild(li);
      }
    })
    .catch(error => console.error('Error fetching dog breeds:', error));
}

// Function to filter breeds based on selected letter
function filterBreeds() {
  const filterValue = document.getElementById('breed-dropdown').value;
  const dogBreedsList = document.getElementById('dog-breeds');
  const listItems = dogBreedsList.getElementsByTagName('li');

  // Show or hide breeds based on selected letter
  for (const item of listItems) {
    if (item.textContent.startsWith(filterValue)) {
      item.style.display = ''; // Show item
    } else {
      item.style.display = 'none'; // Hide item
    }
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  fetchDogImages();
  fetchDogBreeds();

  // Attach event listener to the dropdown for filtering
  const dropdown = document.getElementById('breed-dropdown');
  dropdown.addEventListener('change', filterBreeds);
});
