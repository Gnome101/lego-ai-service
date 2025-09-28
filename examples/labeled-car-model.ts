// Detailed LEGO Car Model with Component Labels
// Based on James Jessiman's classic LDraw car example

import { LDrawBuilder, Colors } from '../src/ldrawBuilder';

const builder = new LDrawBuilder("Labeled Car Model");
builder.setAuthor("LEGO AI - Educational Build");

// ============================================
// STEP 1: CHASSIS AND UNDERCARRIAGE
// ============================================
console.log("STEP 1: Building the car's chassis foundation");

// === WHEEL WELL PANELS (Left and Right) ===
// Part 4315: Panel 1x4x3 - Forms the wheel wells that house the tires
builder.addPart("4315", Colors.BLACK,  0, 0, -90,
  1,0,0,  0,1,0,  0,0,1);  // Front wheel well panel
builder.addPart("4315", Colors.BLACK,  0, 0,  90,
  -1,0,0,  0,1,0,  0,0,-1); // Rear wheel well panel (mirrored)

// === FLOOR PLATES ===
// Part 4600: Plate 2x2 with wheel holder - Connects to wheels later
builder.addPart("4600", Colors.LIGHT_GRAY,  0, 0, -60,
  1,0,0,  0,1,0,  0,0,1);  // Front axle mounting plate
builder.addPart("4600", Colors.LIGHT_GRAY,  0, 0,  60,
  1,0,0,  0,1,0,  0,0,1);  // Rear axle mounting plate

// === MAIN CHASSIS BASE ===
// Part 3031: Plate 4x4 - Central structural platform
builder.addPart("3031", Colors.BLACK,  0, 0, 0,
  1,0,0,  0,1,0,  0,0,1);  // Main chassis base plate

// ============================================
// STEP 2: LOWER BODY STRUCTURE
// ============================================
console.log("STEP 2: Adding the lower body panels and floor");

// === FRONT BUMPER AREA ===
// Part 3024: Plate 1x1 - Small detail plates
builder.addPart("3024", Colors.TRANS_CLEAR,  30, -8, -90,
  1,0,0,  0,1,0,  0,0,1);  // Front right corner light
builder.addPart("3024", Colors.TRANS_CLEAR, -30, -8, -90,
  1,0,0,  0,1,0,  0,0,1);  // Front left corner light

// === SIDE BODY PANELS ===
// Part 3020: Plate 2x4 - Side body sections
builder.addPart("3020", Colors.RED,   0, -8, -60,
  0,0,1,  0,1,0, -1,0,0);  // Front hood plate

// Part 3623: Plate 1x3 - Side trim pieces
builder.addPart("3623", Colors.RED,  30, -8, -10,
  0,0,1,  0,1,0, -1,0,0);  // Right side front trim
builder.addPart("3623", Colors.RED, -30, -8, -10,
  0,0,1,  0,1,0, -1,0,0);  // Left side front trim

// === DOOR AREAS ===
builder.addPart("3024", Colors.RED,  30, -8,  30,
  1,0,0,  0,1,0,  0,0,1);  // Right door panel marker
builder.addPart("3024", Colors.RED, -30, -8,  30,
  1,0,0,  0,1,0,  0,0,1);  // Left door panel marker

// === REAR SECTION ===
// Part 3021: Plate 2x3 - Rear deck
builder.addPart("3021", Colors.RED,   0, -8,  50,
  0,0,1,  0,1,0, -1,0,0);  // Rear trunk area

// Part 3710: Plate 1x4 - Rear bumper
builder.addPart("3710", Colors.RED,   0, -8,  90,
  1,0,0,  0,1,0,  0,0,1);  // Rear bumper plate

// === INTERIOR FLOOR ===
// Part 4079: Minifig seat - Driver/passenger seating
builder.addPart("4079", Colors.BLUE,   0, -8,   0,
  1,0,0,  0,1,0,  0,0,1);  // Car seat (centered)

// ============================================
// STEP 3: CABIN STRUCTURE
// ============================================
console.log("STEP 3: Building the cabin and steering assembly");

