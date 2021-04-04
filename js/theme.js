const container = document.querySelector('.container');
const btnDark = document.querySelector('.header__theme');

btnDark.addEventListener('click', () => {
    //console.log('diste click')
    container.classList.toggle('dark-mode');

    if (container.className === 'container dark-mode') {
        btnDark.innerHTML = `
        <i class="far fa-sun"></i>
        <span>Light Mode</span>
        `
    } else {
        btnDark.innerHTML = `
        <i class="far fa-moon"></i>
        <span>Dark Mode</span>
        `
    }
})