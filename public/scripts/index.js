$(() => {
  $(document).ready(() => {

    $.ajax({
      method: 'GET',
      url: '/api/index'
    })
      .then((response) => {
        const $vehicleList = $('#most-liked');
        console.log('RESPONSE:', response);

        // const likedFilter = response.filter((vehicle) => vehicle.make === "Honda");
        // console.log('honda', likedFilter)

        //On page load vehicles are sorted by likes
        response.vehicles.sort((a, b) => b.likes - a.likes);

        //Using drop down, sort by the selected option
        const sort = document.querySelector('#sort');
        sort.addEventListener('change', (event) => {
          const result = document.querySelector('#sort');
          response.vehicles.sort((a, b) => b.result - a.result);


        });

        switch (sort) {
          case '':

            break;
          case '':

            break;
        }

        // Gives each item a class for styling and adds to vehicle list
        for (const vehicle of response.vehicles) {
          $(`<li class="most-liked">`).html(
            // Width + Height are just here temporarily until css is done!!!!!!!!!
            `<img src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
          <p> ${vehicle.yr} </p>
          <p> ${vehicle.make} <b>${vehicle.model}</b></p>
          <p> $${vehicle.price} </p>
          <p> # of LIKES = ${vehicle.likes}</p>
          <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>`
          ).appendTo($vehicleList);
        }
      });
  });
});