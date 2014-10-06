
/*
 * @constructor Agent
 */
function Agent (game, x, y) {

	/*
	 * @property {Phaser.Game} game - reference to phaser game instance
	 */
	this.game = game

	/*
	 * @property brain - convnet brain
	 */
	this.brain = new Brain()

	/*
	 * @property sprite
	 */
	this.sprite = null

	/*
	 * @property body
	 */
	this.body = null

	/*
	 * @property reward
	 */
	this.reward = 0

	/*
	 * @property input
	 */
	this.input = []

	/*
	 * eye sensor, Phaser objects
	 *
	 * @propety {Array} eyes
	 */
	this.eye = null

	/*
	 * eye sensor output
	 *
	 * @propery {Array} vision
	 */
	this.vision = [0, 0, 0, 0, 0]

	/*
	 * @property {Number} fitness
	 */
	this.fitness = 0

	/*
	 * @boot
	 */
	this.boot(x, y)

}

/*
 * @method boot
 * @param {Number} - initial x pos
 * @param {Number} - initial y pos
 */
Agent.prototype.boot = function (x, y) {

	this.sprite = this.game.add.sprite(x, y, 'redsquare')
	this.sprite.width = 20
	this.sprite.height = 20
	this.sprite.anchor.set(0.5)
	this.game.physics.p2.enable(this.sprite, true)
	this.body = this.sprite.body
	this.body.data.shapes[0].name = 'agent'

	this.eye = this.body.addCircle(100, 0, 0, -1.570796327)
	this.eye.name = ('eye')
	this.eye.sensor = true

	this.body.onBeginContact.add(this._onCollision, this)
	this.body.onEndContact.add(this._onEndCollision, this)

}

/*
 * @method onCollision
 */
Agent.prototype._onCollision = function (body, shapeA, shapeB, equation) {


	// eye sees something!
	if(shapeA.name === 'eye') {

		if(shapeB.name === 'wall') {
			this.vision[0] = 1
		}

		else if(shapeB.name === 'agent') {
			this.vision[1] = 1

			console.log(this.body.x, this.body.y, body.x, body.y)
		}

		else if(shapeB.name === 'food') {
			this.vision[2] = 1
		}
	}

	// we collided with something!
	else if(shapeA.name === 'agent') {

		this.fitness++

		if(shapeB.name === 'wall') {
			this.reward -= 1
		}
		else if(shapeB.name === 'agent') {
			this.reward -= 1
		}
		else if(shapeB.name === 'food') {
			this.reward += 1
		}

	}

}

/*
 * @method onCollision
 */
Agent.prototype._onEndCollision = function (body, shapeA, shapeB, equation) {

	if(shapeA.name === 'eye') {
		if(shapeB.name === 'wall') {
			this.vision[0] = 0
		}

		else if(shapeB.name === 'agent') {
			this.vision[1] = 0
		}

		else if(shapeB.name === 'food') {
			this.vision[2] = 0
		}
	}

}

/*
 * fires on each brain loop
 *
 * @method update
 */
Agent.prototype.update = function () {

	this.rewardBrain()

	var input = this.getInput()

	var output = this.brain.forward(input)

	switch(output) {

		case 0: 
			this.body.rotateRight(50)
			break

		case 1: this.body.rotateLeft(50)
			break

		case 2: 
			this.body.thrust(2000)
			this.body.setZeroRotation()
			break

		case 3: this.body.reverse(2000)
			this.body.setZeroRotation()
			break

	}

}

/*
 * @method rewardBrain
 */
Agent.prototype.rewardBrain = function () {

	this.brain.backward(this.getReward())

}

/*
 * assembles brainz feed
 *
 * @method getInput
 */
Agent.prototype.getInput = function () {

	this.input = []

	// eyes sees wall
	this.input[0] = this.vision[0] === 1 ? 1 : 0
	this.input[1] = this.vision[1] === 1 ? 1 : 0
	this.input[2] = this.vision[2] === 1 ? 1 : 0
	// this.input[3] = this.vision[3] === 1 ? 1 : 0
	// this.input[4] = this.vision[4] === 1 ? 1 : 0

	// // eyes sees agent
	// this.input[5] = this.vision[0] === 2 ? 1 : 0
	// this.input[6] = this.vision[1] === 2 ? 1 : 0
	// this.input[7] = this.vision[2] === 2 ? 1 : 0
	// this.input[8] = this.vision[3] === 2 ? 1 : 0
	// this.input[9] = this.vision[4] === 2 ? 1 : 0

	// todo
	// // eyes distance from sees
	// this.input[10] = 0
	// this.input[11] = 0
	// this.input[12] = 0
	// this.input[13] = 0
	// this.input[14] = 0

	// // velocity
	// this.input[15] = (this.body.data.velocity[1]+50)*(0.01) 
	// this.input[16] = (this.body.data.velocity[0]+50)*(0.01) 

	// angle
	this.input[3] = (this.body.angle+180)*(100/36000)

	return this.input

}

/*
 * @method getReward
 */
Agent.prototype.getReward = function () {

	var reward = this.reward
	this.reward = 0
	return reward

}

/*
 * @method saveBrain
 * @return {String} - stringified brain
 */
Agent.prototype.saveBrain = function () {

	var brain = this.brain.value_net.toJSON()
    return JSON.stringify(brain)

}

/*
 * @method loadBrain
 */
Agent.prototype.loadBrain = function (brain) {

	if(typeof brain === 'string') brain = JSON.parse(brain)
    this.brain.value_net.fromJSON(brain)

}
