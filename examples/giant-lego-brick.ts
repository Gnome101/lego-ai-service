// Giant LEGO Brick Model
// A massive 2x4 LEGO brick built from smaller LEGO pieces

import { LDrawBuilder, Colors } from '../src/ldrawBuilder';

const builder = new LDrawBuilder('Giant LEGO Brick');
builder.setAuthor('LEGO AI - Meta Build');

// === CONSTANTS ===
// Scale factor - making the brick 10x larger than normal
const SCALE = 10;
const STUD_DIAMETER = 20 * SCALE; // 200 LDU
const STUD_HEIGHT = 8 * SCALE; // 80 LDU
const BRICK_WIDTH = 40 * SCALE; // 400 LDU (2 studs wide)
const BRICK_LENGTH = 80 * SCALE; // 800 LDU (4 studs long)
const BRICK_HEIGHT = 24 * SCALE; // 240 LDU
const WALL_THICKNESS = 4 * SCALE; // 40 LDU

// Position offsets for centering
const CENTER_X = 0;
const CENTER_Y = 0;
const CENTER_Z = 0;

// Color for the giant brick - classic red
const BRICK_COLOR = Colors.RED;

// === BOTTOM PLATE ===
// Build the bottom surface using plates
for (let x = CENTER_X - BRICK_WIDTH/2; x < CENTER_X + BRICK_WIDTH/2; x += 40) {
  for (let z = CENTER_Z - BRICK_LENGTH/2; z < CENTER_Z + BRICK_LENGTH/2; z += 80) {
    builder.addPlate('3020', BRICK_COLOR, x + 20, CENTER_Y, z + 40); // 2x4 plate
  }
}

// === WALLS ===
// Front wall (along X axis, negative Z)
for (let x = CENTER_X - BRICK_WIDTH/2; x < CENTER_X + BRICK_WIDTH/2; x += 20) {
  for (let y = CENTER_Y; y > CENTER_Y - BRICK_HEIGHT; y -= 24) {
    builder.addBrick('3005', BRICK_COLOR, x + 10, y - 12, CENTER_Z - BRICK_LENGTH/2 + 10); // 1x1 brick

    // Inner wall layer for thickness
    if (y > CENTER_Y - BRICK_HEIGHT + 24) {
      builder.addBrick('3005', BRICK_COLOR, x + 10, y - 12, CENTER_Z - BRICK_LENGTH/2 + 30);
    }
  }
}

// Back wall (along X axis, positive Z)
for (let x = CENTER_X - BRICK_WIDTH/2; x < CENTER_X + BRICK_WIDTH/2; x += 20) {
  for (let y = CENTER_Y; y > CENTER_Y - BRICK_HEIGHT; y -= 24) {
    builder.addBrick('3005', BRICK_COLOR, x + 10, y - 12, CENTER_Z + BRICK_LENGTH/2 - 10);

    // Inner wall layer
    if (y > CENTER_Y - BRICK_HEIGHT + 24) {
      builder.addBrick('3005', BRICK_COLOR, x + 10, y - 12, CENTER_Z + BRICK_LENGTH/2 - 30);
    }
  }
}

// Left wall (along Z axis, negative X)
for (let z = CENTER_Z - BRICK_LENGTH/2; z < CENTER_Z + BRICK_LENGTH/2; z += 20) {
  for (let y = CENTER_Y; y > CENTER_Y - BRICK_HEIGHT; y -= 24) {
    builder.addBrick('3005', BRICK_COLOR, CENTER_X - BRICK_WIDTH/2 + 10, y - 12, z + 10);

    // Inner wall layer
    if (y > CENTER_Y - BRICK_HEIGHT + 24) {
      builder.addBrick('3005', BRICK_COLOR, CENTER_X - BRICK_WIDTH/2 + 30, y - 12, z + 10);
    }
  }
}

// Right wall (along Z axis, positive X)
for (let z = CENTER_Z - BRICK_LENGTH/2; z < CENTER_Z + BRICK_LENGTH/2; z += 20) {
  for (let y = CENTER_Y; y > CENTER_Y - BRICK_HEIGHT; y -= 24) {
    builder.addBrick('3005', BRICK_COLOR, CENTER_X + BRICK_WIDTH/2 - 10, y - 12, z + 10);

    // Inner wall layer
    if (y > CENTER_Y - BRICK_HEIGHT + 24) {
      builder.addBrick('3005', BRICK_COLOR, CENTER_X + BRICK_WIDTH/2 - 30, y - 12, z + 10);
    }
  }
}

