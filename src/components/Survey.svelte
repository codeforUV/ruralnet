<script>

// Initialize memory for variables
let questionNumber = 0;
let questionsJSON;
let answersJSON;
// let promise = findSurveys();
let survey = {};

let checkboxAnswers = []

let surveyInfo2 = [{
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
        surveyInfo2[questionNumber].answer = checkboxAnswers;
    }

    document.getElementById('finish').disabled = true;

    questionsJSON = JSON.stringify(surveyInfo2.map(question=>{return question.question}))
    answersJSON = JSON.stringify(surveyInfo2.map(question=>{return question.answer}))
    //@TODO: Need to handle "other" scenario for checkbox question. Currently stored in surveyInfo2[x].other as a string

    survey = {
        "questions": questionsJSON,
        "answers": answersJSON
    };
    console.log(survey);
    // postSurveyResults(survey);

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
        surveyInfo2[questionNumber].answer = checkboxAnswers;
    }

    questionNumber++;
    if (questionNumber === surveyInfo2.length - 1) {
        document.getElementById('next').disabled = true;
        document.getElementById('finish').disabled = false;
    }
    if (questionNumber > surveyInfo2.length - 1) {
        console.log('Question number greater than the question array length.');
        questionNumber = surveyInfo2.length - 1;
    }
    if (document.getElementById('prev').disabled === true) {
        document.getElementById('prev').disabled = false;
    }
    // answer = surveyInfo.answers[questionNumber];
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
    <h2 id='question-number' >Question {questionNumber + 1} of {surveyInfo2.length}</h2>
    <h3 id='question' >{surveyInfo2[questionNumber].question}</h3>

        <!-- <Answer type={surveyInfo2[questionNumber].answerType} 
                options={surveyInfo2[questionNumber].answerOptions} 
                name={surveyInfo2[questionNumber].answerName} 
                bind:answer={answer}/> -->

    {#if questionNumber === 0}
        <div class="radio-group">
            {#each surveyInfo2[questionNumber].answerOptions as option}
                <div class="radio-item">
                    <label for="name">{option}</label>
                    <input type="radio" id={option} bind:group={surveyInfo2[questionNumber].answer}  value={option}>
                </div>
            {/each}
        </div> 
    {:else if questionNumber === 1}
    <div class="radio-group">
        {#each surveyInfo2[questionNumber].answerOptions as option}
            <div class="radio-item">
                <label for="name">{option}</label>
                <input type="radio" id={option} bind:group={surveyInfo2[questionNumber].answer}  value={option}>
            </div>
        {/each}
    </div> 
    {:else if questionNumber === 2}
        <input type="number" bind:value={surveyInfo2[questionNumber].answer}>
    {:else if questionNumber === 3}
    <div class="check-group">
        {#each surveyInfo2[questionNumber].answerOptions as option}
            <div class="check-item">
                <input type="checkbox"  id={option} bind:group={checkboxAnswers} value={option}>
                <label >{option}</label>
                {#if option == 'Other'}
                    <input type="text" name={option} id={option} bind:value={surveyInfo2[questionNumber].other}>
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