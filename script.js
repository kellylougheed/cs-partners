const students = {
    ascs: ["Charlotte", "Cate", "Caroline", "Camden", "Cat", "Shae", "Maya", "Jackie", "Bella", "Yuri", "Adella", "Colette", "Abigail"],
    cs1: ["Evelyn", "Skyelar", "Addy", "Zoe", "Cyri", "Eva", "Lily", "Saige"],
    art: ["Isla", "Ariana", "Nava", "Lotus", "Paris"],
    datascig: ["Nora", "Phoebe", "Camden", "Eva", "Sophie", "Paloma", "Bridgett", "Katie Ray", "Violet", "Darcy", "Bella", "Sarah", "Nicole", "Kylie", "Liv", "Abigail"],
    datascia: ["Gaia", "Ari", "Alex B", "Ashley", "Layla", "Clara", "Sophie", "Eliza", "Sloane", "Charlotte", "Shae", "Alex S", "Katia", "Adella", "Chloe", "Snow"]
};

const courseSelect = document.getElementById("courseSelect");
const studentList = document.getElementById("studentList");
const pairsDiv = document.getElementById("pairs");
const partnerButton = document.getElementById("partnerButton");

function renderStudents(courseKey) {
    studentList.innerHTML = "";
    students[courseKey].forEach(name => {
        const div = document.createElement("div");
        div.className = "student-item";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = name;
        const label = document.createElement("label");
        label.setAttribute("for", name);
        label.textContent = name;
        div.appendChild(checkbox);
        div.appendChild(label);
        studentList.appendChild(div);
    });
}

// Traditional Fisher Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.trunc(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generatePairs() {
    const checkedStudents = Array.from(studentList.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.id);
        
    // Shuffling
    let times1 = Math.floor(Math.random() * 1000) % 100;
    let randomMod = Math.floor(Math.random() * 200);
    let times2 = Math.floor(Math.random() * times1) % randomMod;
    
    // Create shallow copy of array
    let shuffled = shuffle([...checkedStudents]);
    for (let i = 0; i < times2; i++) {
        shuffled = shuffle([...checkedStudents]);
    }
    
    pairsDiv.innerHTML = "";
    for (let i = 0; i < shuffled.length; i += 2) {
        const pairDiv = document.createElement("div");
        pairDiv.className = "pair";
        if (i + 1 < shuffled.length) {
            pairDiv.innerHTML = `${shuffled[i]} & ${shuffled[i+1]}`;
        } else {
            pairDiv.innerHTML = `${shuffled[i]}`;
        }
        pairsDiv.appendChild(pairDiv);
    }
}

courseSelect.addEventListener("change", e => {
    renderStudents(e.target.value);
    pairsDiv.innerHTML = "";
});

partnerButton.addEventListener("click", generatePairs);

renderStudents(courseSelect.value);
