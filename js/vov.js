
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
        // $('#health #bar').css('width', healthW+'%').css('left', (healthBarW * ((100-healthW)/100))+'px' );

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
        $('#field').animate({backgroundColor:'#e49090'},100,'linear',function(){$(this).animate({backgroundColor:'#90ee90'},100)})
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

    var generateFood = function() {
      // @todo
      $('#field').append('<div class="food"></div>')
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
