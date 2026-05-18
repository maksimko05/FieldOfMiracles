const questions = [
    {
        question: "A large case with a handle used for carrying clothes and personal belongings when traveling.",
        answer: "suitcase"
    },
    {
        question: "A brief period of rain or snow, usually lasting only a short time.",
        answer: "shower"
    },
    {
        question: "A person who is walking in the street or along a sidewalk, rather than driving a vehicle.",
        answer: "pedestrian"
    },
    {
        question: "A very strong and powerful wind that can cause damage during severe weather.",
        answer: "gale"
    },
    {
        question: "A boat or ship used to carry passengers and vehicles across a river or narrow sea.",
        answer: "ferry"
    },
    {
        question: "img-helicopter.webp",
        answer: "helicopter",
    },
    {
        question: "img-crossroad.jpg",
        answer: "crossroad",
    },
    {
        question: "img-fog.webp",
        answer: "fog",
    },
    {
        question: "img-frost.jpg",
        answer: "frost",
    },
    {
        question: "img-railroad.jpg",
        answer: "railroad",
    },
    {
        type: "crossword",
        size: {x: 10, y: 9},
        questions: [
            {
                question: "1.)A measurement of how hot or cold something is, checked with a thermometer.",
                answer: "temperature",
                start: {x: 0, y: 1},
                direction: "horizontal"
            },
            {
                question: "2.)One of the four main periods of the year: spring, summer, autumn, or winter.",
                answer: "season",
                start: {x: 4, y: 0},
                direction: "vertical"
            },
            {
                question: "3.)A small, light vehicle with two wheels and a handlebar, which can be powered by your foot or an electric motor. (horizontal)",
                answer: "scooter",
                start: {x: 2, y: 4},
                direction: "horizontal"
            },
            {
                question: "4.)A machine with wheels or tracks used for transporting people or goods, such as a car, truck, or bus.",
                answer: "vehicle",
                start: {x: 7, y: 3},
                direction: "vertical"
            },
            {
                question: "3.)Weather characterized by strong winds, heavy rain, thunder, or lightning. (vertical)",
                answer: "stormy",
                start: {x: 2, y: 4},
                direction: "vertical"
            }
        ]
    }
];

//-------------------Question wrapper-------------------//
const questionWrapper = document.querySelector(".question_wrapper");
const wordSection = questionWrapper.querySelector(".word_section");
const questionSection = questionWrapper.querySelector(".question_section");
//-------------------Question wrapper-------------------//



//-------------------Crossword wrapper-------------------//
const crosswordWrapper = document.querySelector(".crossword_wrapper");
const crosswordQuestions = crosswordWrapper.querySelector(".crossword_questions");
const crosswordMap = crosswordWrapper.querySelector(".crossword_map");

const initialEmptyMap = () => {
    crosswordMap.innerHTML = "";
    for(let y = 0; y < 12; y++){
        for(let x = 0; x < 15; x++){
            crosswordMap.innerHTML += `<div id="ceil_${x}_${y}" class = "crossword_letter hidden">
                                            <p class = "index_word"></p>
                                            <p class = "field_letter"></p>
                                        </div>`;
        }
    }
};

initialEmptyMap();
//-------------------Crossword wrapper-------------------//




//-------------------Final message-------------------//
const winFone = document.querySelector(".win_fone");

const finalMessage = document.createElement("div");
finalMessage.classList.add("final_message");
finalMessage.innerHTML = `<h1>Congratulations! You've completed the quiz!</h1>
                          <p>Thank you for your participation! If you want to play again, click the button below.</p>`;

const playAgainButton = document.createElement("button");
playAgainButton.textContent = "Play Again";
playAgainButton.addEventListener("click", () => {
    currentQuestion = 0;
    finalMessage.remove();
    displayQuestion();
});

finalMessage.appendChild(playAgainButton);
//-------------------Final message-------------------//

let currentQuestion = 10;

