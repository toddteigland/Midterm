//Onclick loops through vehicles in response object
$(() => {
  $('#search-button').on('submit', (event) => {
    // event.preventDefault();
    $.ajax({
      method: 'GET',
      url: '/api/vehicles'
    })
    .done((response) => {
      const $vehicleList = $('#vehicles');
      // empties list everytime its clicked before repopulating
      $vehicleList.empty();
      
      // Gives each item a class for styling and adds to vehicle list
      for(const vehicle of response.vehicles) {
        $(`<li class="vehicle">`).html(
          // Width + Height are just here temporarily until css is done!!!!!!!!!
          `<img src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
          <p> ${vehicle.yr} </p>
          <p> ${vehicle.make} <b>${vehicle.model}</b></p>
          <p> $${vehicle.price} </p>
          <p> # of LIKES = ${vehicle.likes}`
        ).appendTo($vehicleList);
      }
    });
  });
});

function getAllBySearch(params) {
  let url = "/api/vehicles";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

