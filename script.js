const products = [

    {
        id: 1,
        name: "20 Réis",
        country: "Brasil",
        year: "1899",
        type: "Bronze",
        rarity: "Histórica",
        price: 89.90,
        code: "BR",
        image: "img/moedas/20-reis.jpg"
    },

    {
        id: 2,
        name: "1 Cruzeiro",
        country: "Brasil",
        year: "1949",
        type: "Alumínio",
        rarity: "Colecionável",
        price: 49.90,
        code: "BR",
        image: "img/moedas/1-cruzeiro.jpg"
    },

    {
        id: 3,
        name: "50 Centavos",
        country: "Brasil",
        year: "1970",
        type: "Bronze",
        rarity: "Comemorativa",
        price: 59.90,
        code: "BR",
        image: "img/moedas/50-centavos.jpg"
    },

    {
        id: 4,
        name: "1 Dollar",
        country: "Estados Unidos",
        year: "1922",
        type: "Prata",
        rarity: "Rara",
        price: 149.90,
        code: "US",
        image: "img/moedas/1-dollar.jpg"
    },

    {
        id: 5,
        name: "25 Cents",
        country: "Estados Unidos",
        year: "1964",
        type: "Prata",
        rarity: "Histórica",
        price: 99.90,
        code: "US",
        image: "img/moedas/25-cents.jpg"
    },

    {
        id: 6,
        name: "10 Francs",
        country: "França",
        year: "1965",
        type: "Prata",
        rarity: "Colecionável",
        price: 119.90,
        code: "FR",
        image: "img/moedas/10-francs.jpg"
    },

    {
        id: 7,
        name: "5 Francs",
        country: "França",
        year: "1870",
        type: "Prata",
        rarity: "Rara",
        price: 189.90,
        code: "FR",
        image: "img/moedas/5-francs.jpg"
    },

    {
        id: 8,
        name: "1 Pound",
        country: "Reino Unido",
        year: "1983",
        type: "Níquel",
        rarity: "Histórica",
        price: 69.90,
        code: "UK",
        image: "img/moedas/1-pound.jpg"
    },

    {
        id: 9,
        name: "1 Penny",
        country: "Reino Unido",
        year: "1912",
        type: "Bronze",
        rarity: "Rara",
        price: 129.90,
        code: "UK",
        image: "img/moedas/1-penny.jpg"
    },

    {
        id: 10,
        name: "100 Yen",
        country: "Japão",
        year: "1967",
        type: "Prata",
        rarity: "Colecionável",
        price: 109.90,
        code: "JP",
        image: "img/moedas/100-yen.jpg"
    },

    {
        id: 11,
        name: "5 Mark",
        country: "Alemanha",
        year: "1975",
        type: "Prata",
        rarity: "Rara",
        price: 139.90,
        code: "DE",
        image: "img/moedas/5-mark.jpg"
    },

    {
        id: 12,
        name: "2 Mark",
        country: "Alemanha",
        year: "1937",
        type: "Prata",
        rarity: "Histórica",
        price: 159.90,
        code: "DE",
        image: "img/moedas/2-mark.jpg"
    }

];


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


const productsContainer =
    document.getElementById("products");

const searchInput =
    document.getElementById("search");

const countrySelect =
    document.getElementById("countrySelect");

const yearSelect =
    document.getElementById("yearSelect");

const resultInfo =
    document.getElementById("resultInfo");


/* =========================
   CARRINHO
========================= */

const cartButton =
    document.getElementById("cartButton");

const closeCart =
    document.getElementById("closeCart");

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const finishButton =
    document.getElementById("finishButton");


let cart = [];


function money(value) {

    return value
        .toFixed(2)
        .replace(".", ",");

}


/* =========================
   MOEDA FALLBACK
========================= */

function fallbackCoin(product) {

    return `
        <div class="fallbackCoin">

            <div class="fallbackCoinInner">

                <span>
                    ${product.code}
                </span>

                <strong>
                    ${product.name.split(" ")[0]}
                </strong>

                <small>
                    ${product.year}
                </small>

            </div>

        </div>
    `;

}


