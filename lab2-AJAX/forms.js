const sock = "http://localhost:3000/";

sendValuesWEB5A = () => {
	const x = document.getElementById("valueXA").value;
	const y = document.getElementById("valueYA").value;
	const resultA = document.getElementById("resultA");

	const xhr = new XMLHttpRequest();
	xhr.open("POST", sock + "calc", true);
	xhr.setRequestHeader("X-Value-x", x);
	xhr.setRequestHeader("X-Value-y", y);

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			const z = xhr.getResponseHeader("X-Value-z");
			if (z) {
				resultA.textContent = `Sum: ${z}`;
			}
			else {
				resultA.textContent = "Err: no header";
			}
		}
		else {
			resultA.textContent = "Err: response status is not 2xx"
		}
	}

	xhr.onerror = () => {
		resultA.textContent = "Err: no request sent";
	}

	xhr.send();
}
