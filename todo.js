todoMain();

function todoMain() {
	const DEFAULT_OPTION = "Choose category";
	let inputElem,
		inputElem2,
		button,
		selectElem,
		todoList = [];
	getElements();
	addListeners();
	load();
	renderRows();
	updateSelectOptions();

	function getElements() {
		inputElem = document.getElementsByTagName("input")[0];
		inputElem2 = document.getElementsByTagName("input")[1];
		button = document.getElementById("addBtn");
		selectElem = document.getElementById("categoryFilter");
	}

	function addListeners() {
		button.addEventListener("click", addEntry, false);
		selectElem.addEventListener("change", filterEntries, false);
	}

	function addEntry(event) {
		let inputValue = inputElem.value;
		inputElem.value = "";
		let inputValue2 = inputElem2.value;
		inputElem2.value = "";

		let obj = {
			id: _uuid(),
			todo: inputValue,
			category: inputValue2,
			done: false,
		};

		renderRow(obj);

		todoList.push(obj);

		save();

		updateSelectOptions();
	}

	function filterEntries() {
		let selection = selectElem.value;

		if (selection == DEFAULT_OPTION) {
			let rows = document.getElementsByTagName("tr");

			Array.from(rows).forEach((row, index) => {
				row.style.display = "";
			});
		} else {
			let rows = document.getElementsByTagName("tr");

			Array.from(rows).forEach((row, index) => {
				if (index == 0) {
					return;
				}
				let category = row.getElementsByTagName("td")[2].innerText;
				if (category == selectElem.value) {
					row.style.display = "";
				} else {
					row.style.display = "none";
				}
			});
		}
	}

	function updateSelectOptions() {
		let options = [];

		let rows = document.getElementsByTagName("tr");

		Array.from(rows).forEach((row, index) => {
			if (index == 0) {
				return;
			}
			let category = row.getElementsByTagName("td")[2].innerText;

			options.push(category);
		});

		let optionsSet = new Set(options);

		// empty the select options
		selectElem.innerHTML = "";

		let newOptionElem = document.createElement("option");
		newOptionElem.value = DEFAULT_OPTION;
		newOptionElem.innerText = DEFAULT_OPTION;
		selectElem.appendChild(newOptionElem);

		for (let option of optionsSet) {
			let newOptionElem = document.createElement("option");
			newOptionElem.value = option;
			newOptionElem.innerText = option;
			selectElem.appendChild(newOptionElem);
		}
	}

	function save() {
		let stringified = JSON.stringify(todoList);
		localStorage.setItem("todoList", stringified);
	}

	function load() {
		let retrieved = localStorage.getItem("todoList");
		todoList = JSON.parse(retrieved);
		if (todoList == null) {
			todoList = [];
		}
	}

	function renderRows() {
		todoList.forEach((todoObj) => {
			renderRow(todoObj);
		});
	}

	function renderRow({ todo: inputValue, category: inputValue2, id, done }) {
		// Add a new row
		let table = document.getElementById("todoTable");
		let trElem = document.createElement("tr");
		table.appendChild(trElem);

		// checkbox cell
		let checkboxElem = document.createElement("input");
		checkboxElem.type = "checkbox";
		checkboxElem.addEventListener("click", checkboxClickCallback, false);
		checkboxElem.dataset.id = id;
		let tdElem1 = document.createElement("td");
		tdElem1.appendChild(checkboxElem);
		trElem.appendChild(tdElem1);

		// to-do cell
		let tdElem2 = document.createElement("td");
		tdElem2.innerText = inputValue;
		trElem.appendChild(tdElem2);

		// category cell
		let tdElem3 = document.createElement("td");
		tdElem3.innerText = inputValue2;
		trElem.appendChild(tdElem3);

		// delete cell
		let spanElem = document.createElement("span");
		spanElem.innerText = "delete";
		spanElem.className = "material-symbols-outlined";
		spanElem.addEventListener("click", deleteItem, false);
		spanElem.dataset.id = id;
		let tdElem4 = document.createElement("td");
		tdElem4.appendChild(spanElem);
		trElem.appendChild(tdElem4);

		checkboxElem.type = "checkbox";
		checkboxElem.checked = done;
		if (done) {
			trElem.classList.add("strike");
		} else {
			trElem.classList.remove("strike");
		}

		function deleteItem() {
			trElem.remove();
			updateSelectOptions();

			for (let i = 0; i < todoList.length; i++) {
				if (todoList[i].id == this.dataset.id) {
					todoList.splice(i, 1);
				}
			}
			save();
		}

		function checkboxClickCallback() {
			trElem.classList.toggle("strike");
			for (let i = 0; i < todoList.length; i++) {
				if (todoList[i].id == this.dataset.id) {
					todoList[i]["done"] = this.checked;
				}
			}
			save();
		}
	}

	function _uuid() {
		var d = Date.now();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
			d += performance.now(); //use high-precision timer if available
		}
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}
}
