
var game = new Phaser.Game('100%', '100%', Phaser.AUTO, document.body, { 
	preload: preload, 
	create: create, 
	update: update, 
	render: render 
})

var cursors

function preload () 
{	
	game.time.advancedTiming = true
	game.stage.disableVisibilityChange = true
	game.load.image('redsquare', 'img/redsquare.png')
}

function create () 
{
	game.world.setBounds(-1000, -1000, 2000, 2000)

	for(var i=0; i<10; i++) {
		var o = game.add.sprite(game.world.randomX, game.world.randomY, 'redsquare')
	}

	cursors = game.input.keyboard.createCursorKeys()
}

function update () {

	move_camera_by_pointer(game.input.mousePointer)
	move_camera_by_pointer(game.input.pointer1)

    if (cursors.up.isDown) {
        game.camera.y -= 15;
    }
    else if (cursors.down.isDown) {
        game.camera.y += 15;
    }

    if (cursors.left.isDown) {
        game.camera.x -= 15;
    }
    else if (cursors.right.isDown) {
        game.camera.x += 15;
    }
}

function render () 
{
	game.debug.cameraInfo(game.camera, 32, 64)
	game.debug.text(game.time.fps || '00', 32, 32, "#00ff00");    
}

var o_mcamera
function move_camera_by_pointer(o_pointer) {
    if (!o_pointer.timeDown) return

    if (o_pointer.isDown && !o_pointer.targetObject) {
        if (o_mcamera) {
            game.camera.x += o_mcamera.x - o_pointer.position.x
            game.camera.y += o_mcamera.y - o_pointer.position.y
        }
        o_mcamera = o_pointer.position.clone()
    }

    if (o_pointer.isUp) o_mcamera = null
}