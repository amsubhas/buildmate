#!/bin/bash
# Run this script from your local machine or the buildmate.in server
# to download all images from the live site into public/images/
echo "Downloading Buildmate images..."
mkdir -p public/images
BASE="https://buildmate.in/images"
IMAGES=(
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
for img in "${IMAGES[@]}"; do
  if [ ! -f "public/images/$img" ] || [ $(wc -c < "public/images/$img") -lt 5000 ]; then
    echo "Downloading $img..."
    curl -sL -H "Referer: https://www.buildmate.in/" \
         -H "User-Agent: Mozilla/5.0 Chrome/124.0" \
         "$BASE/$img" -o "public/images/$img"
    sleep 0.2
  else
    echo "Already have $img"
  fi
done
echo "Done! Check public/images/"
