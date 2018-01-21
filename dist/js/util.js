$(document).ready(function () {
    $('.nav a, .navbar-brand').click(function () {
        $('.nav, .navbar-header').find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

    $('div.next-section a').click(function () {
        scrollToSection($(this));
    });

    $(window).scroll(function () {
        $('#arrow-intro-section').stop(false, false);
    });

    animateNextSectionArrow();
    lazyLoadImages();
});

function lazyLoadImages() {
    let images = getAllImagesToLazilyLoad();
    createObserver(images);
}

function createObserver(images) {
    const config = {
        // If the image gets within 50px in the Y axis, start the download.
        rootMargin: '50px 0px',
        threshold: 0.01
    };

    if (!('IntersectionObserver' in window)) {
        images.forEach(image => {
            preLoad(image);
        });
    } else {
        let observer = new IntersectionObserver(onIntersection, config);
        images.forEach(image => {
            observer.observe(image);
        });
    }
}

function onIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            preLoad(entry.target);
        }
    });
}

function preLoad(image) {
    image.src = image.dataset.src;
    image.onload = () => {
        image.removeAttribute('data-src');
    };
}

function getAllImagesToLazilyLoad() {
    return $.find('.lazy-load');
}

function scrollToSection(section) {
    $('html, body').animate({
        scrollTop: section.offset().top
    }, 1000);
}

function animateNextSectionArrow() {
    let arrow = $('#arrow-intro-section');

    arrow.animate({
        top: '+6'
    }, 800).animate({
        top: '-3'
    }, 800, animateNextSectionArrow);
}

