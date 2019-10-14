
function main() {
	// Get canvas element and context
	var canvas = document.getElementById('glCanvas');
	var gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('Failed to find context');
	}

	// Initialize shaders
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	gl.program = program;

	// Get attribute location of a_Position
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) {
		return;
	}

	// Get location of uniform u_FragColor
	var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
	if (u_FragColor < 0) {
		return;
	}

	// Holds all coordinates and colors to be rendered on each click
	let data = [];

	// Click listener
	canvas.addEventListener('mousedown', (event) => {
		let { x, y } = getClickCanvasCoordinates(event, canvas);
		data.push({ x, y, color: [Math.random(), Math.random(), Math.random(), 1] })
		render(gl, a_Position, u_FragColor, data)
	})

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

// Get vertex space coordinates
function getClickCanvasCoordinates(event, canvas) {
	var x = event.clientX;
	var y = event.clientY;
	var rect = event.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
	y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

	return { x, y }
}

function render(gl, a_Position, u_FragColor, data) {
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	data.forEach(({ x, y, color }) => {
		gl.vertexAttrib3f(a_Position, x, y, 1.0);
		gl.uniform4f(u_FragColor, ...color);
		gl.drawArrays(gl.Points, 0, 1);
	})

}