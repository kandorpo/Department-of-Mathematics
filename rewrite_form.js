const fs = require('fs');

let content = fs.readFileSync('src/components/AdminPortalManager.tsx', 'utf-8');

// Replace the handleSaveStudent function to not require the removed fields as defaults
// Actually the defaults are fine, we just remove them from the UI.
// But let's just replace the UI portion.

// I will extract the form and rewrite it completely using regex or string replace.
