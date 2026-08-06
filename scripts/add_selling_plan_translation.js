import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '..', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && !f.endsWith('.schema.json'));

for (const file of files) {
  const full = path.join(localesDir, file);
  let raw = fs.readFileSync(full, 'utf8');

  // strip leading /* ... */ comment blocks if present
  const idx = raw.indexOf('{');
  const prefix = idx > 0 ? raw.slice(0, idx) : '';
  const jsonText = raw.slice(idx);

  try {
    const obj = JSON.parse(jsonText);
    obj.products = obj.products || {};
    obj.products.product = obj.products.product || {};
    obj.products.product.selling_plans = obj.products.product.selling_plans || {};
    if (!obj.products.product.selling_plans.one_time_purchase) {
      obj.products.product.selling_plans.one_time_purchase = "One-time Purchase";
      const output = JSON.stringify(obj, null, 2);
      fs.writeFileSync(full, prefix + output, 'utf8');
      console.log(`Patched ${file}`);
    }
  } catch (e) {
    console.error(`Failed to parse ${file}: ${e.message}`);
  }
}
console.log('Done');