// === REAR CABIN SUPPORTS ===
builder.addPart("3024", Colors.TRANS_CLEAR,  30, -16,  90,
  1,0,0,  0,1,0,  0,0,1);  // Right rear window support
builder.addPart("3024", Colors.TRANS_CLEAR, -30, -16,  90,
  1,0,0,  0,1,0,  0,0,1);  // Left rear window support

// === STEERING ASSEMBLY ===
// Part 3829c01: Car steering stand and wheel - Complete steering unit
builder.addPart("3829c01", Colors.RED, 0, -16, -30,
  1,0,0,  0,1,0,  0,0,1);  // Steering wheel assembly

// ============================================
// STEP 4: UPPER BODY AND WINDOWS
// ============================================
console.log("STEP 4: Adding upper body panels and windshield supports");

// === WINDSHIELD SUPPORTS ===
// Part 3788: Car mudguard 2x4 - Curved fender pieces
builder.addPart("3788", Colors.RED,   0, -24, -60,
  1,0,0,  0,1,0,  0,0,1);  // Front windshield base/hood
builder.addPart("3788", Colors.RED,   0, -24,  60,
  1,0,0,  0,1,0,  0,0,1);  // Rear window base/trunk

// === UPPER SIDE PANELS ===
builder.addPart("3024", Colors.TRANS_RED,  30, -24,  90,
  1,0,0,  0,1,0,  0,0,1);  // Right tail light
builder.addPart("3024", Colors.TRANS_RED, -30, -24,  90,
  1,0,0,  0,1,0,  0,0,1);  // Left tail light

// ============================================
// STEP 5: WINDSHIELD AND ROOF STRUCTURE
// ============================================
console.log("STEP 5: Installing windshield and roof components");

// === WINDSHIELD ASSEMBLY ===
// Part 3937: Hinge base - Windshield attachment point
builder.addPart("3937", Colors.LIGHT_GRAY,   0, -32, -90,
  1,0,0,  0,1,0,  0,0,1);  // Windshield hinge base

// Part 3938: Hinge top - Connects windshield
builder.addPart("3938", Colors.LIGHT_GRAY,   0, -32, -90,
  1,0,0,  0,1,0,  0,0,1);  // Windshield hinge top

// === HEADLIGHTS ===
// Part 4070: Brick 1x1 with headlight - Front lights
builder.addPart("4070", Colors.RED,  30, -32, -90,
  1,0,0,  0,1,0,  0,0,1);  // Right headlight housing
builder.addPart("4070", Colors.RED, -30, -32, -90,
  1,0,0,  0,1,0,  0,0,1);  // Left headlight housing

// === HEADLIGHT LENSES ===
// Part 6141: Plate 1x1 round - Light lenses
builder.addPart("6141", Colors.TRANS_CLEAR, 30, -22, -104,
  1,0,0,  0,0,-1, 0,1,0);  // Right headlight lens
builder.addPart("6141", Colors.TRANS_CLEAR, -30, -22, -104,
  1,0,0,  0,0,-1, 0,1,0);  // Left headlight lens

// === ROOF STRUCTURE ===
// Part 3023: Plate 1x2 - Roof support beams
builder.addPart("3023", Colors.RED, 30, -32, -60,
  0,0,1,  0,1,0, -1,0,0);  // Right front roof support
builder.addPart("3023", Colors.RED, -30, -32, -60,
  0,0,1,  0,1,0, -1,0,0);  // Left front roof support

// === DOOR FRAMES ===
// Part 3822/3821: Door frame pieces - Left and right specific
builder.addPart("3822", Colors.RED, 30, -32, -30,
  1,0,0,  0,1,0,  0,0,1);  // Right door frame
builder.addPart("3821", Colors.RED, -30, -32, -30,
  1,0,0,  0,1,0,  0,0,1);  // Left door frame

// === REAR PILLARS ===
// Part 3005: Brick 1x1 - Structural pillars
builder.addPart("3005", Colors.RED, 30, -32, 30,
  1,0,0,  0,1,0,  0,0,1);  // Right B-pillar
builder.addPart("3005", Colors.RED, -30, -32, 30,
  1,0,0,  0,1,0,  0,0,1);  // Left B-pillar

