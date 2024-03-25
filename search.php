<?php
// Configurações do banco de dados
$servername = "localhost";
$username = "root";
$password = "xt32s@";
$database = "desktopsearch";
$port = 3306;

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica se o parâmetro 'keyword' foi passado via GET
if (isset($_GET['keyword'])) {
    // Limpa e prepara a string de pesquisa
    $keyword = $conn->real_escape_string($_GET['keyword']);

    // Consulta ao banco de dados
    $sql = "SELECT * FROM desktop_info WHERE nome LIKE '%$keyword%' OR nome_usuario LIKE '%$keyword%' OR ip LIKE '%$keyword%' OR mac_address LIKE '%$keyword%'";
    $result = $conn->query($sql);

    $results_array = array();

    if ($result->num_rows > 0) {
        // Adiciona os resultados a um array
        while ($row = $result->fetch_assoc()) {
            $results_array[] = $row;
        }
    }

    // Retorna os resultados em formato JSON
    echo json_encode($results_array);
} else {
    // Se o parâmetro 'keyword' não foi passado, retorna uma mensagem de erro
    echo json_encode(array("error" => "Nenhum parâmetro 'keyword' fornecido."));
}

$conn->close();
?>
