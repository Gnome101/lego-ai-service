// Apollo Saturn V Rocket with Launch Tower
// Ultra-detailed LEGO model with accurate proportions

import { LDrawBuilder, Colors } from '../src/ldrawBuilder';

const builder = new LDrawBuilder('Apollo Saturn V with Launch Tower');
builder.setAuthor('LEGO AI - NASA Recreation');

// === CONSTANTS FOR SCALE ===
const ROCKET_BASE_Y = 0;
const STAGE_1_DIAMETER = 200; // First stage diameter in LDU
const ROCKET_CENTER_X = 0;
const ROCKET_CENTER_Z = 0;

// === LAUNCH PAD BASE ===
// Create massive concrete base using large gray plates
for (let x = -400; x <= 400; x += 40) {
  for (let z = -400; z <= 400; z += 40) {
    builder.addPlate('3036', Colors.DARK_GRAY, x, ROCKET_BASE_Y, z); // 6x8 plate
  }
}

// Flame trench (deeper center channel)
for (let z = -200; z <= 200; z += 40) {
  builder.addBrick('3001', Colors.BLACK, 0, ROCKET_BASE_Y - 24, z); // 2x4 brick
}

// === STAGE 1 (S-IC) - FIRST STAGE ===
// Height: ~42m in real life, ~1000 LDU in model
const stage1Height = 1000;
const stage1Layers = 42;

// Build cylindrical first stage using stacked round elements
for (let layer = 0; layer < stage1Layers; layer++) {
  const y = ROCKET_BASE_Y - (layer * 24); // Each brick layer is 24 LDU

  // Create circular cross-section using bricks arranged in octagon
  const radius = STAGE_1_DIAMETER / 2;
  const segments = 16; // 16-sided polygon for smooth cylinder

  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = ROCKET_CENTER_X + Math.cos(angle) * radius;
    const z = ROCKET_CENTER_Z + Math.sin(angle) * radius;

    // Alternating white and black for Saturn V pattern
    const color = (layer % 4 < 2) ? Colors.WHITE : Colors.BLACK;

    // Calculate rotation matrix for tangent alignment
    const cos = Math.cos(angle + Math.PI/2);
    const sin = Math.sin(angle + Math.PI/2);

    builder.addPart('3004', color, x, y, z,
      cos, 0, -sin,  // Rotation matrix
      0, 1, 0,
      sin, 0, cos
    );
  }

  // Add detail panels and fuel lines every 4 layers
  if (layer % 4 === 0) {
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const x = ROCKET_CENTER_X + Math.cos(angle) * (radius + 10);
      const z = ROCKET_CENTER_Z + Math.sin(angle) * (radius + 10);
      builder.addPart('3069b', Colors.DARK_GRAY, x, y, z); // 1x2 tile for panel detail
    }
  }
}

// F-1 Engine Bells (5 engines in cross pattern)
const enginePositions = [
  {x: 0, z: 0}, // Center engine
  {x: 60, z: 0}, {x: -60, z: 0}, // Side engines
  {x: 0, z: 60}, {x: 0, z: -60}
];

for (const pos of enginePositions) {
  // Engine bell using cones
  builder.addPart('4589', Colors.DARK_GRAY,
    ROCKET_CENTER_X + pos.x,
    ROCKET_BASE_Y - stage1Height,
    ROCKET_CENTER_Z + pos.z
  ); // Large cone

  // Engine nozzle detail
  builder.addPart('3062b', Colors.BLACK,
    ROCKET_CENTER_X + pos.x,
    ROCKET_BASE_Y - stage1Height - 24,
    ROCKET_CENTER_Z + pos.z
  ); // Round brick

  // Turbopump assembly
  builder.addPart('3941', Colors.LIGHT_GRAY,
    ROCKET_CENTER_X + pos.x + 20,
    ROCKET_BASE_Y - stage1Height + 48,
    ROCKET_CENTER_Z + pos.z
  );
}

// === INTERSTAGE ADAPTER ===
const interstageY = ROCKET_BASE_Y - stage1Height - 50;
const taperLayers = 4;

for (let layer = 0; layer < taperLayers; layer++) {
  const y = interstageY - (layer * 24);
  const radius = STAGE_1_DIAMETER/2 - (layer * 10); // Taper inward
  const segments = 16;

  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = ROCKET_CENTER_X + Math.cos(angle) * radius;
    const z = ROCKET_CENTER_Z + Math.sin(angle) * radius;

    builder.addPart('3005', Colors.BLACK, x, y, z); // 1x1 brick
  }
}

