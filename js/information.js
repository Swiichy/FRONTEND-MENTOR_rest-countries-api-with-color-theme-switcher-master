
const results = document.querySelector('.main__description');
const query = new URLSearchParams(window.location.search);
const params = query.get('name');

document.addEventListener("DOMContentLoaded", e => {
    fetchCountries();
})

const fetchCountries = async () => {
    countries = await fetch('https://restcountries.eu/rest/v2/')
    const data = await countries.json()
    const filtreData = data.filter(country => country.alpha3Code === params)
    showCountries(filtreData);
    checkBorder();
};


const showCountries = data => {
    data.forEach(country => (
        results.innerHTML = (
            `   
                <ul class="description">
                    <div class="description__flag">
                        <img src="${country.flag}" />
                    </div>
                    <div class="description__content">
                        <div class="description__info">
                            <div class="description__info-first">
                                <ul>
                                    <h2>${country.name}</h2>
                                    <li><span>Native name:</span> ${country.nativeName}</li>
                                    <li><span>Population:</span> ${numberWithSpace(country.population)}</li>
                                    <li><span>Region:</span> ${country.region}</li>
                                    <li><span>Sub region:</span> ${country.subregion}</li>
                                    <li><span>Capital:</span> ${country.capital}</li>
                                </ul>
                            </div>
                            <div class="description__info-second">
                                <ul>
                                    <li><span>Top level domain:</span> ${country.topLevelDomain}</li>
                                    <li><span>Currencies:</span> ${country.currencies.map((currency) => {return currency.name;})}</li>
                                    <li><span>Languagues:</span> ${country.languages.map((language) => {return language.name;})}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="description__border">
                            <li><span id="borderTitle">Border Countries:</span>${bordersMapping(country.borders)}</li>
                        </div>
                    </div>
                </ul>
            `
        ))
    );
};

const bordersMapping = data => {
    let stringHTML = ''
    if(data.length > 0){
        data.forEach(data => {
           const link = `
            <a href="information.html?name=${data}">
                <button id="border">
                    ${data} 
                </button>
            </a>
           `
           stringHTML = stringHTML + link
        });
    } 
    return stringHTML
}

const checkBorder = () => {
    if(document.body.contains(document.getElementById("border"))) {
        console.log("ok");
    } else {
        document.getElementById("borderTitle").innerHTML = "This country has no border country";
    }
}


const numberWithSpace = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
