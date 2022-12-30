$(() => {
  $( document ).ready( () => {

    $.ajax({
      method: 'GET',
      url: '/api/index'
    })
    .then((response) => {
      const $vehicleList = $('#most-liked');
      console.log('RESPONSE:', response);
      // Gives each item a class for styling and adds to vehicle list
      for(const vehicle of response.vehicles) {
        $(`<li class="most-liked">`).html(
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