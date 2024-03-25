document.addEventListener("DOMContentLoaded", function () {
    var inputField = document.getElementById('keyword');
    inputField.addEventListener('input', function () {
        var keyword = inputField.value;
        search(keyword);
    });
});

function search(keyword) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'search.php?keyword=' + keyword, true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            displayResults(xhr.responseText);
        }
    };
    xhr.send();
}

function displayResults(results) {
    var infoDiv = document.getElementById('info');
    infoDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (results === "") {
        infoDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    } else {
        // Converter a string JSON em um objeto JavaScript
        var data = JSON.parse(results);

        // Iterar sobre os resultados e criar elementos HTML para cada um
        data.forEach(function (item) {
            var div = document.createElement('div');
            div.classList.add('custom-block', 'bg-white', 'shadow-lg');
            
            var innerHTML = "<a>" +
                                "<div class='d-flex'>" +
                                    "<div>" +
                                        "<h5 class='mb-2'>Informações</h5>" +
                                        "<p class='mb-0'>Nome: " + item.nome + "</p>" +
                                        "<p class='mb-0'>Nome do usuário: " + item.nome_usuario + "</p>" +
                                        "<p class='mb-0'>IP: " + item.ip + "</p>" +
                                        "<p class='mb-0'>MAC Address: " + item.mac_address + "</p>" +
                                    "</div>" +
                                "</div>" +
                            "</a>";

            div.innerHTML = innerHTML;
            infoDiv.appendChild(div);
        });
    }
}