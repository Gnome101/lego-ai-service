// Simple LEGO House Example with Step-by-Step Building Instructions
// Demonstrates various block types and building techniques

import { LDrawBuilder, Colors } from '../src/ldrawBuilder';

const builder = new LDrawBuilder('Simple House');
builder.setAuthor('LEGO AI Example');

// STEP 1: FOUNDATION
// === FOUNDATION - Using plates (thin blocks) ===
builder.addPlate('3867', Colors.GREEN, 0, 0, 0); // Large green baseplate

// === FLOOR - Using tiles and plates ===
for (let x = -60; x <= 60; x += 40) {
  for (let z = -60; z <= 60; z += 40) {
    const color = ((x + z) / 40) % 2 === 0 ? Colors.DARK_GRAY : Colors.LIGHT_GRAY;
    builder.addPlate('3070b', color, x, -8, z); // 1x1 tile
  }
}

builder.addStep(); // End of Step 1

// STEP 2: WALLS - FIRST LAYER
// === WALLS - Using standard bricks ===
// Front wall with door opening
for (let x = -120; x <= -60; x += 20) {
  builder.addBrick('3004', Colors.RED, x, -32, -80);
  builder.addBrick('3004', Colors.RED, x, -56, -80);
  builder.addBrick('3004', Colors.RED, x, -80, -80);
}
builder.addStep(); 

// Door opening (skip middle section)
// Right side of front wall
for (let x = 20; x <= 120; x += 20) {
  builder.addBrick('3004', Colors.RED, x, -32, -80);
  builder.addBrick('3004', Colors.RED, x, -56, -80);
  builder.addBrick('3004', Colors.RED, x, -80, -80);
}
builder.addStep(); 

// Back wall (continuous)
for (let x = -120; x <= 120; x += 20) {
  builder.addBrick('3004', Colors.RED, x, -32, 80);
  builder.addBrick('3004', Colors.RED, x, -56, 80);
  builder.addBrick('3004', Colors.RED, x, -80, 80);
}
builder.addStep(); 

// Left wall (short end WITHOUT windows)
builder.addPartRotatedY90('3001', Colors.RED, -120, -32, -60);
builder.addPartRotatedY90('3001', Colors.RED, -120, -32, -20);
builder.addPartRotatedY90('3001', Colors.RED, -120, -32, 20);
builder.addPartRotatedY90('3001', Colors.RED, -120, -32, 60);
builder.addStep(); // End of Step 2

// STEP 3: WALLS - SECOND LAYER
// Second layer
builder.addPartRotatedY90('3001', Colors.RED, -120, -56, -60);
builder.addPartRotatedY90('3001', Colors.RED, -120, -56, -20);
builder.addPartRotatedY90('3001', Colors.RED, -120, -56, 20);
builder.addPartRotatedY90('3001', Colors.RED, -120, -56, 60);

builder.addStep(); 

// >>> TRIANGULAR GABLE RAISE (close roof on left short end)
builder.addPartRotatedY90('3001', Colors.RED, -120, -80, -40);
builder.addPartRotatedY90('3001', Colors.RED, -120, -80, 0);
builder.addPartRotatedY90('3001', Colors.RED, -120, -80, 40);
builder.addPartRotatedY90('3001', Colors.RED, -120, -104, -20);
builder.addPartRotatedY90('3001', Colors.RED, -120, -104, 20);
builder.addPartRotatedY90('3004', Colors.RED, -120, -128, 0); // peak

builder.addStep(); 

// Right wall with window opening (short end WITH windows)
builder.addPartRotatedY90('3001', Colors.RED, 120, -32, -60);
builder.addPartRotatedY90('3001', Colors.RED, 120, -32, 60);
builder.addPartRotatedY90('3001', Colors.RED, 120, -56, -60);
builder.addPartRotatedY90('3001', Colors.RED, 120, -56, 60);
builder.addPartRotatedY90('3065', Colors.TRANS_CLEAR, 120, -80, -50);
builder.addPartRotatedY90('3065', Colors.TRANS_CLEAR, 120, -80, 50);
builder.addPartRotatedY90('3001', Colors.RED, 120, -32, 0);
builder.addPartRotatedY90('3001', Colors.RED, 120, -56, 0);

// Front door
builder.addPart('3195', Colors.BROWN, 0, -32, -80);

builder.addStep(); 

// STEP 4: ROOF STRUCTURE
// === ROOF - Using slope blocks ===
// Left side slopes
for (let x = -120; x <= 100; x += 20) {
  builder.addPart('3040', Colors.DARK_GRAY, x, -104, -40); // 1x2 slope 45°
  builder.addPart('3040', Colors.DARK_GRAY, x, -128, -20); // higher row
}
// Right side slopes (rotated 180°)
for (let x = -120; x <= 100; x += 20) {
  builder.addPart('3040', Colors.DARK_GRAY, x, -104, 40,
    -1, 0, 0,
     0, 1, 0,
     0, 0,-1
  );
  builder.addPart('3040', Colors.DARK_GRAY, x, -128, 20,
    -1, 0, 0,
     0, 1, 0,
     0, 0,-1
  );
}

