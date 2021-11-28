<!--This component can be used to update the location of a speed test
    reuslts must be passed into this component when constructed
-->
<script>
  export let testResult; // a SpeedTestResult instance

  const testLocation = new LocationUtility(testResult);

  let locationInput = '';
  let saved = false;
  let editLocation = false;
  let promptText = '';

  async function prompt(promptString) {
    promptText = promptString;
    setTimeout(() => {
      promptText = '';
    }, 3000);
  }

  async function handleSave() {
    let success = await testLocation.updateLocation(locationInput);
    if (success === true) {
      saved = true;
      locationInput = '';
      prompt('Saved!');
      editLocation = !editLocation;
      testResult = testResult;
    } else {
      prompt('Location not updated');
    }
  }

  function handleEditLocation() {
    editLocation = true;
  }

  function handleCancel() {
    editLocation = false;
    promptText = '';
  }
</script>

{#if editLocation}
  <button class="btn-sm btn-red" on:click={handleCancel}>Cancel</button>
  <button class="btn-sm btn-blue" on:click={handleSave}>Save</button>
  <span>{promptText}</span>
  <input
    type="text"
    bind:value={locationInput}
    placeholder="Zip Code or City & State (Ex: Barre, VT)"
  />
{:else}
  <button class="btn-sm btn-blue" on:click={handleEditLocation}>Edit Location</button>
  <span>{promptText}</span>
{/if}

<style>
  button {
    margin: 5px;
  }

  input {
    background-color: white;
  }
</style>
