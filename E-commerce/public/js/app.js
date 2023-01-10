$(document).ready(function() {
  $('.carousel').carousel();
  // Generando plantilla
  var template = $('#commerce').html();
  var handtemplate = Handlebars.compile(template);
  console.log(handtemplate);

  // Funcion que sera utilizada en las distintos modos de buscar los productos
  function categoria(data) {
    console.log(data.results);
    $.each(data.results, function(i, array) {
      console.log(array.title);
      console.log(array.thumbnail);
      console.log(array.price);
      var html = handtemplate(array);
      console.log(html);
      $('#product').append(html);      
    });

    // configuración inicial del carrito 
    paypal.minicart.render({
      strings: {
        button: 'Pagar'
        , buttonAlt: 'Total'
        , subtotal: 'Total:'
        , empty: 'No hay productos en el carrito'
      }
    });

    // Eventos para agregar productos al carrito
    $('.car').click(function(event) {
      event.stopPropagation();
      paypal.minicart.cart.add({
        // Cuenta paypal para recibir el dinero
        business: 'sistemasnik20@gmail.com', 
        item_name: $(this).attr('titulo'),
        amount: $(this).attr('precio'),
        currency_code: 'PEN',
      });
    });
  }
  // Buscando a travez del input
  $('#btn').on('click', function(evt) {
    evt.preventDefault();
    var input = $('#input');
    if (input.val()) {
      var valorInput = input.val();
      console.log(valorInput);
      var urlcat = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${valorInput}#json`;
      $.ajax({
        url: urlcat
      }).done(categoria);
    }
  });

  // Filtrar la busqueda
  var input = $('#input');
  input.on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('#product div').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Buscando por categorias
  $('.link').on('click', function() {
    var valor = $(this).text();
    console.log(valor);
    // Utilizamos la API de mercado libre de peru 
    var urlcat = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${valor}#json`;
    $.ajax({
      url: urlcat
    }).done(categoria);  
  });   
});


