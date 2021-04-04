
const searchInput = document.getElementById('search');
const results = document.querySelector('.main__card');

document.addEventListener("DOMContentLoaded", e => {
    fetchCountries()
})

let countries;
let searchTerm = "";


const fetchCountries = async () => {
    countries = await fetch('https://restcountries.eu/rest/v2/')
    const data = await countries.json()
    showCountries(data);
    filter(data);
    search(data);
};

const showCountries = data => {
    results.innerHTML = (
        data.filter(country => country.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
            .map(country => (
                `   
                <a href="information.html?name=${country.alpha3Code}"
                    <li class="main__card-item">
                        <img class="main__card-item-flag" src="${country.flag}" />
                        <div class="main__card-item-info">
                            <h3 class="main__card-item-info-name">${country.name}</h3>
                            <p class="main__card-item-info-text"><span>Habitants:</span> ${numberWithSpace(country.population)}</p>
                            <p class="main__card-item-info-region"><span>Region:</span> ${country.region}</p>
                            <p class="main__card-item-info-capital"><span>Capital:</span> ${country.capital}</p>
                        </div>
                    </li>
                </a>
                `
            )).join('')
    );
};

const search = (data) => {
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        showCountries(data);
    });
}

const numberWithSpace = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};