// === REAR ROOF SUPPORTS ===
builder.addPart("3623", Colors.RED, 30, -32, 70,
  0,0,1,  0,1,0, -1,0,0);  // Right rear roof edge
builder.addPart("3623", Colors.RED, -30, -32, 70,
  0,0,1,  0,1,0, -1,0,0);  // Left rear roof edge

// === REAR WINDOW SUPPORT ===
// Part 3004: Brick 1x2 - Structural beam
builder.addPart("3004", Colors.RED, 0, -32, 90,
  1,0,0,  0,1,0,  0,0,1);  // Rear window crossbeam

// ============================================
// STEP 6: ROOF PANELS
// ============================================
console.log("STEP 6: Completing the roof");

// === FRONT ROOF SECTION ===
// Part 3068b: Tile 2x2 - Smooth roof center
builder.addPart("3068b", Colors.RED, 0, -40, -80,
  1,0,0, 0,1,0, 0,0,1);  // Front roof center tile

builder.addPart("3023", Colors.RED, 30, -40, -80,
  0,0,1, 0,1,0, -1,0,0);  // Right front roof edge
builder.addPart("3023", Colors.RED, -30, -40, -80,
  0,0,1, 0,1,0, -1,0,0);  // Left front roof edge

// === MID ROOF SECTION ===
builder.addPart("3004", Colors.RED, 0, -40, -50,
  1,0,0, 0,1,0, 0,0,1);  // Center roof beam

builder.addPart("3023", Colors.RED, 30, -40, -40,
  0,0,1, 0,1,0, -1,0,0);  // Right mid roof
builder.addPart("3023", Colors.RED, -30, -40, -40,
  0,0,1, 0,1,0, -1,0,0);  // Left mid roof

// === SUNROOF AREA ===
// Part 3023: Black plates represent sunroof
builder.addPart("3023", Colors.BLACK, 30, -40, 40,
  0,0,1, 0,1,0, -1,0,0);  // Right sunroof panel
builder.addPart("3023", Colors.BLACK, -30, -40, 40,
  0,0,1, 0,1,0, -1,0,0);  // Left sunroof panel

// === REAR ROOF SECTION ===
builder.addPart("3024", Colors.BLACK, 30, -40, 70,
  1,0,0, 0,1,0, 0,0,1);  // Right rear roof corner
builder.addPart("3024", Colors.BLACK, -30, -40, 70,
  1,0,0, 0,1,0, 0,0,1);  // Left rear roof corner

builder.addPart("3710", Colors.BLACK, 0, -40, 90,
  1,0,0, 0,1,0, 0,0,1);  // Rear roof spoiler base

// ============================================
// STEP 7: WINDSHIELD AND WINDOWS
// ============================================
console.log("STEP 7: Installing glass components");

// === WINDSHIELD ===
// Part 3823: Windshield 2x4x2 - Main front window
builder.addPart("3823", Colors.TRANS_LIGHT_BLUE, 0, -88, -30,
  1,0,0, 0,1,0, 0,0,1);  // Front windshield

// === REAR WINDOW ===
// Part 3823: Same windshield part but rotated for rear
builder.addPart("3823", Colors.TRANS_LIGHT_BLUE, 0, -88, 70,
  -1,0,0, 0,1,0, 0,0,-1);  // Rear window (rotated 180°)

// === ROOF WINDOW/SUNROOF ===
// Part 4214: Lattice window piece - Center roof detail
builder.addPart("4214", Colors.BLACK, 0, -88, 30,
  1,0,0, 0,1,0, 0,0,1);  // Sunroof lattice/frame

// ============================================
// STEP 8: SPOILER AND WHEELS
// ============================================
console.log("STEP 8: Adding spoiler and wheel assemblies");

// === REAR SPOILER ===
// Part 4213: Car grille - Used as rear spoiler
builder.addPart("4213", Colors.BLACK, 0, -96, 0,
  1,0,0, 0,1,0, 0,0,1);  // Rear spoiler wing

// Part 3020: Plate 2x4 - Spoiler support
builder.addPart("3020", Colors.BLACK, 0, -96, 60,
  1,0,0, 0,1,0, 0,0,1);  // Spoiler mounting plate

