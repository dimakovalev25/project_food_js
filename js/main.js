"use strict";

window.addEventListener("DOMContentLoaded", () => {

	const tabs = document.querySelectorAll(".tabheader__item");
	const tabsContent = document.querySelectorAll(".tabcontent");
	const tabsParent = document.querySelector(".tabheader__items");

	console.log(tabsContent);

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = "none";
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	} 

	function showTabContect(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');

	}

	hideTabContent();
	showTabContect();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if(target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContect(i);
				}
			});
		}

	});

});


