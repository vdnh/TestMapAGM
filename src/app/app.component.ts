import { Component, ViewChild, OnInit } from '@angular/core';
import { MouseEvent, LatLngLiteral, LatLng } from '@agm/core';
declare const google: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  polygon: any;

  managerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ['polygon']
    },
    polygonOptions: {
      draggable: true,
      editable: true
    },
    drawingMode: "polygon"
  };

  constructor() {
  }

  options: any = {
    lat: 45.503964,
    lng: -73.567426,
    zoom: 10,
    fillColor: '#DC143C',
    draggable: true,
    editable: true,
    visible: true
  };

  polygonCreated($event) {

    if (this.polygon) {
      this.polygon.setMap(null);
    }
    this.polygon = $event;
    this.addPolygonChangeEvent(this.polygon);
    google.maps.event.addListener(this.polygon, 'coordinates_changed', function (index, obj) {
      // Polygon object: yourPolygon
      console.log('coordinates_changed');   
    });
    console.log('this.polygon.getPath() : '+this.polygon.getPath().length)
    let path:Array<LatLng>=this.polygon.getPath()
    path.forEach((latLng:LatLng)=>{
      console.log('latLng.lat: ' +latLng.lat)
      console.log('latLng.lng: ' +latLng.lng)
    })

  }

  getPaths() {
    console.log("get path");
    if (this.polygon) {
      const vertices = this.polygon.getPaths().getArray()[0];
      let paths = [];
      vertices.getArray().forEach(function (xy, i) {
        // console.log(xy);
        let latLng = {
          lat: xy.lat(),
          lng: xy.lng()
        };
        console.log('lat : '+latLng.lat);
        console.log('lat : '+latLng.lng);
        paths.push(JSON.stringify(latLng));
      });
      return paths;
    }
    return [];
  }

  addPolygonChangeEvent(polygon) {
    var me = polygon,
      isBeingDragged = false,
      triggerCoordinatesChanged = function () {
        // Broadcast normalized event
        google.maps.event.trigger(me, 'coordinates_changed');
      };

    // If  the overlay is being dragged, set_at gets called repeatedly,
    // so either we can debounce that or igore while dragging,
    // ignoring is more efficient
    google.maps.event.addListener(me, 'dragstart', function () {
      isBeingDragged = true;
    });

    // If the overlay is dragged
    google.maps.event.addListener(me, 'dragend', function () {
      triggerCoordinatesChanged();
      isBeingDragged = false;
    });

    // Or vertices are added to any of the possible paths, or deleted
    var paths = me.getPaths();
    //console.log('paths.length : '+paths.length)
    //console.log('paths.toString() : '+paths.toString())
    // paths.forEach(path=>{
    //   console.log("path.lat : " + path.lat)
    //   console.log("path.lng : " + path.lng)
    // })
    paths.forEach(function (path, i) {      
      google.maps.event.addListener(path, "insert_at", function () {
        triggerCoordinatesChanged();
      });
      google.maps.event.addListener(path, "set_at", function () {
        if (!isBeingDragged) {
          triggerCoordinatesChanged();
        }
      });
      google.maps.event.addListener(path, "remove_at", function () {
        triggerCoordinatesChanged();
      });
    });
  };
//*  add the marker and circle for test
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: '#01',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: '#02',
		  draggable: true
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: '#03',
		  draggable: true
	  }
  ]
  // end of add the marker and circle for test */
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
