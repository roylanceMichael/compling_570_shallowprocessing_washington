class TransitionState:
	def __init__(self, fromState, toState, value, props):
		self.fromState = fromState
		self.toState = toState
		self.value = value
		self.props = props
