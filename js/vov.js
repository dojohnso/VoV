
$(function(){
    var keys = {};
    keys.UP = 38;
    keys.LEFT = 37;
    keys.RIGHT = 39;
    keys.DOWN = 40;

    var t = 0;
    var setGameTime = function() {
      var d = new Date();
      t = parseInt(d.getTime() / 1000);
    }

    var w = 5;
    var h = w * 1;
    /// store reference to character's position and element
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

    docKeyPress = function(e) {
        var kc = e.keyCode || e.which;

        if ( $.inArray( kc, [keys.UP, keys.RIGHT, keys.LEFT, keys.DOWN] ) > -1  )
        {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }

        keys[kc] = e.type == 'keydown';

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

    $('body').keyup(docKeyPress).keydown(docKeyPress);

    var prevHealth = character.health;
    var updateCharacter = function() {
      $('#character')
        .css('width', character.w + 'px')
        .css('height', character.h + 'px')
        .css('border-radius', character.w + 'px')
        .css('background', character.color)
        .css('top', character.y + 'px')
        .css('left', character.x + 'px');

      $('#character-light')
        .css('width', character.w*(3) + 'px')
        .css('height', character.h*(3) + 'px')
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
      }
    }

    var clearCharacterAlert = function() {
      var y = character.y;
      var x = character.x;

      character = viking;
      character.x = x;
      character.y = y;

      setGameTime();
    }

    /// character movement update
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
        if ( fruits[mx] )
        {
          for ( f in fruits[mx] ) {
            if (
                charCenX >= ((fruits[mx][f].x+(fruits[mx][f].w/2)) - character.w*2) &&
                charCenX <= ((fruits[mx][f].x+(fruits[mx][f].w/2)) + character.w*2) &&
                charCenY <= ((fruits[mx][f].y+(fruits[mx][f].h/2)) + character.h*2) &&
                charCenY >= ((fruits[mx][f].y+(fruits[mx][f].h/2)) - character.h*2)
               )
            {

              character.health += fruits[mx][f].value;
              $(fruits[mx][f].element).remove();
              fruits[mx].splice(f,1)
              break;
            }
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
