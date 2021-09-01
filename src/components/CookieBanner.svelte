<script>
    import { onMount } from 'svelte';
import { bubble } from 'svelte/internal';
    export let forcePrompt = false;
    let prompt, cookieUtil;
    onMount(() => {
        cookieUtil = new CookieUtility();
        prompt = CookieUtility.consentStatus().askAgain
    })
    function dismiss() {
        prompt = false;
        forcePrompt = false;
    }
    function agree() {
        CookieUtility.agree();
        dismiss()
    }
    function decline() {
        CookieUtility.decline();
        dismiss()
    }
</script>

<style>
    #cookie-banner {
        position: fixed;
        left: 3em;
        bottom: 3em;
        padding: 1em 2em;
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>

{#if prompt === true || forcePrompt === true}
    <div id="cookie-banner">
        <p>Our sites uses cookies. Consenting to cookies is required to test.</p>
        <p>Read the <a href="/about/privacy">Privacy Policy</a> to learn more.</p>
        <button id="agree" on:click={agree}>Agree to Cookies</button>
        <button id="decline" on:click={decline}>Decline</button>
        <button id="dismiss" on:click={dismiss}>Dismiss</button>
    </div>
{/if}