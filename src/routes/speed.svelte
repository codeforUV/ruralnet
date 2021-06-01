<!--New speed test page! 
    Goal is to look just like the old page 
    and perform just like the old page
    but to have much cleaner code
    OOP approach
    and better performance/ new features
-->
<script>
    import { onMount } from 'svelte';
    var st; 
    var testComplete = false;
    onMount(() => {
        st = new RuralTest();
    })
</script>


<h1 id='title'>New Speed Test</h1>
<button id='test' class="btn btn-blue" on:click={() => {st.startTest()}}>Click to begin Speedtest</button>
<button disabled='true' id='cancel' class="btn btn-red" on:click={() => {st.abortTest()}}>Cancel Test</button>
<p id='result'></p>
<p id='done'></p>

<h2>Test Log</h2>
<ol id="log">
</ol>