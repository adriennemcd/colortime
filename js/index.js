var html = '';
var rgbColor;
var selectedRGB = [];
var selectedColorBlocks = [];

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

for ( var i = 0; i < 100; i += 1) {
    rgbColor = randomColor();
    html += '<div class="all" id="color' + i + '" style="background-color:' + rgbColor + '"></div>';
}

function print(message) {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = message;
}

function print2(message) {
    var infoDiv = document.getElementById('tinySquares');
    infoDiv.innerHTML = message;
}

function Color(bckgrnd, identity) {
    this.bckgrnd = bckgrnd;
    this.identity = identity;
}

Color.prototype.events = function () {
    $('.all').mouseover(function(){
        $('#' + this.id).css("border", "3px solid white");
    });
    $('.all').mouseout(function(){
        $('#' + this.id).css("border", "none");
    });
    $('.all').click(function(){
        var bckgrnd = $( this ).css( 'background-color' );
        var colorBlock = '<div class="block" id="bk_' + this.id + '" style="background-color:' + bckgrnd + '"></div>';
        $('#tinySquares').css("height", "100%");
        selectedRGB.push(bckgrnd);
        selectedColorBlocks.push(colorBlock);
        print2(selectedColorBlocks.join(""));
    });
}

var shell = new Color();

print(html);
shell.events();


