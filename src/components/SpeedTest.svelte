<script>
    import { onMount } from 'svelte';
    import { afterUpdate } from 'svelte';
    import { createEventDispatcher } from 'svelte';


    let logging = false
    let speedTest; 
    let doneElement = null

    const dispatch = createEventDispatcher();

    
    onMount(() => {
        speedTest = new RuralTest(null, logging);

        //Listen for speed test to finish send back notification to parent
        doneElement = document.getElementById('done');
        doneElement.addEventListener('DOMSubtreeModified', function () {
            console.log('eventfired');
            console.log(doneElement.innerText);
            
            if (doneElement.innerText === 'Finished!') {
                console.log('WooHoo!');
                dispatch('testComplete', true)
            }
        })
    })

    afterUpdate(() => {
        // testFinished = speedTest.startTest()
    })

    const handleStartTest = () => {
        speedTest.startTest()
    }

    const handleCancelTest = () => {
        speedTest.abortTest();
    }

</script>

<button id='test' class="btn btn-blue" on:click={handleStartTest}>Click to begin Speedtest</button>
<button disabled='true' id='cancel' class="btn btn-red" on:click={handleCancelTest}>Cancel Test</button>
<p id='result'></p>
<p id='done'></p>



