#!/bin/bash
# Download Buildmate images from the live site
# Run from your local machine (not from this server)
echo "Downloading Buildmate images..."
mkdir -p public/images public/brochures/pdf
BASE="https://buildmate.in"
declare -a IMGS=(
  "Buildmate_logo_rbg.png" "1_aac_plants.jpg" "5_precast_concrete_plants.jpg"
  "calcium-silicate_fiber-boards.png" "High-End-Automated-Fly-ash-brick.png"
  "6_concrete_block_plants.jpg" "8_mixers.jpg"
  "1_prod_aac_plant.png" "2_prod_crushers_plant.png"
  "3_prod_concrete-batching-plants.png" "4_prod_dry_mix_mortar_plants.png"
  "5_prod_precast_concrete_plants.png" "6_prod_concrete-block-plants.png"
  "7_prod_cranes.png" "8_prod_mixers.png"
  "9_prod_pre_engineered_buildings.png" "10_prod_special_projects.png"
  "banner_whoweare.jpg" "banner_aacplants.jpg" "banner_services.jpg"
  "aacblock_seven_one.jpg" "aacblock_seven_two.jpg"
  "aacblock_seven_three.jpg" "aacblock_seven_four.jpg"
  "sup_design.jpg" "meti_mfg.jpg" "imm_quality.jpg"
  "saudiaac.png" "ecorex.png" "elite.png" "eko.png" "rancare.png" "duralite.png"
  "ultratech.png" "espec.png" "icom.png" "vedam.png" "earthpaver.png" "bepl.png"
  "inventa.png" "sahay.png" "magna.png" "pionner.png" "kesoram.png" "adityabirla.png"
  "Excon_13th_edition.jpg" "fly_ash_utilisation_conference_2024.jpg" "World_of_concrete_2024.jpg"
)
for img in "${IMGS[@]}"; do
  dest="public/images/$img"
  if [ -f "$dest" ] && [ $(wc -c < "$dest") -gt 5000 ]; then
    echo "  skip $img"
  else
    echo "  downloading $img..."
    curl -sL -H "Referer: https://www.buildmate.in/" \
         -H "User-Agent: Mozilla/5.0 Chrome/124.0" \
         "$BASE/images/$img" -o "$dest"
    sleep 0.15
  fi
done
declare -a PDFS=(
  "pdf/AAC PLANTS-n.pdf"
  "pdf/DRY READY MIX MORTOR PLANT-n.pdf"
  "pdf/PRECAST CONCRETE PLANT-n.pdf"
  "pdf/CONCRETE BLOCK PLANT-n.pdf"
  "pdf/StoneCrushingPlants.pdf"
  "pdf/Concrete Batching Plant.pdf"
  "pdf/Cranes,PEBs.pdf"
  "ConcreteBlocks.pdf"
  "PrecastConcreteElements.pdf"
)
for pdf in "${PDFS[@]}"; do
  dir="public/brochures/$(dirname "$pdf")"
  mkdir -p "$dir"
  dest="public/brochures/$pdf"
  encoded=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$pdf")
  echo "  downloading $pdf..."
  curl -sL -H "Referer: https://www.buildmate.in/brochures.php" \
       -H "User-Agent: Mozilla/5.0 Chrome/124.0" \
       "$BASE/brochures/$encoded" -o "$dest"
  sleep 0.2
done
echo ""
echo "=== Done ==="
echo "Images: $(ls public/images/ | wc -l)"
echo "PDFs:   $(find public/brochures -name '*.pdf' | wc -l)"
