import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'data', 'knowledgeBase.json');

let entries = [];

try {
  const raw = fs.readFileSync(dataPath, 'utf8');
  const json = JSON.parse(raw);
  entries = Array.isArray(json.entries) ? json.entries : [];
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Failed to load knowledge base JSON:', err.message);
  entries = [];
}

function normalize(text) {
  return (text || '').toString().toLowerCase();
}

export function findRelevantAnswer(userMessage) {
  const input = normalize(userMessage);
  if (!input) return null;

  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    const fields = [];

    if (entry.question) fields.push(entry.question);
    if (Array.isArray(entry.questions)) fields.push(...entry.questions);
    if (Array.isArray(entry.keywords)) fields.push(...entry.keywords);
    if (Array.isArray(entry.tags)) fields.push(...entry.tags);
    if (entry.title) fields.push(entry.title);

    const haystack = normalize(fields.join(' '));
    if (!haystack) continue;

    let score = 0;

    // crude keyword overlap scoring
    const words = input.split(/\s+/).filter(Boolean);
    for (const w of words) {
      if (haystack.includes(w)) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  // Require a minimum score to avoid irrelevant matches
  if (!best || bestScore === 0) return null;

  return best.answer || null;
}

