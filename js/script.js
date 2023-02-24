const arrowScroll = document.querySelector('.landscape__scroll__icon');
const navHome = document.querySelector('.nav--home');
const navAbout = document.querySelector('.nav--about');
const navSkills = document.querySelector('.nav--skills');
const navProjects = document.querySelector('.nav--projects');
const navContact = document.querySelector('.nav--contact');
const header = document.querySelector('.header');

const homeEl = document.querySelector('.landscape');
const aboutEl = document.querySelector('.about');
const skillsEl = document.querySelector('.skills');
const projectsEl = document.querySelector('.project');
const contactEl = document.querySelector('.contact');

const getOffset = function(el){
    const rect = el.getBoundingClientRect();
    const headerProps = header.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY - headerProps.height,
    };
}

const scrollToElement = function(el) {
    const position = getOffset(el);
    window.scrollTo({
        top: position.top,
        behavior: "smooth"
    })
}

document.addEventListener("scroll", function() {
    window.scrollY > 0 ? header.classList.add('header__scroll') : header.classList.remove('header__scroll');
})


arrowScroll.addEventListener("click",function(){
    scrollToElement(aboutEl);
});


navHome.addEventListener("click",function(){
    scrollToElement(homeEl);
});

navAbout.addEventListener("click",function(){
    scrollToElement(aboutEl);
});

navSkills.addEventListener("click",function(){
    scrollToElement(skillsEl);
});

navProjects.addEventListener("click",function(){
    scrollToElement(projectsEl);
});

navContact.addEventListener("click", function() {
    scrollToElement(contactEl);
})


