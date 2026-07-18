import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Clock, X, ArrowLeft } from '@phosphor-icons/react';

const POSTS = [
  {
    slug: 'docker-for-node-developers',
    title: 'Docker From Zero: A Practical Guide for Node.js Developers',
    excerpt:
      'Everything I wish I knew when I started containerizing applications - real Dockerfiles, multi-stage builds, and compose examples that actually work in production.',
    date: 'Jul 2026',
    readTime: '10 min',
    tag: 'Docker',
    tagColor: '#38bdf8',
    content: `
When I first heard "just Dockerize it," I had no idea what that meant. Six months later, all three of my projects run in containers and I can spin up a full development environment with a single command. Here's everything I wish someone had told me at the start.

## Why Docker Actually Matters

The classic problem: "It works on my machine." Docker solves this by packaging your application with its exact runtime environment - the specific Node.js version, the npm packages, the OS libraries - into a portable image. Your teammate pulls the image, runs it, and gets the exact same behavior.

For Node.js developers, this matters because Node versions can differ wildly between machines, and native modules that compile differently can cause silent bugs.

## Writing Your First Dockerfile

Start simple. Here's a production-ready Dockerfile for a Node.js Express app:

\`\`\`dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build & run
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
\`\`\`

The multi-stage build keeps your final image lean. The first stage installs all dependencies; the second stage only copies what's needed to run. My Express API image went from 1.2GB (with build tools) to 180MB using this pattern.

## Docker Compose for Local Development

Running your frontend, backend, and database together:

\`\`\`yaml
version: '3.8'
services:
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydb
    depends_on:
      - mongo
  client:
    build: ./frontend
    ports:
      - "3000:3000"
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
\`\`\`

\`docker compose up\` and your entire stack is running, with MongoDB data persisted across restarts. No more "install MongoDB locally" steps in your README.

## Common Mistakes I Made

**Ignoring .dockerignore**: Your node_modules directory is huge. Without a .dockerignore, Docker copies it all into the build context, making every build slow. Add \`node_modules\`, \`.env\`, and \`dist\` to .dockerignore.

**Running as root**: By default, containers run as root, which is a security risk. Add \`USER node\` before your CMD to run as the non-root Node.js user.

**Not handling signals properly**: Node.js doesn't handle SIGTERM gracefully out of the box. Kubernetes sends SIGTERM before killing a pod. Add a \`process.on('SIGTERM', ...)\` handler to flush connections before exiting.

## Next Steps

Once you're comfortable with Docker basics, learn Docker Compose networking (the service names ARE the hostnames), then look into Kubernetes for when you need to scale beyond what Compose can handle.
    `,
  },
  {
    slug: 'react-performance-deep-dive',
    title: 'React Performance: When useMemo and useCallback Actually Help',
    excerpt:
      'The honest answer to "should I memoize this?" Most tutorials skip the part where premature memoization makes your app slower. Here\'s the decision framework I actually use.',
    date: 'Jun 2026',
    readTime: '8 min',
    tag: 'React',
    tagColor: '#b478ff',
    content: `
"Just wrap everything in useMemo" is the most common React performance advice, and also often wrong. Memoization has a cost: React has to compare previous and current dependencies on every render. If your computation is cheap (less than ~1ms), you might be making things slower.

## The Rendering Mental Model

Before you optimize, understand what triggers a re-render. React re-renders a component when:

1. Its state changes
2. Its parent re-renders (unless it's wrapped in React.memo)
3. A context it subscribes to changes

Re-renders are NOT inherently bad. A re-render that takes 0.3ms across 50 components is 15ms - that's still within a 60fps frame budget. Only optimize what's actually slow.

## Profiling First, Optimizing Second

Open React DevTools Profiler before touching a single useMemo. Record an interaction that feels slow. Look for:

- Components with long bars (high render time)
- Components that render far more often than expected
- Renders caused by parent updates that don't change props

I've seen developers add 20 useMemo calls to a component that rendered in 0.4ms. The profiler showed the bottleneck was actually a third-party chart library re-initializing on every render.

## When useMemo Actually Helps

**Expensive pure computations**: Filtering and sorting a 10,000-item array on every keystroke is a valid use case. The computation itself takes meaningful time.

\`\`\`jsx
const filtered = useMemo(() => {
  return products
    .filter(p => p.name.toLowerCase().includes(query))
    .sort((a, b) => a.price - b.price);
}, [products, query]);
\`\`\`

**Reference equality for child components**: If a child wrapped in React.memo receives an object or array as a prop, it will re-render on every parent render because {} !== {} in JavaScript. useMemo fixes the reference:

\`\`\`jsx
const config = useMemo(() => ({ theme: 'dark', locale: 'en' }), []);
<HeavyComponent config={config} />
\`\`\`

## When useCallback Actually Helps

useCallback is useMemo for functions. It's most useful when passing callbacks to memoized child components:

\`\`\`jsx
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // Empty deps: function is stable across renders
\`\`\`

Without useCallback here, every parent render creates a new handleDelete reference, breaking React.memo on the child.

## The Decision Framework

1. Is this component actually slow? (Profile first)
2. Is the computation expensive (array of 1000+ items, complex math)?
3. Is this function/object passed to a memoized child?

If yes to any of these after profiling: memoize. Otherwise, skip it and keep the code readable.
    `,
  },
  {
    slug: 'langchain-ai-app-beginners',
    title: 'Building Your First AI App with LangChain: From Zero to Production',
    excerpt:
      'A hands-on walkthrough of building an AI ticket classifier using LangChain, Node.js, and OpenAI - including prompt engineering patterns I learned the hard way.',
    date: 'May 2026',
    readTime: '14 min',
    tag: 'AI / LLM',
    tagColor: '#e8a020',
    content: `
LangChain sounds intimidating if you've never worked with LLMs. But at its core, it's a framework for chaining together AI operations - prompts, LLM calls, parsers, and external tools - into reliable pipelines. Here's how I built the AI layer for my Support Desk project.

## What LangChain Actually Does

LLMs are stateless functions: input text in, output text out. LangChain helps you:

1. Structure prompts consistently (prompt templates)
2. Parse structured output from unstructured LLM responses
3. Chain multiple LLM calls together
4. Add memory, tools, and retrieval augmented generation (RAG)

For my use case - classifying support tickets and generating draft responses - I only needed prompt templates and output parsers.

## Setting Up LangChain in Node.js

\`\`\`bash
npm install langchain @langchain/openai
\`\`\`

\`\`\`javascript
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.2, // Low temperature = more deterministic output
});
\`\`\`

## Structured Output Parsing

The biggest problem with raw LLMs: they return prose. For an API, you need JSON. LangChain's StructuredOutputParser (with Zod) solves this:

\`\`\`javascript
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    category: z.enum(["billing", "technical", "general"]),
    urgency: z.enum(["low", "medium", "high"]),
    draftResponse: z.string(),
    confidence: z.number().min(0).max(1),
  })
);
\`\`\`

LangChain injects formatting instructions into your prompt automatically. The LLM returns valid JSON matching your Zod schema. When it doesn't (and it will fail sometimes), LangChain throws a parse error you can catch and retry.

## The Prompt Template Pattern

Don't hardcode prompts. Use templates:

\`\`\`javascript
const template = PromptTemplate.fromTemplate(\`
You are a customer support classifier. Analyze the ticket below.

Ticket: {ticketContent}
Customer Plan: {customerPlan}

{format_instructions}
\`);

const chain = template.pipe(model).pipe(parser);

const result = await chain.invoke({
  ticketContent: ticket.body,
  customerPlan: "premium",
  format_instructions: parser.getFormatInstructions(),
});
\`\`\`

## Lessons Learned the Hard Way

**Temperature matters more than model size**: gpt-4o-mini at temperature 0.1 outperformed gpt-4 at temperature 0.8 for classification tasks. Low temperature = consistent JSON output. High temperature = creative but unreliable structure.

**Always validate before saving**: LLMs occasionally hallucinate field values outside your enum. Run Zod validation on the result before writing to MongoDB, regardless of what LangChain parsed.

**Cost per call adds up fast**: In development, I accidentally called the API 400 times in an hour testing. Add rate limiting and cache identical ticket content. I cache by MD5 hash of the ticket body with a 1-hour TTL.

**Streaming improves perceived performance**: For the draft response field, stream the output to the frontend while keeping classification synchronous. Users see the response generating in real-time instead of waiting 3-4 seconds.

LangChain has a steep learning curve in the docs, but the core workflow (template -> model -> parser) covers 80% of real use cases.
    `,
  },
];

