# Deployment Configuration

## Node.js Version Requirements

This project requires Node.js version 18.x for successful builds. The error you encountered is due to Node.js v22.17.1 having incompatible hash algorithms.

### Required Versions:
- **Node.js**: 18.17.0 (recommended) or any 18.x version
- **npm**: 9.8.1 or compatible version

### For Netlify Deployment:

The `netlify.toml` file is already configured with:
- Node.js version: 18.17.0
- Build command: npm run build
- Publish directory: dist

### For Vercel Deployment:

Create a `vercel.json` file in your project root:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node@18.17.0"
    }
  ]
}
```

### Troubleshooting:

If you still encounter hash algorithm errors, try:
1. Clear build cache
2. Use `npm ci --legacy-peer-deps` instead of `npm install`
3. Set `NODE_OPTIONS=--openssl-legacy-provider` environment variable
