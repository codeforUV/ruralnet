<!-- This file serves as a test to see if svelte will update components based on object instances
when they are changed-->
<script>
import { onMount } from 'svelte';
class SvelteInvestigation {
    constructor() {
        this.active = false;
        this.message = "Carribean vacation!";
    }
    toggleActive() {
        console.log("TOGGLE");
        console.log(this);
        this.active = !this.active;
        console.log(this.active);
    }
    toggleMessage() {
        console.log(this.message);
        if (this.message) {
            this.message = this.message.split("").reverse().join("");
        } else {
            this.message = ":( no more vacation";
        }
    }
}

function updateObject(obj, method) {
    method = method.bind(obj);
    method();
}
function refreshObjects() {
    si = si;
}
function svelteObjectUpdate(obj, method) {
    return () => {
        updateObject(obj, method);
        refreshObjects();
    }
    
}

let si = new SvelteInvestigation();
/**
 * svelte updates components reactivly only if the exact symbol is on the lh side of the assignment
*/
</script> 

<h1>{si.message}</h1>
<h2>{si.active}</h2>
<button on:click={svelteObjectUpdate(si, si.toggleActive)}>Activate</button>
<button on:click={() => {si.toggleMessage(); si = si;}}>Flip</button>
{#if si.active}
    <p>MULLET POWERRRRR</p>
{/if}

<!-- working example
<h1>{si.message}</h1>
<h2>{si.active}</h2>
<button on:click={() => {si.toggleActive(); si = si;}}>Activate</button>
<button on:click={() => {si.toggleMessage(); si = si;}}>Flip</button>
{#if si.active}
    <p>MULLET POWERRRRR</p>
{/if}
-->