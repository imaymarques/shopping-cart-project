require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('Verifica se a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada;', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toMatchObject(item);
  })
  it('Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro ', async () => {
    const func = await fetchItem();
    expect(func).toEqual(new Error('You must provide an url'));
  })
  it('Verifica se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    const link = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(link);
  })
});
