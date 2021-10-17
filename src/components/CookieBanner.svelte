<script>
    import { onMount } from 'svelte';
import { bubble } from 'svelte/internal';
    export let forcePrompt = false;
    let prompt, cookieUtil;
    onMount(() => {
        cookieUtil = new CookieUtility();
        prompt = CookieUtility.consentStatus().askAgain
    })
    function handleDismiss() {
        prompt = false;
        forcePrompt = false;
    }
    function handleAgree() {
        CookieUtility.agree();
        handleDismiss()
    }
    function handleDecline() {
        CookieUtility.decline();
        handleDismiss()
    }
</script>

<style>
    #cookie-banner {
        position: fixed;
        left: 0em;
        bottom: 0em;
        padding: 1em 2em;
        width: 100%;
        background-color: rgba(255, 255, 255);
    }

    #cookie-banner p {
        font-size: 12pt;
    }

    .cookie-buttons {
        display: inline;
        padding: 0 1em;
    }

    .cookie-buttons button {
        margin: 0 1em;
    }

    @media only screen and (max-width: 500px) {
    
        .cookie-buttons {
            display: flex;
            justify-content: space-evenly;
            padding: 0.5em 1em;
        }
    
    }
</style>

{#if prompt === true || forcePrompt === true}
    <div id="cookie-banner">
        <p>Cookies are primarily used to retain your previous speed tests. For additional uses view our
        <a href="/about/privacy"> Privacy Policy</a>
        <span class="cookie-buttons">
            <button class="btn btn-blue" id="agree" on:click={handleAgree}>Accept</button>
            <button class="btn btn-red" id="decline" on:click={handleDecline}>Decline</button>
        </span>
    </p>
    </div>
{/if}