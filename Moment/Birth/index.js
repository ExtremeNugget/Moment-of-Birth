document.addEventListener("DOMContentLoaded", () => {
    const game1Btn = document.getElementById("game1");
    const popup1 = document.getElementById("popup-game1");
    const closeBtns = document.querySelectorAll(".popup .close");

    game1Btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Inject game HTML into popup
        popup1.querySelector(".popup-content").innerHTML = `
            <span class="close">&times;</span>
            <div class="game-box" id="game-area">
                <h2>
                    Your ass sure loves numbers doesnt it?<br>Whoa ex! Look at the time!!!
                    Whoa ex, add the numbers!!! WHOA 10!?!?<br>
                    ALRIGHT FUCK FACE HOW ABOUT YOU GUESS THE NUMBER THEN
                </h2>
                <input type="number" id="code-input" maxlength="4" placeholder="Enter 4-digit num">
                <button id="submit-code" class="btn">Submit</button>
                <p id="feedback"></p>
            </div>
        `;

        popup1.classList.remove("hidden");

        // Game logic
        const correctCode = "1208";
        let wrongMessages = [
            "Holy fuck did your ass really guess 1618?",
            "Oh shit you didnt? Alright must have been 1010 then",
            "Holy fuck you suck at this u know what next u get wrong lets see what happens",
            "No u",
            "Ok I see",
            "Nyarehodo",
            "Yeah so u deserved that but its uh whats today?",
            "BITCH ITS FUCKING TODAY HOW HAVE U NOT"
        ];
        let wrongIndex = 0;

        document.getElementById("submit-code").addEventListener("click", () => {
            const guess = document.getElementById("code-input").value.trim();
            const feedback = document.getElementById("feedback");

            if (guess === correctCode) {
                feedback.style.color = "lime";
                feedback.textContent = "Fuck";
            } else {
                feedback.style.color = "red";
                feedback.textContent = wrongMessages[wrongIndex] || "That's still wrong buddy.";
                wrongIndex++;
            }
        });

        // Close button rebind
        popup1.querySelector(".close").addEventListener("click", () => {
            popup1.classList.add("hidden");
        });
    });

    // Close popups when clicking close button
    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".popup").classList.add("hidden");
        });
    });
});

// ========================
// GAME 2 (Wordle)
// ========================
document.getElementById("game2").addEventListener("click", (e) => {
    e.preventDefault();

    const popup2 = document.getElementById("popup-game2");
    const popupContent = popup2.querySelector(".popup-content");

    popupContent.innerHTML = `
        <span class="close">&times;</span>
        <div class="wordle-container">
            <h2>Guess the 5-letter word</h2>
            <div id="wordle-grid"></div>
            <input type="text" id="wordle-input" maxlength="5" placeholder="Enter guess">
            <button id="wordle-submit" class="btn">Submit</button>
            <p id="wordle-feedback"></p>
        </div>
    `;
    popup2.classList.remove("hidden");

    const correctWord = "BALLS"; // Can randomize later
    const maxGuesses = 6;
    let currentGuess = 0;

    // Build grid
    const grid = document.getElementById("wordle-grid");
    for (let i = 0; i < maxGuesses; i++) {
        const row = document.createElement("div");
        row.classList.add("wordle-row");
        for (let j = 0; j < 5; j++) {
            const box = document.createElement("div");
            box.classList.add("wordle-box");
            row.appendChild(box);
        }
        grid.appendChild(row);
    }

    // Handle submit
    document.getElementById("wordle-submit").addEventListener("click", () => {
        const guess = document.getElementById("wordle-input").value.toUpperCase();
        const feedback = document.getElementById("wordle-feedback");

        if (guess.length !== 5) {
            feedback.textContent = "Word must be 5 letters.";
            feedback.style.color = "red";
            return;
        }

        const row = grid.children[currentGuess].children;
        const correctArr = correctWord.split("");
        const guessArr = guess.split("");

        // Track used letters
        let letterUsed = Array(5).fill(false);

        // First pass: mark greens
        for (let i = 0; i < 5; i++) {
            row[i].textContent = guessArr[i];
            if (guessArr[i] === correctArr[i]) {
                row[i].style.backgroundColor = "green";
                row[i].style.color = "white";
                letterUsed[i] = true;
                guessArr[i] = null; // mark guess as handled
            }
        }

        // Second pass: mark yellows
        for (let i = 0; i < 5; i++) {
            if (guessArr[i] !== null) {
                let foundIndex = correctArr.findIndex((letter, idx) => letter === guessArr[i] && !letterUsed[idx]);
                if (foundIndex !== -1) {
                    row[i].style.backgroundColor = "gold";
                    row[i].style.color = "black";
                    letterUsed[foundIndex] = true;
                } else {
                    row[i].style.backgroundColor = "grey";
                    row[i].style.color = "white";
                }
            }
        }

        if (guess === correctWord) {
            feedback.textContent = "You got it!";
            feedback.style.color = "lime";
        } else {
            currentGuess++;
            if (currentGuess >= maxGuesses) {
                feedback.textContent = `Game over! The word was ${correctWord}.`;
                feedback.style.color = "red";
            }
        }

        document.getElementById("wordle-input").value = "";
    });

    // Close popup
    popup2.querySelector(".close").addEventListener("click", () => {
        popup2.classList.add("hidden");
    });
});
