require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect.assertions(1);
    const expected = 'function';
    const result = typeof(fetchProducts);
    expect(result).toBe(expected);
  })
  it('Verifica se fetch é chamada', () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  it('Verifica usa o endpoint computador', () => {
    expect.assertions(1);
    const link = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(link);
  })
  it('Verifica se se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const func = await fetchProducts('computador');
    expect(func).toMatchObject(computadorSearch);
  })
  it('Verifica se não passar sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const func = await fetchProducts();
    expect(func).toEqual(new Error('You must provide an url'));
  })
});
