var html = '';
var rgbColor;
var selectedColors = [];
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
    var infoDiv = document.getElementById('colorClick');
    infoDiv.innerHTML = message;
}

function print3(message) {
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
        var colorInfo = bckgrnd + '<br />';
        //$('#tinySquares').css( 'background-color', bckgrnd );
        var colorBlock = '<div class="block" id="bk_' + this.id + '" style="background-color:' + bckgrnd + '"></div>';
        selectedColorBlocks.push(colorBlock);
        print3(selectedColorBlocks.join(""));
        selectedColors.push(colorInfo);
        print2(selectedColors.join(""));
        console.log(selectedColorBlocks);
    });
}

var shell = new Color();

print(html);
shell.events();


