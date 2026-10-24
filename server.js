const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, "data.json");
app.use(express.json({limit:"2mb"}));
app.use(express.static(path.join(__dirname, "public")));

const starterProducts = [
 {id:1,name:"The Meridian Wool Coat",category:"Outerwear",price:24900,oldPrice:29900,description:"A tailored wool-blend coat with a clean, architectural silhouette.",sizes:["S","M","L","XL"],colors:["Black","Camel"],stock:12,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=85"},
 {id:2,name:"Noir Tailored Blazer",category:"Menswear",price:18900,oldPrice:null,description:"A modern single-breasted blazer made for elevated everyday dressing.",sizes:["S","M","L","XL"],colors:["Black","Charcoal"],stock:9,badge:"NEW",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85"},
 {id:3,name:"Silk Drape Evening Dress",category:"Womenswear",price:21500,oldPrice:null,description:"Fluid draping and a refined finish for evenings that call for something special.",sizes:["XS","S","M","L"],colors:["Black","Ivory"],stock:7,badge:"LIMITED",image:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85"},
 {id:4,name:"Everyday Luxe Knit",category:"Knitwear",price:9800,oldPrice:11500,description:"Soft-touch knitwear with a relaxed fit and considered detailing.",sizes:["S","M","L","XL"],colors:["Cream","Stone"],stock:20,badge:"SALE",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85"},
 {id:5,name:"Studio Leather Tote",category:"Accessories",price:14500,oldPrice:null,description:"A structured carryall with generous space and understated hardware.",sizes:["One size"],colors:["Black","Tan"],stock:15,badge:"ICON",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"},
 {id:6,name:"Essential Cotton Shirt",category:"Menswear",price:7500,oldPrice:null,description:"Crisp premium cotton, a versatile cut, and a clean button-front finish.",sizes:["S","M","L","XL"],colors:["White","Blue"],stock:25,badge:"ESSENTIAL",image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85"},
 {id:7,name:"Sculpted Minimal Sneakers",category:"Footwear",price:12900,oldPrice:null,description:"Minimal low-top sneakers designed to pair effortlessly with every look.",sizes:["40","41","42","43","44"],colors:["White","Black"],stock:11,badge:"NEW",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"},
 {id:8,name:"Cashmere Blend Scarf",category:"Accessories",price:6900,oldPrice:null,description:"A soft, generous scarf that brings a quiet luxury finish to cold-weather looks.",sizes:["One size"],colors:["Camel","Grey"],stock:18,badge:"GIFT PICK",image:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85"},
 {id:9,name:"Linen Summer Co-ord",category:"Womenswear",price:11900,oldPrice:null,description:"A relaxed linen-blend matching set for warm days and easy evenings.",sizes:["XS","S","M","L"],colors:["Ivory","Sage","Sand"],stock:14,badge:"NEW SEASON",image:"https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=85"},
 {id:10,name:"Premium Oxford Shirt",category:"Menswear",price:8200,oldPrice:null,description:"A versatile Oxford shirt with a structured collar and a clean, tailored fit.",sizes:["S","M","L","XL"],colors:["White","Sky Blue","Black"],stock:22,badge:"WARDROBE ICON",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85"},
 {id:11,name:"The Signature Abaya",category:"Womenswear",price:15900,oldPrice:null,description:"An understated flowing abaya with a graceful drape and minimal detailing.",sizes:["S","M","L","XL"],colors:["Black","Mocha"],stock:10,badge:"SIGNATURE",image:"https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=900&q=85"},
 {id:12,name:"Textured Polo Knit",category:"Menswear",price:8900,oldPrice:null,description:"A refined textured knit polo that moves easily from casual to smart.",sizes:["S","M","L","XL"],colors:["Cream","Navy","Olive"],stock:16,badge:"NEW",image:"https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=85"},
 {id:13,name:"Evening Mini Bag",category:"Accessories",price:9900,oldPrice:null,description:"A compact statement bag with a polished finish for evening occasions.",sizes:["One size"],colors:["Black","Silver"],stock:8,badge:"OCCASION EDIT",image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85"},
 {id:14,name:"Relaxed Pleated Trousers",category:"Menswear",price:10900,oldPrice:null,description:"Easy, elegant pleated trousers with a relaxed leg and considered proportions.",sizes:["S","M","L","XL"],colors:["Charcoal","Stone"],stock:13,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85"},
 {id:15,name:"Everyday Leather Belt",category:"Accessories",price:4900,oldPrice:null,description:"A clean leather belt finished with understated metal hardware.",sizes:["S","M","L","XL"],colors:["Black","Brown"],stock:24,badge:"ESSENTIAL",image:"https://images.unsplash.com/photo-1624222247344-550fb8b7b4f7?auto=format&fit=crop&w=900&q=85"},
 {id:16,name:"Classic Trench Jacket",category:"Outerwear",price:22900,oldPrice:null,description:"A modern take on the timeless trench with a crisp collar and adjustable waist.",sizes:["S","M","L","XL"],colors:["Beige","Black"],stock:6,badge:"LIMITED",image:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=900&q=85"},
 {id:17,name:"Premium Everyday Hoodie",category:"Knitwear",price:7900,oldPrice:null,description:"A heavyweight-feel hoodie with a clean profile and soft brushed interior.",sizes:["S","M","L","XL"],colors:["Black","Heather Grey","Cream"],stock:19,badge:"DAILY UNIFORM",image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"},
 {id:18,name:"Minimal Leather Loafers",category:"Footwear",price:16900,oldPrice:null,description:"Polished, versatile loafers with a timeless profile for work and occasions.",sizes:["40","41","42","43","44"],colors:["Black","Brown"],stock:9,badge:"REFINED",image:"https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=900&q=85"}
];
function load() {
  if (!fs.existsSync(DATA)) fs.writeFileSync(DATA, JSON.stringify({products:starterProducts,orders:[],nextProductId:19,nextOrderId:1001},null,2));
  return JSON.parse(fs.readFileSync(DATA,"utf8"));
}
function save(db){fs.writeFileSync(DATA,JSON.stringify(db,null,2));}
function admin(req,res,next){
  const expected=process.env.ADMIN_KEY || "change-this-admin-key";
  if(req.headers["x-admin-key"] !== expected) return res.status(401).json({error:"Admin key is missing or incorrect."});
  next();
}
app.get("/api/products",(req,res)=>res.json(load().products));
app.get("/api/orders",admin,(req,res)=>res.json(load().orders));
app.post("/api/products",admin,(req,res)=>{
 const db=load(), p=req.body;
 if(!p.name || !Number.isFinite(Number(p.price))) return res.status(400).json({error:"Product name and valid price are required."});
 const product={...p,id:db.nextProductId++,price:Number(p.price),oldPrice:p.oldPrice?Number(p.oldPrice):null,stock:Number(p.stock||0),sizes:Array.isArray(p.sizes)?p.sizes:["One size"],colors:Array.isArray(p.colors)?p.colors:["Default"]};
 db.products.unshift(product);save(db);res.status(201).json(product);
});
app.put("/api/products/:id",admin,(req,res)=>{
 const db=load(),i=db.products.findIndex(p=>p.id===Number(req.params.id));
 if(i<0)return res.status(404).json({error:"Product not found"});
 db.products[i]={...db.products[i],...req.body,id:Number(req.params.id),price:Number(req.body.price??db.products[i].price),stock:Number(req.body.stock??db.products[i].stock)};
 save(db);res.json(db.products[i]);
});
app.delete("/api/products/:id",admin,(req,res)=>{
 const db=load();db.products=db.products.filter(p=>p.id!==Number(req.params.id));save(db);res.json({ok:true});
});
app.post("/api/orders",(req,res)=>{
 const db=load(), {customer,items,paymentMethod="COD"}=req.body;
 if(!customer?.name||!customer?.phone||!customer?.address||!customer?.city||!Array.isArray(items)||!items.length) return res.status(400).json({error:"Please complete customer details and add at least one item."});
 let total=0, lines=[];
 for(const item of items){
   const p=db.products.find(x=>x.id===Number(item.id));
   if(!p || Number(item.quantity)<1 || p.stock<Number(item.quantity)) return res.status(400).json({error:`Unavailable stock for ${p?.name||"a product"}.`});
   const qty=Number(item.quantity);total+=p.price*qty;lines.push({id:p.id,name:p.name,price:p.price,quantity:qty,size:item.size||"One size",color:item.color||p.colors?.[0]||"Default"});
 }
 const shipping=total>=25000?0:350;
 lines.forEach(l=>{const p=db.products.find(x=>x.id===l.id);p.stock-=l.quantity;});
 const order={id:db.nextOrderId++,createdAt:new Date().toISOString(),customer,items:lines,subtotal:total,shipping,total:total+shipping,paymentMethod,paymentStatus:paymentMethod==="COD"?"Pay on delivery":"Pending gateway setup",status:"Received",trackingNumber:null};
 db.orders.unshift(order);save(db);res.status(201).json({order});
});
app.patch("/api/orders/:id",admin,(req,res)=>{
 const db=load(),o=db.orders.find(x=>x.id===Number(req.params.id));
 if(!o)return res.status(404).json({error:"Order not found"});
 if(req.body.status)o.status=req.body.status;
 if(req.body.trackingNumber!==undefined)o.trackingNumber=req.body.trackingNumber;
 save(db);res.json(o);
});
app.get("/api/health",(req,res)=>res.json({ok:true}));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Atelier Noir running at http://localhost:${PORT}`));
