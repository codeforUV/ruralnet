<script>
    import TestResult from './TestResult.svelte'
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

<div>Clearing your brower's cookies or local storage will cause you to lose access to your previous tests.</div><br/>
<div>You will also not be able to see these test results from another device or browser</div>
<div>
    {#await promise}
        <p>Loading...</p>
    {:then docs}
        {#if docs.length === 0}
            <p>Looks like you haven't tested yet. <a href="/index">Take a test.</a></p>
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