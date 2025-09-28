// High-Performance LEGO Sports Car
// Enhanced aerodynamic design with racing features

import { LDrawBuilder, Colors } from '../src/ldrawBuilder';

const builder = new LDrawBuilder("Sports Car GT");
builder.setAuthor("LEGO AI - Performance Series");

// STEP 1: CHASSIS AND UNDERCARRIAGE
// ============================================
// CHASSIS - LOWERED AND WIDENED
// ============================================

// Extended wheel base for stability
builder.addPart("4315", Colors.BLACK, 0, 4, -110, 1,0,0, 0,1,0, 0,0,1); // Extended front wheel well
builder.addPart("4315", Colors.BLACK, 0, 4, 110, -1,0,0, 0,1,0, 0,0,-1); // Extended rear wheel well

// Wide track wheel mounting plates
builder.addPart("4600", Colors.DARK_GRAY, -40, 4, -80, 1,0,0, 0,1,0, 0,0,1); // Front left mount
builder.addPart("4600", Colors.DARK_GRAY, 40, 4, -80, 1,0,0, 0,1,0, 0,0,1); // Front right mount
builder.addPart("4600", Colors.DARK_GRAY, -40, 4, 80, 1,0,0, 0,1,0, 0,0,1); // Rear left mount
builder.addPart("4600", Colors.DARK_GRAY, 40, 4, 80, 1,0,0, 0,1,0, 0,0,1); // Rear right mount

// Reinforced chassis plates
builder.addPart("3031", Colors.BLACK, 0, 4, 0, 1,0,0, 0,1,0, 0,0,1); // Center chassis
builder.addPart("3031", Colors.BLACK, 0, 4, -40, 1,0,0, 0,1,0, 0,0,1); // Front chassis extension
builder.addPart("3031", Colors.BLACK, 0, 4, 40, 1,0,0, 0,1,0, 0,0,1); // Rear chassis extension

builder.addStep(); // End of Step 1

// STEP 2: AERODYNAMIC COMPONENTS
// ============================================
// AERODYNAMIC FLOOR PAN
// ============================================

// Front splitter
builder.addPart("3794a", Colors.BLACK, 0, 8, -120, 1,0,0, 0,1,0, 0,0,1); // Front splitter plate
builder.addPart("3023", Colors.BLACK, -30, 8, -120, 0,0,1, 0,1,0, -1,0,0); // Left splitter edge
builder.addPart("3023", Colors.BLACK, 30, 8, -120, 0,0,1, 0,1,0, -1,0,0); // Right splitter edge

// Side skirts
for (let z = -100; z <= 100; z += 20) {
  builder.addPart("3023", Colors.BLACK, -50, 4, z, 0,0,1, 0,1,0, -1,0,0); // Left skirt
  builder.addPart("3023", Colors.BLACK, 50, 4, z, 0,0,1, 0,1,0, -1,0,0); // Right skirt
}

// Rear diffuser
builder.addPart("3040", Colors.BLACK, -30, 8, 120, -1,0,0, 0,1,0, 0,0,-1); // Left diffuser slope
builder.addPart("3040", Colors.BLACK, 0, 8, 120, -1,0,0, 0,1,0, 0,0,-1); // Center diffuser
builder.addPart("3040", Colors.BLACK, 30, 8, 120, -1,0,0, 0,1,0, 0,0,-1); // Right diffuser slope

builder.addStep(); // End of Step 2

// STEP 3: BODY PANELS
// ============================================
// LOWER BODY - AGGRESSIVE STYLING
// ============================================

// Wide front bumper with air intakes
builder.addPart("3020", Colors.BLUE, 0, -4, -100, 0,0,1, 0,1,0, -1,0,0); // Front bumper center
builder.addPart("2412b", Colors.BLACK, -20, -4, -100, 1,0,0, 0,1,0, 0,0,1); // Left air intake grille
builder.addPart("2412b", Colors.BLACK, 20, -4, -100, 1,0,0, 0,1,0, 0,0,1); // Right air intake grille

// Aggressive hood with vents
builder.addPart("3020", Colors.BLUE, 0, -4, -70, 0,0,1, 0,1,0, -1,0,0); // Hood center
builder.addPart("2412b", Colors.BLACK, -15, -8, -70, 0,0,1, 0,1,0, -1,0,0); // Left hood vent
builder.addPart("2412b", Colors.BLACK, 15, -8, -70, 0,0,1, 0,1,0, -1,0,0); // Right hood vent

