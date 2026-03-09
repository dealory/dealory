const supabase = window.supabase.createClient(
"https://xbaxcymfcqjmhqargjrh.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiYXhjeW1mY3FqbWhxYXJnanJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTc4MDEsImV4cCI6MjA4NzY5MzgwMX0.-4TMZcXwLIuiDqRPma6eVvenF6g5KV89jHrWOmnjX54"
);

async function loadProducts(){

const { data: products } = await supabase
.from("products")
.select("*");

const { data: prices } = await supabase
.from("product_prices")
.select("*");

const container=document.getElementById("products");

container.innerHTML="";

products.forEach(p=>{

const productPrices=prices.filter(x=>x.product_id===p.id);

if(productPrices.length===0) return;

productPrices.sort((a,b)=>a.price-b.price);

const best=productPrices[0];

container.innerHTML+=`

<div class="card">

<img src="${p.image_url}">

<h3>${p.name}</h3>

<div class="price">$${best.price}</div>

<p>${best.store}</p>

<button onclick="window.open('${p.affiliate_url || "#"}')">
View Deal
</button>

</div>

`;

});

}

loadProducts();
