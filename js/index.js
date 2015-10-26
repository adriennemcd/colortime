// Global variables
var htmlSM = '';
var htmlMD = '';
var htmlLG = '';
var rgbColor;
var selectedRGB = [];
var selectedColorBlocks = [];

// Random number generator
function randomRGB() {
    return Math.floor(Math.random() * 256 );
}

// Create random RGB code
function randomColor() {
    var color = 'rgb('
    color += randomRGB() + ', ';
    color += randomRGB() + ', ';
    color += randomRGB() + ')';
    return color;
}

// Assign RGB codes to  small divs
for ( var i = 0; i < 100; i += 1) {
    rgbColor = randomColor();
    htmlSM += '<div class="all sm" id="color' + i + '" style="background-color:' + rgbColor + '"></div>';
}

// Assign RGB codes to medium divs
for ( var i = 0; i < 25; i += 1) {
    rgbColor = randomColor();
    htmlMD += '<div class="all md" id="color' + i + '" style="background-color:' + rgbColor + '"></div>';
}

// Assign RGB codes to large divs
for ( var i = 0; i < 9; i += 1) {
    rgbColor = randomColor();
    htmlLG += '<div class="all lg" id="color' + i + '" style="background-color:' + rgbColor + '"></div>';
}

// Place color divs in output div
function print(message) {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = message;
    userEvents();
}

// Place selected color divs in infobox div
function print2(message) {
    var infoDiv = document.getElementById('tinySquares');
    infoDiv.innerHTML = message;
    userEventsSecondary();
}

// User events
function userEvents() {
    $('.all').mouseover(function(){
        $('#' + this.id).css('border', '3px solid white');
    });
    $('.all').mouseout(function(){
        $('#' + this.id).css('border', 'none');
    });
    $('.all').click(function(){
        var bckgrnd = $( this ).css( 'background-color' );
        var colorBlock = '<div class="block" id="bk_' + this.id + '" draggable="true" style="background-color:' + bckgrnd + '"></div>';
        $('#tinySquares').css({'height': '100%', 'border': 'none'});
        // allow user to select 10 colors at a time, and select each color only once
        if(selectedColorBlocks.length < 10) {
            if(selectedColorBlocks.indexOf(colorBlock) != -1) {
                $('#alert1').css('display', 'block');
                $('#alert1').delay( 1800 ).slideUp( 300 );
            } else {
                selectedRGB.push(bckgrnd);
                selectedColorBlocks.push(colorBlock);
                $('#btn').attr('data-clipboard-text', selectedRGB);
                print2(selectedColorBlocks.join(''));
            }
        } else {
            $('#alert2').css('display', 'block');
            $('#alert2').delay( 1800 ).slideUp( 300 );
        }
    });
}

// User events on infobox
function userEventsSecondary() {
    $('.block').mouseover(function(){
        $('#' + this.id).attr('class', 'block glyphicon glyphicon-remove');
    });
    $('.block').mouseout(function(){
        $('#' + this.id).attr('class', 'block');
    });
    $('.block').click(function(){
        var bckgrnd = $( this ).css( 'background-color' );
        var colorBlock = '<div class="block" id="' + this.id + '" style="background-color:' + bckgrnd + '"></div>';
        var index1 = selectedRGB.indexOf( bckgrnd );
        var index2 = selectedColorBlocks.indexOf( colorBlock );
        selectedRGB.splice( index1, 1 );
        selectedColorBlocks.splice( index2, 1 );
        $('#btn').attr('data-clipboard-text', selectedRGB);
        $('#alert2').css('display', 'none');
        print2(selectedColorBlocks.join(''));
        if(selectedColorBlocks.length == 0 ){
            $('#tinySquares').css('height', '40px');
            $('#tinySquares').css('border', '2px dashed gray');
        }
    });
}

// slider for more or less colors
function showColors(newVal){
    if(newVal === '0') {
        print(htmlSM);
    } else if(newVal === '1') {
        print(htmlMD);
    } else {
        print(htmlLG);
    }
}

// Hide/show infobox
$('.glyphicon-chevron-right, .glyphicon-chevron-left').click(function(){
    $(this).toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
    if( $('#wrapper').css('right') == '10px') {
        $('#wrapper').animate({right: '-260px'}, 800, function(){
                $('#wrapper  > .infobox').css('display', 'none');
                $('#wrapper').css({'width': '30px', 'right': '0'});
            });
    } else {
        $('#wrapper  > .infobox').css('display', 'block');
        $('#wrapper').css({'right': '-260', 'width': '290px'}).animate({right: '10px'}, 800);
    }
});

// Hide/show about div
$('.glyphicon-chevron-down, .glyphicon-chevron-up').click(function(){
    if( $('#about').css('display') == 'none') {
        $('#about').slideDown(600);
    } else {
        $('#about').slideUp(600);
    }
    $(this).toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
});

// Initiate clipboard.js and events
var clipboard = new Clipboard('#btn');

clipboard.on('success', function(e) {
    console.info('Text:', e.text);
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
    $('#btn').tooltip({title: 'Press CMD+c to copy'});
    $('#btn').tooltip('show');
});

//  Build color divs
print(htmlSM);
