// passes this info to insert car query when post car button is clicked
$("#postCar").click(function(){
  $.post("/api/cars",
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

// when sold button from dashboard is clicked runs for particular vehicle
function sold(id) {
  $.ajax({
    method: 'POST',
    url: `/api/cars/${id}`
  })
    .done((response) => {
      console.log('VEHICLE SOLD');
    });
};

// when delete button from dashboard is clicked runs for particular vehicle
function deleteVehicle(id) {
  $.ajax({
    method: 'POST',
    url: `/api/cars/delete/${id}`
  })
    .done((response) => {
      console.log('VEHICLE DELETED');
    });
};