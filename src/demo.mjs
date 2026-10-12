// Independently authored in-memory demo. Prices are integer PHP centavos.
export function initialState() {
  return {products:[{id:1,name:'House coffee',price:12000,stock:12},{id:2,name:'Butter croissant',price:9500,stock:8},{id:3,name:'Iced tea',price:8500,stock:15}],sales:[]};
}
export function parsePrice(value) {
  if(typeof value!=='string' || !/^\d{1,6}(\.\d{1,2})?$/.test(value)) throw new Error('Enter a price from ₱0.01 to ₱999,999.99 with at most two decimals.');
  const [whole,fraction='']=value.split('.');
  const minor=Number(whole)*100+Number(fraction.padEnd(2,'0'));
  if(minor<1) throw new Error('Price must be positive.');
  return minor;
}
export function addProduct(state,name,price,stock) {
  if(typeof name!=='string'||!name.trim()||name.trim().length>60) throw new Error('Product name must have 1–60 characters.');
  if(!Number.isSafeInteger(stock)||stock<0||stock>10000) throw new Error('Stock must be an integer from 0 to 10,000.');
  const product={id:Math.max(0,...state.products.map(p=>p.id))+1,name:name.trim(),price:parsePrice(price),stock};
  return {...state,products:[...state.products,product]};
}
export function sell(state,productId,quantity=1) {
  const product=state.products.find(p=>p.id===productId);
  if(!product||!Number.isSafeInteger(quantity)||quantity<1||quantity>product.stock) throw new Error('Sale requires an available product and sufficient stock.');
  const sale={id:state.sales.length+1,productId,name:product.name,quantity,total:product.price*quantity};
  return {products:state.products.map(p=>p.id===productId?{...p,stock:p.stock-quantity}:p),sales:[...state.sales,sale]};
}
export function report(state) {
  return {revenue:state.sales.reduce((n,s)=>n+s.total,0),transactions:state.sales.length,units:state.sales.reduce((n,s)=>n+s.quantity,0),stock:state.products.reduce((n,p)=>n+p.stock,0)};
}
