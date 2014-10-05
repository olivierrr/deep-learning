
/*
 * @constructor Brain
 */
function Brain () {

	var num_inputs = 17 // inputs
	var num_actions = 4 // outputs
	var temporal_window = 1; // amount of temporal memory
	var network_size = num_inputs*temporal_window + num_actions*temporal_window + num_inputs

	var layer_defs = [];
	layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:network_size})
	layer_defs.push({type:'fc', num_neurons: 50, activation:'relu'})
	layer_defs.push({type:'fc', num_neurons: 50, activation:'relu'})
	layer_defs.push({type:'regression', num_neurons:num_actions})

	var tdtrainer_options = {learning_rate:0.001, momentum:0.0, batch_size:64, l2_decay:0.01}

	var opt = {}
	opt.temporal_window = temporal_window
	opt.experience_size = 30000
	opt.start_learn_threshold = 1000
	opt.gamma = 0.7
	opt.learning_steps_total = 200000
	opt.learning_steps_burnin = 3000
	opt.epsilon_min = 0.05
	opt.epsilon_test_time = 0.05
	opt.layer_defs = layer_defs
	opt.tdtrainer_options = tdtrainer_options

	return new deepqlearn.Brain(num_inputs, num_actions, opt)
}