var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: document.querySelector(".row.content.about"),
    backgroundColor: '#fff',
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('bg', '../img/other/bg.png');
    this.load.image('player', '../img/other/player.png');
    this.load.image('enemy', '../img/other/enemy.png'); 
}

var player, cursors, captionState, c1, c2;
function create ()
{
    c1 = this.add.arc(400, 300, 200, 0, 360, false, 0x007bff);
    c2 = this.add.arc(400, 300, 150, 0, 360, false, 0x4FFAE6);
    player = this.physics.add.sprite(400, 300, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    captionState = this.add.text(320, 220, 'Everything is OK.', {color: "#000"});
}

var timer = 0;
var enemies = [];
function update ()
{
    //console.log(player.x, player.y)
    timer += 1;
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else if (cursors.up.isDown)
    {
        player.setVelocityY(-160);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(160);
    }
    if (timer % 300 == 0) {
        var posX = getRandomInt(0, config.width);
        var posY = getRandomInt(0, config.height);

        var enemy = this.physics.add.sprite(posX, posY, 'enemy');
        console.log(posX, posY);
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);

        this.physics.add.collider(player, enemy);
        for (var enm of enemies) {
            this.physics.add.collider(enemy, enm);
        }
        enemies.push(enemy);
    }
    var times = 0;
    var times2 = 0;
    for (var enm of enemies) {
        if (Phaser.Geom.Intersects.CircleToRectangle(c2, enm)) {
            times2++;
        }
        if (Phaser.Geom.Intersects.CircleToRectangle(c1, enm)) {
            console.log(enm.x + " is touching circle")
            changeStatus(1);
            times++;
            break;
        }
    }
    if (times == 0) {
        changeStatus(0);
    }
    if (times2 == 0) {
        c2.fillColor = 0x4FFAE6;
    } else {
        c2.fillColor = 0xee2c2c;
    }
}

function changeStatus(status) {
    if (status == 1) {
        captionState.x = 330;
        captionState.text = "<SPACE INVADED>";
        c1.fillColor = 0xe78282;
    } else { 
        captionState.x = 320;
        captionState.text = "Everything is OK.";
        c1.fillColor = 0x007bff;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}