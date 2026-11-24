// API gratuita e sem chave: https://restcountries.com
const BASE_URL = 'https://restcountries.com/v3.1';
const CAMPOS = 'cca3,name,translations,capital,region,population,flags,currencies,languages';

const cache = new Map();
let ultimaConsulta = 0;
const INTERVALO_MINIMO = 2000;

// Faz a requisição; retorna lista vazia se o país não for encontrado (404)
async function buscar(endpoint, termo) {
  const url = `${BASE_URL}/${endpoint}/${encodeURIComponent(termo)}?fields=${CAMPOS}`;
  const resposta = await fetch(url);

  if (resposta.status === 404) return [];

  if (!resposta.ok) {
    throw new Error('Não foi possível acessar a API.');
  }

  const dados = await resposta.json();

  if (!Array.isArray(dados)) {
    throw new Error('Resposta inválida da API.');
  }

  return dados;
}

export async function consultarPais(nome) {
  const termo = nome.trim();

  if (!termo) {
    throw new Error('Digite o nome de um país.');
  }

  if (termo.length < 2) {
    throw new Error('Digite pelo menos 2 letras.');
  }

  const chave = termo.toLowerCase();

  // Verifica se já existe resultado armazenado
  if (cache.has(chave)) {
    return cache.get(chave);
  }

  // Evita solicitações muito próximas
  const agora = Date.now();
  if (agora - ultimaConsulta < INTERVALO_MINIMO) {
    throw new Error('Aguarde um instante antes de realizar outra consulta.');
  }
  ultimaConsulta = agora;

  try {
    // Primeiro tenta pelo nome traduzido (ex: "Brasil"), depois pelo nome em inglês
    let dados = await buscar('translation', termo);

    if (dados.length === 0) {
      dados = await buscar('name', termo);
    }

    cache.set(chave, dados);
    return dados;
  } catch (erro) {
    throw new Error(erro.message || 'Erro ao consultar o país.');
  }
}

// Converte os dados da API em textos prontos para exibir na tela
export function formatarPais(item) {
  const moedas = item.currencies
    ? Object.values(item.currencies)
        .map((m) => `${m.name}${m.symbol ? ` (${m.symbol})` : ''}`)
        .join(', ')
    : 'Não informada';

  const idiomas = item.languages
    ? Object.values(item.languages).join(', ')
    : 'Não informado';

  return {
    nome: item.translations?.por?.common || item.name?.common || 'Sem nome',
    nomeOficial: item.translations?.por?.official || item.name?.official || '',
    capital: item.capital && item.capital.length > 0 ? item.capital.join(', ') : 'Não informada',
    regiao: item.region || 'Não informada',
    populacao:
      typeof item.population === 'number'
        ? item.population.toLocaleString('pt-BR')
        : 'Não informada',
    moeda: moedas,
    idiomas: idiomas,
    bandeira: item.flags?.png,
  };
}