// === INTERNAL SUPPORT STRUCTURE ===
// Add internal supports for structural integrity
// Cross beams along X axis
for (let z = CENTER_Z - BRICK_LENGTH/2 + 100; z < CENTER_Z + BRICK_LENGTH/2; z += 200) {
  for (let y = CENTER_Y - 48; y > CENTER_Y - BRICK_HEIGHT + 24; y -= 48) {
    for (let x = CENTER_X - BRICK_WIDTH/2 + 40; x < CENTER_X + BRICK_WIDTH/2 - 40; x += 40) {
      builder.addBrick('3004', BRICK_COLOR, x, y, z); // 1x2 brick
    }
  }
}

// Cross beams along Z axis
for (let x = CENTER_X - BRICK_WIDTH/2 + 100; x < CENTER_X + BRICK_WIDTH/2; x += 200) {
  for (let y = CENTER_Y - 72; y > CENTER_Y - BRICK_HEIGHT + 24; y -= 48) {
    builder.addPartRotatedY90('3001', BRICK_COLOR, x, y, CENTER_Z); // 2x4 brick rotated
  }
}

// === STUDS ON TOP ===
// 2x4 = 8 studs total
const studPositions = [
  // First row
  {x: CENTER_X - BRICK_WIDTH/4, z: CENTER_Z - BRICK_LENGTH/2 + 100},
  {x: CENTER_X + BRICK_WIDTH/4, z: CENTER_Z - BRICK_LENGTH/2 + 100},
  // Second row
  {x: CENTER_X - BRICK_WIDTH/4, z: CENTER_Z - BRICK_LENGTH/2 + 300},
  {x: CENTER_X + BRICK_WIDTH/4, z: CENTER_Z - BRICK_LENGTH/2 + 300},
  // Third row
  {x: CENTER_X - BRICK_WIDTH/4, z: CENTER_Z + BRICK_LENGTH/2 - 300},
  {x: CENTER_X + BRICK_WIDTH/4, z: CENTER_Z + BRICK_LENGTH/2 - 300},
  // Fourth row
  {x: CENTER_X - BRICK_WIDTH/4, z: CENTER_Z + BRICK_LENGTH/2 - 100},
  {x: CENTER_X + BRICK_WIDTH/4, z: CENTER_Z + BRICK_LENGTH/2 - 100},
];

for (const pos of studPositions) {
  // Build each stud as a cylinder using stacked round bricks
  for (let h = 0; h < 4; h++) {
    const y = CENTER_Y - BRICK_HEIGHT - (h * 24);

    // Create circular stud using round bricks arranged in a circle
    const segments = 12;
    const radius = STUD_DIAMETER / 2 - 10;

    for (let i = 0; i < segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      const x = pos.x + Math.cos(angle) * radius;
      const z = pos.z + Math.sin(angle) * radius;

      builder.addPart('3062b', BRICK_COLOR, x, y, z); // Round brick 1x1
    }

    // Fill center
    builder.addPart('3062b', BRICK_COLOR, pos.x, y, pos.z);
  }

  // Add "LEGO" text on top of each stud (simplified as a tile)
  builder.addPart('3070b', BRICK_COLOR, pos.x, CENTER_Y - BRICK_HEIGHT - 96, pos.z); // 1x1 tile
}

// === UNDERSIDE DETAILS ===
// Create the hollow underside with tubes for stud connections
// These are the circular tubes that allow LEGO bricks to connect
const tubePositions = [
  // Between studs positions - 6 tubes for a 2x4 brick
  {x: CENTER_X, z: CENTER_Z - BRICK_LENGTH/2 + 100},
  {x: CENTER_X, z: CENTER_Z - BRICK_LENGTH/2 + 300},
  {x: CENTER_X, z: CENTER_Z + BRICK_LENGTH/2 - 300},
  {x: CENTER_X, z: CENTER_Z + BRICK_LENGTH/2 - 100},
  {x: CENTER_X - BRICK_WIDTH/4, z: CENTER_Z},
  {x: CENTER_X + BRICK_WIDTH/4, z: CENTER_Z},
];

