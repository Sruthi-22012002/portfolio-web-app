function initMap() {
    const location = { lat: -34.397, lng: 150.644 }; // Example coordinates, replace with your location
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: location,
    });
  
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "My Location",
    });
  }
  