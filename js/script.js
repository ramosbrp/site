document.addEventListener("DOMContentLoaded", () => {

    const navigateTo = (url) => {
        history.pushState(null, null, url);
        router();
    };

    const router = async () => {

        const routes = [
            { path: "/", view: () => "pages/home.html" },
            { path: "/sobre", view: () => "pages/sobre.html" },
            { path: "/projetos", view: () => "pages/projetos.html" },
            { path: "/contato", view: () => "pages/contato.html" },
            { path: "/blog", view: () => "blog/index.html" }
        ];

        // Verifica a rota atual
        const potentialMatches = routes.map(route => {
            return {
                route: route,
                isMatch: location.pathname === route.path
            };
        });


        // Verifica se há uma correspondência exata
        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

        // Se não houver correspondência exata, define a rota padrão
        if (!match) {
            match = {
                route: routes[0],
                isMatch: true
            };
        }


        // Carrega a visualização correspondente
        try {
            const html = await fetch(match.route.view()).then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.text();
            });
            console.log(html);
            document.getElementById("app").innerHTML = html;
        } catch (error) {
            console.error("Error loading view:", error);
            document.getElementById("app").innerHTML = "<h1>404</h1><p>Página não encontrada</p>";
        }
    };


    const links = document.querySelectorAll('a[data-link]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('data-link');
            removeClasse(url)
            navigateTo(url)
        });
    });

    const removeClasse = (url) => {
        console.log(url)
        if (url !== "/") {
            const firstLink = document.querySelector('#footer .footer-container-list:nth-child(1) a');
            if (firstLink) {
                firstLink.style.filter = 'contrast(30%)';
                firstLink.style.fontWeight = '300';
            }
        } else {
            const firstLink = document.querySelector('#footer .footer-container-list:nth-child(1) a');
            if (firstLink) {
                firstLink.style.filter = 'none';
                firstLink.style.fontWeight = 'bold';
            }
        }
    }
    console.log(window.location.pathname)
    removeClasse(window.location.pathname);
    router();
});
