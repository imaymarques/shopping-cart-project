const fetchItem = async (product) => {
  if (!product) return new Error('You must provide an url');
  const link = await fetch(`https://api.mercadolibre.com/items/${product}`);
  const data = await link.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