/* =========================
   RENDER MOEDAS
========================= */

function renderProducts(list) {

    productsContainer.innerHTML = "";


    if (list.length === 0) {

        productsContainer.innerHTML = `

            <div class="noResults">

                <div class="noResultsIcon">
                    ⌕
                </div>

                <h3>
                    Nenhuma moeda encontrada
                </h3>

                <p>
                    Tente mudar os filtros ou pesquisar por outro termo.
                </p>

            </div>

        `;

        resultInfo.textContent = "0 peças";

        return;
    }


    list.forEach(function(product) {

        const card =
            document.createElement("article");


        card.className =
            "productCard";


        card.innerHTML = `

            <div class="productImage">

                <img
                    src="${product.image}"
                    alt="${product.name} - ${product.country}"
                    class="realCoinImage"
                >

                ${fallbackCoin(product)}

                <span class="rarityTag">
                    ${product.rarity}
                </span>

            </div>


            <div class="productInfo">

                <span class="productCountry">
                    ${product.country}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <div class="productDetails">

                    <span>
                        ${product.year}
                    </span>

                    <span>
                        ${product.type}
                    </span>

                </div>


                <div class="productBottom">

                    <div class="priceArea">

                        <span>
                            Preço
                        </span>

                        <strong>
                            R$ ${money(product.price)}
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="addCartButton"
                        data-id="${product.id}"
                    >
                        + CARRINHO
                    </button>

                </div>

            </div>

        `;


        const image =
            card.querySelector(".realCoinImage");

        const fallback =
            card.querySelector(".fallbackCoin");


        image.addEventListener(
            "error",
            function() {

                image.style.display = "none";

                fallback.style.display = "flex";

            }
        );


        productsContainer.appendChild(card);

    });


    resultInfo.textContent =
        list.length === 1
            ? "1 peça"
            : list.length + " peças";


    document
        .querySelectorAll(".addCartButton")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        Number(button.dataset.id);

                    addToCart(id);

                }
            );

        });

}


/* =========================
   PAÍSES
========================= */

function populateCountries() {

    countrySelect.innerHTML = `

        <option value="Todos">
            Todos os países
        </option>

    `;


    countries.forEach(function(country) {

        const option =
            document.createElement("option");


        option.value =
            country;


        option.textContent =
            country;


        countrySelect.appendChild(option);

    });

}


/* =========================
   ANOS
========================= */

function populateYears() {

    yearSelect.innerHTML = `

        <option value="Todos">
            Todos os anos
        </option>

    `;


    const years = [
        ...new Set(

            products.map(function(product) {

                return product.year;

            })

        )
    ];


    years.sort(function(a, b) {

        return Number(a) - Number(b);

    });


    years.forEach(function(year) {

        const option =
            document.createElement("option");


        option.value =
            year;


        option.textContent =
            year;


        yearSelect.appendChild(option);

    });

}


/* =========================
   FILTROS
========================= */

function applyFilters() {

    const term =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCountry =
        countrySelect.value;


    const selectedYear =
        yearSelect.value;


    const filtered =
        products.filter(function(product) {

            const text = `

                ${product.name}
                ${product.country}
                ${product.year}
                ${product.type}
                ${product.rarity}

            `.toLowerCase();


            const searchMatch =
                text.includes(term);


            const countryMatch =
                selectedCountry === "Todos" ||
                product.country === selectedCountry;


            const yearMatch =
                selectedYear === "Todos" ||
                product.year === selectedYear;


            return (
                searchMatch &&
                countryMatch &&
                yearMatch
            );

        });


    renderProducts(filtered);

}


searchInput.addEventListener(
    "input",
    applyFilters
);


countrySelect.addEventListener(
    "change",
    applyFilters
);


yearSelect.addEventListener(
    "change",
    applyFilters
);


/* =========================
   ADICIONAR CARRINHO
========================= */