// === STAGE 2 (S-II) - SECOND STAGE ===
const stage2StartY = interstageY - (taperLayers * 24);
const stage2Height = 600;
const stage2Radius = 150;
const stage2Layers = 25;

for (let layer = 0; layer < stage2Layers; layer++) {
  const y = stage2StartY - (layer * 24);
  const segments = 12;

  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = ROCKET_CENTER_X + Math.cos(angle) * stage2Radius;
    const z = ROCKET_CENTER_Z + Math.sin(angle) * stage2Radius;

    // Checkered pattern for second stage
    const color = ((layer + i) % 2 === 0) ? Colors.WHITE : Colors.BLACK;

    const cos = Math.cos(angle + Math.PI/2);
    const sin = Math.sin(angle + Math.PI/2);

    builder.addPart('3004', color, x, y, z,
      cos, 0, -sin,
      0, 1, 0,
      sin, 0, cos
    );
  }

  // Add USA marking (simplified)
  if (layer === 12) {
    builder.addPart('3068b', Colors.RED, stage2Radius + 10, y, 0); // 2x2 tile
    builder.addPart('3070b', Colors.WHITE, stage2Radius + 10, y, 20); // 1x1 tile
    builder.addPart('3070b', Colors.BLUE, stage2Radius + 10, y, -20); // 1x1 tile
  }
}

// J-2 Engines for second stage (5 engines)
const j2Y = stage2StartY - stage2Height;
for (let i = 0; i < 5; i++) {
  const angle = (i * 2 * Math.PI) / 5;
  const x = ROCKET_CENTER_X + Math.cos(angle) * 40;
  const z = ROCKET_CENTER_Z + Math.sin(angle) * 40;

  builder.addPart('4589', Colors.LIGHT_GRAY, x, j2Y, z); // Smaller cone
}

// === STAGE 3 (S-IVB) - THIRD STAGE ===
const stage3StartY = j2Y - 50;
const stage3Height = 400;
const stage3Radius = 130;
const stage3Layers = 17;

for (let layer = 0; layer < stage3Layers; layer++) {
  const y = stage3StartY - (layer * 24);
  const segments = 12;

  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = ROCKET_CENTER_X + Math.cos(angle) * stage3Radius;
    const z = ROCKET_CENTER_Z + Math.sin(angle) * stage3Radius;

    const cos = Math.cos(angle + Math.PI/2);
    const sin = Math.sin(angle + Math.PI/2);

    builder.addPart('3004', Colors.WHITE, x, y, z,
      cos, 0, -sin,
      0, 1, 0,
      sin, 0, cos
    );
  }
}

// Single J-2 engine for third stage
builder.addPart('4589', Colors.LIGHT_GRAY, ROCKET_CENTER_X, stage3StartY - stage3Height, ROCKET_CENTER_Z);

// === INSTRUMENT UNIT ===
const instrumentY = stage3StartY - stage3Height - 30;
const instrumentRadius = 130;

for (let i = 0; i < 12; i++) {
  const angle = (i * 2 * Math.PI) / 12;
  const x = ROCKET_CENTER_X + Math.cos(angle) * instrumentRadius;
  const z = ROCKET_CENTER_Z + Math.sin(angle) * instrumentRadius;

  builder.addPart('3062b', Colors.LIGHT_GRAY, x, instrumentY, z); // Round brick

  // Add antenna and sensor details
  if (i % 3 === 0) {
    builder.addPart('4592c01', Colors.BLACK, x + 5, instrumentY - 8, z); // Antenna
  }
}

// === SERVICE MODULE ===
const serviceModuleY = instrumentY - 50;
const serviceModuleHeight = 200;
const serviceModuleLayers = 8;

for (let layer = 0; layer < serviceModuleLayers; layer++) {
  const y = serviceModuleY - (layer * 24);
  const radius = 110 - (layer * 2); // Slight taper
  const segments = 12;

  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = ROCKET_CENTER_X + Math.cos(angle) * radius;
    const z = ROCKET_CENTER_Z + Math.sin(angle) * radius;

    builder.addPart('3005', Colors.LIGHT_GRAY, x, y, z); // 1x1 brick
  }
}

// SPS Engine bell
builder.addPart('3942c', Colors.DARK_GRAY, ROCKET_CENTER_X, serviceModuleY - serviceModuleHeight, ROCKET_CENTER_Z);

