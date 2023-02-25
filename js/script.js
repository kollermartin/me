const arrowScroll = document.querySelector('.landscape__scroll__icon');
const navHome = document.querySelector('.nav--home');
const navAbout = document.querySelector('.nav--about');
const navSkills = document.querySelector('.nav--skills');
const navProjects = document.querySelector('.nav--projects');
const navContact = document.querySelector('.nav--contact');
const header = document.querySelector('.header');
const navItems = document.querySelectorAll('.navigation__item');

const homeEl = document.querySelector('.landscape');
const aboutEl = document.querySelector('.about');
const skillsEl = document.querySelector('.skills');
const projectsEl = document.querySelector('.project');
const contactEl = document.querySelector('.contact');

const getOffset = function (el) {
    const rect = el.getBoundingClientRect();
    const headerProps = header.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY - headerProps.height,
        bottom: rect.bottom + window.scrollY - headerProps.height
    };
}

const scrollToElement = function (el) {
    const position = getOffset(el);
    window.scrollTo({
        top: position.top,
        behavior: "smooth"
    })
}

const removeClass = (item, classToRemove) => {
    item.classList.remove(classToRemove);
}

const addClass = (item, classToRemove) => {
    item.classList.add(classToRemove);
}

document.addEventListener("scroll", function () {
    addAndRemoveClassesInHeader();
    findCurrentNavSection();
})

const findCurrentNavSection = () => {
    const headerProps = header.getBoundingClientRect();

    navItems.forEach(item => {
        const id = item.getAttribute('name');
        const section = document.getElementById(id);
        const offset = getOffset(section);

        if (window.scrollY + window.innerHeight === document.body.scrollHeight) // Contact section doesn't take whole window height, therefore add contact nav underscore class when at the end of scrolling
        {
            navContact.classList.add('underscore');
            navProjects.classList.remove('underscore');
        } else if (window.scrollY + headerProps.height >= offset.top && window.scrollY + headerProps.height <= offset.bottom) {
            item.classList.add('underscore');
        } else {
            item.classList.remove('underscore');
        }
    })
}

const addAndRemoveClassesInHeader = () => {
    if (window.scrollY > 0) {
        addClass(header, 'header__scroll');
        navItems.forEach(item => {
            removeClass(item, 'navigation__item--not-scrolled');
            addClass(item, 'navigation__item--scrolled');
        })

    } else {
        removeClass(header, 'header__scroll');
        navItems.forEach(item => {
            addClass(item, 'navigation__item--not-scrolled')
            removeClass(item, 'navigation__item--scrolled');
        })
    }
}


arrowScroll.addEventListener("click", function () {
    scrollToElement(aboutEl);
});


navHome.addEventListener("click", function () {
    scrollToElement(homeEl);
});

navAbout.addEventListener("click", function () {
    scrollToElement(aboutEl);
});

navSkills.addEventListener("click", function () {
    scrollToElement(skillsEl);
});

navProjects.addEventListener("click", function () {
    scrollToElement(projectsEl);
});

navContact.addEventListener("click", function () {
    scrollToElement(contactEl);
})


