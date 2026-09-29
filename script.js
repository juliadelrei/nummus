/* =========================================================
   NUMMUS — JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CATÁLOGO
       ===================================================== */

    const products = [
        {
            id: 1,
            country: "Brasil",
            year: 1994,
            name: "1 Real — Plano Real",
            value: 1,
            rarity: "Comum",
            symbol: "R$"
        },
        {
            id: 2,
            country: "Brasil",
            year: 2000,
            name: "1 Real — Centenário",
            value: 1,
            rarity: "Comemorativa",
            symbol: "R$"
        },
        {
            id: 3,
            country: "Estados Unidos",
            year: 1964,
            name: "Quarter Dollar",
            value: 0.25,
            rarity: "Histórica",
            symbol: "$"
        },
        {
            id: 4,
            country: "Reino Unido",
            year: 1971,
            name: "50 Pence",
            value: 0.50,
            rarity: "Colecionável",
            symbol: "£"
        },
        {
            id: 5,
            country: "França",
            year: 1960,
            name: "10 Francs",
            value: 10,
            rarity: "Histórica",
            symbol: "F"
        },
        {
            id: 6,
            country: "Itália",
            year: 1980,
            name: "100 Lire",
            value: 100,
            rarity: "Colecionável",
            symbol: "₤"
        },
        {
            id: 7,
            country: "Portugal",
            year: 2001,
            name: "1 Escudo",
            value: 1,
            rarity: "Histórica",
            symbol: "Esc"
        },
        {
            id: 8,
            country: "Alemanha",
            year: 1972,
            name: "5 Mark",
            value: 5,
            rarity: "Rara",
            symbol: "DM"
        },
        {
            id: 9,
            country: "Espanha",
            year: 1982,
            name: "25 Pesetas",
            value: 25,
            rarity: "Comemorativa",
            symbol: "₧"
        },
        {
            id: 10,
            country: "Japão",
            year: 1967,
            name: "100 Yen",
            value: 100,
            rarity: "Histórica",
            symbol: "¥"
        },
        {
            id: 11,
            country: "México",
            year: 1992,
            name: "10 Pesos",
            value: 10,
            rarity: "Colecionável",
            symbol: "$"
        },
        {
            id: 12,
            country: "Argentina",
            year: 1978,
            name: "1 Peso",
            value: 1,
            rarity: "Histórica",
            symbol: "$"
        }
    ];


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const productsContainer =
        document.getElementById("products");

    const countrySelect =
        document.getElementById("countrySelect");

    const yearSelect =
        document.getElementById("yearSelect");

    const searchInput =
        document.getElementById("search");

    const resultInfo =
        document.getElementById("resultInfo");


    /* =====================================================
       FUNÇÕES AUXILIARES
       ===================================================== */

    function escapeHTML(text) {
        return String(text)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    function getPrice(product) {

        let price = 25 + (product.id * 7.5);

        if (product.rarity === "Rara") {
            price += 65;
        }

        return price;
    }


    function formatPrice(value) {

        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    /* =====================================================
       CATÁLOGO
       ===================================================== */

    function renderProducts(list) {

        if (!productsContainer) {
            return;
        }

        if (list.length === 0) {

            productsContainer.innerHTML = `
                <div class="noResults">

                    <h3>Nenhuma moeda encontrada</h3>

                    <p>
                        Tente outro país, ano ou termo de pesquisa.
                    </p>

                </div>
            `;

            if (resultInfo) {
                resultInfo.textContent = "0 peças";
            }

            return;
        }


        productsContainer.innerHTML = list.map(product => {

            return `
                <article class="productCard">

                    <div class="productImage">

                        <div class="fallbackCoin">

                            <div class="fallbackCoinInner">

                                <span>
                                    ${escapeHTML(product.country)}
                                </span>

                                <strong>
                                    ${escapeHTML(product.symbol)}
                                </strong>

                                <small>
                                    ${product.year}
                                </small>

                            </div>

                        </div>

                        <span class="rarityTag">
                            ${escapeHTML(product.rarity)}
                        </span>

                    </div>


                    <div class="productInfo">

                        <span class="productCountry">
                            ${escapeHTML(product.country)}
                        </span>

                        <h3>
                            ${escapeHTML(product.name)}
                        </h3>


                        <div class="productDetails">

                            <span>
                                Ano ${product.year}
                            </span>

                            <span>
                                ${escapeHTML(product.rarity)}
                            </span>

                        </div>


                        <div class="productBottom">

                            <div class="priceArea">

                                <span>
                                    VALOR NO CATÁLOGO
                                </span>

                                <strong>
                                    ${formatPrice(getPrice(product))}
                                </strong>

                            </div>


                            <button
                                type="button"
                                class="addCartButton"
                                data-product-id="${product.id}"
                            >
                                ADICIONAR
                            </button>

                        </div>

                    </div>

                </article>
            `;

        }).join("");


        if (resultInfo) {

            resultInfo.textContent =
                `${list.length} ${
                    list.length === 1 ? "peça" : "peças"
                }`;

        }


        document
            .querySelectorAll(".addCartButton")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const id =
                        Number(button.dataset.productId);

                    const product =
                        products.find(item => item.id === id);

                    if (product) {
                        addToCart(product);
                    }

                });

            });

    }


    /* =====================================================
       FILTROS
       ===================================================== */

    function populateFilters() {

        if (countrySelect) {

            const countries = [
                ...new Set(
                    products.map(product => product.country)
                )
            ].sort();

            countrySelect.innerHTML =
                `<option value="Todos">
                    Todos os países
                </option>` +

                countries.map(country => {

                    return `
                        <option value="${escapeHTML(country)}">
                            ${escapeHTML(country)}
                        </option>
                    `;

                }).join("");

        }


        if (yearSelect) {

            const years = [
                ...new Set(
                    products.map(product => product.year)
                )
            ].sort((a, b) => b - a);


            yearSelect.innerHTML =
                `<option value="Todos">
                    Todos os anos
                </option>` +

                years.map(year => {

                    return `
                        <option value="${year}">
                            ${year}
                        </option>
                    `;

                }).join("");

        }

    }


    function applyFilters() {

        const country =
            countrySelect
                ? countrySelect.value
                : "Todos";


        const year =
            yearSelect
                ? yearSelect.value
                : "Todos";


        const search =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const filtered =
            products.filter(product => {

                const countryOK =
                    country === "Todos" ||
                    product.country === country;


                const yearOK =
                    year === "Todos" ||
                    String(product.year) === year;


                const text = [

                    product.country,
                    product.name,
                    product.year,
                    product.rarity

                ].join(" ").toLowerCase();


                const searchOK =
                    !search ||
                    text.includes(search);


                return (
                    countryOK &&
                    yearOK &&
                    searchOK
                );

            });


        renderProducts(filtered);

    }


    if (countrySelect) {

        countrySelect.addEventListener(
            "change",
            applyFilters
        );

    }


    if (yearSelect) {

        yearSelect.addEventListener(
            "change",
            applyFilters
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    populateFilters();

    renderProducts(products);


    /* =====================================================
       CARRINHO
       ===================================================== */

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartPanel =
        document.getElementById("cartPanel");

    const cartButton =
        document.getElementById("cartButton");

    const closeCart =
        document.getElementById("closeCart");

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    const finishButton =
        document.getElementById("finishButton");


    let cart =
        JSON.parse(
            localStorage.getItem("nummus_cart") || "[]"
        );


    function saveCart() {

        localStorage.setItem(
            "nummus_cart",
            JSON.stringify(cart)
        );

    }


    function addToCart(product) {

        const existing =
            cart.find(item => item.id === product.id);


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                id: product.id,
                quantity: 1
            });

        }


        saveCart();

        renderCart();

        openCart();

    }


    function changeQuantity(id, amount) {

        const item =
            cart.find(item => item.id === id);


        if (!item) {
            return;
        }


        item.quantity += amount;


        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    cartItem => cartItem.id !== id
                );

        }


        saveCart();

        renderCart();

    }


    function removeFromCart(id) {

        cart =
            cart.filter(
                item => item.id !== id
            );


        saveCart();

        renderCart();

    }


    function renderCart() {

        if (!cartItems) {
            return;
        }


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

        } else {

            cartItems.innerHTML =

                cart.map(item => {

                    const product =
                        products.find(
                            p => p.id === item.id
                        );


                    if (!product) {
                        return "";
                    }


                    const subtotal =
                        getPrice(product) *
                        item.quantity;


                    return `

                        <div class="cartItem">

                            <div class="cartImageBox">

                                ${escapeHTML(
                                    product.symbol
                                )}

                            </div>


                            <div class="cartItemInfo">

                                <strong>
                                    ${escapeHTML(
                                        product.name
                                    )}
                                </strong>

                                <small>
                                    ${escapeHTML(
                                        product.country
                                    )}
                                    ·
                                    ${product.year}
                                </small>

                                <b>
                                    ${formatPrice(
                                        subtotal
                                    )}
                                </b>


                                <div
                                    class="quantityControls"
                                >

                                    <button
                                        type="button"
                                        class="quantityButton"
                                        data-action="minus"
                                        data-id="${product.id}"
                                    >
                                        −
                                    </button>


                                    <span>
                                        ${item.quantity}
                                    </span>


                                    <button
                                        type="button"
                                        class="quantityButton"
                                        data-action="plus"
                                        data-id="${product.id}"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            <button
                                type="button"
                                class="removeButton"
                                data-remove-id="${product.id}"
                            >
                                ×
                            </button>

                        </div>

                    `;

                }).join("");

        }


        const totalItems =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );


        const total =
            cart.reduce(
                (sum, item) => {

                    const product =
                        products.find(
                            p => p.id === item.id
                        );


                    if (!product) {
                        return sum;
                    }


                    return sum +
                        getPrice(product) *
                        item.quantity;

                },
                0
            );


        if (cartCount) {

            cartCount.textContent =
                totalItems;

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(total);

        }


        document
            .querySelectorAll(".quantityButton")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                button.dataset.id
                            );


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
            .querySelectorAll("[data-remove-id]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        removeFromCart(
                            Number(
                                button.dataset.removeId
                            )
                        );

                    }
                );

            });

    }


    function openCart() {

        if (cartOverlay) {
            cartOverlay.classList.add("active");
        }


        if (cartPanel) {
            cartPanel.classList.add("active");
        }


        document.body.classList.add("cartOpen");

    }


    function closeCartPanel() {

        if (cartOverlay) {
            cartOverlay.classList.remove("active");
        }


        if (cartPanel) {
            cartPanel.classList.remove("active");
        }


        document.body.classList.remove("cartOpen");

    }


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            closeCartPanel
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCartPanel
        );

    }


    if (finishButton) {

        finishButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    alert(
                        "Seu carrinho está vazio."
                    );

                    return;

                }


                alert(
                    "Pedido preparado! Entre em contato pelo formulário para finalizar a compra."
                );

            }
        );

    }


    renderCart();


    /* =====================================================
       CONTA / LOGIN
       ===================================================== */

    const accountButton =
        document.getElementById("accountButton");

    const accountOverlay =
        document.getElementById("accountOverlay");

    const accountModal =
        document.getElementById("accountModal");

    const closeAccount =
        document.getElementById("closeAccount");

    const signupForm =
        document.getElementById("signupForm");

    const loginForm =
        document.getElementById("loginForm");

    const toggleAccountMode =
        document.getElementById("toggleAccountMode");

    const accountTitle =
        document.getElementById("accountTitle");

    const accountMessage =
        document.getElementById("accountMessage");


    let accountMode = "signup";


    function openAccount() {

        if (accountOverlay) {
            accountOverlay.classList.add("active");
        }


        if (accountModal) {
            accountModal.classList.add("active");
        }


        document.body.classList.add("cartOpen");

    }


    function closeAccountModal() {

        if (accountOverlay) {
            accountOverlay.classList.remove("active");
        }


        if (accountModal) {
            accountModal.classList.remove("active");
        }


        document.body.classList.remove("cartOpen");

    }


    function updateAccountMode() {

        const login =
            accountMode === "login";


        if (signupForm) {

            signupForm.classList.toggle(
                "hiddenForm",
                login
            );

        }


        if (loginForm) {

            loginForm.classList.toggle(
                "hiddenForm",
                !login
            );

        }


        if (accountTitle) {

            accountTitle.textContent =
                login
                    ? "Entrar"
                    : "Criar conta";

        }


        if (toggleAccountMode) {

            toggleAccountMode.textContent =
                login
                    ? "Ainda não tenho uma conta"
                    : "Já tenho uma conta";

        }


        if (accountMessage) {

            accountMessage.textContent = "";

        }

    }


    if (accountButton) {

        accountButton.addEventListener(
            "click",
            openAccount
        );

    }


    if (closeAccount) {

        closeAccount.addEventListener(
            "click",
            closeAccountModal
        );

    }


    if (accountOverlay) {

        accountOverlay.addEventListener(
            "click",
            closeAccountModal
        );

    }


    if (toggleAccountMode) {

        toggleAccountMode.addEventListener(
            "click",
            () => {

                accountMode =
                    accountMode === "signup"
                        ? "login"
                        : "signup";


                updateAccountMode();

            }
        );

    }


    /* =====================================================
       CADASTRO
       ===================================================== */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("signupName")
                        ?.value
                        .trim();


                const email =
                    document
                        .getElementById("signupEmail")
                        ?.value
                        .trim();


                const password =
                    document
                        .getElementById("signupPassword")
                        ?.value;


                if (password.length < 6) {

                    if (accountMessage) {

                        accountMessage.textContent =
                            "A senha precisa ter pelo menos 6 caracteres.";

                    }

                    return;

                }


                localStorage.setItem(
                    "nummus_account",
                    JSON.stringify({
                        name,
                        email,
                        password
                    })
                );


                if (accountMessage) {

                    accountMessage.textContent =
                        "Conta criada com sucesso!";

                }


                signupForm.reset();

            }
        );

    }


    /* =====================================================
       LOGIN
       ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    document
                        .getElementById("loginEmail")
                        ?.value
                        .trim();


                const password =
                    document
                        .getElementById("loginPassword")
                        ?.value;


                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            "nummus_account"
                        ) || "null"
                    );


                if (!saved) {

                    if (accountMessage) {

                        accountMessage.textContent =
                            "Nenhuma conta cadastrada neste navegador.";

                    }

                    return;

                }


                if (
                    saved.email === email &&
                    saved.password === password
                ) {

                    if (accountMessage) {

                        accountMessage.textContent =
                            `Olá, ${saved.name}! Login realizado.`;

                    }

                } else {

                    if (accountMessage) {

                        accountMessage.textContent =
                            "E-mail ou senha incorretos.";

                    }

                }

            }
        );

    }


    updateAccountMode();


    /* =====================================================
       NAVEGAÇÃO SUAVE
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       ESC FECHA MODAIS
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeCartPanel();

                closeAccountModal();

            }

        }
    );

});