function BlogModal({ post, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(16px)',
        overflowY: 'auto',
        padding: '2rem 1rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: '18px',
          maxWidth: '720px',
          width: '100%',
          padding: '2.25rem',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        }}
      >
        {/* Back / close */}
        <button
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-secondary)', fontSize: '0.82rem',
            fontFamily: 'var(--font-sans)', marginBottom: '1.75rem',
            padding: 0,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={15} /> Back to blog
        </button>

        {/* Meta */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            background: `${post.tagColor}15`,
            color: post.tagColor,
            border: `1px solid ${post.tagColor}30`,
          }}>
            {post.tag}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {post.date}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Clock size={10} /> {post.readTime} read
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {post.title}
        </h1>

        {/* Rendered content */}
        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{
            __html: (() => {
              let inCodeBlock = false;
              return post.content
                .trim()
                .split('\n')
                .map(line => {
                  const trimmed = line.trim();
                  
                  if (inCodeBlock && trimmed === '```') {
                    inCodeBlock = false;
                    return '</code></pre></div>';
                  }

                  if (!inCodeBlock && trimmed.startsWith('```')) {
                    inCodeBlock = true;
                    const lang = trimmed.slice(3).trim();
                    return `
                      <div style="margin: 1.5rem 0; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: #0d0d12; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                        <div style="display: flex; align-items: center; padding: 0.6rem 1rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05);">
                          <div style="display: flex; gap: 6px; margin-right: 1rem;">
                            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></div>
                            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></div>
                            <div style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></div>
                          </div>
                          ${lang ? `<div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${lang}</div>` : ''}
                        </div>
                        <pre style="padding: 1.25rem; overflow-x: auto; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; line-height: 1.5; margin: 0;"><code>`;
                  }
                  
                  if (inCodeBlock) {
                    return line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '\n';
                  }

                  if (line.startsWith('## ')) {
                    return `<h2 style="font-size:1.35rem;font-weight:700;color:var(--text-primary);margin-top:2.5rem;margin-bottom:1rem;letter-spacing:-0.02em;font-family:var(--font-sans)">${line.slice(3)}</h2>`;
                  }
                  
                  if (trimmed === '') return '<div style="height: 0.75rem"></div>';
                  
                  let parsedLine = line
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary);font-weight:600">$1</strong>')
                    .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.08);padding:0.15rem 0.35rem;border-radius:4px;font-family:var(--font-mono);font-size:0.85em;color:var(--accent)">$1</code>');

                  if (line.startsWith('- ') || /^[0-9]+\.\s/.test(line)) {
                    return `<div style="margin-bottom:0.5rem; padding-left: 1rem; position: relative; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.75;">
                              <span style="position: absolute; left: 0; color: var(--accent); font-weight: 700;">·</span>
                              ${parsedLine.replace(/^(- |^[0-9]+\.\s)/, '')}
                            </div>`;
                  }

                  return `<p style="margin-bottom:0.5rem; font-size: 0.95rem; line-height: 1.75; color: var(--text-secondary)">${parsedLine}</p>`;
                })
                .join('');
            })()
          }}
        />
      </motion.article>
    </motion.div>
  );
}

export default function Blog() {
  const [openPost, setOpenPost] = useState(null);

  return (
    <section id="blog" className="section-pad" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>Writing</h2>
            <p className="section-sub">Technical deep dives from building real projects.</p>
          </div>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }} className="blog-grid">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpenPost(post)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setOpenPost(post)}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  borderColor: `${post.tagColor}35`,
                  y: -3,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px ${post.tagColor}12`,
                }}
              >
                {/* Tag accent top line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${post.tagColor}60, transparent)`,
                }} />

                {/* Tag + date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
                  <span style={{
                    padding: '0.18rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    background: `${post.tagColor}12`,
                    color: post.tagColor,
                    border: `1px solid ${post.tagColor}25`,
                  }}>
                    {post.tag}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.015em',
                }}>
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1 }}>
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontSize: '0.7rem', color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                  }}>
                    <Clock size={10} /> {post.readTime} read
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: post.tagColor,
                    fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '0.2rem',
                  }}>
                    Read <ArrowUpRight size={11} weight="bold" />
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openPost && <BlogModal post={openPost} onClose={() => setOpenPost(null)} />}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
