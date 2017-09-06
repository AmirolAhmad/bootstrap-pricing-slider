$(document).ready(function() {
  $("#slider").slider({
      range: "min",
      animate: true,
      value:1,
      min: 10,
      max: 1000,
      step: 10,
      slide: function(event, ui) {
        update(1,ui.value); //changed
      }
  });

  $("#slider2").slider({
      range: "min",
      animate: true,
      value:1,
      min: 1,
      max: 365,
      step: 1,
      slide: function(event, ui) {
        update(2,ui.value); //changed
      }
  });

  //Added, set initial value.
  $("#amount").val(0);
  $("#duration").val(0);
  $("#amount-label").text(0);
  $("#duration-label").text(0);

  update();
});


function update(slider,val) {
  var formatNumber = {
    separador: ",",
    sepDecimal: '.',
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft  +splitRight;
    },
    new:function(num, simbol){
    this.simbol = simbol ||'';
    return this.formatear(num);
    }
  }
  //changed. Now, directly take value from ui.value. if not set (initial, will use current value.)
  var $amount = slider == 1?val:$("#amount").val();
  var $duration = slider == 2?val:$("#duration").val();

  $total = ($amount * $duration);
  $total = formatNumber.new($total,"$");
  $( "#amount" ).val($amount);
  $( "#amount-label" ).text($amount);
  $( "#duration" ).val($duration);
  $( "#duration-label" ).text($duration);
  $( "#total" ).val($total);
  $( "#total-label" ).text($total);

  $('#slider span').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$amount+' <span class="glyphicon glyphicon-chevron-right"></span></label>');
  $('#slider2 span').html('<label><span class="glyphicon glyphicon-chevron-left"></span> '+$duration+' <span class="glyphicon glyphicon-chevron-right"></span></label>');

  console.log('amount: '+$amount);
  console.log('duration: '+$duration);
}
