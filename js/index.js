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
function print(divSize) {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = divSize;
    userEvents();
}

// Place selected color divs in infobox div
function print2(message) {
    var infoDiv = document.getElementById('userColors');
    infoDiv.innerHTML = message;
    userEventsSecondary();
}

// Place selected color RGBs in alert3div div
function print3(message) {
    var infoDiv = document.getElementById('alert3div');
    infoDiv.innerHTML = message;
}

// User events
function userEvents() {
    // each randomly colored div has the class .all
    $('.all').click(function(){
        var bckgrnd = $( this ).css( 'background-color' );
        var colorBlock = '<div class="block" id="bk_' + this.id + '" style="background-color:' + bckgrnd + '"></div>';
        $('#userColors').css({'height': '100%', 'border': 'none'});
        // add color to user Color block and RGB color arrays.  Give alerts if >10 colors or if color is already selected
        if(selectedColorBlocks.length < 10) {
            if(selectedColorBlocks.indexOf(colorBlock) != -1) {
                $('#alert1').css('display', 'block');
                $('#alert1').delay( 1800 ).slideUp( 300 );
            } else {
                selectedRGB.push(bckgrnd);
                selectedColorBlocks.push(colorBlock);
                $('#btn').attr('data-clipboard-text', selectedRGB);
                $('#alert3div').css('display', 'none');
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
        $('#' + this.id).attr('class', 'block fa fa-times');
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
        $('#alert3div').css('display', 'none');
        print2(selectedColorBlocks.join(''));
        if(selectedColorBlocks.length == 0 ){
            $('#userColors').css('height', '40px');
            $('#userColors').css('border', '2px dashed gray');
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
$('.title').click(function(){
    $(this).toggleClass( "minimize" );
    if( $('#userChoices').css('display') == 'none') {
        $('#userChoices').slideDown(600);
    } else {
        $('#userChoices').slideUp(600);
    }
    $('.infobox').toggleClass( "minimize" );
});

// Hide/show about div
$('.fa-chevron-down, .fa-chevron-up').click(function(){
    if( $('#about').css('display') == 'none') {
        $('#about').slideDown(600);
    } else {
        $('#about').slideUp(600);
    }
    $(this).toggleClass('fa-chevron-down fa-chevron-up');
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
    $('#alert3').css('display', 'block');
    $('#alert3').delay( 8000 ).slideUp( 300 );
    $('#alert3div').css('display', 'block');
    print3(selectedRGB);
});

//  Build color divs
print(htmlMD);
