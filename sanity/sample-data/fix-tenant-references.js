#!/usr/bin/env node

/**
 * This script helps you get tenant IDs and update products.ndjson
 * 
 * Run: node sanity/sample-data/fix-tenant-references.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const productsFile = path.join(__dirname, 'products.ndjson');

console.log('🔍 Getting tenant IDs from Sanity...\n');

try {
  // Query Sanity for tenant IDs
  const query = '*[_type == "tenant"]{_id, name, "slug": slug.current}';
  const command = `sanity documents query '${query}' --dataset production --json`;
  
  console.log('Running:', command, '\n');
  
  const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  const tenants = JSON.parse(output);
  
  if (!tenants || tenants.length === 0) {
    console.error('❌ No tenants found!');
    console.error('   Please import tenants first:');
    console.error('   sanity dataset import sanity/sample-data/tenants.ndjson production --replace');
    process.exit(1);
  }
  
  console.log('✅ Found tenants:');
  tenants.forEach(t => {
    console.log(`   - ${t.name} (${t.slug}): ${t._id}`);
  });
  
  // Find Demo Store and Example Store
  const demoStore = tenants.find(t => t.slug === 'demo-store' || t.name.toLowerCase().includes('demo'));
  const exampleStore = tenants.find(t => t.slug === 'example' || (t.name.toLowerCase().includes('example') && !t.name.toLowerCase().includes('demo')));
  
  if (!demoStore) {
    console.error('\n❌ Could not find "Demo Store" tenant');
    console.error('   Available tenants:', tenants.map(t => t.name).join(', '));
    process.exit(1);
  }
  
  if (!exampleStore) {
    console.warn('\n⚠️  Could not find "Example Store" tenant');
    console.warn('   Using first available tenant as fallback');
    exampleStore = tenants.find(t => t._id !== demoStore._id) || demoStore;
  }
  
  // Read products file
  let content = fs.readFileSync(productsFile, 'utf8');
  
  // Replace placeholders
  const replacements = {
    'TENANT_ID_DEMO_STORE': demoStore._id,
    'TENANT_ID_EXAMPLE': exampleStore._id
  };
  
  let updated = false;
  Object.entries(replacements).forEach(([placeholder, realId]) => {
    if (content.includes(placeholder)) {
      content = content.replace(new RegExp(placeholder, 'g'), realId);
      updated = true;
      console.log(`\n✓ Replaced ${placeholder} with ${realId}`);
    }
  });
  
  if (updated) {
    fs.writeFileSync(productsFile, content);
    console.log('\n✅ Successfully updated products.ndjson!');
    console.log('\n📦 Now you can import products:');
    console.log('   sanity dataset import sanity/sample-data/products.ndjson production --replace');
  } else {
    console.log('\nℹ️  No placeholders found. File may already be updated.');
  }
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.error('\n💡 Manual method:');
  console.error('   1. Run: sanity documents query \'*[_type == "tenant"]{_id, name}\' --dataset production');
  console.error('   2. Copy the _id values');
  console.error('   3. Open products.ndjson and replace:');
  console.error('      - TENANT_ID_DEMO_STORE → your demo store _id');
  console.error('      - TENANT_ID_EXAMPLE → your example store _id');
  process.exit(1);
}