const completeQuestion = () => {
    winFone.classList.add("activated");
    confetti({
        particleCount: 100,
        angle: 60,
        spread: 100,
        origin: { x: 0.15, y: 0.85 }
    });
    
    confetti({
        particleCount: 100,
        angle: 120,
        spread: 100,
        origin: { x: 0.85, y: 0.85 }
    });

    confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 1 }
    });
    setTimeout(() => {
        currentQuestion++;
        displayQuestion(); 
        winFone.classList.remove("activated");
    }, 1000);
};

const showLetter = (letterBox) => {
    if(letterBox.classList.contains("activated")){
        return;
    }

    letterBox.classList.add("activated");

    let wordIsShown = true;
    for(let letter of wordSection.children){
        if(!letter.classList.contains("activated")){
            wordIsShown = false;
            break;
        }
    }

    if(wordIsShown){
        completeQuestion();
    }
};

const finalMessageAppear = () => {
    document.body.appendChild(finalMessage);
};

const switchTypeOFquestion = type => {
    switch(type){
        case "crossword":
            questionWrapper.classList.add("hidden_wrapper");
            crosswordWrapper.classList.remove("hidden_wrapper");
            crosswordQuestions.innerHTML = "<h1>Questions: </h1>";
            break;
        default:
            crosswordWrapper.classList.add("hidden_wrapper");
            questionWrapper.classList.remove("hidden_wrapper");
    }
};

const buildCrossword = () => {
    switchTypeOFquestion("crossword");
    
    const crossword = questions[currentQuestion];

    let i = 1;
    let countLetters = 0;
    let activatedLetters = 0;
    initialEmptyMap();
    for(let question of crossword.questions){
        crosswordQuestions.innerHTML += `<br><p>${question.question}</p>`;
        let firstLetter = true;
        for(let offset = 0; offset < question.answer.length; offset++){
            const offsetX = question.direction === "horizontal" ? offset : 0;
            const offsetY = question.direction === "vertical" ? offset : 0;
            let ceil = crosswordMap.querySelector(`#ceil_${question.start.x + offsetX}_${question.start.y + offsetY}`);
            const index = ceil.querySelector(".index_word");
            if(firstLetter){
                if(index.textContent === ""){
                    index.textContent = i;
                }
                else{
                    i--;
                }
                index.classList.remove("hidden");
                firstLetter = false;
            }
            else{
                index.classList.add("hidden");
            }
            ceil.classList.remove("hidden");
            const letter = ceil.querySelector(".field_letter");
            if(letter.textContent === ""){
                countLetters++;
                letter.textContent = question.answer[offset];

                const clickOnCeil = buttonDown => {
                    console.log("DSF")
                    if(buttonDown !== 1){
                        return;
                    }
                    if(!ceil.classList.contains("activated")){
                        activatedLetters++;
                        ceil.classList.add("activated");
                    }
                    if(activatedLetters === countLetters){
                        completeQuestion();
                    }
                };

                ceil.addEventListener("pointerdown", event => clickOnCeil(1));
                ceil.addEventListener("pointerover", event => clickOnCeil(event.buttons));
            }
        };
        i++;
    };
};

const displayQuestion = () => {
    if(currentQuestion >= questions.length){
        finalMessageAppear();
        return;
    }
    const question = questions[currentQuestion];
    if(question.type === "crossword"){
        buildCrossword();
        return;
    }

    switchTypeOFquestion("question");
    wordSection.innerHTML = ``;
    question.answer.split("").forEach((letter, index) => {
        let letterBox = document.createElement("div");
        letterBox.classList.add("letter_box");
        letterBox.innerHTML = `<p>${letter}</p>`;
        letterBox.addEventListener("pointerdown", () => showLetter(letterBox));
        letterBox.addEventListener("pointerover", event => event.buttons === 1 && showLetter(letterBox));
        wordSection.appendChild(letterBox);

        if(question.question.startsWith("img-")){
            questionSection.innerHTML = `<img src="/src/images/${question.question.split("-")[1]}" alt="question image">`;
        }
        else{
            questionSection.innerHTML = `<p>${question.question}</p>`;
        }
    });
};

displayQuestion();