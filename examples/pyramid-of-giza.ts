// Great Pyramid of Giza LEGO Model
// Historically accurate proportions with surrounding complex

import { LDrawBuilder, Colors } from '../src/ldrawBuilder';

const builder = new LDrawBuilder('Great Pyramid of Giza');
builder.setAuthor('LEGO AI - Ancient Wonders');

// === CONSTANTS ===
// The Great Pyramid originally: 146.5m height, 230.4m base
// Scale: 1 meter = 4 LDU (making it manageable size)
const PYRAMID_BASE_SIZE = 920; // 230.4m * 4
const PYRAMID_HEIGHT = 586; // 146.5m * 4
const CENTER_X = 0;
const CENTER_Y = 0;
const CENTER_Z = 0;

// Colors
const SANDSTONE = Colors.TAN;
const LIMESTONE = Colors.WHITE;
const DESERT_SAND = Colors.LIGHT_YELLOW;
const GRANITE = Colors.DARK_GRAY;

// === DESERT BASE ===
// Create large sandy foundation
for (let x = -1600; x <= 1600; x += 80) {
  for (let z = -1600; z <= 1600; z += 80) {
    builder.addPlate('3036', DESERT_SAND, x, CENTER_Y, z); // 6x8 desert base plates
  }
}

// Add some sand dunes using slopes
const dunePositions = [
  {x: -1200, z: -1200}, {x: 1200, z: -1200},
  {x: -1200, z: 1200}, {x: 1200, z: 1200},
  {x: -800, z: 800}, {x: 800, z: -800}
];

for (const pos of dunePositions) {
  // Create small dune with slopes
  for (let layer = 0; layer < 3; layer++) {
    const size = 60 - (layer * 20);
    for (let dx = -size; dx <= size; dx += 40) {
      for (let dz = -size; dz <= size; dz += 40) {
        builder.addPart('3039', DESERT_SAND, pos.x + dx, CENTER_Y - (layer * 8), pos.z + dz); // Slope 2x2
      }
    }
  }
}

// === PYRAMID FOUNDATION ===
// Solid foundation platform
for (let x = CENTER_X - PYRAMID_BASE_SIZE/2; x <= CENTER_X + PYRAMID_BASE_SIZE/2; x += 40) {
  for (let z = CENTER_Z - PYRAMID_BASE_SIZE/2; z <= CENTER_Z + PYRAMID_BASE_SIZE/2; z += 40) {
    builder.addPlate('3031', GRANITE, x, CENTER_Y - 8, z); // 4x4 plate foundation
  }
}

// === MAIN PYRAMID STRUCTURE ===
// Build pyramid using stepped layers (historically accurate step pyramid core)
const LAYERS = 50; // Number of layers to create smooth slope

for (let layer = 0; layer < LAYERS; layer++) {
  const y = CENTER_Y - 16 - (layer * (PYRAMID_HEIGHT / LAYERS));
  const layerSize = PYRAMID_BASE_SIZE * (1 - layer / LAYERS);

  // Skip if layer would be too small
  if (layerSize < 40) continue;

  // Determine step size for this layer
  const stepSize = (layer % 5 === 0) ? 40 : 20; // Larger blocks every 5 layers

  // Build square layer
  for (let x = CENTER_X - layerSize/2; x <= CENTER_X + layerSize/2 - stepSize; x += stepSize) {
    for (let z = CENTER_Z - layerSize/2; z <= CENTER_Z + layerSize/2 - stepSize; z += stepSize) {
      // Use different colors for casing vs core
      const isEdge = (
        x <= CENTER_X - layerSize/2 + stepSize ||
        x >= CENTER_X + layerSize/2 - stepSize * 2 ||
        z <= CENTER_Z - layerSize/2 + stepSize ||
        z >= CENTER_Z + layerSize/2 - stepSize * 2
      );

      const color = isEdge ? LIMESTONE : SANDSTONE;

      if (stepSize === 40) {
        builder.addBrick('3001', color, x + 20, y, z + 20); // 2x4 brick
      } else {
        builder.addBrick('3005', color, x + 10, y, z + 10); // 1x1 brick
      }
    }
  }

  // Add corner slopes for smoother appearance every few layers
  if (layer % 3 === 0 && layer < LAYERS - 5) {
    // Northeast corner
    builder.addPart('3676', LIMESTONE,
      CENTER_X + layerSize/2 - 20, y - 12, CENTER_Z + layerSize/2 - 20); // Corner slope
    // Northwest corner
    builder.addPart('3676', LIMESTONE,
      CENTER_X - layerSize/2 + 20, y - 12, CENTER_Z + layerSize/2 - 20,
      0, 0, 1, 0, 1, 0, -1, 0, 0); // Rotated
    // Southwest corner
    builder.addPart('3676', LIMESTONE,
      CENTER_X - layerSize/2 + 20, y - 12, CENTER_Z - layerSize/2 + 20,
      -1, 0, 0, 0, 1, 0, 0, 0, -1); // Rotated 180
    // Southeast corner
    builder.addPart('3676', LIMESTONE,
      CENTER_X + layerSize/2 - 20, y - 12, CENTER_Z - layerSize/2 + 20,
      0, 0, -1, 0, 1, 0, 1, 0, 0); // Rotated 270
  }
}

