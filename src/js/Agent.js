
/*
 * @constructor Agent
 */
function Agent (game, x, y) {

	/*
	 * @propery {Phaser.Game} game - reference to phaser game instance
	 */
	this.game = game

	/*
	 * @propery brain - convnet brain
	 */
	this.brain = new Brain()

	/*
	 * @propery sprite
	 */
	this.sprite = null

	/*
	 * @propery body
	 */
	this.body = null

	/*
	 * @property reward
	 */
	this.reward = 0

	/*
	 * @property input
	 */
	this.input = [0, 0, 0, 0]

	/*
	 * @propety eyes
	 */
	this.eyes = []

	/*
	 * @boot
	 */
	this.boot(x, y)
}

/*
 * @method boot
 */
Agent.prototype.boot = function (x, y) {
	this.sprite = this.game.add.sprite(x, y, 'redsquare')
	this.sprite.width = 20
	this.sprite.height = 20
	this.sprite.anchor.set(0.5)
	this.game.physics.p2.enable(this.sprite, true)
	this.body = this.sprite.body

	var offsetTable = [
		{x: 50, y: 0},
		{x: 0, y: 50},
		{x: -50, y: 0},
		{x: 0, y: -50}
	]

	for(var i=0; i<4; i++) {
		var eye = this.body.addRectangle(100, 1, offsetTable[i].x, offsetTable[i].y, 1.570796327*i)	
		eye.name = ('eye'+i)
		eye.sensor = true
		this.eyes.push(eye)
	}

	this.body.onBeginContact.add(this._onCollision, this)
	this.body.onEndContact.add(this._onEndCollision, this)

}

/*
 * @method onCollision
 * @private
 */
Agent.prototype._onCollision = function (bodyA, shapeA, shapeB, equation) {

	console.log(bodyA)

	if(shapeA.name === 'eye0') this.input[0] = 1
	else if(shapeA.name === 'eye1') this.input[1] = 1
	else if(shapeA.name === 'eye2') this.input[2] = 1
	else if(shapeA.name === 'eye3') this.input[3] = 1
	else this.reward -= 1

}

/*
 * @method onCollision
 * @private
 */
Agent.prototype._onEndCollision = function (bodyA, shapeA, shapeB, equation) {

	console.log(bodyA)

	if(shapeA.name === 'eye0') this.input[0] = 0
	else if(shapeA.name === 'eye1') this.input[1] = 0
	else if(shapeA.name === 'eye2') this.input[2] = 0
	else if(shapeA.name === 'eye3') this.input[3] = 0
	else this.reward -= 1

}

/*
 *
 */
Agent.prototype.update = function () {

	this.rewardBrain()

	var input = this.getInput()
	//console.log(input)
	var output = this.brain.forward(input)

	//console.log(output)

	switch(output) {
		case 0: this.body.thrust(2000); this.reward += 0.1; this.body.setZeroRotation();
			;break;
		case 1: this.body.rotateRight(50); 
			;break;
		case 2: this.body.rotateLeft(50);
			;break;
		case 3: this.body.reverse(2000); this.body.setZeroRotation();
			;break;
	}
}

/*
 * @method rewardBrain
 */
Agent.prototype.rewardBrain = function () {
	var reward = this.getReward()
	//console.log('reward', reward)
	this.brain.backward(reward)
}

/*
 * @method method_name
 */
Agent.prototype.getInput = function () {
	// var input = this.input
	// this.input = [0, 0, 0, 0]
	return this.input
}

/*
 * @method method_name
 */
Agent.prototype.getReward = function () {
	var reward = this.reward
	this.reward = 0
	return reward
}

/*
 * @method method_name
 */
Agent.prototype.method_name = function () {
	
}

/*
 * @method method_name
 */
Agent.prototype.method_name = function () {
	
}

/*
 * @method method_name
 */
Agent.prototype.method_name = function () {
	
}

/*
 * @method method_name
 */
Agent.prototype.method_name = function () {
	
}

/*
 * @method method_name
 */
Agent.prototype.method_name = function () {
	
}