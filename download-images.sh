#!/bin/bash
# ============================================================
# Run this script ON THE BUILDMATE SERVER (or any machine 
# that can access www.buildmate.in without hotlink block).
# It downloads all real images into public/images/ so the 
# built site serves them locally from /images/
# ============================================================

echo "Downloading Buildmate images from www.buildmate.in..."
mkdir -p public/images

BASE="https://www.buildmate.in/images"

IMAGES=(
  "Buildmate_logo_rbg.png"
  "1_aac_plants.jpg"
  "5_precast_concrete_plants.jpg"
  "calcium-silicate_fiber-boards.png"
  "High-End-Automated-Fly-ash-brick.png"
  "6_concrete_block_plants.jpg"
  "8_mixers.jpg"
  "1_prod_aac_plant.png"
  "2_prod_crushers_plant.png"
  "3_prod_concrete-batching-plants.png"
  "4_prod_dry_mix_mortar_plants.png"
  "5_prod_precast_concrete_plants.png"
  "6_prod_concrete-block-plants.png"
  "7_prod_cranes.png"
  "8_prod_mixers.png"
  "9_prod_pre_engineered_buildings.png"
  "10_prod_special_projects.png"
  "banner_whoweare.jpg"
  "banner_aacplants.jpg"
  "banner_services.jpg"
  "aacblock_seven_one.jpg"
  "aacblock_seven_two.jpg"
  "aacblock_seven_three.jpg"
  "aacblock_seven_four.jpg"
  "sup_design.jpg"
  "meti_mfg.jpg"
  "imm_quality.jpg"
  "saudiaac.png"
  "ecorex.png"
  "elite.png"
  "eko.png"
  "rancare.png"
  "duralite.png"
  "ultratech.png"
  "espec.png"
  "icom.png"
  "vedam.png"
  "earthpaver.png"
  "bepl.png"
  "inventa.png"
  "sahay.png"
  "magna.png"
  "pionner.png"
  "kesoram.png"
  "adityabirla.png"
  "Excon_13th_edition.jpg"
  "fly_ash_utilisation_conference_2024.jpg"
  "World_of_concrete_2024.jpg"
)

SUCCESS=0
FAIL=0

for img in "${IMAGES[@]}"; do
  DEST="public/images/$img"
  SIZE=0
  if [ -f "$DEST" ]; then
    SIZE=$(wc -c < "$DEST")
  fi

  if [ "$SIZE" -gt 5000 ] 2>/dev/null; then
    echo "  [SKIP] $img (already downloaded)"
    ((SUCCESS++))
  else
    echo -n "  [GET]  $img ... "
    HTTP=$(curl -s -o "$DEST" -w "%{http_code}" \
      -H "Referer: https://www.buildmate.in/" \
      -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
      "$BASE/$img")
    FSIZE=$(wc -c < "$DEST" 2>/dev/null || echo 0)
    if [ "$HTTP" = "200" ] && [ "$FSIZE" -gt 5000 ]; then
      echo "OK (${FSIZE} bytes)"
      ((SUCCESS++))
    else
      echo "FAILED (HTTP $HTTP, ${FSIZE} bytes)"
      rm -f "$DEST"
      ((FAIL++))
    fi
    sleep 0.3
  fi
done

echo ""
echo "============================================"
echo "Done: $SUCCESS downloaded, $FAIL failed"
echo "If any failed, copy them manually from:"
echo "  /path/to/buildmate.in/public_html/images/"
echo "  into: public/images/"
echo "============================================"
