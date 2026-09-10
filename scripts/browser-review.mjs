// Local review bridge to the installed Chrome DevTools MCP server.
// Run from the project folder. Never attaches to an existing browser profile.
import { Client } from '/Users/thedawgctor/.npm/_npx/69708344e3a73bf1/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport } from '/Users/thedawgctor/.npm/_npx/69708344e3a73bf1/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import readline from 'node:readline';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { ListRootsRequestSchema } from '/Users/thedawgctor/.npm/_npx/69708344e3a73bf1/node_modules/@modelcontextprotocol/sdk/dist/esm/types.js';

const client = new Client({name:'astro-pass-01-review',version:'1.0.0'}, {capabilities:{roots:{listChanged:true}}});
client.setRequestHandler(ListRootsRequestSchema, async () => ({roots:[{uri:pathToFileURL(process.cwd()).href,name:'astro-pass-01'}]}));
const transport = new StdioClientTransport({command:process.execPath,args:[
  '/Users/thedawgctor/.npm/_npx/15c61037b1978c83/node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js',
  '--isolated','--viewport=1440x1000','--no-page-id-routing','--no-usage-statistics','--no-performance-crux', ...(process.argv.includes('--headless') ? ['--headless'] : []),
]});
await client.connect(transport);
const {tools} = await client.listTools();
console.log(JSON.stringify(tools.map(({name})=>name)));
for await (const line of readline.createInterface({input:process.stdin})) {
  try {
    const request = JSON.parse(line);
    const result = await client.callTool(request);
    fs.appendFileSync('docs/reviews/mcp-review.jsonl',JSON.stringify({request,result})+'\n');
    console.log(JSON.stringify(result));
  } catch(error) { console.log(JSON.stringify({error:String(error)})); }
}
await client.close();
