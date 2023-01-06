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
  const vehicleElement = $(`<li>
    <div class="car-detail1">
      <img class="car-img" src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
      <div class="car-info">
        <p> ${vehicle.make}<br><br> <b>${vehicle.model}</b></p>
        <p> ${vehicle.yr} </p>
      </div>
    </div>
    <div class="contact-p">
      <p>Contact Owner:<br> <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>
    </div>
    <div class="car-detail2">
      <p> $${vehicle.price} </p>
      <div id="${vehicle.id}" class="like">
        <button class="likeButton"><i class="fa fa-heart" aria-hidden="true"></i></button>
        <p>${vehicle.likes}</p>
      </div>
    </div>
  </li>`);
  return vehicleElement;
};

$(() => {
  loadVehicles();

  // This is handling the like button clicks
  setTimeout(() => {
    $('.likeButton').each(function() {
      const vehicleId = $(this).parent()[0].id;
      console.log('VEHICLE ID:', vehicleId);
      const body = {
        vehicleId: vehicleId
      };
       if(userEmail) { 
      $(this).on('click', () => {
        if (!$(this).hasClass('liked')) {
          $.ajax({
            method: 'POST',
            url: '/api/vehicles/likes',
            data: body
          })
            .then((response) => {
              $(this).addClass('liked');
            });
        } else {
          $.ajax({
            method: 'POST',
            url: '/api/vehicles/removeLikes',
            data: body
          })
            .then((response) => {
              $(this).removeClass('liked');
            });
        }
      });
    }
    });
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

