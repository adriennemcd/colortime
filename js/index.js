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

function userEvents() {
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
        $('#tinySquares').css("border", "none");
        selectedRGB.push(bckgrnd);
        selectedColorBlocks.push(colorBlock);
        print2(selectedColorBlocks.join(""));
        document.getElementById('btn').setAttribute("data-clipboard-text", selectedRGB);
    });
}

$(".animate").click(function(){

        //$(".infobox").animate({right: '10px'});
});

$(".glyphicon-chevron-right, .glyphicon-chevron-left").click(function(){
    $(this).toggleClass("glyphicon-chevron-right glyphicon-chevron-left");
    if( $(".infobox").css('right') == '10px') {
        $(".infobox").animate({right: '-226px'});
    } else {
        $(".infobox").animate({right: '10px'});
    }
});


new Clipboard('#btn');
print(html);
userEvents();






