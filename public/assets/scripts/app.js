const dados = [
    {
      "id": 1,
      "titulo": "Filé ao molho gorgonzola",
      "descricao": "O filé mignon é temperado apenas com sal e pimenta. Em seguida, é frito na manteiga, com azeite, alecrim e alho. Fique de olho no ponto para manter a suculência da carne. O gorgonzola traz uma textura cremosa, com sabor suave, levemente doce, porém com um toque picante intenso.",
      "categoria": "Carnes",
      "data": " 02/03/25",
      "ingredientes": [
        "500g de filé mignon",
        "1/2 de pimenta do reino (ou a gosto)",
        "1 colher de sopa de manteiga",
        "1 fio de azeite",
        "1 ramo de alecrim",
        "1 dente de alho amascado ou picado",
        "200g de queijo gorgonzola",
        "300g de creme de leite fresco",
        "1 colher de chá de sal (ou a gosto)",
      ],
      "imagem": "./file.jpg"
    },
    {
      "id": 2,
      "titulo": "Caldo de mandioca",
      "descricao": "Que tal fazer um caldo de mandioca para o jantar? Ao contrário do que dizem por aí, sopas e caldos são janta, sim! Muito populares nos dias mais frios, os caldos podem ser tão satisfatórios quanto qualquer outro alimento.",
      "categoria": "Sopas",
      "data": "05/03/25",
      "ingredientes": [
        "2 kg de mandioca amarela",
        "1 cebola grande bem picada",
        "3 dentes de bem alho picados",
        "3 caldos de costela",
        "3 tomates sem sementes picados",
        "2 pedaços grandes de bacon picado",
        "2 calabresas grande picadas em cubinhos",
        "Cebolinha a gosto",
      ],
      "imagem": "./mandioca.jpg"
    },
    {
      "id": 3,
      "titulo": "Lasanha",
      "descricao": "A receita de lasanha de carne moída é um prato clássico, muito amado e muito fácil de preparar. Também conhecida como lasanha à bolonhesa, pela sua origem em Bolonha, na Itália, essa receita conquistou o mundo!",
      "categoria": "Massas",
      "data": "01/03/2025",
      "ingredientes": [
        "500g de massa para lasanha",
        "500g de carne moída",
        "500g de presunto",
        "2 copos de leite",
        "3 colheres de sopa de farinha de trigo",
        "3 colheres de sopa de manteiga",
        "3 colheres de sopa de oléo",
        "2 caixas de creme de leite",
        "1 cebola ralada",
        "3 dentes de alho picados",
        "1 caixa de molho de tomate",
        "500g de queijo muçarela fatiado",
        "1 pacote de queijo parmesão ralado",
        "Sal e pimenta a gosto",
      ],
      "imagem": "./lasanha.jpg"
    },
    {
        "id": 4,
        "titulo": "Bolo de cenoura",
        "descricao": "O bolo de cenoura é um doce muito popular em nosso país, especialmente no café da manhã e no lanche da tarde. Com sua cobertura de chocolate irresistível e seu interior macio e úmido, ela é uma receita que conquista o coração de todos!",
        "categoria": "Doces",
        "data": "07/03/25",
        "ingredientes": [
          "3 cenouras médias raladas", 
          "4 ovos", 
          "1/2 de chá xícara de óleo", 
          "3 de chá xícaras de açúcar",
          "2 e 1/2 de chá xícaras de farinha de trigo", 
          "1 colher de sopa de manteiga", 
          "1 colher de sopa de fermento em pó", 
          "3 colheres de sopa de chocolate em pó", 
          "1 de chá xícara de leite", 
        ],
        "imagem": "./cenoura.jpg"
      },
    
  ]
  card.innerHTML = `
  <div class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
      <button class="btn btn-danger mt-auto" onclick='abrirModal(${JSON.stringify(meal)})'>Ver Receita</button>
    </div>
  </div>
`;
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel-dinamico");

  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
    .then(response => response.json())
    .then(data => {
      const meals = data.meals.slice(0, 4);

      meals.forEach((meal, index) => {
        const isActive = index === 0 ? "active" : "";
        const itemHTML = `
          <div class="carousel-item ${isActive}">
            <img src="${meal.strMealThumb}" class="d-block w-100 rounded" alt="${meal.strMeal}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${meal.strMeal}</h5>
              <button class="btn btn-danger" onclick="mostrarReceita('${meal.idMeal}')">Ver Receita</button>
            </div>
          </div>
        `;
        carousel.insertAdjacentHTML('beforeend', itemHTML);
      });
    })
    .catch(error => console.error("Erro ao carregar receitas:", error));
});

function mostrarReceita(idMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      document.getElementById("modalTitulo").textContent = meal.strMeal;
      document.getElementById("modalImagem").src = meal.strMealThumb;
      document.getElementById("modalInstrucoes").textContent = meal.strInstructions;

      const modal = new bootstrap.Modal(document.getElementById("modalReceita"));
      modal.show();
    })
    .catch(error => console.error("Erro ao buscar detalhes:", error));
}