// === PYRAMID CAP (PYRAMIDION) ===
// Gold-plated capstone at the top
const capY = CENTER_Y - 16 - PYRAMID_HEIGHT;
builder.addPart('3942c', Colors.YELLOW, CENTER_X, capY, CENTER_Z); // Gold cone for pyramidion
builder.addPart('3070b', Colors.YELLOW, CENTER_X, capY - 8, CENTER_Z); // Gold plate base

// === ENTRANCE ===
// Original entrance on the north face, about 1/3 up
const entranceY = CENTER_Y - 16 - (PYRAMID_HEIGHT / 3);
const entranceZ = CENTER_Z - PYRAMID_BASE_SIZE/2 + 100;

// Create entrance opening
builder.addPart('3189', Colors.BLACK, CENTER_X, entranceY, entranceZ); // Door frame
builder.addPart('3195', Colors.DARK_GRAY, CENTER_X, entranceY - 24, entranceZ); // Stone door

// Entrance corridor leading inside
for (let depth = 0; depth < 100; depth += 20) {
  builder.addBrick('3004', Colors.BLACK, CENTER_X, entranceY, entranceZ + depth); // Corridor
}

// === INTERNAL CHAMBERS (simplified representation) ===
// King's Chamber - center of pyramid, 1/3 height
const kingsChamberY = CENTER_Y - 16 - (PYRAMID_HEIGHT / 3);
for (let x = CENTER_X - 40; x <= CENTER_X + 40; x += 40) {
  for (let z = CENTER_Z - 40; z <= CENTER_Z + 40; z += 40) {
    builder.addPart('3001', GRANITE, x, kingsChamberY, z); // Granite blocks
  }
}

// Grand Gallery - angled passage
for (let i = 0; i < 10; i++) {
  const galleryY = kingsChamberY + (i * 8);
  const galleryZ = CENTER_Z - 60 - (i * 10);
  builder.addBrick('3010', Colors.DARK_GRAY, CENTER_X, galleryY, galleryZ); // 1x4 brick
}

// === SURROUNDING COMPLEX ===

// === QUEEN'S PYRAMIDS (3 smaller pyramids) ===
const queenPyramidPositions = [
  {x: CENTER_X + PYRAMID_BASE_SIZE/2 + 300, z: CENTER_Z - 200},
  {x: CENTER_X + PYRAMID_BASE_SIZE/2 + 300, z: CENTER_Z},
  {x: CENTER_X + PYRAMID_BASE_SIZE/2 + 300, z: CENTER_Z + 200}
];

for (const pos of queenPyramidPositions) {
  // Each queen's pyramid is about 1/5 the size
  const size = PYRAMID_BASE_SIZE / 5;
  const height = PYRAMID_HEIGHT / 5;
  const layers = 10;

  for (let layer = 0; layer < layers; layer++) {
    const y = CENTER_Y - 16 - (layer * (height / layers));
    const layerSize = size * (1 - layer / layers);

    if (layerSize < 20) continue;

    for (let x = pos.x - layerSize/2; x <= pos.x + layerSize/2 - 20; x += 20) {
      for (let z = pos.z - layerSize/2; z <= pos.z + layerSize/2 - 20; z += 20) {
        builder.addBrick('3005', SANDSTONE, x + 10, y, z + 10);
      }
    }
  }

  // Cap
  builder.addPart('3942c', SANDSTONE, pos.x, CENTER_Y - 16 - height, pos.z);
}

// === MORTUARY TEMPLE ===
// East side of pyramid
const templeX = CENTER_X - PYRAMID_BASE_SIZE/2 - 200;
const templeZ = CENTER_Z;

// Temple platform
for (let x = templeX - 100; x <= templeX + 100; x += 40) {
  for (let z = templeZ - 60; z <= templeZ + 60; z += 40) {
    builder.addPlate('3031', GRANITE, x, CENTER_Y - 8, z); // 4x4 plate
  }
}

