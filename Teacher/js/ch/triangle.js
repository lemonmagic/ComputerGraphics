"use strict";

var gl;
var points;

window.onload = function init() { //从该位置开始执行代码
	var canvas = document.getElementById("triangle-canvas"); //从HTML中获取WebGL用于渲染的画布环境
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL isn't available");
	}

	// Three Vertices
	var vertices = [
		-1.0, -1.0,
		0.0, 1.0,
		1.0, -1.0,
		/*0.0, -1.0,
		1.0, -1.0,
		1.0,  1.0,
		0.0, -1.0,
		1.0,  1.0,
		0.0,  1.0*/
		/*-0.5, -0.5,
		0.0, 0.5,
		0.5, -0.5*/
	];

	// Configure WebGL定义视口，用于绘制的区域，顶点位置会映射到此区域
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1.0, 1.0, 1.0, 1.0);

	// Load shaders and initialize attribute buffers用于载入、编译、链接着色器程序代码，构建程序对象
	var program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	render();
}

function render() {//实际渲染代码
	gl.clear(gl.COLOR_BUFFER_BIT);
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}