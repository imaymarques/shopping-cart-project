const fetchProducts = async (product) => {
  if (!product) return new Error('mensagem esperada aqui');
  const link = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await link.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
