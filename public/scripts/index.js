const loadVehicles = () => {
  $.ajax({
    method: 'GET',
    url: '/api/index'
  })
    .then((response) => {
      console.log(response.vehicles);
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
  const vehicleElement = $(`<li>
    <img src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
    <p> ${vehicle.yr} </p>
    <p> ${vehicle.make} <b>${vehicle.model}</b></p>
    <p> $${vehicle.price} </p>
    <p> # of LIKES = ${vehicle.likes}</p>
    <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>
    </li>`);
  return vehicleElement;
};

// 1. event listener on form submitting *tweeter submit form
// 2. set up ajax call to filtered endpoint from data
// 3. endpoint for filtered vehicles- accept make model, etc as data 
// 4. return vehicles from ajax call    in .then render vehicles from endpoint


$(() => {
  loadVehicles();

  const $filterForm = $('#filter-form');
  $filterForm.on('submit', (event) => {
    event.preventDefault();
    console.log($filterForm.serialize());
    $.ajax({
      method: 'POST',
      url: '/api/vehicles/filter',
      data: $filterForm.serialize()
    })
  });




//       .then((response) => {
//   const $vehicleList = $('#most-liked');
//   console.log('RESPONSE:', response);

//   //On page load vehicles are sorted by likes
//   response.vehicles.sort((a, b) => b.likes - a.likes);

//   //Using drop down, sort by the selected option
//   const sort = document.querySelector('#sort');
//   sort.addEventListener('change', (event) => {
//     if (click === 'price-asc') {
//       response.vehicles.sort((a, b) => a.price - b.price);
//     }
//     else if (click === 'price-desc') {
//       response.vehicles.sort((a, b) => b.price - a.price);
//     }
//     else if (click === 'year-asc') {
//       response.vehicles.sort((a, b) => a.yr - b.yr);
//     }
//     else if (click === 'year-desc') {
//       response.vehicles.sort((a, b) => b.yr - a.yr);
//     }
//     else if (click === 'likes') {
//       response.vehicles.sort((a, b) => b.likes - a.likes);
//     }

//     $vehicleList.html("");

//     for (const vehicle of response.vehicles) {
//       $(`<li class="most-liked">`).html(
//         // Width + Height are just here temporarily until css is done!!!!!!!!!
//         `<img src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
//             <p> ${vehicle.yr} </p>
//             <p> ${vehicle.make} <b>${vehicle.model}</b></p>
//             <p> $${vehicle.price} </p>
//             <p> # of LIKES = ${vehicle.likes}</p>
//             <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>`
//       ).appendTo($vehicleList);
//     }

//   });

//   // Gives each item a class for styling and adds to vehicle list
//   for (const vehicle of response.vehicles) {
//     $(`<li class="most-liked">`).html(
//       // Width + Height are just here temporarily until css is done!!!!!!!!!
//       `<img src="${vehicle.thumbnail_img}" width="100px" height="100px"/>
//           <p> ${vehicle.yr} </p>
//           <p> ${vehicle.make} <b>${vehicle.model}</b></p>
//           <p> $${vehicle.price} </p>
//           <p> # of LIKES = ${vehicle.likes}</p>
//           <p>Contact Owner: <a href="mailto: ${vehicle.email}">${vehicle.email}</a></p>`
//     ).appendTo($vehicleList);
//   }

//   // Filter list of cars
//   const filterForm = $('#filter-form');
//   filterForm.addEventListener('submit', (filterEvent) => {
//     filterEvent.preventDefault();
//     const make = $('.make').value;
//     const model = $('.model').value;
//     console.log('MAKE:', make);
//     console.log('MODEL:', model);

//     // const formData = new FormData(filterForm);
//     // formData.append('make', make);
//     // console.log('FORM DATA:', formData);
//   });

// });
});