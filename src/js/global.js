// Общие переменные
const mainElement = document.documentElement;
const container = document.querySelector('.container');
const containerWidth = container.clientWidth;

// Работа кнопок калькулятора вызов замерщика и инфомрация сервис
const headerMenuBtnsInfo = document.querySelector('.header-info-btns__btns');
const listInfoService = document.querySelector('.header-info-btns__info');
const btnMeasurer = document.querySelector ('.header-info-btns__measurer');
let btnInfoService;
let btnTextInfo;

// Работа кнопок контактов, вызов набора номера и кнопка заказа звонка
const headerMenuCall = document.querySelector('.header-worktime-tel-feedback__contacts');
const headerCallFeedback = document.querySelector('.header-worktime-tel-feedback__tel-feedback');
let btnCall;
let btnMail;
let btnCloseMenuCall;

// Работа меню навигации по сайту в хеадере
const navList = document.querySelector('.header-navigation__list');
const navItem = document.querySelectorAll('.header-navigation__item');
const navItemPerent = document.querySelectorAll('.header-navigation__parent');
const navLink = document.querySelectorAll('.header-navigation__link');
let navAdditionallist;
const btnBurger = document.querySelector('.burger-nav');
let btnLine;

// Работа слайдера-таба в блоке херо
const tabCarusel = document.querySelector('.hero__carusel');
const tabNavItem = document.querySelectorAll('.hero-tabs__item');
const tabContentItem = document.querySelectorAll('.hero__carusel-item');

