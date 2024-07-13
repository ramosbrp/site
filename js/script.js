document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const navigateTo = (url) => {
        console.log("Navigating to:", url);  // Adicionado console.log
        history.pushState(null, null, url);
        router();
    };

    const router = async () => {
        console.log("Router function called");

        const routes = [
            { path: "/", view: () => "pages/home.html" },
            { path: "/sobre", view: () => "pages/sobre.html" },
            { path: "/projetos", view: () => "pages/projetos.html" },
            { path: "/contato", view: () => "pages/contato.html" },
            { path: "/blog", view: () => "blog/" }
        ];

        // Verifica a rota atual
        const potentialMatches = routes.map(route => {
            return {
                route: route,
                isMatch: location.pathname === route.path
            };
        });

        console.log("Potential matches:", potentialMatches);

        // Verifica se há uma correspondência exata
        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

        // Se não houver correspondência exata, define a rota padrão
        if (!match) {
            match = {
                route: routes[0],
                isMatch: true
            };
        }

        console.log("Match found:", match);

        // Carrega a visualização correspondente
        try {
            const html = await fetch(match.route.view()).then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.text();
            });
            document.getElementById("app").innerHTML = html;
            console.log("Loaded view:", match.route.view());
        } catch (error) {
            console.error("Error loading view:", error);
            document.getElementById("app").innerHTML = "<h1>404</h1><p>Página não encontrada</p>";
        }
    };

    window.addEventListener("popstate", router);

    // document.body.addEventListener("click", e => {
    //     console.log("Click detected on body");

    //     if (e.target.matches(".link")) {
    //         console.log("Element matches [data-link]");
    //         e.preventDefault();
    //         const url = e.target.getAttribute("data-link");
    //         console.log("Link clicked:", url);  // Adicionado console.log
    //         navigateTo(url);
    //     } else {
    //         console.log("Element does not match [data-link]");
    //     }
    // });

    document.querySelectorAll(".link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            console.log("Click detected on link");
            // Guardar a rota em algum atributo
            // Basta somente conseguir pegar um attributo
            const url = e.target.getAttribute("class");
            console.log("Link clicked:", url);
            navigateTo();
        });
    });

    router();
});