// === WHEELS ===
// Part 4624: Wheel with 3 pin holes - The actual wheels
console.log("Installing 4 wheels with proper rotation for left/right sides");

// FRONT WHEELS
builder.addPart("4624", Colors.LIGHT_GRAY, -30, 6, -60,
  0,0,1,  0,1,0,  -1,0,0);  // Front left wheel (rotated for left side)
builder.addPart("4624", Colors.LIGHT_GRAY, 30, 6, -60,
  0,0,-1,  0,1,0,  1,0,0);  // Front right wheel (rotated for right side)

// REAR WHEELS
builder.addPart("4624", Colors.LIGHT_GRAY, -30, 6, 60,
  0,0,1,  0,1,0,  -1,0,0);  // Rear left wheel
builder.addPart("4624", Colors.LIGHT_GRAY, 30, 6, 60,
  0,0,-1,  0,1,0,  1,0,0);  // Rear right wheel

// === WHEEL HOLDERS/AXLES ===
// Part 3641: Tire holder - Connects wheels to chassis
console.log("Adding wheel holders for tire attachment");

builder.addPart("3641", Colors.BLACK, -30, 6, -60,
  0,0,1, 0,1,0, -1,0,0);  // Front left tire holder
builder.addPart("3641", Colors.BLACK, 30, 6, -60,
  0,0,-1, 0,1,0, 1,0,0);  // Front right tire holder
builder.addPart("3641", Colors.BLACK, -30, 6, 60,
  0,0,1, 0,1,0, -1,0,0);  // Rear left tire holder
builder.addPart("3641", Colors.BLACK, 30, 6, 60,
  0,0,-1, 0,1,0, 1,0,0);  // Rear right tire holder

// ============================================
// SAVE THE MODEL
// ============================================
builder.save("labeled-car-model.ldr");

// ============================================
// DETAILED COMPONENT SUMMARY
// ============================================
console.log("\n========================================");
console.log("🚗 LEGO CAR MODEL - COMPONENT BREAKDOWN");
console.log("========================================");
console.log("\nCHASSIS & FRAME:");
console.log("- Wheel well panels (4315): Structural side panels");
console.log("- Main base plate (3031): Central chassis platform");
console.log("- Axle plates (4600): Wheel mounting points");

console.log("\nBODY PANELS:");
console.log("- Hood/trunk sections (3788): Curved mudguard pieces");
console.log("- Side panels (3020, 3623): Body trim and doors");
console.log("- Bumpers (3710): Front and rear protection");

console.log("\nCABIN:");
console.log("- Steering assembly (3829c01): Complete steering unit");
console.log("- Seat (4079): Driver position");
console.log("- Door frames (3821/3822): Left/right specific");
console.log("- Roof supports (3005): Structural pillars");

console.log("\nLIGHTING:");
console.log("- Headlights (4070 + 6141): Housing with round lenses");
console.log("- Tail lights (3024 trans-red): Rear indicators");
console.log("- Corner lights (3024 trans-clear): Front markers");

console.log("\nGLASS:");
console.log("- Windshield (3823): Front window");
console.log("- Rear window (3823): Back glass");
console.log("- Sunroof (4214): Roof window frame");

console.log("\nWHEELS & DRIVETRAIN:");
console.log("- 4x Wheels (4624): With 3-pin mounting");
console.log("- 4x Tire holders (3641): Axle connections");
console.log("- Note: Wheels use opposite rotations for left/right sides");

console.log("\nAERODYNAMICS:");
console.log("- Rear spoiler (4213): Performance wing");
console.log("- Spoiler mount (3020): Support structure");

console.log("\nCOLOR SCHEME:");
console.log("- Primary: Red (body panels)");
console.log("- Secondary: Black (chassis, trim, wheels)");
console.log("- Accent: Light Gray (structural elements)");
console.log("- Glass: Trans-Clear/Trans-Light Blue");

console.log("\nBUILD STATISTICS:");
console.log(`- Total parts: ${builder.getPartCount()}`);
console.log("- Build steps: 8");
console.log("- Difficulty: Intermediate");
console.log("- Scale: Minifigure compatible");
console.log("========================================\n");