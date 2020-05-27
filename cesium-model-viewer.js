(function(Cesium){

    'use strict';

    var CesiumModelViewer = {

        viewer: null,
        scene: null,
        extent: null,
        layerFiles: [
            '/files/gbr4_2.0-23.75.png',
            '/files/gbr4_2.0-17.75.png',
            '/files/gbr4_2.0-12.75.png',
            '/files/gbr4_2.0-5.55.png',
            '/files/gbr4_2.0-0.5.png'
        ],

        init: function(){
            this.initViewer();
            this.initLayers();
            this.initModels();
        },

        initViewer: function(){

            this.extent = Cesium.Rectangle.fromDegrees(24.0,56.88,24.28,57.0);
            Cesium.Camera.DEFAULT_VIEW_RECTANGLE = this.extent;
            Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

            this.viewer = new Cesium.Viewer('cesiumContainer', {
                animation: false,
                vrButton: true,
                timeline: false
            });
            this.scene = CesiumModelViewer.viewer.scene;

        },

        initLayers: function(){

            for(var i = 0; i < this.layerFiles.length; i++){
                var height = i * 200000;
                this.addLayer(height, this.layerFiles[i]);
            }

        },

        addLayer: function(height, file){

            var instance = new Cesium.GeometryInstance({
                geometry : new Cesium.RectangleGeometry({
                    rectangle : Cesium.Rectangle.fromDegrees(25.385, 57.512, 25.45, 57.552),
                    vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
                    height: height
                })
            });

            this.scene.primitives.add(new Cesium.Primitive({
                geometryInstances : instance,
                appearance : new Cesium.EllipsoidSurfaceAppearance({
                    material: new Cesium.Material({
                        fabric : {
                            uniforms : {
                                image : file,
                                repeat : new Cesium.Cartesian2(1.0, 1.0),
                                alpha : 0.5
                            },
                            components : {
                                diffuse : 'texture2D(image, fract(repeat * materialInput.st)).rgb',
                                alpha : 'texture2D(image, fract(repeat * materialInput.st)).a * alpha'
                            }
                        }
                    })
                })
            }));

        },

       

        initModels: function(){
            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(25.4245,57.5349));
            var model = this.scene.primitives.add(Cesium.Model.fromGltf({
                url : '/models/BGLTF/station_44018.bgltf',
                modelMatrix : modelMatrix,
                scale : 15000
            }));

            var url = '/models/BGLTF/Yass_Topo_6.bgltf';
            var position = Cesium.Cartesian3.fromDegrees(20.4245,29.5349);
            var heading = Cesium.Math.toRadians(180);
            var pitch = 0;
            var roll = 40;
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

            var entity = this.viewer.entities.add({
                name: url,
                position: position,
                orientation: orientation,
                model: {
                    uri: url,
                    minimumPixelSize: 128,
                    scale : 100
                }
            });

        }
    };

    CesiumModelViewer.init();

})(Cesium);










