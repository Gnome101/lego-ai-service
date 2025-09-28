const CODE_EXAMPLES = `
## Code Examples

### Example 1: Simple Car with Wheels (using for loops)
\`\`\`typescript
const builder = new LDrawBuilder("Simple Car");

// Car body base plate
builder.addPlate('3031', Colors.RED, 0, 0, 0);

// Add wheels using a for loop
const wheelPositions = [
  { x: 30, z: -60 },  // Front right
  { x: -30, z: -60 }, // Front left
  { x: 30, z: 60 },   // Rear right
  { x: -30, z: 60 }   // Rear left
];

for (let i = 0; i < wheelPositions.length; i++) {
  const pos = wheelPositions[i];
  // Add wheel holder
  builder.addPart('4600', Colors.LIGHT_GRAY, pos.x, 6, pos.z);
  // Add tire on wheel holder
  builder.addWheel('3641', Colors.BLACK, pos.x, 6, pos.z);
}

// Car windshield
builder.addPart('3823', Colors.TRANS_CLEAR, 0, -16, -30);

// Car roof
builder.addPlate('3031', Colors.RED, 0, -24, 0);

builder.save('car.ldr');
\`\`\`

### Example 2: Staircase (using for loop)
\`\`\`typescript
const builder = new LDrawBuilder("Staircase");

const numSteps = 8;
for (let i = 0; i < numSteps; i++) {
  // Each step goes up by 8 LDU (1 plate height) and forward by 20 LDU (1 stud)
  builder.addPlate('3023', Colors.LIGHT_GRAY,
    0,           // x position
    -i * 8,      // y position (negative is up)
    i * 20       // z position (forward)
  );
}

builder.save('staircase.ldr');
\`\`\`

### Example 3: Pyramid (using nested for loops)
\`\`\`typescript
const builder = new LDrawBuilder("Pyramid");

const levels = 5;
for (let level = 0; level < levels; level++) {
  const size = levels - level; // Pyramid gets smaller as we go up

  for (let x = -size + 1; x < size; x++) {
    for (let z = -size + 1; z < size; z++) {
      builder.addBrick('3005', Colors.TAN,
        x * 20,        // x position
        -level * 24,   // y position (each brick is 24 LDU tall)
        z * 20         // z position
      );
    }
  }
}

builder.save('pyramid.ldr');
\`\`\`

### Example 4: Complex Car Assembly (demonstrates multi-step building)
\`\`\`typescript
const builder = new LDrawBuilder("Detailed Car");

// Step 1: Base and wheels
builder.addPart('4315', Colors.BLACK, 0, 0, -90);  // Front axle
builder.addPlate('3031', Colors.RED, 0, 0, 0);    // Base plate
builder.addPart('4315', Colors.BLACK, 0, 0, 90);   // Rear axle

// Add wheels to axles using for loop
const axleZ = [-90, 90];
for (let z of axleZ) {
  builder.addWheel('4600', Colors.LIGHT_GRAY, 30, 0, z);
  builder.addWheel('4600', Colors.LIGHT_GRAY, -30, 0, z);
}

builder.step(); // Mark end of building step

// Step 2: Car body
const bodyParts = [
  { part: '3024', color: Colors.YELLOW, x: 30, y: -8, z: -90 },
  { part: '3024', color: Colors.YELLOW, x: -30, y: -8, z: -90 },
  { part: '3020', color: Colors.RED, x: 0, y: -8, z: -60 },
  { part: '3024', color: Colors.RED, x: 30, y: -8, z: 30 },
  { part: '3024', color: Colors.RED, x: -30, y: -8, z: 30 },
  { part: '3021', color: Colors.RED, x: 0, y: -8, z: 50 },
  { part: '3710', color: Colors.RED, x: 0, y: -8, z: 90 }
];

// Use for...of loop for cleaner iteration
for (let partInfo of bodyParts) {
  builder.addPart(partInfo.part, partInfo.color, partInfo.x, partInfo.y, partInfo.z);
}

builder.step();

// Step 3: Windshield and interior
builder.addPart('3829c01', Colors.TRANS_CLEAR, 0, -16, -30);  // Windshield
builder.addPart('4079', Colors.BLUE, 0, -8, 0);              // Seat

builder.step();

// Step 4: Roof
builder.addPart('3788', Colors.RED, 0, -24, -60);
builder.addPart('3788', Colors.RED, 0, -24, 60);
builder.addPart('3024', Colors.ORANGE, 30, -24, 90);
builder.addPart('3024', Colors.ORANGE, -30, -24, 90);

builder.save('detailed_car.ldr');
\`\`\`

### Key Patterns to Use:

1. **For Loops**: Use for repetitive elements like wheels, windows, or structural patterns
2. **Arrays**: Store positions or configurations for iteration
3. **Variables**: Define dimensions, counts, and colors for easy modification
4. **Steps**: Use builder.step() to separate building phases
5. **Comments**: Add comments to explain complex positioning

### Coordinate System:
- X axis: Left (-) to Right (+)
- Y axis: Up (-) to Down (+)
- Z axis: Back (-) to Front (+)
- 1 stud = 20 LDU
- 1 plate height = 8 LDU
- 1 brick height = 24 LDU
`;

module.exports = { CODE_EXAMPLES };