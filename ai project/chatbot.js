const predefinedword = {
    greet: ["hii", "hey", "hello", "hey there", "hello, how are you", "hello, how are you doing", "hello, how are you doing?"],
    farewells: ["bye", "goodbye", "see you later", "see you soon"],
    thanks: ["thanks", "thank you", "thank you so much", "thank you very"],
    help: ["help", "assist", "support"],
    budget: ["budget", "cost", "price", "afford", "under"],
    carInfo: ["information about a car", "details on car", "car details", "specs", "specifications", "tell me about"],
    financing: ["financing", "loan", "lease", "payment options", "finance"],
    availability: ["availability", "in stock", "available", "in store", "buy now"],
    carName: ["tesla", "bmw", "audi", "mercedes", "porsche", "lamborghini", "urus", "g-wagon", "taycan"],
};

function getCarDetails(carName) {
    const carDatabase = {
        tesla: "The Tesla Model S is a high-performance electric car offering advanced autopilot and over 370 miles of range and its price is $177561.60",
        bmw: "The BMW X5 is a luxury SUV with powerful engine options, a plush interior, and advanced safety features and its price is $113639.42",
        audi: "The Audi Q7 is a premium SUV known for its Quattro all-wheel drive and spacious 3-row seating and its price is $105353.22",
        mercedes: "The Mercedes G-Wagon is an iconic luxury SUV with unmatched off-road capabilities and a timeless design and its price is $301854.72",
        porsche: "The Porsche Taycan is an all-electric sports car combining Porsche's performance heritage with cutting-edge EV technology and its price is $224911.36",
        lamborghini: "The Lamborghini Urus is a super SUV offering extreme performance and luxury with a 641-horsepower engine and its price is $497172.48",
    };

    return carDatabase[carName.toLowerCase()] || "I'm sorry, I don't have details about that car. Please provide another name.";
}
const carData = [
    { budget: 120000, car: "Audi Q7" },
    { budget: 150000, car: "BMW X5 & Audi Q7" },
    { budget: 200000, car: "Tesla Model S & BMW X5 & Audi Q7" },
    { budget: 250000, car: "Porsche Taycan & Tesla Model S & BMW X5 & Audi Q7" },
    { budget: 310000, car: "Mercedes G-wagon  & Porsche Taycan & Tesla Model S & BMW X5 & Audi Q7" },
    { budget: 500000, car: "Lamborghini Urus & Mercedes G-wagon & Porsche Taycan & Tesla Model S & BMW X5 & Audi Q7" }
];

function getCarSuggestion(budget) {
    let suggestedCar = "Sorry, we couldn't find a match for your budget.";
    for (let i = carData.length - 1; i >= 0; i--) {
        if (budget >= carData[i].budget) {
            suggestedCar = `For a budget of $${budget}, we suggest: ${carData[i].car}`;
            break;
        }
    }
    return suggestedCar;
}

function generateBotResponse(usermessage) {
    usermessage = usermessage.toLowerCase();
    let botResponse = "Sorry, I couldn't understand you.";

    if (predefinedword.greet.some(greet => usermessage.includes(greet))) {
        botResponse = "Hi! I'm your Car Assistant. How can I help you today?";
    }
    else if (predefinedword.farewells.some(farewell => usermessage.includes(farewell))) {
        botResponse = "Goodbye, have a nice day!";
    }
    else if (predefinedword.thanks.some(thank => usermessage.includes(thank))) {
        botResponse = "You're welcome!";
    }
    else if (predefinedword.help.some(need => usermessage.includes(need))) {
        botResponse = "I'm here to assist you. How can I help?";
    }
    else if (predefinedword.budget.some(bud => usermessage.includes(bud))) {
        const budgetMatch = usermessage.match(/(\d{2,})/);
        if (budgetMatch) {
            const budget = parseInt(budgetMatch[0]);
            const carSuggestion = getCarSuggestion(budget);
            botResponse = carSuggestion ? carSuggestion : "Could you specify your budget? I can help you find cars within your range!";
        } else {
            botResponse = "Could you specify your budget? I can help you find cars within your range!";
        }

    }
    else if (predefinedword.carName.some(car => usermessage.includes(car))) {
        const carMatch = predefinedword.carName.find(car => usermessage.includes(car));
        botResponse = getCarDetails(carMatch);
    }
    else if (predefinedword.carInfo.some(info => usermessage.includes(info))) {
        botResponse = "Sure! Please provide the car model you're interested in, and I'll share the details with you.";
    }
    else if (predefinedword.financing.some(finance => usermessage.includes(finance))) {
        botResponse = "We offer various financing options. Are you interested in a loan or a lease?";
    }
    else if (predefinedword.availability.some(avail => usermessage.includes(avail))) {
        botResponse = "I can check the availability of your desired car model. Which model are you interested in?";
    }

    return botResponse;
}

function sendMessage() {
    const usermessage = document.getElementById("userInput");
    const messageInput = usermessage.value.trim();

    if (messageInput === "") return;

    displayMessage(messageInput, "user");

    usermessage.value = "";

    const botResponse = generateBotResponse(messageInput);
    displayMessage(botResponse, "bot");
}

function displayMessage(text, sender) {
    const chatbox = document.getElementById("chatMessages");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;

    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function toggleChatbot() {
    const chatbotContainer = document.getElementById("chatbotContainer");
    const chatbotTrigger = document.querySelector(".chatbot-icon");

    chatbotContainer.classList.toggle("open");

    if (chatbotContainer.classList.contains("open")) {
        chatbotTrigger.style.display = "none";
    } else {
        chatbotTrigger.style.display = "block";
    }
}

document.getElementById("userInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
