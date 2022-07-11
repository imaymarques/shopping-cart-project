const fetchProducts = async (product) => {
  if (!product) return new Error('You must provide an url');
  const link = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await link.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