// Temple columns
const columnPositions = [
  {x: templeX - 60, z: templeZ - 40}, {x: templeX - 60, z: templeZ},
  {x: templeX - 60, z: templeZ + 40}, {x: templeX + 60, z: templeZ - 40},
  {x: templeX + 60, z: templeZ}, {x: templeX + 60, z: templeZ + 40}
];

for (const pos of columnPositions) {
  // Build columns
  for (let h = 0; h < 6; h++) {
    builder.addPart('3062b', LIMESTONE, pos.x, CENTER_Y - 16 - (h * 24), pos.z); // Round brick column
  }
  // Column capital
  builder.addPart('4740', LIMESTONE, pos.x, CENTER_Y - 16 - 144, pos.z); // Dish for capital
}

// Temple roof
for (let x = templeX - 80; x <= templeX + 80; x += 40) {
  for (let z = templeZ - 60; z <= templeZ + 60; z += 40) {
    builder.addPlate('3036', SANDSTONE, x, CENTER_Y - 160, z); // Roof plates
  }
}

// === CAUSEWAY ===
// Ceremonial road connecting temple to pyramid
for (let x = templeX + 120; x <= CENTER_X - PYRAMID_BASE_SIZE/2 - 20; x += 40) {
  builder.addPlate('3034', GRANITE, x, CENTER_Y - 8, templeZ); // 2x8 plate for road

  // Side walls every 80 units
  if (x % 80 === 0) {
    builder.addBrick('3005', SANDSTONE, x, CENTER_Y - 24, templeZ - 40);
    builder.addBrick('3005', SANDSTONE, x, CENTER_Y - 24, templeZ + 40);
  }
}

// === BOAT PITS ===
// Archaeological boat burial sites
const boatPitPositions = [
  {x: CENTER_X - 200, z: CENTER_Z - PYRAMID_BASE_SIZE/2 - 150},
  {x: CENTER_X + 200, z: CENTER_Z - PYRAMID_BASE_SIZE/2 - 150}
];

for (const pos of boatPitPositions) {
  // Dig boat-shaped pit
  for (let i = -60; i <= 60; i += 20) {
    builder.addPart('3010', Colors.BROWN, pos.x + i, CENTER_Y, pos.z); // 1x4 brick for boat shape
  }

  // Boat remnants
  builder.addPart('3010', Colors.BROWN, pos.x, CENTER_Y - 8, pos.z); // Boat keel
  builder.addPartRotatedY90('3010', Colors.BROWN, pos.x - 20, CENTER_Y - 8, pos.z); // Boat ribs
  builder.addPartRotatedY90('3010', Colors.BROWN, pos.x + 20, CENTER_Y - 8, pos.z);
}

// === SPHINX (simplified) ===
// Located to the east
const sphinxX = CENTER_X - PYRAMID_BASE_SIZE/2 - 600;
const sphinxZ = CENTER_Z - 200;

// Sphinx body (lion body)
for (let x = 0; x < 120; x += 20) {
  for (let z = 0; z < 60; z += 20) {
    for (let y = 0; y < 48; y += 24) {
      builder.addBrick('3004', SANDSTONE, sphinxX + x, CENTER_Y - 16 - y, sphinxZ + z);
    }
  }
}

// Sphinx head (pharaoh head)
for (let y = 0; y < 72; y += 24) {
  builder.addBrick('3001', SANDSTONE, sphinxX + 100, CENTER_Y - 64 - y, sphinxZ + 20); // Head
}

// Headdress
builder.addPart('3004', Colors.BLUE, sphinxX + 100, CENTER_Y - 136, sphinxZ + 10); // Nemes headdress
builder.addPart('3004', Colors.YELLOW, sphinxX + 100, CENTER_Y - 136, sphinxZ + 30); // Gold stripes

// Front paws
builder.addPartRotatedY90('3010', SANDSTONE, sphinxX - 20, CENTER_Y - 8, sphinxZ + 10); // Left paw
builder.addPartRotatedY90('3010', SANDSTONE, sphinxX - 20, CENTER_Y - 8, sphinxZ + 50); // Right paw

// === WORKERS' VILLAGE ===
// Small settlement for pyramid builders
const villageX = CENTER_X + PYRAMID_BASE_SIZE/2 + 600;
const villageZ = CENTER_Z + 400;

