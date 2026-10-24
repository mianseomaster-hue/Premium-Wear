# ATELIER NOIR — Premium Fashion Store

A responsive storefront + Express backend starter, seeded with eighteen premium fashion products.

## Features
- Premium responsive storefront, category filters and product search
- Product cards with price, sale price, stock and quick-add
- Shopping cart persisted in browser local storage
- Checkout form and Cash on Delivery order creation
- Server-side inventory checks and shipping calculation (free above PKR 25,000; otherwise PKR 350)
- Admin dashboard: add/edit/delete products, quick price changes, inventory and order status/tracking updates
- JSON file persistence in `data.json` (created on first run)

## Requirements
- Node.js 18+ recommended

## Run locally
1. Extract the ZIP.
2. Open a terminal in the project folder.
3. Run `npm install`
4. Set an admin key before starting:
   - macOS/Linux: `ADMIN_KEY='your-long-secret-key' npm start`
   - Windows PowerShell: `$env:ADMIN_KEY='your-long-secret-key'; npm start`
5. Open http://localhost:3000
6. Click the gear icon in the bottom-right and enter your admin key.

The fallback admin key is `change-this-admin-key`; change it before any use. Never deploy publicly with the fallback key.

## Payment and delivery integrations
- Cash on Delivery is implemented as an order workflow.
- The `ONLINE` option is a clearly marked placeholder. To accept real online payments, integrate a supported provider such as a locally available payment gateway or Stripe where your business is eligible. Create orders with a pending state, redirect to the provider checkout, and verify payment status using signed server-side webhooks. Never collect or store card numbers/CVV in this app.
- Courier delivery is represented by order status and a tracking-number field. Connect your courier's merchant API for automatic shipment booking, labels and tracking.
- Configure actual return/exchange policy, delivery zones, taxes, privacy policy, and customer service contact before launch.

## Important production checklist
This is a starter project, not yet a hardened production store. Before launch:
- Replace JSON storage with PostgreSQL/MySQL and use transactions for stock/orders.
- Add authentication with hashed passwords, secure sessions, rate limits, CSRF protections where applicable, validation, logging, backups and HTTPS.
- Upload product images to controlled object storage; validate image URLs and content.
- Configure payment provider and courier integrations, and verify webhooks.
- Add email/SMS order confirmations and password-protected admin access.
- Review Pakistan tax, consumer protection, privacy and payment-provider requirements with qualified local advisers.

## Product seed data
Eighteen editable products are included with PKR prices: Meridian Wool Coat, Noir Tailored Blazer, Silk Drape Evening Dress, Everyday Luxe Knit, Studio Leather Tote, Essential Cotton Shirt, Sculpted Minimal Sneakers, Cashmere Blend Scarf, Linen Summer Co-ord, Premium Oxford Shirt, Signature Abaya, Textured Polo Knit, Evening Mini Bag, Relaxed Pleated Trousers, Everyday Leather Belt, Classic Trench Jacket, Premium Everyday Hoodie, and Minimal Leather Loafers.


## Pakistan-focused launch notes
- Storefront and seed prices use PKR; default checkout supports Cash on Delivery.
- Shipping is currently a configurable starter rule (PKR 350, free above PKR 25,000), not a courier quote.
- Online payment is a placeholder until you activate a Pakistani payment provider and configure its credentials/webhooks.
- Delivery tracking currently uses a manually editable courier tracking number and order status; connect your courier merchant account for live bookings and tracking.
