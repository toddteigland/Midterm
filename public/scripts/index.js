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
    <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>
    <p> $${vehicle.price} </p>
    <button class="likeButton"><i class="fa fa-heart" aria-hidden="true"></i></button>
    <p>${vehicle.likes}</p>
    </li>`);
  return vehicleElement;
};

$(() => {
  loadVehicles();

  // This is handling the like button clicks
  setTimeout(() => {
    $('.likeButton').each(function() {
      const vehicleId = $(this).parent()[0].id;
      const body = {
        vehicleId: vehicleId
      };
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
              console.log('REMOVE LIKES CLICKED');
            });
        }
      });
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
  $("#postCar").click(function(){
    $.post("/dashboard/api/cars",
    {
      owner_id: 1,
      make: $("#make").val(),
      model:  $("#model").val(),
      yr:  $("#yr").val(),
      price:  $("#price").val(),
      color:  $("#color").val(),
      thumbnail_img:  $("#photos").val(),
      fullsize_img: $("#photos").val(),
    },
    function(data, status){
      location.reload();
    });
  })

});