// Simple houses
for (let hx = 0; hx < 200; hx += 60) {
  for (let hz = 0; hz < 200; hz += 60) {
    // House walls
    for (let wall = 0; wall < 3; wall++) {
      builder.addBrick('3004', Colors.TAN, villageX + hx, CENTER_Y - 16 - (wall * 24), villageZ + hz);
      builder.addBrick('3004', Colors.TAN, villageX + hx + 20, CENTER_Y - 16 - (wall * 24), villageZ + hz);
    }
    // Roof
    builder.addPlate('3020', Colors.BROWN, villageX + hx + 10, CENTER_Y - 88, villageZ + hz);
  }
}

// === HIEROGLYPHICS WALL ===
// Decorative wall with symbols
const wallX = CENTER_X - PYRAMID_BASE_SIZE/2 + 50;
for (let z = CENTER_Z - 200; z <= CENTER_Z + 200; z += 40) {
  builder.addBrick('3001', LIMESTONE, wallX, CENTER_Y - 24, z); // Wall sections

  // Add decorative tiles to represent hieroglyphics
  if (z % 80 === 0) {
    builder.addPart('3068b', Colors.BLUE, wallX - 10, CENTER_Y - 32, z); // Decorative tile
  }
}

// === OBELISKS ===
// Ceremonial obelisks
const obeliskPositions = [
  {x: CENTER_X - PYRAMID_BASE_SIZE/2 - 100, z: CENTER_Z - 300},
  {x: CENTER_X - PYRAMID_BASE_SIZE/2 - 100, z: CENTER_Z + 300}
];

for (const pos of obeliskPositions) {
  // Obelisk shaft
  for (let h = 0; h < 12; h++) {
    builder.addBrick('3005', GRANITE, pos.x, CENTER_Y - 16 - (h * 24), pos.z);
  }
  // Pyramidion top
  builder.addPart('3942c', Colors.YELLOW, pos.x, CENTER_Y - 16 - 288, pos.z);
}

// === PALM TREES ===
// Add some vegetation near the Nile (east side)
const palmPositions = [
  {x: -1400, z: -500}, {x: -1400, z: 0}, {x: -1400, z: 500},
  {x: -1300, z: -300}, {x: -1300, z: 300}
];

for (const pos of palmPositions) {
  // Tree trunk
  for (let h = 0; h < 8; h++) {
    builder.addPart('3062b', Colors.BROWN, pos.x, CENTER_Y - (h * 24), pos.z);
  }
  // Palm fronds
  const frondAngles = [0, 60, 120, 180, 240, 300];
  for (const angle of frondAngles) {
    const rad = angle * Math.PI / 180;
    const fx = pos.x + Math.cos(rad) * 30;
    const fz = pos.z + Math.sin(rad) * 30;
    builder.addPart('3004', Colors.GREEN, fx, CENTER_Y - 192, fz); // Frond
  }
}

// === ARCHAEOLOGICAL EQUIPMENT ===
// Modern additions for scale and context
// Scaffolding on one face
for (let h = 0; h < 20; h++) {
  const scaffoldY = CENTER_Y - 16 - (h * 24);
  const scaffoldZ = CENTER_Z + PYRAMID_BASE_SIZE/2 + 40;

  builder.addPart('3008', Colors.LIGHT_GRAY, CENTER_X - 100, scaffoldY, scaffoldZ); // Scaffold beam
  builder.addPart('3008', Colors.LIGHT_GRAY, CENTER_X + 100, scaffoldY, scaffoldZ);
}

// Research tent
builder.addPart('3001', Colors.WHITE, CENTER_X + 800, CENTER_Y - 24, CENTER_Z + 800); // Tent walls
builder.addPart('3040', Colors.WHITE, CENTER_X + 800, CENTER_Y - 48, CENTER_Z + 800); // Tent roof

// === SAVE THE MODEL ===
const filename = 'pyramid-of-giza.ldr';
builder.save(filename);

// Statistics
console.log('=========================================');
console.log('🔺 GREAT PYRAMID OF GIZA MODEL COMPLETE 🔺');
console.log('=========================================');
console.log(`Total parts used: ${builder.getPartCount()}`);
console.log('Features:');
console.log('- Accurate pyramid proportions (146.5m height, 230.4m base)');
console.log('- Limestone casing with sandstone core');
console.log('- Gold pyramidion capstone');
console.log('- Original entrance and internal chambers');
console.log('- Three Queen\'s pyramids');
console.log('- Mortuary temple with columns');
console.log('- Ceremonial causeway');
console.log('- Sphinx statue');
console.log('- Boat burial pits');
console.log('- Workers\' village');
console.log('- Obelisks and palm trees');
console.log('- Archaeological scaffolding');
console.log('=========================================');
console.log(`Model saved to: ${filename}`);