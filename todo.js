todoMain();

function todoMain() {
	let inputElem,
		inputElem2,
		button,
		ulElem;
	getElements();
	addListeners();

	function getElements() {
		inputElem = document.getElementsByTagName("input")[0];
		inputElem2 = document.getElementsByTagName("input")[1];
		button = document.getElementById("addBtn");
		ulElem = document.getElementsByTagName("ul")[0];
	}

	function addListeners() {
		button.addEventListener("click", onChange, false);
	}

	function onChange(event) {
		let flag = true;

		let inputValue = inputElem.value;

		// This allows html injection
		// ulElem.innerHTML += `<li>${inputValue}</li>`;
		inputElem.value = "";

		let inputValue2 = inputElem2.value;
		inputElem2.value = "";

		let liElem = document.createElement("li");

		let checkboxElem = document.createElement("input");
		checkboxElem.type = "checkbox";
		liElem.appendChild(checkboxElem);

		let textElem = document.createElement("span");
		textElem.innerText = inputValue + " - " + inputValue2;
		liElem.appendChild(textElem);

		// liElem.innerText = inputValue;
		// liElem.addEventListener("click", onClick, false);

		let spanElem = document.createElement("span");
		spanElem.innerText = "delete";
		spanElem.className = "material-symbols-outlined";

		spanElem.addEventListener("click", deleteItem, false);

		liElem.appendChild(spanElem);

		ulElem.appendChild(liElem);

		function deleteItem() {
			liElem.remove();
		}

		function onClick() {
			if (flag) {
				// this.style.textDecoration = "line-through";
				this.classList.add("strike");
				flag = !flag;
			} else {
				// this.style.textDecoration = "none";
				this.classList.remove("strike");
				flag = !flag;
			}
			
		}
	}
}