todoMain();

function todoMain() {
	let inputElem, ulElem;
	getElements();
	addListeners();

	function getElements() {
		inputElem = document.getElementsByTagName("input")[0];
		ulElem = document.getElementsByTagName("ul")[0];
	}

	function addListeners() {
		inputElem.addEventListener("change", onChange, false);
	}

	function onChange(event) {
		let inputValue = inputElem.value;

		// This allows html injection
		// ulElem.innerHTML += `<li>${inputValue}</li>`;
		inputElem.value = "";

		let liElem = document.createElement("li");
		liElem.innerText = inputValue;
		ulElem.appendChild(liElem);
	}
}