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
    });addJokeBtn.addEventListener("click", function (event) {
      event.preventDefault();

      const category = newCategory.value.trim();
      const setup = newSetup.value.trim();
      const punchline = newPunchline.value.trim();

      if (!category || !setup) {
        alert("Please enter a category and setup for the joke.");
        return;
      }

      const newJoke = {
        id: Math.random().toString(36).slice(2, 11), // Unique ID
        category: category,
        type: "twopart",
        setup: setup,
        punchline: punchline,
      };

      fetch("http://localhost:3000/jokes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJoke),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Joke added:", data);
          alert("Joke added successfully!");
          newCategory.value = "";
          newSetup.value = "";
          newPunchline.value = "";
        })
        .catch((error) => console.error("Error adding joke:", error));
    });

    })

