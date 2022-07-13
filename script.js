const getOl = document.querySelector('.cart__items');

const itens = document.querySelector('.items');

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

const cartItemClickListener = ({ target }) => {
  target.remove();
  saveCartItems(getOl.innerHTML);
};

const removeAfterOnload = () => {
  const getList = getOl.childNodes;
  getList.forEach((el) => el.addEventListener('click', cartItemClickListener));
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const carr = async ({ target }) => {
  const itemsId = await fetchItem(getSkuFromProductItem(target.parentNode));
  const obj = createCartItemElement({
    sku: itemsId.id,
    name: itemsId.title,
    salePrice: itemsId.price,
  });
  getOl.appendChild(obj);
  saveCartItems(getOl.innerHTML);
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', carr);
  section.appendChild(btn);

  return section;
};

const showProduct = async () => {
  const getFetch = await fetchProducts('computador');
  const { results } = await getFetch;
  results.forEach(({ id, title, thumbnail }) => {
    const section = createProductItemElement({ sku: id, name: title, image: thumbnail });
    itens.appendChild(section);
  });
};

const clearCart = () => {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    getOl.innerHTML = '';
  });
};

const textMessage = () => {
  const getSection = document.querySelector('.container');
  const newLi = document.createElement('li');
  newLi.className = 'loading';
  newLi.innerHTML = 'caregando...';
  getSection.appendChild(newLi);
};

textMessage();

const removeTextMessage = () => {
  const getLiClass = document.querySelector('.loading');
  getLiClass.remove();
};

window.onload = async () => { 
  await showProduct();
  carr();
  getOl.innerHTML = getSavedCartItems();
  clearCart();
  removeAfterOnload();
  removeTextMessage();
};
