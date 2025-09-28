import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

export interface Part {
  partNum: string;
  name: string;
  categoryId: string;
  material: string;
}

// Global cache for serverless environment
let cachedParts: Part[] | null = null;
let cachedPartsMap: Map<string, Part> | null = null;

export class PartsDatabase {
  private parts: Part[] = [];
  private partsMap: Map<string, Part> = new Map();
  private loaded: boolean = false;

  async loadParts(csvPath: string = './parts.csv'): Promise<void> {
    // Check if we have cached data
    if (cachedParts && cachedPartsMap) {
      this.parts = cachedParts;
      this.partsMap = cachedPartsMap;
      this.loaded = true;
      console.log(`Using cached parts: ${this.parts.length} parts`);
      return;
    }

    // Load from file if not cached
    return new Promise((resolve, reject) => {
      const parts: Part[] = [];
      const partsMap = new Map<string, Part>();

      // Check if file exists
      if (!fs.existsSync(csvPath)) {
        // For serverless, we might need to adjust the path
        csvPath = path.join(process.cwd(), 'parts.csv');
        if (!fs.existsSync(csvPath)) {
          console.warn('Parts CSV not found, using minimal set');
          // Use a minimal hardcoded set for basic functionality
          this.loadMinimalParts();
          resolve();
          return;
        }
      }

      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          const part: Part = {
            partNum: row.part_num,
            name: row.name,
            categoryId: row.part_cat_id,
            material: row.part_material
          };
          parts.push(part);
          partsMap.set(part.partNum, part);
        })
        .on('end', () => {
          this.parts = parts;
          this.partsMap = partsMap;
          this.loaded = true;

          // Cache for next invocation
          cachedParts = parts;
          cachedPartsMap = partsMap;

          console.log(`Loaded ${this.parts.length} parts`);
          resolve();
        })
        .on('error', (error) => {
          console.error('Error loading parts:', error);
          // Fall back to minimal parts
          this.loadMinimalParts();
          resolve();
        });
    });
  }

  private loadMinimalParts(): void {
    // Essential LEGO parts for basic building
    const minimalParts: Part[] = [
      { partNum: '3001', name: 'Brick 2 x 4', categoryId: '5', material: 'Plastic' },
      { partNum: '3003', name: 'Brick 2 x 2', categoryId: '5', material: 'Plastic' },
      { partNum: '3004', name: 'Brick 1 x 2', categoryId: '5', material: 'Plastic' },
      { partNum: '3005', name: 'Brick 1 x 1', categoryId: '5', material: 'Plastic' },
      { partNum: '3020', name: 'Plate 2 x 4', categoryId: '26', material: 'Plastic' },
      { partNum: '3021', name: 'Plate 2 x 3', categoryId: '26', material: 'Plastic' },
      { partNum: '3022', name: 'Plate 2 x 2', categoryId: '26', material: 'Plastic' },
      { partNum: '3023', name: 'Plate 1 x 2', categoryId: '26', material: 'Plastic' },
      { partNum: '3024', name: 'Plate 1 x 1', categoryId: '26', material: 'Plastic' },
      { partNum: '3068', name: 'Tile 2 x 2', categoryId: '37', material: 'Plastic' },
      { partNum: '3069', name: 'Tile 1 x 2', categoryId: '37', material: 'Plastic' },
      { partNum: '3070', name: 'Tile 1 x 1', categoryId: '37', material: 'Plastic' },
      { partNum: '4070', name: 'Brick 1 x 1 with Headlight', categoryId: '5', material: 'Plastic' },
      { partNum: '30414', name: 'Brick 1 x 4', categoryId: '5', material: 'Plastic' },
      { partNum: '3010', name: 'Brick 1 x 4', categoryId: '5', material: 'Plastic' },
      { partNum: '3039', name: 'Slope 45 2 x 2', categoryId: '31', material: 'Plastic' },
      { partNum: '3040', name: 'Slope 45 1 x 2', categoryId: '31', material: 'Plastic' },
      { partNum: '6091', name: 'Brick 2 x 1 x 1 1/3 with Curved Top', categoryId: '5', material: 'Plastic' },
      { partNum: '98302', name: 'Wheel', categoryId: '59', material: 'Plastic' },
      { partNum: '3626', name: 'Minifigure Head', categoryId: '65', material: 'Plastic' }
    ];

    this.parts = minimalParts;
    this.partsMap = new Map();
    minimalParts.forEach(part => {
      this.partsMap.set(part.partNum, part);
    });
    this.loaded = true;

    // Cache the minimal set
    cachedParts = this.parts;
    cachedPartsMap = this.partsMap;
  }

  searchParts(keywords: string[]): Part[] {
    if (!this.loaded) {
      throw new Error('Parts database not loaded. Call loadParts() first.');
    }

    const keywordsLower = keywords.map(k => k.toLowerCase());

    return this.parts.filter(part => {
      const nameLower = part.name.toLowerCase();
      return keywordsLower.some(keyword => nameLower.includes(keyword));
    });
  }

  getPartByNumber(partNum: string): Part | undefined {
    return this.partsMap.get(partNum);
  }

  searchByCategory(categoryId: string): Part[] {
    return this.parts.filter(part => part.categoryId === categoryId);
  }

  getCommonParts(): { bricks: Part[], plates: Part[], wheels: Part[], windows: Part[] } {
    return {
      bricks: this.searchParts(['brick']).slice(0, 20),
      plates: this.searchParts(['plate']).slice(0, 20),
      wheels: this.searchParts(['wheel']).slice(0, 10),
      windows: this.searchParts(['window', 'windscreen', 'glass']).slice(0, 10)
    };
  }

  partFileExists(partNum: string): boolean {
    const partPath = path.join('./parts', `${partNum}.dat`);
    return fs.existsSync(partPath);
  }
}