builder.addStep(); // End of Step 4

// STEP 5: ROOF FINISHING
// === RIDGE CAP (continuous, same color as roof) ===
for (let x = -120; x <= 100; x += 20) {
  builder.addPlate('3023', Colors.DARK_GRAY, x, -136, 0);
}

// === ROOF GABLE INFILL (front & back) ===
for (let x = -100; x <= 100; x += 20) {
  builder.addBrick('3004', Colors.RED, x, -96, -80);  // front gable
  builder.addBrick('3004', Colors.RED, x, -96,  80);  // back gable
}
builder.addStep(); 

for (let x = -80; x <= 80; x += 20) {
  builder.addBrick('3004', Colors.RED, x, -112, -80);
  builder.addBrick('3004', Colors.RED, x, -112,  80);
}
builder.addStep(); 

for (let x = -60; x <= 60; x += 20) {
  builder.addBrick('3004', Colors.RED, x, -128, -80);
  builder.addBrick('3004', Colors.RED, x, -128,  80);
}
builder.addStep(); 

// Optional thin ridge cap plate under the *gable* peaks (kept red)
for (let x = -40; x <= 40; x += 20) {
  builder.addPlate('3023', Colors.RED, x, -136, -80);
  builder.addPlate('3023', Colors.RED, x, -136,  80);
}

builder.addStep(); // End of Step 5

// STEP 6: DETAILS AND DECORATIONS
// === DETAILS ===
builder.addBrick('3005', Colors.DARK_GRAY, 80, -104, 40);
builder.addBrick('3005', Colors.DARK_GRAY, 80, -128, 40);
builder.addBrick('3005', Colors.BLACK, 80, -152, 40);

builder.addStep(); // End of Step 5

const flowerPositions = [
  { x: -100, z: -100 },
  { x: -60, z: -100 },
  { x:  60, z: -100 },
  { x: 100, z: -100 },
];
for (const pos of flowerPositions) {
  builder.addPart('4073', Colors.GREEN, pos.x, -8, pos.z);
  builder.addPart('4589', Colors.YELLOW, pos.x, -16, pos.z);
}

builder.addStep(); // End of Step 6

// STEP 7: VEHICLE
// === VEHICLE ===
builder.addBrick('3001', Colors.BLUE, 200, -28, 0);
builder.addPlate('3021', Colors.BLUE, 200, -36, 0);
builder.addStep(); 

builder.addWheel('4624', 180, -10, -25);
builder.addWheel('4624', 220, -10, -25);
builder.addWheel('4624', 180, -10, 25);
builder.addWheel('4624', 220, -10, 25);

builder.addStep(); // End of Step 7

// STEP 8: ACCESSORIES AND ENVIRONMENT
// === MINIFIGURE ACCESSORIES ===
for (let x = -140; x <= 140; x += 80) {
  builder.addPart('3633', Colors.WHITE, x, -8, -140);
}
builder.addPart('4345', Colors.RED, -140, -8, -60);
builder.addPart('4346', Colors.RED, -140, -16, -60);
builder.addStep(); 

// === SPECIAL BLOCKS ===
builder.addPart('3700', Colors.DARK_GRAY, 0, -40, 0);
builder.addPartRotatedX90('3701', Colors.DARK_GRAY, 0, -40, 40);

// === FINISHING TOUCHES ===
builder.addPart('3062b', Colors.BROWN, 140, -20, 150);
builder.addPart('3062b', Colors.BROWN, 140, -32, 150);
builder.addPart('3062b', Colors.BROWN, 140, -56, 150);
builder.addPart('3942c', Colors.BRIGHT_GREEN, 140, -80, 150);
builder.addPart('4589', Colors.GREEN, 140, -96, 150);
builder.addStep(); 

// === EXTEND GRASS / FOUNDATION FOR CAR ===
builder.addPlate('3867', Colors.GREEN, 200, 0, 0);
builder.addPlate('3867', Colors.GREEN, 200, 0, -120);
builder.addPlate('3867', Colors.GREEN, 200, 0, 120);
builder.addPlate('3867', Colors.GREEN, 80,  0, 0);
builder.addPlate('3867', Colors.GREEN, 320, 0, 0);

builder.addStep(); // End of Step 8

// === SAVE THE MODEL ===
builder.save('simple-house-example.ldr');

console.log('Simple House model with 8 building steps saved successfully!');
