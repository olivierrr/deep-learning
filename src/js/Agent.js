
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
	this.game.physics.p2.enable(this.sprite)
	this.body = this.sprite.body



	// var eye2 = this.body.addLine(100, 100, 100, 1.570796327)	
	// eye2.name = 'eye2'
	// eye2.sensor = true

	for(var i=0; i<4; i++) {
		var eye = this.game.add.sprite(x, y, 'redsquare')
		this.game.physics.p2.enable(eye)
		eye.body.angle = 90*i
		eye.off
		eye.width = 100
		eye.height = 1
		eye.name = 'eye'+i
		eye.anchor.x = 0
		eye.body.data.shapes[0].sensor = true
		eye.body.onBeginContact.add(this._onCollision, this)
		this.eyes.push(eye)
	}


	this.body.onBeginContact.add(this._onCollision, this)
}

/*
 * @method onCollision
 * @private
 */
Agent.prototype._onCollision = function (body, shapeA, shapeB, equation) {

	console.log(shapeA.name)
	
	if(shapeA.name === 'eye1') this.input[0] = 1
	else if(shapeA.name === 'eye2') this.input[1] = 1
	else if(shapeA.name === 'eye3') this.input[2] = 1
	else if(shapeA.name === 'eye4') this.input[3] = 1
	else this.reward -= 1

}

/*
 *
 */
Agent.prototype.update = function () {
	var _this = this
	this.eyes.forEach(function (eye) {
		eye.body.x = _this.body.x
		eye.body.y = _this.body.y
		eye.body.rotation += Phaser.Math.degToRad(_this.body.rotation)
	})

	this.rewardBrain()

	var input = this.getInput()
	//console.log(input)
	var output = this.brain.forward(input)

	//console.log(output)

	// switch(output) {
	// 	case 0: this.body.rotateLeft(10); console.log('left')
	// 		;break;
	// 	case 1: this.body.rotateRight(10); console.log('right')
	// 		;break;
	// 	case 2: this.body.thrust(5000); this.reward += 0.01;
	// 		;break;
	// 	case 3: this.body.reverse(5000);
	// 		;break;
	// }
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
	var input = this.input
	this.input = [0, 0, 0, 0]
	return input
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