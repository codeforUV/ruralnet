<script>
  
import Survey from '../components/Survey.svelte';

  let finished = false;

  const findSurveys = async () => {
      const resp = await fetch('/survey.json');
      const data = await resp.json();
      if (resp.ok) {
        console.log('Server response object:');
        console.log(resp);
        console.log('Response JSON parsed:');
        console.log(data);
        return data.docs;
      }
  }

  let promise = findSurveys().catch(err=>console.log(err));

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
  
</script>

<svelte:head>
  <title>Survey</title>
</svelte:head>

<h1 id='title'>Survey</h1>
{#if !finished}
  <Survey bind:submitted={finished} />
{/if}
{#if finished}
  <div>
    {#await promise}
      <p>Loading...</p>
    {:then docs}
      <h2>Survey Results</h2>
      {#each docs as survey (survey._id)}
        <ul>
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
          <ol>
            {#each survey.answers as answers (answers._id)}
              <li>{answers.answer}</li>
            {/each}
          </ol>
          <li>{`${survey.city}, ${survey.state}`}</li>
          <li>{survey.date}</li>
        </ul>
      {/each}
    {:catch err}
      <p class="error">{err.message}</p>
    {/await}
  </div>
{/if}
