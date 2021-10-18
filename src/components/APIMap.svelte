<script>
    import { onMount } from 'svelte';

    export let speedData = []

    onMount(() => {        

        require([
            "esri/config",
            "esri/Map",
            "esri/views/MapView",
            "esri/widgets/Locate",

            "esri/widgets/Track",
            "esri/Graphic",
            "esri/layers/GraphicsLayer"

        ], function (
            esriConfig,
            Map,
            MapView,
            Locate,

            Track,
            Graphic,
            GraphicsLayer

        ) {

            esriConfig.apiKey = "AAPK465a177b01b849219d7dbf20b61f9723BkAlush_BsVf8cawsGe_ChUG4NBJrUju6ENhasX38WdCdagW4qK7LTPzHZcqS1VA";

            const map = new Map({
                basemap: "arcgis-community" // Basemap layer service
            });

            const view = new MapView({
                container: "viewDiv",
                map: map,
                center: [-72.3376524418174, 43.64570487248435],
                zoom: 8
            });

            const locate = new Locate({
                view: view,
                useHeadingEnabled: false,
                goToOverride: function (view, options) {
                    options.target.scale = 1500;
                    return view.goTo(options.target);
                }
            });
            view.ui.add(locate, "top-left");

            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            // const point = { //Create a point
            //     type: "point",
            //     longitude: -72.305927,
            //     latitude: 43.660928
            // };
            // const simpleMarkerSymbol = {
            //     type: "simple-marker",
            //     color: [226, 119, 40], // Orange
            //     outline: {
            //         color: [255, 255, 255], // White
            //         width: 1
            //     }
            // };

            // const pointGraphic = new Graphic({
            //     geometry: point,
            //     symbol: simpleMarkerSymbol
            // });
            // graphicsLayer.add(pointGraphic);


            const determineMarkerColor = (downloadSpeed) => {
        if (downloadSpeed < 5) {
            return 'red'
        } else if (downloadSpeed >= 5 && downloadSpeed < 100) {
            return 'yellow'
        } else if (downloadSpeed > 100) {
            return 'green'
        } else {
            return 'blue'
        }
    }

    const buildMarkerSymbol = (downloadSpeed) => {
        return {
            type: "simple-marker",
                color: determineMarkerColor(downloadSpeed),
                outline: {
                    color: [255, 255, 255], // White
                    width: 1
                }
        }
    }

    const buildPoint = (longitude, latitude) => {
        return {
            type: "point",
            longitude: longitude,
            latitude: latitude
        }
    }

    const buildPointGraphic = (data) => {
        const pointGraphic = new Graphic({
            geometry: buildPoint(data.longitude, data.latitude),
            symbol: buildMarkerSymbol(data.downloadSpeed)
        });
        graphicsLayer.add(pointGraphic);
    }

    if (speedData) {

        speedData.map((data) => {
            if (data.downloadSpeed > 0 && data.longitude !== null) {
                buildPointGraphic(data)
            }
            
        })

        // buildPointGraphic(speedData[1])

        
        // console.log(speedData);
    }


        });

        

    }); // end of onMount

    


    const findData = async () => {
        const resp = await fetch('speedDB/speedDB.json');
        const data = await resp.json();
        if (resp.ok) {
            console.log('Data Found');
            console.log(data.docs[1]);
            buildPointGraphic(data.docs[1])
            return data.docs;
        } else {
            return [];
        }
    };
    // let promise = findData();

    const refreshData = async () => {
        promise = await findData();
    };


</script>

<style>
    #viewDiv {
        padding: 0 10px;
        margin: 0;
        min-height: 400px;
        min-width: 200px;
        width: 100%;
      }
</style>

<div id="viewDiv"></div>