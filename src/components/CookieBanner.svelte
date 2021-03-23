<script>
    import { onMount } from 'svelte';
    export let forcePrompt = false;
    let prompt, cookieUtil;
    onMount(() => {
        cookieUtil = new CookieUtility();
        prompt = cookieUtil.consentStatus.askAgain
    })
    function agree() {
        cookieUtil.agree();
    }
    function decline() {
        cookieUtil.decline();
    }
</script>

<style>
    #cookie-banner {
        position: fixed;
        left: 3em;
        bottom: 3em;
        border-style: solid;
    }
    #agree {
        background-color: blue;
        color: white;
    }
</style>

{#if prompt === true || forcePrompt === true}
    <div id="cookie-banner">
        <p>Our sites uses cookies. Consenting to cookies is required to test.</p>
        <p>Read the <a href="/about/privacy">Privacy Policy</a> to learn more.</p>
        <button id="agree" on:click={agree}>Agree to Cookies</button>
        <button id="decline" on:click={decline}>Decline</button>
    </div>
{/if}