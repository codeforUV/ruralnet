<!--New speed test page! 
    Goal is to look just like the old page 
    and perform just like the old page
    but to have much cleaner code
    OOP approach
    and better performance/ new features
-->
<script>
    import { onMount } from 'svelte';
    var st; // = new RuralTest();
    onMount(() => {
        st = new RuralTest({log: "log"});
        st.prepare();
    })

</script>


<h1>New Speed Test</h1>

<h2>Test Log</h2>
<ol id="log">

</ol>