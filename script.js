const products = [
  {name:'20 Réis', country:'Brasil', year:'1899', type:'Bronze', rarity:'Histórica', symbol:'BR'},
  {name:'1 Cruzeiro', country:'Brasil', year:'1949', type:'Alumínio', rarity:'Colecionável', symbol:'BR'},
  {name:'50 Centavos', country:'Brasil', year:'1970', type:'Bronze', rarity:'Comemorativa', symbol:'BR'},
  {name:'1 Dollar', country:'Estados Unidos', year:'1922', type:'Prata', rarity:'Rara', symbol:'US'},
  {name:'25 Cents', country:'Estados Unidos', year:'1964', type:'Prata', rarity:'Histórica', symbol:'US'},
  {name:'10 Francs', country:'França', year:'1965', type:'Prata', rarity:'Colecionável', symbol:'FR'},
  {name:'5 Francs', country:'França', year:'1870', type:'Prata', rarity:'Rara', symbol:'FR'},
  {name:'1 Pound', country:'Reino Unido', year:'1983', type:'Níquel', rarity:'Histórica', symbol:'UK'},
  {name:'1 Penny', country:'Reino Unido', year:'1912', type:'Bronze', rarity:'Rara', symbol:'UK'},
  {name:'100 Yen', country:'Japão', year:'1967', type:'Prata', rarity:'Colecionável', symbol:'JP'},
  {name:'5 Mark', country:'Alemanha', year:'1975', type:'Prata', rarity:'Rara', symbol:'DE'},
  {name:'2 Mark', country:'Alemanha', year:'1937', type:'Prata', rarity:'Histórica', symbol:'DE'}
];

const productsEl = document.getElementById('products');
const resultInfo = document.getElementById('resultInfo');
const search = document.getElementById('search');
let currentCountry = 'Todos';

function render(list = products) {
  productsEl.innerHTML = '';
  resultInfo.textContent = `${list.length} ${list.length === 1 ? 'peça' : 'peças'}`;
  if (!list.length) {
    productsEl.innerHTML = '<div class="empty">Nenhuma moeda encontrada. Tente outro termo ou país.</div>';
    return;
  }
  list.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'productCard';
    card.innerHTML = `
      <div class="productCoin coin-${i % 6}"><span>${p.symbol}</span><small>${p.year}</small></div>
      <div class="productInfo"><span class="tag">${p.rarity}</span><h3>${p.name}</h3><p>${p.country} · ${p.type}</p><div class="productMeta"><span>${p.year}</span><span>Catálogo NUMMUS</span></div></div>`;
    productsEl.appendChild(card);
  });
}

function filterProducts() {
  const term = search.value.trim().toLowerCase();
  const list = products.filter(p => {
    const countryOK = currentCountry === 'Todos' || p.country === currentCountry;
    const text = `${p.name} ${p.country} ${p.year} ${p.type} ${p.rarity}`.toLowerCase();
    return countryOK && text.includes(term);
  });
  render(list);
}

const countries = [
    "Afeganistão",
    "África do Sul",
    "Albânia",
    "Alemanha",
    "Andorra",
    "Angola",
    "Argentina",
    "Austrália",
    "Áustria",
    "Bahamas",
    "Bélgica",
    "Bolívia",
    "Brasil",
    "Bulgária",
    "Canadá",
    "Chile",
    "China",
    "Colômbia",
    "Coreia do Sul",
    "Costa Rica",
    "Croácia",
    "Cuba",
    "Dinamarca",
    "Egito",
    "Equador",
    "Espanha",
    "Estados Unidos",
    "Finlândia",
    "França",
    "Grécia",
    "Guatemala",
    "Haiti",
    "Hungria",
    "Índia",
    "Indonésia",
    "Irlanda",
    "Islândia",
    "Israel",
    "Itália",
    "Jamaica",
    "Japão",
    "Jordânia",
    "México",
    "Noruega",
    "Nova Zelândia",
    "Países Baixos",
    "Panamá",
    "Paraguai",
    "Peru",
    "Polônia",
    "Portugal",
    "Reino Unido",
    "República Tcheca",
    "Romênia",
    "Rússia",
    "Suécia",
    "Suíça",
    "Tailândia",
    "Turquia",
    "Ucrânia",
    "Uruguai",
    "Venezuela",
    "Vietnã",
    "Zâmbia",
    "Zimbábue"
];

countries.forEach(country => {
    const option = document.createElement("option");

    option.value = country;
    option.textContent = country;

    countrySelect.appendChild(option);
});

countrySelect.addEventListener("change", applyFilters);
function applyFilters() {

    const term = search.value.toLowerCase().trim();
    const country = countrySelect.value;

    const list = products.filter(product => {

        const matchesCountry =
            country === "Todos" ||
            product.country === country;

        const text = `
            ${product.name}
            ${product.country}
            ${product.year}
            ${product.period}
        `.toLowerCase();

        return matchesCountry && text.includes(term);
    });

    render(list);
}

search.addEventListener('input', filterProducts);
render();