for (const pos of tubePositions) {
  // Build tubes extending downward from inside the brick
  for (let h = 1; h < 8; h++) {
    const y = CENTER_Y - (h * 24);

    // Create tube walls
    const tubeRadius = 60;
    const segments = 8;

    for (let i = 0; i < segments; i++) {
      const angle = (i * 2 * Math.PI) / segments;
      const x = pos.x + Math.cos(angle) * tubeRadius;
      const z = pos.z + Math.sin(angle) * tubeRadius;

      builder.addPart('3005', BRICK_COLOR, x, y, z); // 1x1 brick
    }
  }
}

// === CORNER REINFORCEMENTS ===
// Add extra reinforcement at corners for strength
const corners = [
  {x: CENTER_X - BRICK_WIDTH/2 + 20, z: CENTER_Z - BRICK_LENGTH/2 + 20},
  {x: CENTER_X - BRICK_WIDTH/2 + 20, z: CENTER_Z + BRICK_LENGTH/2 - 20},
  {x: CENTER_X + BRICK_WIDTH/2 - 20, z: CENTER_Z - BRICK_LENGTH/2 + 20},
  {x: CENTER_X + BRICK_WIDTH/2 - 20, z: CENTER_Z + BRICK_LENGTH/2 - 20},
];

for (const corner of corners) {
  for (let y = CENTER_Y - 24; y > CENTER_Y - BRICK_HEIGHT + 24; y -= 24) {
    // Create L-shaped corner reinforcement
    builder.addBrick('3004', BRICK_COLOR, corner.x, y, corner.z); // 1x2 brick
    builder.addPartRotatedY90('3004', BRICK_COLOR, corner.x, y, corner.z); // 1x2 brick rotated
  }
}

// === TOP RIM ===
// Create the characteristic rim around the top edge
for (let x = CENTER_X - BRICK_WIDTH/2; x < CENTER_X + BRICK_WIDTH/2; x += 40) {
  // Front rim
  builder.addPlate('3623', BRICK_COLOR, x + 20, CENTER_Y - BRICK_HEIGHT - 8, CENTER_Z - BRICK_LENGTH/2 + 20); // 1x3 plate
  // Back rim
  builder.addPlate('3623', BRICK_COLOR, x + 20, CENTER_Y - BRICK_HEIGHT - 8, CENTER_Z + BRICK_LENGTH/2 - 20);
}

for (let z = CENTER_Z - BRICK_LENGTH/2; z < CENTER_Z + BRICK_LENGTH/2; z += 40) {
  // Left rim
  builder.addPartRotatedY90('3623', BRICK_COLOR, CENTER_X - BRICK_WIDTH/2 + 20, CENTER_Y - BRICK_HEIGHT - 8, z + 20);
  // Right rim
  builder.addPartRotatedY90('3623', BRICK_COLOR, CENTER_X + BRICK_WIDTH/2 - 20, CENTER_Y - BRICK_HEIGHT - 8, z + 20);
}

// === DETAILS AND FINISHING ===
// Add some decorative elements to show scale

// Minifigure for scale reference (placed next to the giant brick)
builder.addPart('3626b', Colors.YELLOW, CENTER_X + BRICK_WIDTH/2 + 100, CENTER_Y - 24, CENTER_Z); // Minifig head
builder.addPart('3815', Colors.BLUE, CENTER_X + BRICK_WIDTH/2 + 100, CENTER_Y - 48, CENTER_Z); // Minifig legs
builder.addPart('973', Colors.RED, CENTER_X + BRICK_WIDTH/2 + 100, CENTER_Y - 72, CENTER_Z); // Minifig torso

// Add a regular-sized 2x4 brick for comparison
builder.addBrick('3001', Colors.YELLOW, CENTER_X + BRICK_WIDTH/2 + 200, CENTER_Y - 12, CENTER_Z);

// Platform/base for display
for (let x = -600; x <= 600; x += 80) {
  for (let z = -1000; z <= 1000; z += 80) {
    builder.addPlate('3036', Colors.DARK_GRAY, x, CENTER_Y + 8, z); // 6x8 plate base
  }
}

// === SAVE THE MODEL ===
const filename = 'giant-lego-brick.ldr';
builder.save(filename);

