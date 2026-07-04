// DARK MODE

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = "🌙";
        }

    });

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeBtn.innerHTML = "☀️";
    }

}


// BACK TO TOP BUTTON

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// IMAGE SLIDER

const sliderImage = document.getElementById("sliderImage");

if (sliderImage) {

    const images = [

        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1000",

        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1000",

        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1000",

        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1000"

    ];

    let currentImage = 0;

    setInterval(() => {

        currentImage++;

        if (currentImage >= images.length) {
            currentImage = 0;
        }

        sliderImage.src = images[currentImage];

    }, 3000);

}


// ANIMATED COUNTERS

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = target / 100;

        if (current < target) {

            counter.innerText = Math.ceil(current + increment);

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});


// MODAL POPUP

const offerBtn = document.getElementById("offerBtn");
const offerModal = document.getElementById("offerModal");
const closeModal = document.getElementById("closeModal");

if (offerBtn && offerModal && closeModal) {

    offerBtn.addEventListener("click", () => {
        offerModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        offerModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === offerModal) {
            offerModal.style.display = "none";
        }
    });

}


// FORM VALIDATION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {

            alert("Please fill all fields.");

        } else {

            alert("Message Sent Successfully!");

            contactForm.reset();

        }

    });

}
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if(menuToggle && navbar){

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}
// Weather App

// ======================
// Weather App
// ======================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", async () => {

        const city = document.getElementById("city").value.trim();

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        const apiKey = "282c2546b242c67cb1022e672f58d781";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();

            document.getElementById("cityName").innerHTML =
                `📍 ${data.name}, ${data.sys.country}`;

            document.getElementById("temperature").innerHTML =
                `🌡 Temperature : ${data.main.temp} °C`;

            document.getElementById("humidity").innerHTML =
                `💧 Humidity : ${data.main.humidity}%`;

            document.getElementById("wind").innerHTML =
                `🌬 Wind : ${data.wind.speed} m/s`;

            document.getElementById("condition").innerHTML =
                `☁ Condition : ${data.weather[0].main}`;

            localStorage.setItem("lastCity", city);

        } catch (error) {

            document.getElementById("weatherResult").innerHTML =
                "<h3>❌ City not found!</h3>";

        }

    });

}
// ======================
// Todo App
// ======================

// ======================
// Todo App with Local Storage
// ======================

// ======================
// Todo App
// ======================

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allTasks");
const activeBtn = document.getElementById("activeTasks");
const completedBtn = document.getElementById("completedTasks");

if (addTaskBtn) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function displayTasks(filter = "all") {

        taskList.innerHTML = "";

        tasks.forEach((task, index) => {

            if (filter === "active" && task.completed) return;
            if (filter === "completed" && !task.completed) return;

            const li = document.createElement("li");

            if (task.completed) {
                li.classList.add("completed");
            }

            li.innerHTML = `
                <span>${task.text}</span>

                <div>

                    <button class="completeBtn">
                        ✔
                    </button>

                    <button class="deleteBtn">
                        Delete
                    </button>

                </div>
            `;

            // Complete Task
            li.querySelector(".completeBtn").addEventListener("click", () => {

                tasks[index].completed = !tasks[index].completed;

                saveTasks();

                displayTasks(filter);

            });

            // Delete Task
            li.querySelector(".deleteBtn").addEventListener("click", () => {

                tasks.splice(index, 1);

                saveTasks();

                displayTasks(filter);

            });

            taskList.appendChild(li);

        });

    }

    addTaskBtn.addEventListener("click", () => {

        const task = taskInput.value.trim();

        if (task === "") {

            alert("Please enter a task.");

            return;

        }

        tasks.push({
            text: task,
            completed: false
        });

        saveTasks();

        displayTasks();

        taskInput.value = "";

    });

    // Filter Buttons
    allBtn.addEventListener("click", () => {
        displayTasks("all");
    });

    activeBtn.addEventListener("click", () => {
        displayTasks("active");
    });

    completedBtn.addEventListener("click", () => {
        displayTasks("completed");
    });

    displayTasks();

}