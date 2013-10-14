class TransitionState:
	def __init__(self, fromState, toState, value, props):
		self.fromState = fromState
		self.toState = toState
		self.value = value
		self.props = props
		
		if(len(props) > 1):
			self.output = props[0]
			self.weight = props[1]
		elif(len(props) > 0):
			self.output = props[0]
		else:
			self.output = None
			self.weight = None

		
