<script>
import Speed from "../routes/speed.svelte";



    export let submitted = false;

// Initialize memory for variables
let questionNumber = 0;
// let promise = findSurveys();

//temporary storage for checkbox answers; needed because something weird is happening with the data bindings
let usesCheckboxAnswers = []

let surveyInfo = [
        {
            _id: 1,
            question: "When you connect to the internet at home, do you:",
            answerName: "connection",
            answerType: "radio",
            answerOptions: ["Connect to your home Wi-Fi (typical for laptop, tablet or phone)", "Connect your computer to your router with a cable (typical for desktop computer)", "Set up your phone as a Wi-Fi hotspot (if you don't have home internet, but use cell phone for internet)"],
            answer: null,
            
        },
        {
            _id: 2,
            question: "Approximately how many other devices are using your internet while you ran the test? (Other people in your home that are online, Alexa, smart home devices, security cameras, etc.)",
            answerName: "devices",
            answerType: "radio",
            answerOptions: ["1 - 5","5 - 9","10 or more"],
            answer: null,
            
        },
        {
            _id: 3,
            question: "How satisfied are you with the speed of your internet service?",
            answerName: "service-speed",
            answerType: "radio",
            answerOptions: ["Very dissatisfied", "Somewhat dissatisfied", "Neutral", "Somewhat satisfied", "Very satisfied"],
            answer: null,
            
        },
        {
            _id: 4,
            question: "Which of the following is this internet connection used for? (check all that apply)",
            answerName: "uses",
            answerType: "checkbox",
            answerOptions: ["K-12 Education", "Higher Education", "Personal/General", "Remote Work/Home Business", "Telemedecine" ],
            answer: []
        },
        {
            _id: 5,
            question: "High speed fiber internet would typically allow one person to be uploading and downloading multiple videos, music files and photos, a second person to watch a video (Hulu, Netflix, Amazon Prime), and a third person to be browsing and reading email, all at the same time. If high speed fiber internet were available at your location, how much per month would you be willing to pay?",
            answerName: "cost",
            answerType: "radio",
            answerOptions: ["less than $25", "$25-$50", "$50-$75", "$75-$100", "more than $100"],
            answer: []
        },
        {
            _id: 6,
            question: "Additional questions or feedback?",
            answerName: "feedback",
            answerType: "textarea",
            answerOptions: [],
            answer: []
        },
    ]  

// Save the survey locally and on the database. Display all survey results.
function finishSurvey() {
    console.log(`Finish Survey:`);
    console.log(surveyInfo);

    if (questionNumber === 3) {
        surveyInfo[questionNumber].answer = usesCheckboxAnswers;
    }

    //@TODO: Need to handle "other" scenario for checkbox question. Currently stored in surveyInfo[x].other as a string

    const storage = window.localStorage; 
    const recentTest = JSON.parse(storage.recentTest)

    let data = {
            "date": new Date().toString(),
            "address": recentTest.address ? recentTest.address : null,
            "city": recentTest.city ? recentTest.city : null,
            "state": recentTest.state ? recentTest.state : null,
            "answers": surveyInfo.map(question => {
                if (question.answerName === 'uses') {
                    return {
                        questionId: question.answerName,
                        answer: question.answer.join(", ")
                    }
                } else {
                    return {
                        questionId: question.answerName,
                        answer: question.answer
                    }
                }
            })
        };
    
    postSurveyResults(data);
    document.getElementById('finish').disabled = true;
    submitted = true
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

    console.log(surveyInfo[questionNumber])

    if (questionNumber === 3) {
        surveyInfo[questionNumber].answer = usesCheckboxAnswers;
    }

    const answer = surveyInfo[questionNumber].answer

    if (answer === null || answer.length === 0) {
        document.getElementById('message').innerText = 'Please select an answer.'
        return
    } else {
        document.getElementById('message').innerText = null
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

    #message {
        color: red;
        font-size: 12pt;
    }

    .survey-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* border-radius: 25px; */
        /* padding: 2em; */
        /* box-shadow: 0px 0px 30px lightgrey; */
    }

    .survey-container > * {
        margin: 10px 0;
    }

    .radio-item {
        display: flex;
    }
    
    .radio-item input {
        margin-right: 5px;
    }

    textarea {
        width: 100%;
    }

</style>

<div class='survey-container'>
    <!-- <h1 id="title">Internet Usage Survey</h1> -->
    <!-- <button id='survey' on:click={beginSurvey} tabindex="-1" focus>Click to take survey</button> -->
    <p id='question-number'>Question {questionNumber + 1} of {surveyInfo.length}</p>
    <p id='question'>{surveyInfo[questionNumber].question}</p>

    {#if questionNumber === 0}
        
            <div class="radio-group">
                {#each surveyInfo[questionNumber].answerOptions as option}
                    <div class="radio-item">
                        <input type="radio" id={option} bind:group={surveyInfo[questionNumber].answer}  value={option}>
                        <label for="name">{option}</label>
                    </div>
                {/each}
            </div> 
        

    {:else if questionNumber === 1}
        
            <div class="radio-group">
                {#each surveyInfo[questionNumber].answerOptions as option}
                    <div class="radio-item">
                        <input type="radio" id={option} bind:group={surveyInfo[questionNumber].answer}  value={option}>
                        <label for="name">{option}</label>
                    </div>
                {/each}
            </div> 
        

    {:else if questionNumber === 2}
        
            <div class="radio-group">
                {#each surveyInfo[questionNumber].answerOptions as option}
                    <div class="radio-item">
                        <input type="radio" id={option} bind:group={surveyInfo[questionNumber].answer}  value={option}>
                        <label for="name">{option}</label>
                    </div>
                {/each}
            </div>
        

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
        
    {:else if questionNumber === 4}
        
            <div class="radio-group">
                {#each surveyInfo[questionNumber].answerOptions as option}
                    <div class="radio-item">
                        <input type="radio" id={option} bind:group={surveyInfo[questionNumber].answer}  value={option}>
                        <label for="name">{option}</label>
                    </div>
                {/each}
            </div>
        

    {:else if questionNumber === 5}
        <textarea bind:value={surveyInfo[questionNumber].answer} rows="4"></textarea>
    {:else}
        <div>Error: Input for this survey question has not been accounted for. (index:{questionNumber} of surveyInfo.  Component: Survey.svelte)</div>
    {/if}

    <div>
        <button class="btn" id='prev' on:click={prevQuestion} disabled>←</button>
        <button class="btn" id='next' on:click={nextQuestion}  >→</button>
    </div>
    <div>
        <p id='message'></p>
    </div>
    <div>
        <button class="btn btn-blue" id='finish' on:click={finishSurvey} disabled >Submit</button>
    </div>
</div>