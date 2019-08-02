import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ActivatedRoute } from '@angular/router';
declare var google :any;

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit, AfterViewInit {
  params: any;
  post: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  map() {
    
  var locations = [
    ['Gentec Australia', -33.921240, 151.181170, 9],
    ['Singapore', 1.3, 78.9629, 8],
    ['India', 20.5937, 32.78604, 7],
    ['Middle East', 39.896446, 32.78604, 6],
    ['North Queensland', -26.934031, 152.953894, 5],
    ['Fiji', -18, 178, 4],
    ['Papua New Guinea', -6.36667, 146.1, 3],
    ['Hong Kong', 22.27833, 114.15861, 2],
    ['Macau', 22.16667, 113.55, 1],
  ];

  // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 2,

      // The latitude and longitude to center the map (always required)
      center: new google.maps.LatLng(-25.734968, 134.489563), // New York
      mapTypeId: google.maps.MapTypeId.ROADMAP,

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
  var infowindow = new google.maps.InfoWindow();
  var marker, i
  for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

    google.maps.event.addListener(marker, 'mouseover', ((marker, i) => {
      return function () {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
    google.maps.event.addListener(marker, 'mouseout', ((marker, i) => {
      return function () {
        infowindow.close();
      }
    })(marker, i));
  }

    // setTimeout(() => {
    //   this.scriptsService.prepareJquery();
    // }, 1000)
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.params = params;
      if (params.id) {
        this.postService.GetSinglePage(params.id).subscribe((res: any) => {
          this.post = res;
          console.log(res)
        })
      }
    })
  }

  ngAfterViewInit() {
    if(this.params.id === 'distribution') {
      this.map();
    }
  }

}
