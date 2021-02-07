<!--This component can be used to update the location of a speed test
    reuslts must be passed into this component when constructed
-->
<script>
    export let testResult;  // a SpeedTestResult instance
    export let id = "";
    const testLocation = new LocationUtility(testResult);
    var locationInput;
    function fixLocation() {
        let success = testLocation.updateLocation(locationInput);
        if (success === true) {
            document.getElementById(`chastise${id}`).textContent = "Location updated! Collapse to see changes";
        } else {
            document.getElementById(`chastise${id}`).textContent = "Um... that's not a place. Check that it's correct and try again.";
        }
    }
</script>

<h2>Update Test Location</h2>
<p><strong>Input either a 5-digit zip code, or the name of your city and state</strong></p>
<input type="text" bind:value={locationInput} placeholder="example: Barre, VT">
<button on:click={fixLocation}>That's where I am</button>
<p id="chastise{id}"></p>