// === COMMAND MODULE ===
const commandModuleY = serviceModuleY - serviceModuleHeight - 20;
const commandModuleHeight = 120;

// Conical shape using decreasing rings
for (let layer = 0; layer < 5; layer++) {
  const y = commandModuleY - (layer * 24);
  const radius = 90 - (layer * 15);
  const segments = 8;

  for (let i = 0; i < segments; i++) {
    const angle = (i * 2 * Math.PI) / segments;
    const x = ROCKET_CENTER_X + Math.cos(angle) * radius;
    const z = ROCKET_CENTER_Z + Math.sin(angle) * radius;

    builder.addPart('3005', Colors.LIGHT_GRAY, x, y, z);
  }
}

// Heat shield (bottom of command module)
builder.addPart('4740', Colors.BROWN, ROCKET_CENTER_X, commandModuleY - commandModuleHeight, ROCKET_CENTER_Z);

// Windows
builder.addPart('3070b', Colors.TRANS_LIGHT_BLUE, ROCKET_CENTER_X + 60, commandModuleY - 24, ROCKET_CENTER_Z);
builder.addPart('3070b', Colors.TRANS_LIGHT_BLUE, ROCKET_CENTER_X - 60, commandModuleY - 24, ROCKET_CENTER_Z);

// === LAUNCH ESCAPE SYSTEM ===
const lesY = commandModuleY - commandModuleHeight - 10;

// Tower structure
for (let h = 0; h < 8; h++) {
  const y = lesY - (h * 24);

  // Four legs of the tower
  builder.addPart('3008', Colors.WHITE, ROCKET_CENTER_X + 20, y, ROCKET_CENTER_Z + 20);
  builder.addPart('3008', Colors.WHITE, ROCKET_CENTER_X - 20, y, ROCKET_CENTER_Z + 20);
  builder.addPart('3008', Colors.WHITE, ROCKET_CENTER_X + 20, y, ROCKET_CENTER_Z - 20);
  builder.addPart('3008', Colors.WHITE, ROCKET_CENTER_X - 20, y, ROCKET_CENTER_Z - 20);
}

// Escape rocket motor
builder.addPart('3942c', Colors.RED, ROCKET_CENTER_X, lesY - 200, ROCKET_CENTER_Z);

// === LAUNCH TOWER ===
const TOWER_X = 350;
const TOWER_HEIGHT = 2500;
const PLATFORM_LEVELS = 9;

// Main tower structure - vertical beams
for (let h = 0; h < 100; h++) {
  const y = ROCKET_BASE_Y - (h * 24);

  // Four corner posts
  builder.addPart('3001', Colors.RED, TOWER_X, y, 100);
  builder.addPart('3001', Colors.RED, TOWER_X, y, -100);
  builder.addPart('3001', Colors.RED, TOWER_X + 100, y, 100);
  builder.addPart('3001', Colors.RED, TOWER_X + 100, y, -100);

  // Cross bracing every 10 layers
  if (h % 10 === 0) {
    // Horizontal beams
    builder.addPartRotatedY90('3008', Colors.RED, TOWER_X, y, 0);
    builder.addPartRotatedY90('3008', Colors.RED, TOWER_X + 100, y, 0);

    // Diagonal bracing
    builder.addPart('3700', Colors.DARK_GRAY, TOWER_X + 50, y, 50,
      0.707, 0, 0.707,
      0, 1, 0,
      -0.707, 0, 0.707
    );
  }
}

// Service platforms at different levels
const platformHeights = [
  ROCKET_BASE_Y - 200,  // Lower platform
  ROCKET_BASE_Y - 500,  // Mid platform
  ROCKET_BASE_Y - 800,  // Upper platform
  ROCKET_BASE_Y - 1100, // Command module level
  ROCKET_BASE_Y - 1400, // Top platform
];

for (const platformY of platformHeights) {
  // Platform floor
  for (let x = TOWER_X - 150; x <= TOWER_X; x += 20) {
    for (let z = -100; z <= 100; z += 20) {
      builder.addPlate('3020', Colors.DARK_GRAY, x, platformY, z);
    }
  }

  // Swing arm connecting to rocket
  const armLength = Math.abs(TOWER_X - ROCKET_CENTER_X) - stage3Radius;
  for (let x = ROCKET_CENTER_X + stage3Radius; x < TOWER_X - 20; x += 40) {
    builder.addPart('3701', Colors.WHITE, x, platformY, 0); // Technic beam
  }

  // Umbilical connections
  builder.addPart('3004', Colors.BLACK, ROCKET_CENTER_X + stage3Radius + 20, platformY - 8, 0);
  builder.addPart('4589', Colors.RED, ROCKET_CENTER_X + stage3Radius + 20, platformY - 16, 0);
}

