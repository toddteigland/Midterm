let user = '';
$(document).ready(function(e) {
$.get('/login')
  .then ((data)=> {
    user = data.email;
    displayNav();
  })


  //make function displaynav, call it
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

  $('.loginForm').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post('/login', data)
      .then((res) => {
        user = res.userEmail;
        displayNav();
      });
  });

  $('.logoutForm').on('submit', function(event) {
    event.preventDefault();
    $.post('/logout')
      .then((res) => {
        user = res.userEmail;
        displayNav();
      });
  });

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
        <p> ${vehicle.make} <b>${vehicle.model}</b></p>
        <p> ${vehicle.yr} </p>
      </div>
    </div>
    <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>
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


  // const userEmail = req.cookies.userEmail;

  $(".result").on("click", ".likeButton", function(e) {
    //   //e.preventDefault();
    console.log('CLICKED!!!!!');
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

  // } else { //You are not logged in and we give user a message
  //   alert("Please log in before liking vehicles");
  // }
  //   });





  // This is handling the like button clicks
  // setTimeout(() => {
  //   $('.likeButton').each(function() {

  // }, 1000);

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