function addToCart(id) {

    const product =
        products.find(function(item) {

            return item.id === id;

        });


    if (!product) {
        return;
    }


    const existing =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


/* =========================
   REMOVER
========================= */

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    updateCart();

}


/* =========================
   QUANTIDADE
========================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(function(product) {

            return product.id === id;

        });


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    updateCart();

}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="emptyCart">

                <div class="emptyCartIcon">
                    🛒
                </div>

                <p>
                    Seu carrinho está vazio.
                </p>

            </div>

        `;


        cartCount.textContent =
            "0";


        cartTotal.textContent =
            "R$ 0,00";


        return;
    }


    let total = 0;

    let quantityTotal = 0;


    cart.forEach(function(item) {

        total +=
            item.price * item.quantity;


        quantityTotal +=
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cartItem";


        cartItem.innerHTML = `

            <div class="cartImageBox">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cartCoinImage"
                >

                <span>
                    ${item.code}
                </span>

            </div>


            <div class="cartItemInfo">

                <strong>
                    ${item.name}
                </strong>


                <small>
                    ${item.country} · ${item.year}
                </small>


                <b>
                    R$ ${money(item.price)}
                </b>


                <div class="quantityControls">

                    <button
                        type="button"
                        class="quantityButton"
                        data-id="${item.id}"
                        data-action="minus"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        class="quantityButton"
                        data-id="${item.id}"
                        data-action="plus"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                type="button"
                class="removeButton"
                data-id="${item.id}"
            >
                ×
            </button>

        `;


        const cartImage =
            cartItem.querySelector(".cartCoinImage");


        cartImage.addEventListener(
            "error",
            function() {

                cartImage.style.display =
                    "none";

            }
        );


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        quantityTotal;


    cartTotal.textContent =
        "R$ " + money(total);


    document
        .querySelectorAll(".quantityButton")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        Number(button.dataset.id);


                    const amount =
                        button.dataset.action === "plus"
                            ? 1
                            : -1;


                    changeQuantity(
                        id,
                        amount
                    );

                }
            );

        });


    document
        .querySelectorAll(".removeButton")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const id =
                        Number(button.dataset.id);


                    removeFromCart(id);

                }
            );

        });

}


/* =========================
   ABRIR CARRINHO
========================= */

function openCart() {

    cartPanel.classList.add(
        "active"
    );

    cartOverlay.classList.add(
        "active"
    );

    document.body.classList.add(
        "cartOpen"
    );

}


/* =========================
   FECHAR CARRINHO
========================= */

function closeCartPanel() {

    cartPanel.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "cartOpen"
    );

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================
   FINALIZAR
========================= */

finishButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            alert(
                "Seu carrinho está vazio."
            );

            return;
        }


        alert(
            "Seu pedido foi preparado.\n\n" +
            "Total: " +
            cartTotal.textContent
        );

    }
);


/* =========================
   CONTA
========================= */

const accountButton =
    document.getElementById(
        "accountButton"
    );

const accountOverlay =
    document.getElementById(
        "accountOverlay"
    );

const accountModal =
    document.getElementById(
        "accountModal"
    );

const closeAccount =
    document.getElementById(
        "closeAccount"
    );

const signupForm =
    document.getElementById(
        "signupForm"
    );

const loginForm =
    document.getElementById(
        "loginForm"
    );

const signupName =
    document.getElementById(
        "signupName"
    );

const signupEmail =
    document.getElementById(
        "signupEmail"
    );

const signupPassword =
    document.getElementById(
        "signupPassword"
    );

const loginEmail =
    document.getElementById(
        "loginEmail"
    );

const loginPassword =
    document.getElementById(
        "loginPassword"
    );

const accountTitle =
    document.getElementById(
        "accountTitle"
    );

const accountMessage =
    document.getElementById(
        "accountMessage"
    );

const toggleAccountMode =
    document.getElementById(
        "toggleAccountMode"
    );


let loginMode = false;


/* COLOQUE SUAS CHAVES DO SUPABASE AQUI */

