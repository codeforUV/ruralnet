<!--A front end route to see and edit your previous tests 
    Very similar to database and speedDatabase
-->
<script>
    import TestResult from '../components/TestResult.svelte'
    const findData = async () => {
        const resp = await fetch('speedDB/history.json');
        const data = await resp.json();
        if (resp.ok) {
        // console.log('Server response object:');
        // console.log(resp);
        // console.log('Response JSON parsed:');
        // console.log(data);
        return data.docs;
        }
    };
    let promise = findData();

    const refreshData = async () => {
        promise = await findData();
    };
</script>

<h1>Your Speed Tests</h1>
<p>Your past speed test results will be displayed below. You may delete them, or update the location if it is inaccurate.</p>
<div>
    {#await promise}
        <p>Loading...</p>
    {:then docs}
        <h2>Documents</h2>
        <ol>
        {#each docs as test, i}
            <li>
                <svelte:component this={TestResult} testData={new RuralTestResult(test)} id={i}/>  <!--If IDE warns here, ignore it-->
            </li>
        {/each}
        </ol>
    {:catch err}
        <p class="error">{err.message}</p>
    {/await}
</div>