// Wide fender flares
builder.addPart("3665", Colors.BLUE, -40, -4, -80, 1,0,0, 0,1,0, 0,0,1); // Front left fender
builder.addPart("3665", Colors.BLUE, 40, -4, -80, -1,0,0, 0,1,0, 0,0,-1); // Front right fender
builder.addPart("3665", Colors.BLUE, -40, -4, 80, 1,0,0, 0,1,0, 0,0,1); // Rear left fender
builder.addPart("3665", Colors.BLUE, 40, -4, 80, -1,0,0, 0,1,0, 0,0,-1); // Rear right fender

// Racing stripes
builder.addPart("3069b", Colors.WHITE, 0, -8, -50, 1,0,0, 0,1,0, 0,0,1); // Front stripe
builder.addPart("3069b", Colors.WHITE, 0, -8, -20, 1,0,0, 0,1,0, 0,0,1); // Hood stripe
builder.addPart("3069b", Colors.WHITE, 0, -8, 10, 1,0,0, 0,1,0, 0,0,1); // Roof stripe
builder.addPart("3069b", Colors.WHITE, 0, -8, 40, 1,0,0, 0,1,0, 0,0,1); // Rear stripe

builder.addStep(); // End of Step 3

// STEP 4: COCKPIT AND INTERIOR
// ============================================
// CABIN - LOW PROFILE COCKPIT
// ============================================

// Racing bucket seats
builder.addPart("4079", Colors.BLACK, -15, -4, -10, 1,0,0, 0,1,0, 0,0,1); // Driver seat
builder.addPart("4079", Colors.BLACK, 15, -4, -10, 1,0,0, 0,1,0, 0,0,1); // Passenger seat

// Sport steering wheel and dashboard
builder.addPart("3829c01", Colors.BLACK, 0, -12, -40, 1,0,0, 0,1,0, 0,0,1); // Racing steering wheel
builder.addPart("3070b", Colors.DARK_GRAY, -15, -12, -35, 1,0,0, 0,1,0, 0,0,1); // Left gauge
builder.addPart("3070b", Colors.DARK_GRAY, 15, -12, -35, 1,0,0, 0,1,0, 0,0,1); // Right gauge
builder.addPart("3070b", Colors.RED, 0, -12, -35, 1,0,0, 0,1,0, 0,0,1); // Tachometer

// Roll cage elements
builder.addPart("3008", Colors.DARK_GRAY, -35, -20, -30, 1,0,0, 0,1,0, 0,0,1); // Left A-pillar
builder.addPart("3008", Colors.DARK_GRAY, 35, -20, -30, 1,0,0, 0,1,0, 0,0,1); // Right A-pillar
builder.addPart("3008", Colors.DARK_GRAY, -35, -20, 30, 1,0,0, 0,1,0, 0,0,1); // Left B-pillar
builder.addPart("3008", Colors.DARK_GRAY, 35, -20, 30, 1,0,0, 0,1,0, 0,0,1); // Right B-pillar

builder.addStep(); // End of Step 4

// STEP 5: DOORS AND SIDE PANELS
// ============================================
// DOORS - SCISSOR STYLE INDICATORS
// ============================================

// Door panels with air intakes
builder.addPart("3189", Colors.BLUE, -35, -12, 0, 1,0,0, 0,1,0, 0,0,1); // Left door panel
builder.addPart("3189", Colors.BLUE, 35, -12, 0, -1,0,0, 0,1,0, 0,0,-1); // Right door panel
builder.addPart("2412b", Colors.BLACK, -35, -12, 10, 1,0,0, 0,1,0, 0,0,1); // Left door vent
builder.addPart("2412b", Colors.BLACK, 35, -12, 10, -1,0,0, 0,1,0, 0,0,-1); // Right door vent

builder.addStep(); // End of Step 5

// STEP 6: WINDSHIELD AND ROOF
// ============================================
// WINDSHIELD AND ROOF
// ============================================

// Slanted windshield for aerodynamics
builder.addPart("3823", Colors.TRANS_LIGHT_BLUE, 0, -60, -50, 0.866,0,0.5, 0,1,0, -0.5,0,0.866); // Angled windshield

// Low profile roof
builder.addPart("3036", Colors.BLUE, 0, -28, 0, 1,0,0, 0,1,0, 0,0,1); // Roof plate
builder.addPart("3068b", Colors.DARK_GRAY, -20, -32, 0, 1,0,0, 0,1,0, 0,0,1); // Left sunroof
builder.addPart("3068b", Colors.DARK_GRAY, 20, -32, 0, 1,0,0, 0,1,0, 0,0,1); // Right sunroof