const SUPABASE_URL =
    "https://izyvvmgbmrsmcshrevnd.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_ckn0noV0ss_H5GW7IdCNMQ_pD1LeFR3";


let supabaseClient = null;


if (
    window.supabase &&
    SUPABASE_URL.startsWith("http") &&
    SUPABASE_KEY !== "sb_publishable_ckn0noV0ss_H5GW7IdCNMQ_pD1LeFR3"
) {

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

}


function openAccount() {

    accountModal.classList.add(
        "active"
    );

    accountOverlay.classList.add(
        "active"
    );

}


function closeAccountModal() {

    accountModal.classList.remove(
        "active"
    );

    accountOverlay.classList.remove(
        "active"
    );

}


function showAccountMessage(
    message
) {

    accountMessage.textContent =
        message;

}


accountButton.addEventListener(
    "click",
    openAccount
);


closeAccount.addEventListener(
    "click",
    closeAccountModal
);


accountOverlay.addEventListener(
    "click",
    closeAccountModal
);


toggleAccountMode.addEventListener(
    "click",
    function() {

        loginMode =
            !loginMode;


        accountMessage.textContent =
            "";


        if (loginMode) {

            signupForm.classList.add(
                "hiddenForm"
            );

            loginForm.classList.remove(
                "hiddenForm"
            );

            accountTitle.textContent =
                "Entrar";

            toggleAccountMode.textContent =
                "Ainda não tenho uma conta";

        } else {

            signupForm.classList.remove(
                "hiddenForm"
            );

            loginForm.classList.add(
                "hiddenForm"
            );

            accountTitle.textContent =
                "Criar conta";

            toggleAccountMode.textContent =
                "Já tenho uma conta";

        }

    }
);


/* CADASTRO */

signupForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        if (!supabaseClient) {

            showAccountMessage(
                "Configure o Supabase no script.js para ativar as contas."
            );

            return;

        }


        const name =
            signupName.value.trim();

        const email =
            signupEmail.value.trim();

        const password =
            signupPassword.value;


        showAccountMessage(
            "Criando sua conta..."
        );


        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email: email,

                password: password,

                options: {

                    data: {
                        name: name
                    }

                }

            });


        if (error) {

            showAccountMessage(
                error.message
            );

            return;

        }


        if (data.session) {

            showAccountMessage(
                "Conta criada com sucesso!"
            );

            updateAccountButton(
                data.user
            );


            setTimeout(
                closeAccountModal,
                1000
            );

        } else {

            showAccountMessage(
                "Conta criada! Confira seu e-mail para confirmar."
            );

        }

    }
);


/* LOGIN */

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        if (!supabaseClient) {

            showAccountMessage(
                "Configure o Supabase no script.js para ativar as contas."
            );

            return;

        }


        const email =
            loginEmail.value.trim();

        const password =
            loginPassword.value;


        showAccountMessage(
            "Entrando..."
        );


        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            showAccountMessage(
                "E-mail ou senha inválidos."
            );

            return;

        }


        updateAccountButton(
            data.user
        );


        showAccountMessage(
            "Login realizado!"
        );


        setTimeout(
            closeAccountModal,
            800
        );

    }
);


/* USUÁRIO */

function updateAccountButton(user) {

    if (!user) {

        accountButton.innerHTML =
            "👤 <span>Entrar</span>";

        return;

    }


    const name =
        user.user_metadata &&
        user.user_metadata.name;


    const displayName =
        name ||
        user.email.split("@")[0];


    accountButton.innerHTML = `
        👤
        <span>${displayName}</span>
    `;

}


if (supabaseClient) {

    supabaseClient.auth.onAuthStateChange(
        function(event, session) {

            updateAccountButton(
                session
                    ? session.user
                    : null
            );

        }
    );


    supabaseClient.auth.getUser()
        .then(function(result) {

            updateAccountButton(
                result.data.user
            );

        });

}


/* =========================
   INICIALIZAÇÃO
========================= */

populateCountries();

populateYears();

renderProducts(products);

updateCart();