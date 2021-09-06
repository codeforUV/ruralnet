<!--This component can be used to update the location of a speed test
    reuslts must be passed into this component when constructed
-->
<script>
    export let testResult;  // a SpeedTestResult instance
    export let id = "";
    const testLocation = new LocationUtility(testResult);
    var locationInput;
    async function fixLocation() {
        let success = await testLocation.updateLocation(locationInput);
        if (success === true) {
            document.getElementById(`chastise${id}`).textContent = "Location updated!";
        } else {
            document.getElementById(`chastise${id}`).textContent = "Um... that's not a place. Check that it's correct and try again.";
        }
        testResult = testResult;  // thanks to binding, this will update the display in the parent component
    }
</script>

<!-- <h2>Update Test {id + 1} Location</h2> -->
<!-- <p>Input either a 5-digit zip code, or the name of your city and state</p> -->
<input type="text" bind:value={locationInput} placeholder="Zip Code or City & State (Ex: Barre, VT)">
<button class="btn-sm btn-blue" on:click={fixLocation}>Update Location</button>
<p id="chastise{id}"></p>