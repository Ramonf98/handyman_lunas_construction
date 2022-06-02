import { allTranslations } from './translations.js';

window.addEventListener('load', function () {
    /*-- Initialize the Image Slider --*/
    initializeGlider();

    /*-- Initialize Animate On Scroll Library --*/
    initializeAnimateOnScroll();

    /*-- Check the user preference and change the language of the page --*/
    changeLanguage(null, true);

    /*- Add Event Listeners -*/
    addEventListeners();
});

function changeLanguage(e, isLoading) {
    try {
        let pageLang = localStorage.getItem('user_preferred_lang') || 'en';
        if (isLoading && pageLang === 'en') {
            return;
        }
        if (!isLoading) {
            if (pageLang === 'en') {
                pageLang = 'es';
            } else {
                pageLang = 'en';
            }

            localStorage.setItem('user_preferred_lang', pageLang);
        }

        const translations = allTranslations[pageLang];
        for (let elementID in translations) {
            const translatedText = translations[elementID];
            const htmlElement = document.getElementById(elementID);
            if (!htmlElement) return;
            htmlElement.innerHTML = translatedText;
        }
    } catch (ex) {
        // console.error(ex.message);
    }
}

function initializeGlider() {
    new Glider(document.getElementById('slider__list'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.slider__indicators',
        arrows: {
            prev: '#arrow__left',
            next: '#arrow__right'
        }
    });
}

function initializeAnimateOnScroll() {
    AOS.init({
        delay: 0,
        duration: 500,
        once: true
    });
}

function addEventListeners() {
    document.getElementById('lang_picker').addEventListener('click', changeLanguage);
}
