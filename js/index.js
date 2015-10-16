var html = '';
var rgbColor;

function randomRGB() {
  return Math.floor(Math.random() * 256 );
}

function randomColor() {
  var color = 'rgb('
  color += randomRGB() + ', ';
  color += randomRGB() + ', ';
  color += randomRGB() + ')';
  return color;
}

function print(message) {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = message;
}

function hoverColor() {
    $('.all').mouseover(function(){
        console.log(this.id);
        $('#' + this.id).css("background-color", "yellow");
    });
}

for ( var i = 0; i < 100; i += 1) {
  rgbColor = randomColor();
  html += '<div class="all" id="color' + i + '" style="background-color:' + rgbColor + '"></div>';
}

print(html);
hoverColor();
