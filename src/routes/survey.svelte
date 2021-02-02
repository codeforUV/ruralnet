<script>
  
  // Svelte import
  import { onMount } from 'svelte';

  // Initialize memory for constants
  const storage = window.localStorage;  // will store some information about the most recent speedtest (1 day)
  const saveResults = true;
  const milliDay = 86400000; // the number of milliseconds in a day
  
  // Initialize memory for variables
  var inProgress = false;
  var finished = false;
  var questionNumber = 0;
  var answer = '';
  var promise = findSurvey();

  // Initialize local data persistence.
  var surveyInfo = {
    questions: ["Who are the rural net team members?", "What are we trying to accomplish with the ruralnet project?", "When did the ruralnet project begin and when do we believe we have achieved success?", "Where did ruralnet begin and where do we want ruralnet to go?", "Why do you work for the ruralnet project?"],
    answers: []
  };

  // Retrieve all surveys from the database.
  const findSurveys = async () => {
    const resp = await fetch('survey.json');
    const data = await resp.json();
    if (resp.ok) {
      return data.docs;
    }
  };

  // Retrieve surveys that have been completed during the survey.
  const refreshSurveyResults = async () => {
    promise = await findSurveys();
  };
  
  // Ensure that the answers array is the same length as the questions array.
  function fill_array(size,content) {
    var arr = [];
    for(var i=0;i<size;i++){
      arr.push(content);
    }
    return arr;
  };

  // Initialize the survey graphical user interface.
  async function beginSurvey() {
    let begin = document.getElementById('survey');
    begin.remove();
    inProgress = true;
    surveyInfo.answers = fill_array(surveyInfo.questions.length,'');
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
    document.getElementById('finish').hidden = false;
  };

  // Toggle to next question and store data locally.
  async function nextQuestion() {
    questionNumber++;
    surveyInfo.answers[questionNumber - 1] = answer;
    console.log(surveyInfo.answers[questionNumber]);
    answer = surveyInfo.answers[questionNumber];
    if(questionNumber >= surveyInfo.questions.length - 1) {
      console.log('Question number greater than or equal to the question array length.');
      document.getElementById('next').disabled = true;
      questionNumber = surveyInfo.questions.length - 1;
    }
    else {
      if(document.getElementById('prev').disabled === true) {
        document.getElementById('prev').disabled = false;
      }
      document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
      document.getElementById('answer').innerHTML = surveyInfo.answers[questionNumber];
    }
  };

  // Toggle to previous question and store data locally.
  async function prevQuestion() {
    questionNumber--;
    surveyInfo.answers[questionNumber + 1] = answer;
    answer = surveyInfo.answers[questionNumber];
    if(questionNumber <= 0) {
      console.log('Question number less than or equal to 0.');
      document.getElementById('prev').disabled = true;
      questionNumber = 0;
    }
    else {
      if(document.getElementById('next').disabled === true) {
        document.getElementById('next').disabled = false;
      }
      document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
      document.getElementById('answer').innerHTML = surveyInfo.answers[questionNumber];
    }
  };

  // Save the survey locally and on the database.
  async function saveSurvey() {
    // save the survey locally and on the database
  };

  // Delete the survey locally and on the database.
  const deleteSurvey = async (id) => {
    console.log(id);
    const resp = await fetch('survey.json', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (resp.ok) {
      console.log('item deleted');
      promise = await findData();
    }
  };
  
  // Prompt the user to save or delete data and return the user to the home page
  async function exitSurvey() {
    // exit the survey
    // prompt user on delete or save answers
    // automatically save if the web page is abandoned
  };

  // Save the survey locally and on the database. Display all survey results.
  async function finishSurvey() {
    document.getElementById('finish').disabled = true;
    // survey = { "questions": surveyInfo.questions, "answers": surveyInfo.answers };
    // console.log(survey);
    // postSurveyResults(survey);
    finished = true;
    removeSurvey = document.getElementById('surveyContainer');
    removeSurvey.remove();
  }

  // HTTP request to post the results to the database.
  async function postSurveyResults (results) {
    const res = await fetch("survey.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(results)
    });
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
  <div id='surveyContainer'>
    <button id='survey' on:click={beginSurvey} tabindex="-1" focus>Click to take survey</button>
    <h2 id='question-number' hidden>Question {questionNumber + 1} of {surveyInfo.questions.length}</h2>
    <h3 id='question' hidden>Question {questionNumber}</h3>
    <input id='answer' type="text" bind:value={answer} placeholder="answer" tabindex="1" autofocus hidden>
    <button id='save' on:click={saveSurvey} hidden>Save Survey</button>
    <button id='abandon' on:click={deleteSurvey} hidden>Delete Survey</button>
    <button id='exit' on:click={exitSurvey} hidden>Exit Survey</button>
  </div>
  <div>
    <button id='prev' on:click={prevQuestion} hidden>&#60;</button>
    <button id='next' on:click={nextQuestion} tabindex="2" hidden>&#62;</button>
  </div>
  <div>
    <button id='finish' on:click={finishSurvey} tabindex="3" hidden>Submit</button>
  </div>
{/if}
{#if finished}
  <div>
    {#await promise}
      <p>Loading...</p>
    {:then docs}
      <h2>Survey Results</h2>
      <ol>
        {#each docs as { _id, questions, answers }, i}
          <li>
            <p> { questions }</p>
            <p> { answers }</p>
          </li>
        {/each}
      </ol>
    {:catch err}
      <p class="error">{err.message}</p>
    {/await}
  </div>
{/if}
