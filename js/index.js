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

function print2(message) {
    var infoDiv = document.getElementById('colorClick');
    infoDiv.innerHTML = message;
}

function hoverColor() {
    $('.all').mouseover(function(){
        $('#' + this.id).css("border", "3px solid white");
    });
    $('.all').mouseout(function(){
        $('#' + this.id).css("border", "none");
    });
    $('.all').click(function(){
        var bckgrnd = $( this ).css( 'background-color' );
        var colorInfo = '<p>' + $( this ).css( 'background-color' ) + '</p>';
        $('#tiny').css( 'background-color', bckgrnd );
        print2(colorInfo);
    });
}

for ( var i = 0; i < 100; i += 1) {
    rgbColor = randomColor();
    html += '<div class="all" id="color' + i + '" style="background-color:' + rgbColor + '"></div>';
}

print(html);
hoverColor();
