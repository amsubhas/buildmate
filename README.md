# Buildmate Website v3.0

## Setup
```bash
npm install
npm run dev       # Development: http://localhost:5173
npm run build     # Production build → /dist
npm run preview   # Preview production build
```

## Image Setup
Images in `public/images/` are currently placeholder SVGs.

### To download real images from buildmate.in:
```bash
chmod +x download-images.sh
./download-images.sh
```
Or on the server after deploying, copy from the live site's `/images/` folder directly.

### Production Image Loading
When deployed to `buildmate.in`, all images load from `/images/` (local path = zero CDN cost).
During development, images fall back gracefully to styled placeholders.

## Deployment (Vercel)
```bash
npm run build
vercel --prod
```
Or drag the `/dist` folder to vercel.com

## Deployment (Apache/cPanel — buildmate.in)
1. Run `npm run build`
2. Upload contents of `/dist` to `public_html/`
3. Add `.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
4. Copy your existing images to `public_html/images/`

## Brand Colors
- Primary Blue:  `#233C82`
- Primary Red:   `#D72D23`  
- Support Blue:  `#465A96`
- Support Light: `#6473A5`

## Pages
- `/`           Home (Hero, Products, Proven Execution, Sustainability, NexGiga, Physical AI, Smart Communities)
- `/about`      Who We Are (Company, Vision, Advantages, Timeline, Values, Certs)
- `/products`   All 12 products (AAC, Precast, PEB, Carbon Capture, FCB, Materials, + 6 more)
- `/services`   6 Services (R&D, AMC, Training, Custom Machinery, Upgradation, Modernization)
- `/facilities` 6 Facility sections
- `/innovations` R&D & Innovation
- `/projects`   Plants Under Operation (18 real), Under Execution, Gallery
- `/customers`  All 18 client testimonials + logos
- `/blog`       9 technical articles with category filter
- `/news`       9 real news/events (EXCON 2025, etc.)
- `/partner`    Partnership programs + enquiry form
- `/work-with-us` Careers + application form
- `/contact`    Contact form + real details + departments

## Contact Details (Real)
- CEO:        Mr. M. Venkata Ratnam — mvr@buildmate.in — +91 7675 989 961
- Marketing:  marketing@buildmate.in — +91 7675 989 911
- Purchase:   purchase@buildmate.in — +91 7675 989 907/908
- Partnership: partnership@buildmate.in
- HR:         hr@buildmate.in — +91 7675 989 925
- Address:    Sy No 60-62, Gundlapochampally, Medchal Road, Hyderabad 500014

## Sister Site
AAC Plant Manufacturers: https://www.aacplantmanufacturers.com/
(Links placed in: Home page banner, Products AAC section, Footer)

## Credits
Website by [Sharva's IT](https://sharvasit.in)
