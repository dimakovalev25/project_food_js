window.addEventListener('DOMContentLoaded', function () {

	// Tabs

	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {

		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', function (event) {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	const deadline = '2022-12-31';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60) % 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {

		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalCloseBtn.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 300000);
	// Изменил значение, чтобы не отвлекало

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	// Используем классы для создание карточек меню

	// class MenuCard {
	// 	constructor(src, alt, title, descr, price, parentSelector, ...classes) {
	// 		this.src = src;
	// 		this.alt = alt;
	// 		this.title = title;
	// 		this.descr = descr;
	// 		this.price = price;
	// 		this.classes = classes;
	// 		this.parent = document.querySelector(parentSelector);
	// 		this.transfer = 27;
	// 		this.changeToUAH();
	// 	}

	// 	changeToUAH() {
	// 		this.price = this.price * this.transfer;
	// 	}

	// 	render() {
	// 		const element = document.createElement('div');

	// 		if (this.classes.length === 0) {
	// 			this.classes = "menu__item";
	// 			element.classList.add(this.classes);
	// 		} else {
	// 			this.classes.forEach(className => element.classList.add(className));
	// 		}

	// 		element.innerHTML = `
	// 						<img src=${this.src} alt=${this.alt}>
	// 						<h3 class="menu__item-subtitle">${this.title}</h3>
	// 						<div class="menu__item-descr">${this.descr}</div>
	// 						<div class="menu__item-divider"></div>
	// 						<div class="menu__item-price">
	// 								<div class="menu__item-cost">Цена:</div>
	// 								<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
	// 						</div>
	// 				`;
	// 		this.parent.append(element);
	// 	}
	// }

	// new MenuCard(
	// 	"img/tabs/vegy.jpg",
	// 	"vegy",
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	".menu .container"
	// ).render();

	// new MenuCard(
	// 	"img/tabs/post.jpg",
	// 	"post",
	// 	'Меню "Постное"',
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	14,
	// 	".menu .container"
	// ).render();

	// new MenuCard(
	// 	"img/tabs/elite.jpg",
	// 	"elite",
	// 	'Меню “Премиум”',
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	21,
	// 	".menu .container"
	// ).render();

	// Forms

	// const forms = document.querySelectorAll('form');

	// const message = {
	// 	loading: "загрузка",
	// 	success: "свяжeмся с вами скоро",
	// 	failure: "error",
	// };

	// const statusMesage = document.createElement('div');
	// statusMesage.classList.add('status');
	// statusMesage.textContent = message.loading;
	// form.append(statusMesage);

	// function postData(form) {
	// 	form.addEventListener('submit', (event) => {
	// 		event.preventDefault();

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', "server.php");

	// 		let formData = new formData(form);

	// 		request.send(formData);

	// 		request.addEventListener('load', () => {
	// 			if(request.status === 200) {
	// 				console.log(request.response);
	// 			}
	// 		});


	// 	});
	// }

	// const forms = document.querySelectorAll('form');

	// const message = {
	// 	loading: "загрузка",
	// 	success: "свяжкмся с вами скоро",
	// 	failure: "error",

	// };

	// forms.forEach(item => {
	// 	postData(item);
	// });

	// function postData(form) {
	// 	form.addEventListener('submit', (event) => {
	// 		event.preventDefault();

	// 		const statusMessage = document.createElement('div');
	// 		statusMessage.classList.add('status');
	// 		statusMessage.textContent = message.loading;
	// 		form.append(statusMessage);

	// 		const request = new XMLHttpRequest();
	// 		request.open('POST', 'server.php');

	// 		const formData = new FormData(form);

	// 		request.send(formData);

	// 		request.addEventListener('load', () => {
	// 			if (request.status === 200) {
	// 				console.log(request.response);
	// 				statusMessage.textContent = message.success;
	// 				form.reset();
	// 				setTimeout(() => {
	// 					statusMessage.remove();
	// 				}, 2000);
	// 			} else {
	// 				statusMessage.textContent = message.failure;
	// 			}
	// 		});
			
	// 	});
	// }

	let slideIndex = 1;
	const slides = document.querySelectorAll('.offer__slide'),
			prev = document.querySelector('.offer__slider-prev'),
			next = document.querySelector('.offer__slider-next'),
			total = document.querySelector('#total'),
			current = document.querySelector('#current');

	showSlides(slideIndex);

	if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
	} else {
			total.textContent = slides.length;
	}

	function showSlides(n) {
			if (n > slides.length) {
					slideIndex = 1;
			}
			if (n < 1) {
					slideIndex = slides.length;
			}

			slides.forEach((item) => item.style.display = 'none');

			slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
			
			if (slides.length < 10) {
					current.textContent =  `0${slideIndex}`;
			} else {
					current.textContent =  slideIndex;
			}
	}

	function plusSlides (n) {
			showSlides(slideIndex += n);
	}

	prev.addEventListener('click', function(){
			plusSlides(-1);
	});

	next.addEventListener('click', function(){
			plusSlides(1);
	});
});





