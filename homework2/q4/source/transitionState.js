function TransitionState(from, to, val, props) {
	this.from = from;
	this.to = to;
	this.val = val;
	this.props = props;
}

module.exports = TransitionState;