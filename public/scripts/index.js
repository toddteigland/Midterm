const loadVehicles = () => {
  $.ajax({
    method: 'GET',
    url: '/api/index'
  })
    .then((response) => {
      renderVehicles(response.vehicles);
    });
};

const renderVehicles = (vehicles) => {
  const $vehicleList = $('#vehicleList');
  $vehicleList.empty();
  for (vehicle of vehicles) {
    $vehicleList.append(createVehicleElement(vehicle));
  }
};

const createVehicleElement = (vehicle) => {
  // Width + Height are just here temporarily until css is done!!!!!!!!! -->
  const vehicleElement = $(`<li id="${vehicle.id}">
    <img src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
    <p> ${vehicle.yr} </p>
    <p> ${vehicle.make} <b>${vehicle.model}</b></p>
    <p> $${vehicle.price} </p>
    <p> # of LIKES = ${vehicle.likes}</p>
    <button class="likeButton"><i class="fa fa-heart" aria-hidden="true"></i></button>
    <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>
    </li>`);
  return vehicleElement;
};

$(() => {
  loadVehicles()
  setTimeout(() => {
    $('.likeButton').each(function() {

      $(this).on('click', (event) => {
        event.preventDefault();
        console.log('THIS:', $(this).parent()[0].id);
      })
    });

    // $('.likeButton').on('click', (event) => {
    //   event.preventDefault();
    //   console.log('THIS: ', $(this))

    // })
    // console.log('LIKE BUTTONS PARENT: ', $likeButton);
  }, 1000);

  const $filterForm = $('#filter-form');
  $filterForm.on('submit', (event) => {
    event.preventDefault();
    console.log($filterForm.serialize());
    $.ajax({
      method: 'POST',
      url: '/api/vehicles/filter',
      data: $filterForm.serialize()
    })
      .then((response) => {
        renderVehicles(response.vehicles);
      });
  });

});

