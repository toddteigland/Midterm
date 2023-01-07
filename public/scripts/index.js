let user = '';
$(document).ready(function(e) {
$.get('/login')
  .then ((data)=> {
    user = data.email;
    displayNav();
  })


  //Determines based on logged in/out status what to show in header
  const displayNav = function() {
    if (user) {
      $('.userEmail').text(user);
      $('.logoutForm').show();
      $('.dashboard-nav').show();
      $('.likeButton').attr('disabled',false);
      $('.loginForm').hide();
      // 
    } else {
      $('.logoutForm').hide();
      $('.loginForm').show();
      $('.userEmail').text('');
      $('.dashboard-nav').hide();
      $('.likeButton').attr('disabled',true);
    }
  };
  displayNav();

  // On login adds user email to user variable
  $('.loginForm').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post('/login', data)
      .then((res) => {
        user = res.userEmail;
        displayNav();
      });
  });

  // On logout removes user email from user variable
  $('.logoutForm').on('submit', function(event) {
    event.preventDefault();
    $.post('/logout')
      .then((res) => {
        user = res.userEmail;
        displayNav();
      });
  });

  // Load response vehicles into vehicle cards for index page
  const loadVehicles = () => {
    $.ajax({
      method: 'GET',
      url: '/api/index'
    })
      .then((response) => {
        renderVehicles(response.vehicles);
      });
  };
  loadVehicles();

  const renderVehicles = (vehicles) => {
    const $vehicleList = $('#vehicleList');
    $vehicleList.empty();
    for (vehicle of vehicles) {
      $vehicleList.append(createVehicleElement(vehicle));
    }
  };

  const createVehicleElement = (vehicle) => {
    const vehicleElement = $(`<li class="test">
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

// Adds a like to the like table when logged in user likes a vehicle
  $(".result").on("click", ".likeButton", function(e) {
    if(!user) {
      return
    }
    const vehicleId = $(this).parent()[0].id;
    const body = {
      vehicleId: vehicleId
    };

    if (!$(this).hasClass('liked')) {
      $.post('/api/vehicles/likes',body)
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

  //when filter form submits returns list of vehicles from query
  const $filterForm = $('#filter-form');
  $filterForm.on('submit', (event) => {
    event.preventDefault();
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

