<script>

// Initialize memory for variables
let questionNumber = 0;
// let promise = findSurveys();

//temporary storage for checkbox answers; needed because something weird is happening with the data bindings
let usesCheckboxAnswers = []

let surveyInfo = [{
            id: 1,
            question: "How satisfied are you with the speed of your internet service?",
            answerName: "service-speed",
            answerType: "radio",
            answerOptions: [1,2,3,4,5],
            answer: null
        },
        {
            id: 2,
            question: "How satisfied are you with the reliability of your internet service?",
            answerName: "service-reliability",
            answerType: "radio",
            answerOptions: [1,2,3,4,5],
            answer: null
        },
        {
            id: 3,
            question: "How many users (or devices) are typically connected to your internet simultaneously?",
            answerName: "devices",
            answerType: "number",
            answerOptions: [],
            answer: null
        },
        {
            id: 4,
            question: "Which of the following is this internet connection used for?",
            answerName: "uses",
            answerType: "checkbox",
            answerOptions: ["Work", "K-12 Education", "Higher Ed", "Personal/General", "Other",],
            answer: [],
            other: ''
        },
    ]  

// Save the survey locally and on the database. Display all survey results.
function finishSurvey() {
    console.log(`Finish Survey:`);

    if (questionNumber === 3) {
        surveyInfo[questionNumber].answer = usesCheckboxAnswers;
    }

    //@TODO: Need to handle "other" scenario for checkbox question. Currently stored in surveyInfo[x].other as a string

    //@TODO: Probably need to pass something similar to surveyInfo so that question and answer pairs are each contained in their own object
    let survey = {
            "questions": JSON.stringify(surveyInfo.map(question=>{return question.question})),
            "answers": JSON.stringify(surveyInfo.map(question=>{return question.answer}))
        };
    console.log(survey);
    // postSurveyResults(survey);
    document.getElementById('finish').disabled = true;
}

// HTTP request to post the results to the database.
async function postSurveyResults(results) {
    console.log(`Post Survey Results:`);
    console.log(results);
    const res = await fetch("survey.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(results)
    });
    if (res.ok) {
        const success = await res.json();
        let testId = success.entryId;
    }
};

// Toggle to previous question and store data locally.
async function prevQuestion() {
    
    questionNumber--;

    if (questionNumber === 0) {
        document.getElementById('prev').disabled = true;
    }
    if (questionNumber < 0) {
        console.log('Question number less than or equal to 0.');
        questionNumber = 0;
    }
    if (document.getElementById('next').disabled === true) {
        document.getElementById('next').disabled = false;
    }
};

// Toggle to next question and store data locally.
async function nextQuestion() {

    if (questionNumber === 3) {
        surveyInfo[questionNumber].answer = usesCheckboxAnswers;
    }

    questionNumber++;

    if (questionNumber === surveyInfo.length - 1) {
        document.getElementById('next').disabled = true;
        document.getElementById('finish').disabled = false;
    }
    if (questionNumber > surveyInfo.length - 1) {
        console.log('Question number greater than the question array length.');
        questionNumber = surveyInfo.length - 1;
    }
    if (document.getElementById('prev').disabled === true) {
        document.getElementById('prev').disabled = false;
    }

};
</script>

<style>

    .survey-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .survey-container > * {
        margin: 10px 0;
    }

    .radio-group {
        display: flex;
    }

    .radio-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 1rem;
    }

</style>

<div class='survey-container'>
    <!-- <button id='survey' on:click={beginSurvey} tabindex="-1" focus>Click to take survey</button> -->
    <h2 id='question-number' >Question {questionNumber + 1} of {surveyInfo.length}</h2>
    <h3 id='question' >{surveyInfo[questionNumber].question}</h3>

    {#if questionNumber === 0}
        <div class="radio-group">
            {#each surveyInfo[questionNumber].answerOptions as option}
                <div class="radio-item">
                    <label for="name">{option}</label>
                    <input type="radio" id={option} bind:group={surveyInfo[questionNumber].answer}  value={option}>
                </div>
            {/each}
        </div> 

    {:else if questionNumber === 1}
        <div class="radio-group">
            {#each surveyInfo[questionNumber].answerOptions as option}
                <div class="radio-item">
                    <label for="name">{option}</label>
                    <input type="radio" id={option} bind:group={surveyInfo[questionNumber].answer}  value={option}>
                </div>
            {/each}
        </div> 

    {:else if questionNumber === 2}
        <input type="number" min="0" max="50" bind:value={surveyInfo[questionNumber].answer}>

    {:else if questionNumber === 3}
        <div class="check-group">
            {#each surveyInfo[questionNumber].answerOptions as option}
                <div class="check-item">
                    <input type="checkbox"  id={option} bind:group={usesCheckboxAnswers} value={option}>
                    <label >{option}</label>
                    {#if option == 'Other'}
                        <input type="text" name={option} id={option} bind:value={surveyInfo[questionNumber].other}>
                    {/if}
                </div>   
            {/each}
        </div>

    {:else}
    <div></div>
    {/if}

    <div>
        <button id='prev' on:click={prevQuestion} disabled>←</button>
        <button id='next' on:click={nextQuestion}  >→</button>
    </div>
    <div>
        <button id='finish' on:click={finishSurvey} disabled >Submit</button>
    </div>
</div>