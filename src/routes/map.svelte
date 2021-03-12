<script data-dapp-detection>
  !(function () {
    let e = !1;
    function n() {
      if (!e) {
        const n = document.createElement('meta');
        (n.name = 'dapp-detected'), document.head.appendChild(n), (e = !0);
      }
    }
    if (window.hasOwnProperty('ethereum')) {
      if (((window.__disableDappDetectionInsertion = !0), void 0 === window.ethereum)) return;
      n();
    } else {
      var t = window.ethereum;
      Object.defineProperty(window, 'ethereum', {
        configurable: !0,
        enumerable: !1,
        set: function (e) {
          window.__disableDappDetectionInsertion || n(), (t = e);
        },
        get: function () {
          if (!window.__disableDappDetectionInsertion) {
            const e = arguments.callee;
            (e &&
              e.caller &&
              e.caller.toString &&
              -1 !== e.caller.toString().indexOf('getOwnPropertyNames')) ||
              n();
          }
          return t;
        },
      });
    }
  })();
</script>

<style>
.embed-container {
    position: relative;
    padding-bottom: 80%;
    height: 0;
    max-width: 80%;
}
.embed-container iframe,
.embed-container object,
.embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
small {
    position: absolute;
    z-index: 40;
    bottom: 0;
    margin-bottom: -15px;
}
</style>


<h2>Internet Speed in Vermont</h2>

<p>
  In the map below, the results of speed tests submitted by users of this site are shown as dots,
  with the color representing measured download speed from <font color="red"
    >red (4 mbps or less)</font
  >
  to
  <font color="darkgreen">green (over 100 mbps)</font>. If you did a speed test from a location in
  Vermont, your data point will show up on the map within 24 hours, so please check back!
</p>
<p>
  The shaded color for each town shows the percentage of buildings or homes that have broadband
  (25/3 mbps or higher speeds) from data obtained from the Vermont Dept of Public Service at
  <a target="new" href="https://publicservice.vermont.gov/content/broadband-availability"
    >publicservice.vermont.gov/content/broadband-availability</a
  >. To see the legend and the various map layers, click on the double arrow in the top left corner
  of the map and then click on the right arrow next to the "Percent Broadband" layer. To view the
  "Underserved" layer, turn off the Percent Broadband layer and you'll see the Underserved
  percentage. "Underserved" means less than 4 mbps download speed or no internet. The town data was
  collected in 2019 from the internet service providers as to what download/upload speeds they were
  serving to each address. This is one measure of service but overestimates the actual speeds that
  customers are experiencing.
</p>
<p>
  You can see the raw counts and percentages in each category by clicking on the town or point. For
  the data submitted using our speed test, clicking the point will show the download speed, the
  town, the date the test was done, and the company providing internet service.

</p>
<div class="embed-container">
  <small
    ><a
      href="http://codeforamerica.maps.arcgis.com/apps/Embed/index.html?webmap=b2e946f119224ae0ab1ed4dca59a8e14&amp;extent=-74.8561,42.7388,-69.8793,44.7154&amp;home=true&amp;zoom=true&amp;scale=true&amp;search=true&amp;searchextent=false&amp;legendlayers=true&amp;basemap_gallery=true&amp;disable_scroll=false&amp;theme=light"
      style="color: #0000ff; text-align: left"
      target="_blank">View larger map</a
    ></small
  ><br /><iframe
    width="500"
    height="400"
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    title="Vermont RuralNet"
    src="./map_files/index.html"
  />
</div>

<p>
  If you'd like to use this app on your mobile device, scan this QR code.
  <img src="./map_files/QR_Code.png" />
</p>
<div id="rc-pdjl">
  <div id="recipe-cart" class="sc-bdfBwQ bTZWVg">
    <div style="order: 3">
      <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="cursor: pointer"
      >
        <path
          d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"
          fill="#000A28"
        />
      </svg>
    </div>
    <img
      src="data:image/png;base64,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"
      style="max-height: 48px; margin-right: 8px"
    /><button color="gray" disabled="" class="sc-fubCfw jdTWDE">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADK0lEQVRoQ+2YjU1UQRDHZyrQDtQKlAqUCpQK1ArADuhAqECoQKgAqECpQOlAKxjyu8xu9t7Hvdnb90JI3iaXXO72Y/4fM/uh8sybPvP4ZQXw1AquCqwKNDKwWqiRwObhsyhgZi9F5L2IvBORDx4V3/md9k9Efvv3W/9+p6r83tSaAJjZZxH5UgRdGwxgLlT1snZg6l8NwNk+FpGTguF910/jUOJMRM5rVakC4Iyfisjr1ohHxv8VkdMaRUIAnPWfDVapxYu1jiJqTAIwM5KR4KOs4+dNoqrqJnF9Dub5JCIfg2hQAxAp+QeH7QRgZlQUgk/VZNfa1+SFqrLwaDMziMDvESDkBiAgpA6As3YTDP6bqhJUuJkZReB7YAAgDseUGFRg6eBT0HOA6AHwhP0V9Py1quLrrebVCobxPQ0fnw1VFzO7CtoJax50E3sIAFagzkfam9LzDh7bpcC7cwAEO+Qd2HPiT2Qx3ycgJrctAJ60BBBpl6rKLpybmaHcWPCpH9XpoDMuqgLDICAndRcAwaezzBSIr6p6sYefGdIdCxE/phb0/29V9TD1zQAq2Wc8fsw1Osj+oApeNFAv2rIKJYAa9kVVu+pZdHX6NY7PKpQA8BVH4lBrDKAVAEfxjdXntBB2ehtCL3KvqjnZZ7EQC5tZjQpPlcSZ/S0FHACytJTRiApb7Pu685RRn6x1I0PFMSvdU6YX28gcACdPmHwV8POVqh51+5kZdZ0dMwEhcI4Sed8o9g9Ou73jyMDaPfA9CxWTkmAw+SIAovokusfm99+V690NRu8DXhmiILgHnAfA5i5mxnkrcgQfDX5UgYIhkpoEiyhBP9SIXGi4B0RsszP4SQCeE9iJ4CI5wRD68qHalFdK8oGgI4EzzwN9m66UhRIkNkGFd+oaOw30vfPgJx++Ji/15eReXXhWiapRiwPWeVbpVauxiaoAFGWWEsknkhsREHidhKbUTrJeTlgNYEARav6+1sIqPC2GGe+y0QSgkyPpYTddiHg+SVbDGqk6UZrTu1EV20NSzgIg4pGl+qwAlmI2Ou+qQJSppfqtCizFbHTeVYEoU0v1ewTU0FhAjGQ6qQAAAABJRU5ErkJggg=="
        style="margin-right: 4px; max-height: 16px"
      />Recipe unavailable</button
    ><button
      color="buttonGreen"
      href=""
      disabled=""
      class="sc-fubCfw jpRfvL"
      style="min-width: 200px"
    >
      <img
        src="data:image/png;base64,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"
        style="margin-right: 6px; max-height: 16px"
      />Loading
    </button>
  </div>
</div>

