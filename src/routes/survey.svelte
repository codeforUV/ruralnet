<script>
    import { onMount } from 'svelte';
    var surveyInfo = {
	questions: ["Who are the rural net team members?", "What are we trying to accomplish with the ruralnet project?", "When did the ruralnet project begin and when do we believe we have achieved success?", "Where did ruralnet begin and where do we want ruralnet to go?", "Why do you work for the ruralnet project?"],
	answers: [],
    };
    var today;
    const saveResults = true;
    const milliDay = 86400000; // the number of milliseconds in a day
    var inProgress = false;
    var finished = false;
    const storage = window.localStorage;  // will store some information about the most recent speedtest (1 day)
    var questionNumber = 0;
    var answer = '';
    async function beginSurvey() {
	let begin = document.getElementById('survey');
	begin.remove();
        inProgress = true;
	document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
	document.getElementById('prev').disabled = true;
	document.getElementById('question-number').hidden = false;
	document.getElementById('question').hidden = false;
	document.getElementById('answer').hidden = false;
	document.getElementById('prev').hidden = false;
	document.getElementById('next').hidden = false;
	document.getElementById('save').hidden = false;
	document.getElementById('abandon').hidden = false;
	document.getElementById('exit').hidden = false;
    };
    async function nextQuestion() {
        surveyInfo.answers.push(document.getElementById('answer').innerHTML);
	if(questionNumber >= surveyInfo.questions.length - 1) {
            document.getElementById('next').disabled = true;
            questionNumber = surveyInfo.questions.length - 1;
        }
	else {
            if(document.getElementById('prev').disabled === true) {
                document.getElementById('prev').disabled = false;
            }
            questionNumber++;
            document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
	}
    };
    async function prevQuestion() {
        surveyInfo.answers.push(document.getElementById('answer').innerHTML);
	document.getElementById('answer').innerHTML = surveyInfo.answers[questionNumber];
	if(questionNumber <= 0) {
            document.getElementById('prev').disabled = true;
            questionNumber = 0;
        }
	else {
            if(document.getElementById('next').disabled === true) {
                document.getElementById('next').disabled = false;
            }
            questionNumber--;
            document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
	}
	console.log(surveyInfo.questions[questionNumber]);
	console.log(surveyInfo.questions.length);
	console.log(questionNumber);
        console.log(document.getElementById('prev').disabled);
    };
    async function saveSurvey() {
        // save the survey locally and on the database
    };
    async function deleteSurvey() {
        // delete survey locally and on the database
    };
    async function exitSurvey() {
        // exit the survey
        // prompt user on delete or save answers
        // automatically save if the web page is abandoned
    };
    async function postSurveyResults (results) {
        // pass in a results json object to be posted to the server
        const res = await fetch("speedDatabase.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(results)
        });
        /*
        
        document.getElementById("done").style.backgroundColor = success.success ? "green" : "red";
        */
       if (res.ok) {
            const success = await res.json();
            testId = success.entryId;
       }
    };
</script>

<svelte:head>
  <title>Internet Service Survey</title>
</svelte:head>

<h1 id='title'>Please fill out this short survey to help us advocate for your internet service needs.</h1>
<h2 id='remove'>Let's think about our 'about page'.</h2>
{#if !finished}
    <button id='survey' on:click={beginSurvey}>Click to takey survey</button>
    <h2 id='question-number' hidden>Question {questionNumber + 1} of {surveyInfo.questions.length}</h2>
    <h3 id='question' hidden>Question {questionNumber}</h3>
    <input id='answer' type="text" value={answer} placeholder="answer" hidden>
    <button id='prev' on:click={prevQuestion} hidden>Prev Question</button>
    <button id='next' on:click={nextQuestion} hidden>Next Question</button>
    <button id='save' on:click={saveSurvey} hidden>Save Survey</button>
    <button id='abandon' on:click={deleteSurvey} hidden>Delete Survey</button>
    <button id='exit' on:click={exitSurvey} hidden>Exit Survey</button>
{/if}
<p id='result'></p>
<p id='done'></p>
{#if finished}

{/if}
