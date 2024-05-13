function checkFiles(files) {

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.")
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    if (file) {
        preview.src = URL.createObjectURL(files[0])
    }

    // Upload
    const formData = new FormData();
    for (const name in files) {
        formData.append("image", files[name]);
    }

    fetch('/analyze', {
        method: 'POST',
        headers: {},
        body: formData
    }).then(
        response => {
            response.text().then(function (text) {
                const predictions = JSON.parse(text);
                predictions.sort((a, b) => b.probability - a.probability);

                const top1 = document.getElementById('top1');
                top1.insertCell().textContent = predictions[0].className;
                top1.insertCell().textContent = predictions[0].probability.toFixed(4);

                const top2 = document.getElementById('top2');
                top2.insertCell().textContent = predictions[1].className;
                top2.insertCell().textContent = predictions[1].probability.toFixed(4);

                const top3 = document.getElementById('top3');
                top3.insertCell().textContent = predictions[2].className;
                top3.insertCell().textContent = predictions[2].probability.toFixed(4);
            })

        }
    ).catch(
        error => console.log(error)
    );

}

function handleFileUpload(event) {
    const files = event.target.files;
    const animalSelect = document.getElementById('animalSelect');
    const animalToSearch = animalSelect.options[animalSelect.selectedIndex].text;

    if (!files || files.length === 0) {
        return;
    }

    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = ''; // Clear previous images

    // Loop through selected files
    for (let i = 0; i < Math.min(files.length, 9); i++) {
        const file = files[i];
        let isAnimalThatIsSearched= false
        // Ensure the file is an image
        if (!file.type.startsWith('image/')) {
            continue;
        }

        const formData = new FormData();
        formData.append("image", file);
        fetch('/analyze', {
            method: 'POST',
            headers: {},
            body: formData
        }).then(
            response => {
                response.text().then(function (text) {
                    if (text.includes(animalToSearch.toLowerCase())) {
                        isAnimalThatIsSearched=true
                    }
                });


        const reader = new FileReader();

        // Closure to capture the file information
        reader.onload = (function (theFile) {
            return function (e) {
                // Create image element
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = theFile.name;
                if(isAnimalThatIsSearched){
                    img.style.setProperty('border', '#90ee90 6px outset');
1                }

                // Append image to grid
                imageGrid.appendChild(img);
            };
        })(file);

        // Read image file as a data URL
        reader.readAsDataURL(file);
            }
        )
    }

}
// Attach event listener to file input
const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', handleFileUpload);



// Function to create and populate the dropdown
const animalList = [
    "Antelope", "Badger", "Bat", "Bear", "Bee", "Beetle", "Bison", "Boar", "Butterfly",
    "Cat", "Caterpillar", "Chimpanzee", "Cockroach", "Cow", "Coyote", "Crab", "Crow",
    "Deer", "Dog", "Dolphin", "Donkey", "Dragonfly", "Duck", "Eagle", "Elephant",
    "Flamingo", "Fly", "Fox", "Goat", "Goldfish", "Goose", "Gorilla", "Grasshopper",
    "Hamster", "Hare", "Hedgehog", "Hippopotamus", "Hornbill", "Horse", "Hummingbird",
    "Hyena", "Jellyfish", "Kangaroo", "Koala", "Ladybugs", "Leopard", "Lion", "Lizard",
    "Lobster", "Mosquito", "Moth", "Mouse", "Octopus", "Okapi", "Orangutan", "Otter",
    "Owl", "Ox", "Oyster", "Panda", "Parrot", "Pelecaniformes", "Penguin", "Pig",
    "Pigeon", "Porcupine", "Possum", "Raccoon", "Rat", "Reindeer", "Rhinoceros",
    "Sandpiper", "Seahorse", "Seal", "Shark", "Sheep", "Snake", "Sparrow", "Squid",
    "Squirrel", "Starfish", "Swan", "Tiger", "Turkey", "Turtle", "Whale", "Wolf",
    "Wombat", "Woodpecker", "Zebra"
]
const animalSelect = document.getElementById('animalSelect');

// Loop through the animalList array and create an <option> for each animal
animalList.forEach(animal => {
    const option = document.createElement('option');
    option.textContent = animal;
    option.value = animal.toLowerCase(); // Set the value to lowercase animal name
    animalSelect.appendChild(option);
});
