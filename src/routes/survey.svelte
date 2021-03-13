<script>
  
  // Svelte import
  import { onMount } from 'svelte';
import Survey from '../components/Survey.svelte';

  // Function that retrieves all surveys from the database.
  const findSurveys = async () => {
    // const resp = await fetch('survey.json');
    // const data = await resp.json();
    // if (resp.ok) {
    //   return data.docs;
    // }
  };

  // Initialize memory for constants
  // const storage = window.localStorage;  // will store some information about the most recent speedtest (1 day)
  // const saveResults = true;
  // const milliDay = 86400000; // the number of milliseconds in a day
  
  // Initialize memory for variables
  // let inProgress = false;
  let finished = false;
  // let questionNumber = 0;
  // let answer = '';
  // let questions;
  // let answers;
  // let questionsJSON;
  // let answersJSON;
  let promise = findSurveys().catch(err=>console.log(err));
  // let survey = {};

  // // Initialize local data persistence.
  // let surveyInfo = {
  //   questions: ["Who are the rural net team members?", "What are we trying to accomplish with the ruralnet project?", "When did the ruralnet project begin and when do we believe we have achieved success?", "Where did ruralnet begin and where do we want ruralnet to go?", "Why do you work for the ruralnet project?"],
  //   answers: []
  // };

  // Retrieve surveys that have been completed during the survey.
  const refreshSurveyResults = async () => {
    promise = await findSurveys();
  };
  
  // // Ensure that the answers array is the same length as the questions array.
  // function fill_array(size,content) {
  //   let arr = [];
  //   for(let i=0;i<size;i++){
  //     arr.push(content);
  //   }
  //   return arr;
  // };

  // // Initialize the survey graphical user interface.
  // async function beginSurvey() {
  //   let begin = document.getElementById('survey');
  //   begin.remove();
  //   inProgress = true;
  //   surveyInfo.answers = fill_array(surveyInfo.questions.length,'');
  //   document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
  //   document.getElementById('prev').disabled = true;
  //   document.getElementById('question-number').hidden = false;
  //   document.getElementById('question').hidden = false;
  //   document.getElementById('answer').hidden = false;
  //   document.getElementById('prev').hidden = false;
  //   document.getElementById('next').hidden = false;
  //   document.getElementById('save').hidden = false;
  //   document.getElementById('abandon').hidden = false;
  //   document.getElementById('exit').hidden = false;
  //   document.getElementById('finish').hidden = false;
  // };

  // // Toggle to next question and store data locally.
  // async function nextQuestion() {
  //   surveyInfo.answers[questionNumber] = answer;
  //   questionNumber++;
  //   if(questionNumber === surveyInfo.questions.length - 1) {
  //     document.getElementById('next').disabled = true;
  //   }
  //   if(questionNumber > surveyInfo.questions.length - 1) {
  //     console.log('Question number greater than the question array length.');
  //     questionNumber = surveyInfo.questions.length - 1;
  //   }
  //   if(document.getElementById('prev').disabled === true) {
  //     document.getElementById('prev').disabled = false;
  //   }
  //   answer = surveyInfo.answers[questionNumber];
  //   document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
  //   document.getElementById('answer').innerHTML = surveyInfo.answers[questionNumber];
  // };

  // // Toggle to previous question and store data locally.
  // async function prevQuestion() {
  //   surveyInfo.answers[questionNumber] = answer;
  //   questionNumber--;
  //   answer = surveyInfo.answers[questionNumber];
  //   if(questionNumber === 0) {
  //     document.getElementById('prev').disabled = true;
  //   }
  //   if(questionNumber < 0) {
  //     console.log('Question number less than or equal to 0.');
  //     questionNumber = 0;
  //   }
  //   if(document.getElementById('next').disabled === true) {
  //     document.getElementById('next').disabled = false;
  //   }
  //   document.getElementById('question').innerHTML = surveyInfo.questions[questionNumber];
  //   document.getElementById('answer').innerHTML = surveyInfo.answers[questionNumber];
  // };

  // // Save the survey locally and on the database.
  // async function saveSurvey() {
  //   // save the survey locally and on the database
  // };

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
      promise = await findSurveys();
    }
  };
  
  // // Prompt the user to save or delete data and return the user to the home page
  // async function exitSurvey() {
  //   // exit the survey
  //   // prompt user on delete or save answers
  //   // automatically save if the web page is abandoned
  // };

  // // Save the survey locally and on the database. Display all survey results.
  // function finishSurvey() {
  //   surveyInfo.answers[questionNumber] = answer;
  //   document.getElementById('finish').disabled = true;
  //   questionsJSON = JSON.stringify(surveyInfo.questions);
  //   answersJSON = JSON.stringify(surveyInfo.answers);
  //   console.log(questionsJSON);
  //   console.log(answersJSON);
  //   survey = { "questions": questionsJSON, "answers": answersJSON };
  //   console.log(survey);
  //   postSurveyResults(survey);
  //   finished = true;
  // }

  // // HTTP request to post the results to the database.
  // async function postSurveyResults (results) {
  //   console.log(results);
  //   const res = await fetch("survey.json", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(results)
  //   });
  //   if (res.ok) {
  //     const success = await res.json();
  //     let testId = success.entryId;
  //   }
  // };
</script>

<svelte:head>
  <title>Internet Service Survey</title>
</svelte:head>

<h1 id='title'>Please fill out this short survey to help us advocate for your internet service needs.</h1>
<!-- <h2 id='remove'>Let's think about our 'about page'.</h2> -->
{#if !finished}
  <!-- <div id='surveyContainer'>
    <button id='survey' on:click={beginSurvey} tabindex="-1" focus>Click to take survey</button>
    <h2 id='question-number' hidden>Question {questionNumber + 1} of {surveyInfo.questions.length}</h2>
    <h3 id='question' hidden>Question {questionNumber}</h3>
    <input id='answer' type="text" bind:value={answer} placeholder="answer" tabindex="-2" hidden>
    <button id='save' on:click={saveSurvey} hidden>Save Survey</button>
    <button id='abandon' on:click={deleteSurvey} hidden>Delete Survey</button>
    <button id='exit' on:click={exitSurvey} hidden>Exit Survey</button>
    <div>
      <button id='prev' on:click={prevQuestion} hidden>&#60;</button>
      <button id='next' on:click={nextQuestion} tabindex="-3" hidden>&#62;</button>
    </div>
    <div>
      <button id='finish' on:click={finishSurvey} tabindex="-4" hidden>Submit</button>
    </div>
  </div> -->
  <Survey />
{/if}
{#if finished}
  <div>
    {#await promise}
      <p>Loading...</p>
    {:then docs}
      <h2>Survey Results</h2>
      {#each docs as survey (survey._id)}
        <ol>
          <p>Survey data logged to console</p>
         
          <svg
            on:click={() => deleteSurvey(survey._id)}
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-square-x"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#607D8B"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </ol>
      {/each}
    {:catch err}
      <p class="error">{err.message}</p>
    {/await}
  </div>
{/if}
