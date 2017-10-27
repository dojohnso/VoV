
$(function(){
    var keys = {};
    keys.UP = 38;
    keys.LEFT = 37;
    keys.RIGHT = 39;
    keys.DOWN = 40;

    var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {
      isMobile = true;
    }

    var t = 0;
    var setGameTime = function() {
      var d = new Date();
      t = parseInt(d.getTime() / 1000);
    }

    var w = 5;
    var h = w * 1;
    var viking = {
      x: Math.max(w, Math.floor(Math.random() * ($('#field').width() - w))),
      y: Math.max(h, Math.floor(Math.random() * ($('#field').height() - h))),
      speedMultiplier: 2,
      h: h,
      w: w,
      alert: false,
      health: 100,
      color: 'black',
      healthRegenRatio: 30 // higher ratio means slower rate
    };

    var character = jQuery.extend(true, {}, viking);

    var docKeyPress = function(e) {
        var kc = e.keyCode || e.which;

        if ( $.inArray( kc, [keys.UP, keys.RIGHT, keys.LEFT, keys.DOWN] ) > -1  )
        {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }

        if ( $(e.currentTarget).hasClass('right') )
        {
          kc = keys.RIGHT;
          if ( isMobile ) { character.x += Math.floor($('#field').width()/100); }
        }
        else if ( $(e.currentTarget).hasClass('left') )
        {
          kc = keys.LEFT;
          if ( isMobile ) { character.x -= Math.floor($('#field').width()/100); }
        }
        else if ( $(e.currentTarget).hasClass('up') )
        {
          kc = keys.UP;
          if ( isMobile ) { character.y -= Math.floor($('#field').height()/100); }
        }
        else if ( $(e.currentTarget).hasClass('down') )
        {
          kc = keys.DOWN;
          if ( isMobile ) { character.y += Math.floor($('#field').height()/100); }
        }

        keys[kc] = e.type == 'keydown' || e.type == 'mousedown';

        if ( keys[kc] )
        {
          $('#controls .dpad.'+kc).addClass('push',250)
        }
        else
        {
          $('#controls .dpad.'+kc).removeClass('push',50);
        }

        if ( keys[keys.UP] === true
              || keys[keys.RIGHT] === true
              || keys[keys.DOWN] === true
              || keys[keys.LEFT] === true
        )
        {
          // something to do when moving
        }
        else
        {
          // soething for standing still
        }

      };

    var docMouseOut = function(e) {
      keys[keys.UP] = false;
      keys[keys.DOWN] = false;
      keys[keys.LEFT] = false;
      keys[keys.RIGHT] = false;
      $('#controls .dpad').removeClass('push',50);
    }

    $('img').on('dragstart', function(e) { e.preventDefault(); });
    $('body').on('contextmenu', function(e) { e.preventDefault(); });

    $('body').keyup(docKeyPress).keydown(docKeyPress);
    $('#controls .dpad').mouseup(docKeyPress).mousedown(docKeyPress).mouseout(docMouseOut);

    var prevHealth = character.health;
    var updateCharacter = function() {
      $('#character')
        .css('width', character.w + 'px')
        .css('height', character.h + 'px')
        .css('border-radius', character.w + 'px')
        .css('background', character.color)
        .css('top', character.y + 'px')
        .css('left', character.x + 'px');

      var lightStrength = 3;
      $('#character-light')
        .css('width', character.w*(lightStrength) + 'px')
        .css('height', character.h*(lightStrength) + 'px')
        .css('border-radius', character.w*lightStrength + 'px')
        .css('top', (character.y-character.w) + 'px')
        .css('left', (character.x-character.h) + 'px');

      var d = new Date()
      now = parseInt(d.getTime() / 1000);

      if ( !isNaN(now - t) && !character.alert && character.health < 100 )
      {
        character.health = character.health + (1/character.healthRegenRatio);
      }

      character.health = character.health > 0 ? character.health : 0;
      character.health = character.health < 100 ? character.health : 100;

      if ( Math.floor(character.health) == 0 )
      {
        alertCharacter();
      }

      healthBarW = parseInt($('#health').width());
      healthW = Math.floor(character.health);

      if ( healthW != prevHealth )
      {
        $('#health #bar').animate({width: healthW+'%', left: (healthBarW * ((100-healthW)/100))+'px'}, 150);

        prevHealth = healthW;
      }
    }

    var alertCharacter = function() {
      if ( !character.alert )
      {
        character.color = 'red';
        character.h = character.h * 2;
        character.w = character.w * 2;
        character.alert = true;
        $('#character-light').removeClass('on');
      }
    }

    var clearCharacterAlert = function() {
      var y = character.y;
      var x = character.x;

      character = viking;
      character.x = x;
      character.y = y;

      $('#character-light').removeClass('on');

      setGameTime();
    }

    var moveCharacter = function(dx, dy) {
      if (character.alert) {
        return false;
      }

      xmove = (dx || 0) * character.speedMultiplier;
      ymove = (dy || 0) * character.speedMultiplier;

      lfield = parseInt($('#field').css('left'));
      rfield = parseInt($('#field').width());
      tfield = parseInt($('#field').css('top'));
      bfield = parseInt($('#field').height());

      newX = character.x + xmove;
      if (newX <= (rfield - character.w) && newX >= 0) {
        character.x += xmove;
      } else {
        if (newX < rfield / 2) {
          // we're on the left
          character.x = 0;
        } else {
          // we're on the right
          character.x = rfield - character.w;
        }
      }

      newY = character.y + ymove;
      if (newY >= 0 && newY <= (bfield - character.h)) {
        character.y += ymove;
      } else {
        if (newY < bfield / 2) {
          // we're at the top
          character.y = 0;
        } else {
          // we're at the bottom
          character.y = bfield - character.h;
        }
      }

      if (Math.random() < 0.01) {
        character.health -= 20;
        $('body').animate({backgroundColor:'#f00'},250,'linear',function(){$(this).animate({backgroundColor:'#466cd9'},700)})
      }

      if ( character.health < 100 )
      {
        var charCenX = character.x + character.w/2;
        var charCenY = character.y + character.h/2;

        var mx = Math.floor(charCenX/10);
        fruits1 = fruits[mx] ? fruits[mx] : [];
        fruits2 = fruits[mx+1] ? fruits[mx+1] : [];
        fruits3 = fruits[mx-1] ? fruits[mx-1] : [];

        if ( fruits1.length || fruits2.length || fruits3.length )
        {
          var foundFruit = false;
          if ( fruits1.length )
          {
            for ( f1 in fruits1 ) {
              if (
                  charCenX >= ((fruits1[f1].x+(fruits1[f1].w/2)) - character.w*2) &&
                  charCenX <= ((fruits1[f1].x+(fruits1[f1].w/2)) + character.w*2) &&
                  charCenY <= ((fruits1[f1].y+(fruits1[f1].h/2)) + character.h*2) &&
                  charCenY >= ((fruits1[f1].y+(fruits1[f1].h/2)) - character.h*2)
                 )
              {
                foundFruit = fruits1[f1].element;
                foundHealth = fruits1[f1].value;
                fruits1.splice(f1,1);
                break;
              }
            }
          }

          if ( fruits2.length )
          {
            for ( f2 in fruits2 ) {
              if (
                  charCenX >= ((fruits2[f2].x+(fruits2[f2].w/2)) - character.w*2) &&
                  charCenX <= ((fruits2[f2].x+(fruits2[f2].w/2)) + character.w*2) &&
                  charCenY <= ((fruits2[f2].y+(fruits2[f2].h/2)) + character.h*2) &&
                  charCenY >= ((fruits2[f2].y+(fruits2[f2].h/2)) - character.h*2)
                 )
              {
                foundFruit = fruits2[f2].element;
                foundHealth = fruits2[f2].value;
                fruits2.splice(f2,1);
                break;
              }
            }
          }

          if ( fruits3.length )
          {
            for ( f3 in fruits3 ) {
              if (
                  charCenX >= ((fruits3[f3].x+(fruits3[f3].w/2)) - character.w*2) &&
                  charCenX <= ((fruits3[f3].x+(fruits3[f3].w/2)) + character.w*2) &&
                  charCenY <= ((fruits3[f3].y+(fruits3[f3].h/2)) + character.h*2) &&
                  charCenY >= ((fruits3[f3].y+(fruits3[f3].h/2)) - character.h*2)
                 )
              {
                foundFruit = fruits3[f3].element;
                foundHealth = fruits3[f3].value;
                fruits3.splice(f3,1);

                break;
              }
            }
          }

          if ( foundFruit )
          {
            character.health += foundHealth;
            $(foundFruit).remove();
            $('#character-light').addClass('on');
          }
        }
      }
    };

    // this is constantly looped over
    var processGameState = function() {
      if (keys[keys.LEFT]) {
        moveCharacter(-1, 0);
      }
      if (keys[keys.RIGHT]) {
        moveCharacter(1, 0);
      }
      if (keys[keys.UP]) {
        moveCharacter(0, -1);
      }
      if (keys[keys.DOWN]) {
        moveCharacter(0, 1);
      }

      updateCharacter();
    };

    $('#character').on('click', function() {
      clearCharacterAlert();
    })

    var seeds = {
      value: 10,
      class: 'apple',
    }

    var fruits = [];
    var generateFood = function() {

      var f = 20;//Math.floor(Math.random()*20)+10;

      for ( var n = 0; n < f; n++ )
      {
        var seed = jQuery.extend(true, {}, seeds);

        seed.x = Math.max(character.w, Math.floor(Math.random() * ($('#field').width() - character.w)));
        seed.y = Math.max(character.h, Math.floor(Math.random() * ($('#field').height() - character.h)));


        seed.element = $('<div class="food apple"></div>').css('left',seed.x+'px').css('top',seed.y+'px');
        $('#field').append( seed.element );

        seed.w = parseInt($(seed.element).width());
        seed.h = parseInt($(seed.element).height());

        var mx = Math.floor(seed.x/10);
        if ( ! fruits[mx] )
        {
          fruits[mx] = []
        }
        fruits[mx].push(seed);
      }

    }

    ///////////// initialize //////////////////
    setGameTime();
    moveCharacter();
    updateCharacter();
    generateFood();

    setInterval(function() {
      processGameState();
    }, 1000 / 24);
});
