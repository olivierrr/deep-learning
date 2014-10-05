
var game = new Phaser.Game('100%', '100%', Phaser.AUTO, document.body, { 
	preload: preload, 
	create: create, 
	update: update, 
	render: render 
})

var cursors

var agent

function preload () {	
	game.time.advancedTiming = true
	game.stage.disableVisibilityChange = true
	game.load.image('redsquare', 'img/redsquare.png')
}

function create () {
	game.world.setBounds(0, 0, '1900', '800')
	game.physics.startSystem(Phaser.Physics.P2JS)

	agent = window.agent = new Agent(game, 250, 250)

	cursors = game.input.keyboard.createCursorKeys()
}

var frameCount = 0

function update () {

	frameCount++
	if(frameCount%10 === 0) {
		agent.update()
		frameCount = 0
	}

	move_camera_by_pointer(game.input.mousePointer)
	move_camera_by_pointer(game.input.pointer1)

    // if (cursors.left.isDown) agent.body.rotateLeft(100)
    // else if (cursors.right.isDown) agent.body.rotateRight(100)
    // else agent.body.setZeroRotation()

    // if (cursors.up.isDown) agent.body.thrust(400)
    // else if (cursors.down.isDown) agent.body.reverse(400)
}

function render () {
	game.debug.body(agent)
	game.debug.cameraInfo(game.camera, 32, 64)
	game.debug.text(game.time.fps || '00', 32, 32, "#00ff00")
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