/*
 * Verificador de Similaridade de Texto
 */

/* ENUNCIADO DO PROBLEMA
 * Escreva uma função que recebe um texto e uma entrada, e retorna a parte do texto que tem a maior similaridade com a entrada.
 * A função deve calcular a similaridade como a porcentagem de caracteres correspondentes na posição mais semelhante do texto,
 * ajustada pela diferença de comprimento entre a entrada e a parte do texto.
 *
 * A função deve retornar a entrada, o trecho do texto com maior similaridade encontrado e a porcentagem de similaridade.
 *
 * Exemplos:
 * Texto: "Ana e Joana estudam juntas"
 * Entrada: "Joana"
 * Saída: Deve retornar 100%, porque "Joana" está exatamente no texto.
 *
 * Texto: "Ana e Joana estudam juntas"
 * Entrada: "Joaninha"
 * Saída: Deve retornar aproximadamente 67%, porque "Joaninha" é 67% similar a "Joana", que é o trecho mais parecido encontrado no texto.
 *
 * ABAIXO ESTÁ UMA PARTE DA SOLUÇÃO QUE APENAS COMPARA DOIS TEXTOS.
 * Sua tarefa é refatorar este código e desenvolver a funcionalidade completa para identificar e retornar a parte do texto
 * com maior similaridade à entrada fornecida.
 */

/*
 * Verificador de Similaridade de Texto
 */

/* ENUNCIADO DO PROBLEMA
 * Escreva uma função que recebe um texto e uma entrada, e retorna a parte do texto que tem a maior similaridade com a entrada.
 * A função deve calcular a similaridade como a porcentagem de caracteres correspondentes na posição mais semelhante do texto,
 * ajustada pela diferença de comprimento entre a entrada e a parte do texto.
 *
 * A função deve retornar a entrada, o trecho do texto com maior similaridade encontrado e a porcentagem de similaridade.
 *
 * Exemplos:
 * Texto: "Ana e Joana estudam juntas"
 * Entrada: "Joana"
 * Saída: Deve retornar 100%, porque "Joana" está exatamente no texto.
 *
 * Texto: "Ana e Joana estudam juntas"
 * Entrada: "Joaninha"
 * Saída: Deve retornar aproximadamente 67%, porque "Joaninha" é 67% similar a "Joana", que é o trecho mais parecido encontrado no texto.
 *
 * ABAIXO ESTÁ UMA PARTE DA SOLUÇÃO QUE APENAS COMPARA DOIS TEXTOS.
 * Sua tarefa é refatorar este código e desenvolver a funcionalidade completa para identificar e retornar a parte do texto
 * com maior similaridade à entrada fornecida.
 */

// Ao invés de pegar os indicies como tinhamos planejados antes, eu criei um objeto hash map para conter apenas o texto e a contagem, assim fica mais fácil, pois não precisamos exibir a contagem
const generateAllSimilarCharacters = (similarities, word, entrada) => {
  let wordPointer = 0;
  let entradaPointer = 0;
  let foundWord = ''
  let countSimilarity = 0;
  if(word.length > entrada.length){

    while (wordPointer < word.length) {
      if (entrada[entradaPointer] === word[wordPointer]) {
        foundWord += word[wordPointer]
        wordPointer++;
        entradaPointer++;
        countSimilarity++;
      } else {
        if(entradaPointer > 0){
          break
        }
        wordPointer++;
      }
    }
    similarities[word] = {countSimilarity, word: foundWord}
    return
  }else{
    while(entradaPointer < entrada.length){
      if (entrada[entradaPointer] === word[wordPointer]  ) {
        foundWord+=  entrada[entradaPointer]
        wordPointer++;
        entradaPointer++;
        countSimilarity++;
      } else {
        entradaPointer++;
 
      }
    }
    similarities[word] = {countSimilarity, word: foundWord }
  }

};

//Apenas gera um array com todas similaridades para compará-los
const generateArrayWithAllSimilarities = (textoArray, words) => {
  let aux = "";
  for (let i = 0; i < textoArray.length; i++) {
    if (textoArray[i] !== " ") {
      aux += textoArray[i];
    } else {
      words.push(aux);
      aux = "";
    }
  }

  if (aux !== "") {
    words.push(aux);
  }
};


//Retorna apenas a maior similaridade(Object)
const getBiggestSimilarity = (similarities) => {
  const sortedByAsc = Object.values(similarities).sort((x, y) => y.countSimilarity - x.countSimilarity);
  return sortedByAsc[0]
  
};


//Retorrna a palavra mais similar
const findTheMostSimilarCharacter = (biggestValue, similarities) => {
  let biggerSimilarity = null;
  for (let key in similarities) {
    if (similarities[key].countSimilarity === biggestValue) {
      biggerSimilarity = key;
      break;
    }
  }
  return biggerSimilarity;
};

const calculateSimilarity = (similarCount, total) => {
  return ((similarCount / total) * 100).toFixed(2)
}

const showResult = (word, entrada, texto, result) => {
  console.log(
    "Similaridade Texto:",
    word,
    "Entrada:",
    entrada,
    "Texto:",
    texto,
    "Similaridade:", result + '%'
  );
}

const checkIfFoundWordEqualsEntrada = (found, entrada) => {
  if(found === entrada){
    return true
  }
  return false
}

const verificarSimilaridade = (texto, entrada) => {
  const textoArray = texto.split("");
  const similarities = {};
  const words = [];


  generateArrayWithAllSimilarities(textoArray, words);

  for (let word of words) {
    generateAllSimilarCharacters(
      similarities,
      word.toLowerCase(),
      entrada.toLowerCase()
    );
  }

  //verificando maior similaridade
  const biggestWordObject = getBiggestSimilarity(similarities, similarities);
  //Obtendo a similaridade
  biggerSimilarity = findTheMostSimilarCharacter(biggestWordObject.countSimilarity, similarities);

  // a propria entrada já é igual a semelhança encontrada
  if(checkIfFoundWordEqualsEntrada(biggestWordObject.word, entrada)){
   const result =  calculateSimilarity(entrada.length, biggestWordObject.word.length)
   showResult(biggestWordObject.word, entrada, texto, result);
   return
  }

  //aqui gera semelhanças
  totalSize = biggerSimilarity.length
  if(entrada.length > biggerSimilarity.length){
    totalSize = entrada.length
  }

  const result = calculateSimilarity(biggestWordObject.countSimilarity, totalSize)
  showResult(biggestWordObject.word, entrada, texto, result);
};



const testCases = [
  { texto: 'Ana e Joaninha estudam juntas', entrada: 'Joana'  },
  { texto: 'joana', entrada: 'ana'  },
  { texto: 'ana', entrada: 'joana'  },
  { texto: 'matheus', entrada: 'mathias'  },
  { texto: 'mathias', entrada: 'matheus'  },
  { texto: 'Ana e Joana estudam juntas', entrada: 'Ana'  },
  { texto: 'Ana e Joana estudam juntas', entrada: 'Joana'  },
  { texto: 'Patrocolos', entrada: 'Joana'  },
  { texto: 'Patrocolos', entrada: 'Patrock'  },
  {texto: 'David', entrada: 'davi'},
  {texto: 'André', entrada: 'Andrey'},
  {texto: 'Andrei', entrada: 'Andrey'},
  {texto : 'Ana e Joana estudam juntas', entrada:'estuda'},
  {texto : 'eandars', entrada:'andar'}
]

testCases.forEach(test => {
  verificarSimilaridade(test.texto, test.entrada)
})