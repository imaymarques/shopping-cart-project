const { fetchItem } = require('./helpers/fetchItem');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const cart = async (event) => {
  const itemCar = document.querySelector('.cart__items');
  const productId = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  
  const card = createCartItemElement({
    sku: productId.id, 
    name: productId.title, 
    salePrice: productId.price,
  });
  itemCar.appendChild(card);
  };

  const createProductItemElement = ({ sku, name, image }) => {
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    const btn = createCustomElement('btn', 'item__add', 'Adicionar ao carrinho!');
    btn.addEventListener('click', cart);
    section.appendChild(btn);
  
    return section;
  };

const listItemProducts = async () => {
  const list = await fetchProducts('computador');
  const items = document.querySelector('.items');
  list.results.forEach(({ id, title, thumbnail }) => {
  const section = createProductItemElement({ sku: id, name: title, image: thumbnail });
  items.appendChild(section);
  });
};

window.onload = async () => {
  await listItemProducts();
  await cart();
 };
