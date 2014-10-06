
var game = new Phaser.Game('100%', '100%', Phaser.AUTO, document.body, { 
	preload: preload, 
	create: create, 
	update: update, 
	render: render 
})

var AGENT_COUNT = 9

var cursors

var debugTarget

var agents = []

var me

function preload () {	
	game.time.advancedTiming = true
	game.stage.disableVisibilityChange = true
	game.load.image('redsquare', 'img/redsquare.png')
}

function create () {
	game.world.setBounds(0, 0, '800', '800')
	game.physics.startSystem(Phaser.Physics.P2JS)

	Object.keys(game.physics.p2.walls).forEach(function (key) {
		game.physics.p2.walls[key].shapes[0].name = 'wall'
		game.physics.p2.walls[key].shapes[0].key = key
	})

	for(var i=0; i<AGENT_COUNT; i++) {
		agents.push(new Agent(game, game.world.randomX, game.world.randomY))
	}

	me = new Agent(game, game.world.randomX, game.world.randomY)
	debugTarget = me

	cursors = game.input.keyboard.createCursorKeys()
}

var frameCount = 0
var frameCount1 = 0
var generation = 0
var bestBrain = {}

function update () {

	frameCount1++
	if(frameCount1 === 100) {
		var bestAgent = agents.map(function (a) { return a.fitness })
		console.log(bestAgent)
		var bestIndex = Math.min.apply(null, bestAgent)
		console.log('best fitness', bestIndex)
		bestIndex = bestAgent.indexOf(bestIndex)
		bestBrain = agents[bestIndex].saveBrain()

		agents.forEach(function (a) {
			a.fitness = 0
			a.loadBrain(bestBrain)
		})
		generation++
		frameCount1 = 0
	}

	frameCount++
	if(frameCount=== 5) {
		agents.forEach(function (agent) { 
			agent.update() 
		})
		me.update()
		frameCount = 0
	}

	move_camera_by_pointer(game.input.mousePointer)
	move_camera_by_pointer(game.input.pointer1)

   	if (cursors.left.isDown) me.body.rotateLeft(100)
    else if (cursors.right.isDown) me.body.rotateRight(100)
    else me.body.setZeroRotation()

    if (cursors.up.isDown) me.body.thrust(400)    
    else if (cursors.down.isDown) me.body.reverse(400)
}

function render () {
	game.debug.body(agents)
	game.debug.text(game.time.fps || '00', 32, 32, "#00ff00")

	game.debug.text(debugTarget.input, 32, 60)
	game.debug.text('generation: ' + generation, 32, 80)
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