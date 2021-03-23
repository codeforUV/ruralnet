<!--A front end route to see and edit your previous tests 
    Very similar to database and speedDatabase
-->
<script>
    import TestResult from '../components/TestResult.svelte'
    const findData = async () => {
        const resp = await fetch('speedDB/history.json');
        const data = await resp.json();
        if (resp.ok) {
            return data.docs;
        } else {
            return [];
        }
    };
    let promise = findData();

    const refreshData = async () => {
        promise = await findData();
    };
</script>

<h1>Your Speed Tests</h1>
<p>Your past speed test results will be displayed below. You may delete them, or update the location if it is inaccurate.</p>
<p><em>Warning! Clearing your brower's cookies or local storage will cause you to lose access to your previous tests!</em></p>
<p><em><strong>You will also not be able to see these test results from another device or browser</strong></em></p>
<div>
    {#await promise}
        <p>Loading...</p>
    {:then docs}
        {#if docs.length === 0}
            <p>Looks like you haven't tested yet. <a href="/newSpeed">Take a test.</a></p>
        {/if}
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