// Rear window (small for sports car)
builder.addPart("3070b", Colors.TRANS_LIGHT_BLUE, 0, -60, 50, -0.866,0,-0.5, 0,1,0, 0.5,0,-0.866); // Small rear window

builder.addStep(); // End of Step 6

// STEP 7: ENGINE AND VENTS
// ============================================
// ENGINE COVER AND VENTS
// ============================================

// Rear engine cover with vents (mid-engine sports car)
builder.addPart("3036", Colors.BLUE, 0, -20, 70, 1,0,0, 0,1,0, 0,0,1); // Engine cover
builder.addPart("2412b", Colors.BLACK, -15, -24, 70, 0,0,1, 0,1,0, -1,0,0); // Left engine vent
builder.addPart("2412b", Colors.BLACK, 0, -24, 70, 0,0,1, 0,1,0, -1,0,0); // Center engine vent
builder.addPart("2412b", Colors.BLACK, 15, -24, 70, 0,0,1, 0,1,0, -1,0,0); // Right engine vent

// Side engine air intakes
builder.addPart("3040", Colors.BLACK, -40, -16, 50, 0,0,1, 0,1,0, -1,0,0); // Left intake scoop
builder.addPart("3040", Colors.BLACK, 40, -16, 50, 0,0,-1, 0,1,0, 1,0,0); // Right intake scoop

builder.addStep(); // End of Step 7

// STEP 8: LIGHTING SYSTEM
// ============================================
// LIGHTING SYSTEM
// ============================================

// Pop-up headlights
builder.addPart("3040", Colors.BLUE, -25, -20, -95, 1,0,0, 0,0.7,-0.7, 0,0.7,0.7); // Left popup housing
builder.addPart("3040", Colors.BLUE, 25, -20, -95, 1,0,0, 0,0.7,-0.7, 0,0.7,0.7); // Right popup housing
builder.addPart("6141", Colors.TRANS_CLEAR, -25, -18, -98, 1,0,0, 0,0,-1, 0,1,0); // Left headlight
builder.addPart("6141", Colors.TRANS_CLEAR, 25, -18, -98, 1,0,0, 0,0,-1, 0,1,0); // Right headlight

// LED strip tail lights
builder.addPart("3069b", Colors.TRANS_RED, -30, -16, 110, 0,0,1, 0,1,0, -1,0,0); // Left tail light strip
builder.addPart("3069b", Colors.TRANS_RED, 0, -16, 110, 0,0,1, 0,1,0, -1,0,0); // Center brake light
builder.addPart("3069b", Colors.TRANS_RED, 30, -16, 110, 0,0,1, 0,1,0, -1,0,0); // Right tail light strip

// Fog lights
builder.addPart("4073", Colors.TRANS_CLEAR, -35, -4, -100, 1,0,0, 0,1,0, 0,0,1); // Left fog light
builder.addPart("4073", Colors.TRANS_CLEAR, 35, -4, -100, 1,0,0, 0,1,0, 0,0,1); // Right fog light

builder.addStep(); // End of Step 8

// STEP 9: REAR SPOILER
// ============================================
// REAR SPOILER - ADJUSTABLE WING
// ============================================

// Spoiler supports
builder.addPart("3957", Colors.BLACK, -25, -32, 100, 1,0,0, 0,1,0, 0,0,1); // Left wing support
builder.addPart("3957", Colors.BLACK, 25, -32, 100, 1,0,0, 0,1,0, 0,0,1); // Right wing support

// Multi-element wing
builder.addPart("3035", Colors.BLACK, 0, -48, 105, 1,0,0, 0,1,0, 0,0,1); // Main wing element
builder.addPart("3034", Colors.BLUE, 0, -52, 102, 0.96,0,-0.26, 0,1,0, 0.26,0,0.96); // Upper wing element
builder.addPart("3623", Colors.BLACK, -40, -48, 105, 0,0,1, 0,1,0, -1,0,0); // Left endplate
builder.addPart("3623", Colors.BLACK, 40, -48, 105, 0,0,1, 0,1,0, -1,0,0); // Right endplate

builder.addStep(); // End of Step 9

// STEP 10: WHEELS AND TIRES
// ============================================
// HIGH-PERFORMANCE WHEELS
// ============================================

// Wide racing wheels with low-profile tires
// Front wheels (smaller diameter for sports car look)
builder.addPart("4624", Colors.BLACK, -45, 10, -80, 0,0,1, 0,1,0, -1,0,0); // Front left wheel
builder.addPart("4624", Colors.BLACK, 45, 10, -80, 0,0,-1, 0,1,0, 1,0,0); // Front right wheel