// Elevator shaft
for (let h = 0; h < 100; h++) {
  const y = ROCKET_BASE_Y - (h * 24);
  builder.addPart('3065', Colors.TRANS_CLEAR, TOWER_X + 50, y, -150); // Glass panels
}

// Crane at top of tower
const craneY = ROCKET_BASE_Y - TOWER_HEIGHT;
builder.addPartRotatedY90('3008', Colors.YELLOW, TOWER_X + 50, craneY, 0); // Crane arm
builder.addPart('3701', Colors.YELLOW, TOWER_X + 50, craneY - 24, -100); // Crane boom

// === GROUND SUPPORT EQUIPMENT ===
// Fuel tanks
for (let i = 0; i < 3; i++) {
  const x = -300 - (i * 100);
  const z = -200;

  // Cylindrical tanks
  for (let h = 0; h < 20; h++) {
    builder.addPart('4589', Colors.WHITE, x, ROCKET_BASE_Y - (h * 24), z);
  }

  // Tank tops
  builder.addPart('3960', Colors.RED, x, ROCKET_BASE_Y - 480, z);
}

// Crawler transporter tracks
for (let x = -100; x <= 100; x += 20) {
  builder.addPart('3001', Colors.BLACK, x, ROCKET_BASE_Y + 24, -300); // Track segments
  builder.addPart('3001', Colors.BLACK, x, ROCKET_BASE_Y + 24, 300);
}

// === DETAILS AND FINISHING TOUCHES ===
// American flag
builder.addPart('3070b', Colors.RED, -400, ROCKET_BASE_Y - 48, 0);
builder.addPart('3070b', Colors.WHITE, -400, ROCKET_BASE_Y - 56, 0);
builder.addPart('3070b', Colors.BLUE, -400, ROCKET_BASE_Y - 64, 0);

// NASA logo area (simplified)
builder.addPart('3068b', Colors.WHITE, stage2Radius + 20, stage2StartY - 300, 0);
builder.addPart('3070b', Colors.RED, stage2Radius + 20, stage2StartY - 308, 10);
builder.addPart('3070b', Colors.BLUE, stage2Radius + 20, stage2StartY - 308, -10);

// Lightning protection towers
for (let i = 0; i < 4; i++) {
  const angle = (i * Math.PI) / 2;
  const x = 500 * Math.cos(angle);
  const z = 500 * Math.sin(angle);

  for (let h = 0; h < 40; h++) {
    builder.addPart('3008', Colors.LIGHT_GRAY, x, ROCKET_BASE_Y - (h * 24), z);
  }

  // Lightning rod tip
  builder.addPart('4589', Colors.YELLOW, x, ROCKET_BASE_Y - 960, z);
}

// Control bunker
for (let x = -500; x <= -400; x += 20) {
  for (let z = -100; z <= 100; z += 20) {
    builder.addBrick('3004', Colors.DARK_GRAY, x, ROCKET_BASE_Y - 24, z);
  }
}

// Observation windows
builder.addPart('3065', Colors.TRANS_CLEAR, -400, ROCKET_BASE_Y - 24, 0);

// === SAVE THE MODEL ===
const filename = 'apollo-saturn-v-detailed.ldr';
builder.save(filename);

// Log statistics
console.log('===========================================');
console.log('🚀 APOLLO SATURN V ROCKET MODEL COMPLETE 🚀');
console.log('===========================================');
console.log(`Total parts used: ${builder.getPartCount()}`);
console.log('Model includes:');
console.log('- Stage 1 (S-IC) with 5 F-1 engines');
console.log('- Stage 2 (S-II) with 5 J-2 engines');
console.log('- Stage 3 (S-IVB) with 1 J-2 engine');
console.log('- Instrument Unit with sensors');
console.log('- Service Module with SPS engine');
console.log('- Command Module with heat shield');
console.log('- Launch Escape System');
console.log('- Launch Tower with 5 service platforms');
console.log('- Ground support equipment');
console.log('- Fuel tanks and crawler tracks');
console.log('- Lightning protection towers');
console.log('- Control bunker');
console.log('===========================================');
console.log(`Model saved to: ${filename}`);