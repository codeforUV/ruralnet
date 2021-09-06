<!--A component to display the results of a test
    either live during test or on a page that lists results-->
<script>
    import LocationUpdate from './LocationUpdate.svelte';
    //import SpeedTestResult from '../../static/RuralClasses.js'
    export let testData;  // a RuralTestResult instance
    export let id = "";  // if multiple instances of this component exist on a page, use this id to reference elements by id 
    export let allowEdit = true;
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
            // location.reload();
        }
    };
    var locationEdit = false;
    function locationButton() {
        if (locationEdit) {
            document.getElementById(`locationExpander${id}`).textContent = "Edit Location";
        } else {
            document.getElementById(`locationExpander${id}`).textContent = "Cancel";
        }
        locationEdit = !locationEdit;
    }

    let ping = testData._content.ping
    let downloadSpeed = testData._content.downloadSpeed
    let uploadSpeed = testData._content.uploadSpeed
    let testDateTime = new Date(`${testData._content.date}T${testData._content.time}Z`).toLocaleString()
    let internetProvider = testData._content.internetProvider
    let location = testData._content.city

</script>

<style>
    .test-result {
        margin: 1em 0;
    }
</style>

<div class="test-result">
<!-- <p>Test Result {btoa(testData._content._id)} -->
    <p>Speed Test: {testDateTime}
    {#if allowEdit}
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
    {/if}
</p>
<!-- <p id='result{id}'>{testData.toString()}</p> -->
<!-- <p id='done{id}'>{testData.metaDataString()}</p> -->
<ul>
{#if ping}
<li>Ping: {ping}</li>
{/if}
{#if downloadSpeed}
<li>Download: {downloadSpeed}</li>
{/if}
{#if uploadSpeed}
<li>Upload: {uploadSpeed}</li>
{/if}

{#if internetProvider}
<li>Internet Provider: {internetProvider}</li>
{/if}
{#if location}
<li>Location: <strong>{location}</strong></li>
{:else}
<li><strong>No Location Found</strong></li>
{/if}
</ul>

{#if allowEdit}
    <button class="btn-sm btn-blue" id='locationExpander{id}' on:click={locationButton}>Edit Location</button>
{/if}
{#if locationEdit}
    <svelte:component this={LocationUpdate} bind:testResult={testData} id={id}/>
{/if}

</div>