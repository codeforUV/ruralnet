<script>
    import { onMount } from 'svelte';
    let logging = false
    var speedTest; 
    var testComplete = false;
    onMount(() => {
        speedTest = new RuralTest(null, logging);
    })

    const handleStartTest = () => {
        speedTest.startTest();
    }

    const handleCancelTest = () => {
        speedTest.abortTest();
    }
</script>


<button id='test' class="btn btn-blue" on:click={handleStartTest}>Click to begin Speedtest</button>
<button disabled='true' id='cancel' class="btn btn-red" on:click={handleCancelTest}>Cancel Test</button>
<p id='result'></p>
<p id='done'></p>

