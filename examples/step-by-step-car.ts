export const CODE_EXAMPLE = String.raw`
const builder = new LDrawBuilder("Step-by-Step Car");
builder.setAuthor("LEGO AI - Building Instructions");

console.log("Building a car with clear step-by-step instructions...");

// ============================================
// STEP 1: CHASSIS AND WHEEL WELLS
// ============================================
console.log("Step 1: Building the chassis");

// Wheel well panels
builder.addPart("4315", Colors.BLACK, 0, 0, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4600", Colors.LIGHT_GRAY, 0, 0, -60, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3031", Colors.BLACK, 0, 0, 0, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4600", Colors.LIGHT_GRAY, 0, 0, 60, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4315", Colors.BLACK, 0, 0, 90, -1,0,0, 0,1,0, 0,0,-1);

// Mark end of step 1
builder.addStep();

// ============================================
// STEP 2: LOWER BODY AND FLOOR
// ============================================
console.log("Step 2: Adding lower body panels");

builder.addPart("3024", Colors.TRANS_CLEAR, 30, -8, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3024", Colors.TRANS_CLEAR, -30, -8, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3020", Colors.RED, 0, -8, -60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3623", Colors.RED, 30, -8, -10, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3623", Colors.RED, -30, -8, -10, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3024", Colors.RED, 30, -8, 30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3024", Colors.RED, -30, -8, 30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3021", Colors.RED, 0, -8, 50, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3710", Colors.RED, 0, -8, 90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4079", Colors.BLUE, 0, -8, 0, 1,0,0, 0,1,0, 0,0,1);

builder.addStep();

// ============================================
// STEP 3: CABIN STRUCTURE
// ============================================
console.log("Step 3: Building the cabin");

builder.addPart("3024", Colors.TRANS_CLEAR, 30, -16, 90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3024", Colors.TRANS_CLEAR, -30, -16, 90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3829c01", Colors.RED, 0, -16, -30, 1,0,0, 0,1,0, 0,0,1);

builder.addStep();

// ============================================
// STEP 4: UPPER BODY
// ============================================
console.log("Step 4: Adding upper body elements");

builder.addPart("3788", Colors.RED, 0, -24, -60, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3788", Colors.RED, 0, -24, 60, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3024", Colors.TRANS_RED, 30, -24, 90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3024", Colors.TRANS_RED, -30, -24, 90, 1,0,0, 0,1,0, 0,0,1);

builder.addStep();

// ============================================
// STEP 5: WINDSHIELD AND STRUCTURE
// ============================================
console.log("Step 5: Installing windshield and structural elements");

builder.addPart("3937", Colors.LIGHT_GRAY, 0, -32, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3938", Colors.LIGHT_GRAY, 0, -32, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4070", Colors.RED, 30, -32, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4070", Colors.RED, -30, -32, -90, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("6141", Colors.TRANS_CLEAR, 30, -22, -104, 1,0,0, 0,0,-1, 0,1,0);
builder.addPart("6141", Colors.TRANS_CLEAR, -30, -22, -104, 1,0,0, 0,0,-1, 0,1,0);
builder.addPart("3023", Colors.RED, 30, -32, -60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3023", Colors.RED, -30, -32, -60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3822", Colors.RED, 30, -32, -30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3821", Colors.RED, -30, -32, -30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3005", Colors.RED, 30, -32, 30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3005", Colors.RED, -30, -32, 30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3623", Colors.RED, 30, -32, 70, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3623", Colors.RED, -30, -32, 70, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3004", Colors.RED, 0, -32, 90, 1,0,0, 0,1,0, 0,0,1);

builder.addStep();

// ============================================
// STEP 6: ROOF
// ============================================
console.log("Step 6: Completing the roof");

builder.addPart("3068b", Colors.RED, 0, -40, -80, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3023", Colors.RED, 30, -40, -80, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3023", Colors.RED, -30, -40, -80, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3004", Colors.RED, 0, -40, -50, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3023", Colors.RED, 30, -40, -40, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3023", Colors.RED, -30, -40, -40, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3023", Colors.BLACK, 30, -40, 40, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3023", Colors.BLACK, -30, -40, 40, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3024", Colors.BLACK, 30, -40, 70, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3024", Colors.BLACK, -30, -40, 70, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3710", Colors.BLACK, 0, -40, 90, 1,0,0, 0,1,0, 0,0,1);

builder.addStep();

// ============================================
// STEP 7: WINDOWS
// ============================================
console.log("Step 7: Installing windows");

builder.addPart("3823", Colors.TRANS_LIGHT_BLUE, 0, -88, -30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("4214", Colors.BLACK, 0, -88, 30, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3823", Colors.TRANS_LIGHT_BLUE, 0, -88, 70, -1,0,0, 0,1,0, 0,0,-1);

builder.addStep();

// ============================================
// STEP 8: SPOILER AND WHEELS
// ============================================
console.log("Step 8: Adding spoiler and wheels");

// Spoiler
builder.addPart("4213", Colors.BLACK, 0, -96, 0, 1,0,0, 0,1,0, 0,0,1);
builder.addPart("3020", Colors.BLACK, 0, -96, 60, 1,0,0, 0,1,0, 0,0,1);

// Wheels - note the different rotations for left/right sides
builder.addPart("4624", Colors.LIGHT_GRAY, -30, 6, 60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("4624", Colors.LIGHT_GRAY, 30, 6, 60, 0,0,-1, 0,1,0, 1,0,0);
builder.addPart("4624", Colors.LIGHT_GRAY, -30, 6, -60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("4624", Colors.LIGHT_GRAY, 30, 6, -60, 0,0,-1, 0,1,0, 1,0,0);

// Wheel holders
builder.addPart("3641", Colors.BLACK, -30, 6, 60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3641", Colors.BLACK, 30, 6, 60, 0,0,-1, 0,1,0, 1,0,0);
builder.addPart("3641", Colors.BLACK, -30, 6, -60, 0,0,1, 0,1,0, -1,0,0);
builder.addPart("3641", Colors.BLACK, 30, 6, -60, 0,0,-1, 0,1,0, 1,0,0);

// Final step is automatically added by the save method

// ============================================
// SAVE THE MODEL
// ============================================
builder.save("step-by-step-car.ldr");
`