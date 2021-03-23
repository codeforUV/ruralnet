<!--A component to display the results of a test
    either live during test or on a page that lists results-->
<script>
    import LocationUpdate from './LocationUpdate.svelte';
    //import SpeedTestResult from '../../static/RuralClasses.js'
    export let testData;  // a RuralTestResult instance
    export let id = "";  // if multiple instances of this component exist on a page, use this id to reference elements by id 
    
    async function deleteItem(id) {
        console.log(id);
        const resp = await fetch('speedDB/speedDB.json', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        if (resp.ok) {
            console.log('item deleted');
            location.reload();
        }
    };
    var locationEdit = false;
    function locationButton() {
        if (locationEdit) {
            document.getElementById(`locationExpander${id}`).textContent = "That location isn't right";
        } else {
            document.getElementById(`locationExpander${id}`).textContent = "Collapse";
        }
        locationEdit = !locationEdit;
    }
</script>

<p>Test Result {btoa(testData._content._id)}
    <svg
        on:click={() => deleteItem(testData._content._id)}
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
</p>
<p id='result{id}'>{testData.toString()}</p>
<p id='done{id}'>{testData.metaDataString()}</p>
<button id='locationExpander{id}' on:click={locationButton}>That location isn't right</button>
{#if locationEdit}
    <svelte:component this={LocationUpdate} bind:testResult={testData} id={id}/>
{/if}