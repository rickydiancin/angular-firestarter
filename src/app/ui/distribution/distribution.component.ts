import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ScriptsService } from 'src/app/core/scripts.service';
declare var google :any;
@Component({
  selector: 'distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  post:any;
  

  constructor(
    public postService: PostService,
    public scriptsService: ScriptsService, 
  ) { }

  ngOnInit() {
              // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                  // How zoomed in you want the map to start at (always required)
                  zoom: 11,

                  // The latitude and longitude to center the map (always required)
                  center: new google.maps.LatLng(-33.921240, 151.181170), // New York

                  // How you would like to style the map. 
                  // This is where you would paste any style found on Snazzy Maps.
                  styles: [{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#625d55"}]},{"featureType":"administrative.locality","elementType":"labels.text.stroke","stylers":[{"weight":"0.95"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":"0"},{"weight":"1.00"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#f8f8f8"},{"lightness":"0"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":"1"}]}]
              };

              // Get the HTML DOM element that will contain your map 
              // We are using a div with id="map" seen below in the <body>
              var mapElement = document.getElementById('b-map');

              // Create the Google Map using our element and options defined above
              var map = new google.maps.Map(mapElement, mapOptions);

              // Let's also add a marker while we're at it
              var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(-33.921240, 151.181170),
                  map: map,
                  title: 'Snazzy!'
              });

    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)

    this.postService.getSinglePost('sCgQFxJxCU9RpFQY9WcX').subscribe(res => {
      console.log(res);
      this.post= res;
     });
  }
  

}
