<script>
    import { onMount } from 'svelte';
    let cookieUtil, cookieOK;
    onMount(() => {
        cookieUtil = new CookieUtility();
        cookieOK = CookieUtility.consentStatus().consented;
    })

    function agreeUpdate() {
        CookieUtility.agree();
        cookieOK = true;
    }

    function declineUpdate() {
        CookieUtility.decline();
        cookieOK = false;
    }

</script>
<h1>RuralNet Privacy Policy</h1>
<p>Ruralnet respects your privacy and believes that you deserve to know what we do with your data.</p>
<p>RuralNet uses Cookies to improve your speedtesting experience. Our cookies remember your device without requiring you to login.</p>
<p>RuralNet collects information about your location with each speedtest. Specifically, we collect the name of the city or town that you reside in, not your pinpointed location.</p>
<p>RuralNet does not sell your information to any outside thrid parties.</p>
<p>By using RuralNet to perform speedtests, you agree to allow us to collect information about your location and Internet Service Provider. </p>
<p><strong>This Privacy Policy is not final, just a placeholder with sentances that seem close enough, maybe, until a more qualified individual or team writes a proper and substantive privacy policy.</strong></p>
<h2>Your Cookie Agreement Status</h2>
<p>You can always change your mind </p>
{#if cookieOK}
    <p><strong>You have accepted cookies</strong></p>
    <p><em>Warning! Declining cookies may erase the "Your Tests" page from your perspective permenantly! The results will not be lost, but you will no longer be associated with them.</em></p>
    <button on:click={ declineUpdate }>Decline Cookies</button>
{:else}
    <p><strong>You have declined cookies</strong></p>
    <button on:click={ agreeUpdate }>Accept Cookies</button>
{/if}
