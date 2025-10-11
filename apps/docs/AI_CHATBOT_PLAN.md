# AI Chatbot Integration Plan for Fync Documentation

## Overview
This document outlines the plan for integrating an AI chatbot into the Fync documentation site. The chatbot will use a free LLM and only have context from our documentation.

## Architecture

### 1. Content Extraction System

#### Implementation Strategy
```typescript
// src/lib/content-extractor.ts
function extractDocumentationContext() {
  // Traverse all content files
  // Extract: titles, descriptions, code examples, parameters
  // Format into digestible chunks for LLM context
}
```

#### Content Structure
- **API Reference Data**: Method signatures, parameters, return types
- **Code Examples**: All working examples with context
- **Descriptions**: Human-readable explanations
- **Tags & Categories**: For semantic search and filtering

### 2. Vector Database Setup

#### Recommended Options (Free/Open Source)
1. **Qdrant** (Self-hosted, Docker)
   - Excellent for semantic search
   - Easy deployment
   - Low resource requirements

2. **Chroma** (Embedded database)
   - Can run in-memory or persist
   - Python/TypeScript support
   - Great for small to medium datasets

3. **Pinecone Free Tier**
   - 1 project, 1 index
   - 100K vectors
   - Sufficient for documentation

#### Vector Embedding Strategy
```typescript
// Use a free embedding model
// Option 1: Hugging Face Transformers (all-MiniLM-L6-v2)
// Option 2: OpenAI Ada-002 (if budget allows)
// Option 3: Sentence Transformers (open-source)

async function generateEmbeddings(text: string) {
  // Split text into chunks (512 tokens max)
  // Generate embeddings for each chunk
  // Store with metadata (API name, section, type)
}
```

### 3. Free LLM Options

#### Recommended Models
1. **Ollama + Mistral/Llama 2** (Self-hosted)
   - Completely free
   - Run locally or on VPS
   - Good quality responses
   - Models: mistral-7b, llama2-13b

2. **Together AI** (Free tier)
   - 60 requests/minute
   - Various open-source models
   - Mixtral, Llama 2, etc.

3. **Groq** (Free tier)
   - Very fast inference
   - Llama 2 70B, Mixtral 8x7B
   - Good for production

4. **Hugging Face Inference API**
   - Free tier available
   - Various models
   - Rate limited but sufficient

### 4. Chatbot UI Component

#### Features
- Floating chat button (bottom-right)
- Full-screen modal
- Message history
- Code syntax highlighting
- Copy code button
- Source citations (link to specific docs)

#### Implementation
```typescript
// src/components/docs-chatbot.tsx
export function DocsChatbot() {
  // State: open/closed, messages, loading
  // Functions: sendMessage, formatResponse
  // API: Call to /api/chat endpoint
}
```

### 5. API Route for Chat

```typescript
// src/app/api/chat/route.ts
export async function POST(req: Request) {
  const { message, history } = await req.json()
  
  // 1. Generate embedding for user message
  // 2. Query vector DB for relevant context
  // 3. Build prompt with context
  // 4. Call LLM with context + message
  // 5. Stream response back to client
}
```

### 6. Context Retrieval Strategy

#### Prompt Template
```
You are a helpful assistant for the Fync documentation.
Fync is a unified TypeScript library for 9 popular APIs.

Context from documentation:
{retrieved_chunks}

User question: {user_message}

Instructions:
- Only answer based on the provided context
- If you don't know, say "I don't have information about that in the docs"
- Provide code examples when relevant
- Be concise and accurate
```

### 7. Implementation Steps

1. **Phase 1: Content Indexing** (2-3 days)
   - Write content extraction script
   - Set up vector database
   - Generate embeddings for all docs
   - Test retrieval quality

2. **Phase 2: LLM Integration** (1-2 days)
   - Set up free LLM (recommend Groq or Ollama)
   - Create API route
   - Test response quality
   - Optimize prompts

3. **Phase 3: UI Component** (1-2 days)
   - Build chatbot UI
   - Add streaming support
   - Implement message history
   - Style to match site design

4. **Phase 4: Testing & Optimization** (2-3 days)
   - Test various questions
   - Optimize context retrieval
   - Add rate limiting
   - Monitor token usage

### 8. Technical Stack

```typescript
// Dependencies needed
{
  "@pinecone-database/pinecone": "^2.0.0", // or qdrant, chroma
  "@xenova/transformers": "^2.0.0", // For embeddings
  "ai": "^3.0.0", // Vercel AI SDK
  "groq-sdk": "^0.3.0", // or ollama, together.ai
}
```

### 9. Cost Considerations

- **Vector DB**: Free (self-hosted Qdrant/Chroma)
- **Embeddings**: Free (Xenova Transformers)
- **LLM**: Free tier (Groq/Ollama)
- **Hosting**: Can run on same server as docs

**Total Monthly Cost**: $0 - $5 (if using cloud services)

### 10. Performance Targets

- Response time: < 2 seconds
- Context relevance: > 90% accuracy
- User satisfaction: > 4/5 rating
- Uptime: 99.9%

### 11. Future Enhancements

- Multi-language support
- Voice input/output
- Code generation
- Interactive examples
- Feedback system
- Analytics dashboard

### 12. Security Considerations

- Rate limiting per IP
- Input sanitization
- No PII storage
- CORS protection
- Content Security Policy

### 13. Monitoring & Analytics

```typescript
// Track metrics
- Total conversations
- Average messages per conversation
- Most asked questions
- Failed retrievals
- Response times
- User ratings
```

### 14. Fallback Strategy

If LLM is down or rate limited:
1. Show predefined helpful links
2. Suggest using search
3. Display error message with retry option

## Files to Create

1. `src/lib/vector-db.ts` - Vector database client
2. `src/lib/embeddings.ts` - Embedding generation
3. `src/lib/content-indexer.ts` - Index all docs
4. `src/app/api/chat/route.ts` - Chat API endpoint
5. `src/components/docs-chatbot.tsx` - Chatbot UI
6. `src/lib/llm-client.ts` - LLM client wrapper

## Environment Variables

```bash
# Vector Database
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=your_key

# LLM
GROQ_API_KEY=your_key
# or
OLLAMA_BASE_URL=http://localhost:11434

# Optional
RATE_LIMIT_RPM=60
MAX_CONTEXT_CHUNKS=5
```

## Next Steps

1. Review and approve plan
2. Choose vector DB provider
3. Choose LLM provider
4. Begin Phase 1 implementation
5. Iterate based on testing

---

**Status**: Planning Phase
**Last Updated**: 2025-10-10
**Owner**: Development Team
