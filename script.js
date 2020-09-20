this.baseUrl = new URL (" https://games-world.herokuapp.com");
this.gamesData = [];
const displayGamesButton = document.getElementById("getGamesButton");
displayGamesButton.addEventListener("click", function () { 
    getGames("games") 
})


const addGameMenuButton = document.getElementById("addGameButton");
addGameMenuButton.addEventListener("click", function () { 
    hideGames();
    showAddForm();
})

function Loader () {
    this.loader = document.getElementById("loader");
    this.flexContainer = document.getElementById("flexContainer");
}

Loader.prototype.displayLoader = function() {
    this.flexContainer.style.opacity = 0.5;
    this.loader.style.display = "block";
}

Loader.prototype.hideLoader = function() {
    this.flexContainer.style.opacity = 1;
    this.loader.style.display = "none";
}

function getGames(endpoint) {
    const loader = new Loader();
    // hideErrorMessage();
    hideAddForm();
    loader.displayLoader();
        
        
    fetch(this.baseUrl.href+endpoint, { method: "GET" })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResp) {
            console.log(jsonResp);
            loader.hideLoader();
            gamesData=jsonResp;
            displayGames();
        if (jsonResp.error) {
            displayError(jsonResp.error);
        }
        })
        .catch(function (error) {
            loader.hideLoader();
            displayError(error);
        })
        
}

function addGame() {
    const loader = new Loader();
    loader.displayLoader();

    const title = document.getElementById("inputTitle").value;
    const releaseDate = document.getElementById("inputReleaseDate").value;
    const genre = document.getElementById("inputGenre").value;
    const publisher = document.getElementById("inputPublisher").value;
    const imageUrl = document.getElementById("inputImageUrl").value;
    
    if (title && releaseDate && genre && publisher && imageUrl ) {
        payload = {title, releaseDate, genre, publisher, imageUrl}

    fetch(this.baseUrl.href+"games", { method: "POST", payload })
        .then(function (response) {
            return (response.json());
        })
        .then(function (jsonResp) {
            hideAddForm();
            console.log(jsonResp);
            loader.hideLoader();
            alert("Succes");
        if (jsonResp.error) {
            displayError(jsonResp.error);
        }
        })
        .catch(function (error) {
            loader.hideLoader();
            displayError(error);
        })
    }else {
        loader.hideLoader();
        alert("Please complete the fields correctly")
    }
}
function deleteGame(id) {
    const loader = new Loader();
    loader.displayLoader();
    fetch(this.baseUrl.href+"games"+"/"+id, { method: "DELETE" })
        .then(function (response) {
            return (response.json());
        })
        .then(function (jsonResp) {
            hideAddForm();
            console.log(jsonResp);
            loader.hideLoader();
            alert("Succes");
        if (jsonResp.error) {
            console.log("Something went wrong")
        }
        })
        .catch(function (error) {
            loader.hideLoader();
            console.log("Something went wrong")
        })
}



function displayGames() {
    const gamesContainer = document.getElementById("gamesContainer");
    if (this.gamesData) {
        for(let i=0; i<gamesData.length; i++){
            const game = new Game(gamesData[i]);
            gamesContainer.appendChild(game.getGameElement());

        }
    }
    gamesContainer.style.display = "block";
}

function hideGames() {
    const gamesContainer = document.getElementById("gamesContainer");
    gamesContainer.style.display = "none";
}

function Game(data) {
    this.id = data["_id"];
    this.title = data.title;
    this.imageUrl = data.imageUrl;
    this.description = data.description;
}

Game.prototype.getGameElement = function() {
    const gameContainer = document.createElement("div");
    gameContainer.classList.add("gameContainer");
    const gameTitle = document.createElement("h1");
    gameTitle.innerHTML = this.title;
    const deleteButton = document.createElement("button");
    deleteButton.id = this.id;
    deleteButton.innerText = "DELETE";
    deleteButton.onclick = function (e) {
        const id = e.target.id;
        deleteGame(id);
    }
    gameContainer.appendChild(deleteButton);
    gameContainer.appendChild(gameTitle);
    const gameImage = document.createElement("img");
    gameImage.src = this.imageUrl;
    gameContainer.appendChild(gameImage);
    gamesContainer.appendChild(gameContainer);
    const gameDescription = document.createElement("p");
    gameDescription.innerHTML = this.description;
    gameContainer.appendChild(gameDescription);
    return gameContainer;
}

function showAddForm (){
    addForm =document.getElementById("addForm");
    addForm.style.display = "block";
    const addGameButton = document.getElementById("addGame");
    addGameButton.addEventListener("click", function () { 
    addGame();
})
}

function hideAddForm (){
    addForm =document.getElementById("addForm");
    addForm.style.display = "none";
}
