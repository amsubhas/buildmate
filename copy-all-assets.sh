#!/bin/bash
# Run ON the buildmate.in server after deploying the new website
# Copies existing images & brochure PDFs from old site into new
# Usage: bash copy-all-assets.sh [path/to/old/public_html]
OLD="${1:-/var/www/html}"
echo "=== Copying Buildmate Assets ==="
mkdir -p public/images public/brochures/pdf
cp -v "$OLD/images/"*     public/images/     2>/dev/null || echo "No images to copy"
cp -v "$OLD/brochures/"*  public/brochures/  2>/dev/null || echo "No brochures to copy"
cp -v "$OLD/brochures/pdf/"* public/brochures/pdf/ 2>/dev/null || echo "No PDFs to copy"
echo "Done!"
echo "Images: $(ls public/images/ | wc -l) files"
echo "PDFs:   $(find public/brochures -name '*.pdf' | wc -l) files"
echo ""
echo "Now run: npm run build"
