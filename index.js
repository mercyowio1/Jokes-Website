document.addEventListener("DOMContentLoaded" ,function(){
    const input=document.getElementById("Joke-genre")
    const searchButton=document.getElementById("button")
    const display = document.getElementById("display");
    const addJokeBtn = document.getElementById("add-joke-btn");
    const newCategory = document.getElementById("new-category");
    const newSetup = document.getElementById("new-setup");
    const newPunchline = document.getElementById("new-punchline");
    const randomJokeBtn = document.getElementById("random-joke-btn");



    randomJokeBtn.addEventListener("click",function(){
        fetch("http://localhost:3000/jokes") 
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomJoke = data[randomIndex];

                    display.innerHTML = `
                        <div class="joke-card">
                            <h3>${randomJoke.category} Joke</h3>
                            ${randomJoke.type === "single" && randomJoke.joke ? `<p>${randomJoke.joke}</p>` : 
                            `<p>${randomJoke.setup || "No setup"} <br> <strong>${randomJoke.punchline || "No punchline"}</strong></p>`}
                        </div>
                    `;
                } else {
                    display.innerHTML = "<p>No jokes available.</p>";
                }
            })
            .catch(error => console.error("Error fetching random joke:", error));
    });
    })

