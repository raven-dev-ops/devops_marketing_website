// modelRunner.js
//
// This module is the abstraction layer for running a local LLaMA model
// using node-llama-cpp. It is written so that the assistant server can
// call `generateReply` without depending on any external AI APIs.
//
// If node-llama-cpp or a model file is not available, it degrades
// gracefully to a safe, inline reply so the server still works.

let llamaBindingLoaded = false;
let llamaBindingError = null;
let llamaSession = null;

async function ensureModelLoaded() {
  if (llamaBindingLoaded || llamaBindingError || llamaSession) {
    return;
  }

  const modelPath = process.env.LLAMA_MODEL_PATH || process.env.LLAMA_MODEL_FILE;
  if (!modelPath) {
    llamaBindingError = new Error('LLAMA_MODEL_PATH is not configured.');
    return;
  }

  try {
    // Dynamically import node-llama-cpp so that the server can still run
    // in environments where the binding or model is not installed.
    const { getLlama, LlamaChatSession } = await import('node-llama-cpp');

    const llama = await getLlama();
    const model = await llama.loadModel({
      modelPath,
      contextSize: Number(process.env.LLAMA_CONTEXT_SIZE || 2048),
    });
    const context = await model.createContext();
    llamaSession = new LlamaChatSession({
      contextSequence: context.getSequence(),
    });

    llamaBindingLoaded = true;
  } catch (err) {
    llamaBindingError = err;
    // eslint-disable-next-line no-console
    console.error('Failed to initialize local LLaMA model:', err.message);
  }
}

export async function generateReply(messages) {
  // Attempt to initialize the model once
  await ensureModelLoaded();

  const maxTokens = Number(process.env.LLAMA_MAX_TOKENS || 256);

  // If we don't have a working binding or model, fall back to a simple string.
  if (!llamaBindingLoaded || llamaBindingError || !llamaSession) {
    const lastUser = (messages || []).slice().reverse().find((m) => m.role === 'user');
    const snippet = lastUser && lastUser.text ? lastUser.text.slice(0, 200) : '';
    return (
      "I'm answering based on my built-in knowledge and rules. " +
      'A local AI model can be enabled by configuring LLAMA_MODEL_PATH on the server. ' +
      (snippet ? `You asked: "${snippet}". ` : '')
    );
  }

  const lastUser = (messages || []).slice().reverse().find((m) => m.role === 'user');
  const prompt = lastUser && lastUser.text ? lastUser.text : 'Hello!';

  try {
    const response = await llamaSession.prompt(prompt, {
      maxTokens,
    });
    return response || "I'm here and ready to help.";
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Local model generation failed:', err.message);
    const snippet = prompt.slice(0, 200);
    return (
      "I'm answering based on my built-in rules because the local model had an issue. " +
      (snippet ? `You asked: "${snippet}". ` : '')
    );
  }
}
