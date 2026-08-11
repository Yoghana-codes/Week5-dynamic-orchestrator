import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const indexHtml = await readFile(path.join(workspaceRoot, 'index.html'), 'utf8');

const hasThreePanelLayout = indexHtml.includes('Agent Buttons') && indexHtml.includes('Agent Results') && indexHtml.includes('Workflow Trace');
const hasApiConfig = indexHtml.includes('https://vibe-proxy-gqv4.onrender.com/v1/chat/completions') && indexHtml.includes('class-chat-model');
const hasDomainRouting = indexHtml.includes('cannot think of an answer') && indexHtml.includes('catKeywords') && indexHtml.includes('dogKeywords') && indexHtml.includes('birdKeywords');
const hasOrchestrationFlow = indexHtml.includes('runAgents') && indexHtml.includes('previousOutput');

assert.ok(hasThreePanelLayout, 'Expected the redesigned three-panel layout');
assert.ok(hasApiConfig, 'Expected the API endpoint and request body configuration');
assert.ok(hasDomainRouting, 'Expected domain-based routing with negative fallback replies');
assert.ok(hasOrchestrationFlow, 'Expected orchestrator sequencing and workflow logging');

console.log('Routing test passed');