// Rear wheels (larger for rear-wheel drive)
builder.addPart("44309", Colors.BLACK, -45, 10, 80, 0,0,1, 0,1,0, -1,0,0); // Rear left wheel (larger)
builder.addPart("44309", Colors.BLACK, 45, 10, 80, 0,0,-1, 0,1,0, 1,0,0); // Rear right wheel (larger)

// Racing tire holders
builder.addPart("3641", Colors.RED, -45, 10, -80, 0,0,1, 0,1,0, -1,0,0); // Front left holder
builder.addPart("3641", Colors.RED, 45, 10, -80, 0,0,-1, 0,1,0, 1,0,0); // Front right holder
builder.addPart("3641", Colors.RED, -45, 10, 80, 0,0,1, 0,1,0, -1,0,0); // Rear left holder
builder.addPart("3641", Colors.RED, 45, 10, 80, 0,0,-1, 0,1,0, 1,0,0); // Rear right holder

// Brake discs (visible through wheels)
builder.addPart("4073", Colors.LIGHT_GRAY, -40, 10, -80, 0,0,1, 0,1,0, -1,0,0); // Front left brake
builder.addPart("4073", Colors.LIGHT_GRAY, 40, 10, -80, 0,0,-1, 0,1,0, 1,0,0); // Front right brake
builder.addPart("4740", Colors.RED, -40, 10, 80, 0,0,1, 0,1,0, -1,0,0); // Rear left brake (larger)
builder.addPart("4740", Colors.RED, 40, 10, 80, 0,0,-1, 0,1,0, 1,0,0); // Rear right brake (larger)

builder.addStep(); // End of Step 10

// STEP 11: EXHAUST SYSTEM
// ============================================
// EXHAUST SYSTEM
// ============================================

// Dual center exhaust pipes
builder.addPart("3062b", Colors.DARK_GRAY, -10, 4, 115, 0,0,1, 0,1,0, -1,0,0); // Left exhaust pipe
builder.addPart("3062b", Colors.DARK_GRAY, 10, 4, 115, 0,0,1, 0,1,0, -1,0,0); // Right exhaust pipe
builder.addPart("4073", Colors.BLACK, -10, 4, 118, 0,0,1, 0,1,0, -1,0,0); // Left exhaust tip
builder.addPart("4073", Colors.BLACK, 10, 4, 118, 0,0,1, 0,1,0, -1,0,0); // Right exhaust tip

builder.addStep(); // End of Step 11

// STEP 12: FINAL DETAILS
// ============================================
// PERFORMANCE DETAILS
// ============================================

// Hood pins
builder.addPart("4073", Colors.LIGHT_GRAY, -20, -10, -60, 1,0,0, 0,1,0, 0,0,1); // Left hood pin
builder.addPart("4073", Colors.LIGHT_GRAY, 20, -10, -60, 1,0,0, 0,1,0, 0,0,1); // Right hood pin

// Side mirrors
builder.addPart("3679", Colors.BLUE, -40, -20, -20, 0,0,1, 0,1,0, -1,0,0); // Left mirror
builder.addPart("3679", Colors.BLUE, 40, -20, -20, 0,0,-1, 0,1,0, 1,0,0); // Right mirror

// Tow hook
builder.addPart("3639", Colors.RED, 0, 8, -115, 1,0,0, 0,1,0, 0,0,1); // Front tow hook

// Racing number decals (represented by tiles)
builder.addPart("3070b", Colors.WHITE, -35, -12, -10, 1,0,0, 0,1,0, 0,0,1); // Left door number
builder.addPart("3070b", Colors.WHITE, 35, -12, -10, 1,0,0, 0,1,0, 0,0,1); // Right door number

builder.addStep(); // End of Step 12

// ============================================
// SAVE THE MODEL
// ============================================
builder.save("sports-car-gt.ldr");

console.log("=====================================");
console.log("🏎️  SPORTS CAR GT MODEL COMPLETE 🏎️");
console.log("Model saved with 12 building steps!");
console.log("=====================================");
console.log(`Total parts used: ${builder.getPartCount()}`);
console.log("\nPERFORMANCE FEATURES:");
console.log("- Lowered chassis with wide track");
console.log("- Aerodynamic body kit with splitter and diffuser");
console.log("- Pop-up headlights");
console.log("- Dual-element rear wing");
console.log("- Wide fender flares");
console.log("- Racing bucket seats");
console.log("- Roll cage structure");
console.log("- Dual center exhaust");
console.log("- Larger rear wheels for RWD");
console.log("- Visible brake discs");
console.log("- Mid-engine venting");
console.log("=====================================");