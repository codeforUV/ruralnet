<script>
    import { onMount } from 'svelte';
    let agreed;
    onMount(() => {
        agreed = window.localStorage.getItem("cookieConsent") || "false";
    })
    function agree() {
        agreed = "true";
        window.localStorage.setItem("cookieConsent", "true");
    }
    function decline() {
        window.localStorage.setItem("cookieConsent", "false");
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

{#if agreed === "false"}
    <div id="cookie-banner">
        <p>Our sites uses cookies. Consenting to cookies is required to test.</p>
        <p>Read the <a href="/about/privacy">Privacy Policy</a> to learn more.</p>
        <button id="agree" on:click={agree}>Agree to Cookies</button>
        <button id="decline" on:click={decline}>Decline</button>
    </div>
{/if}