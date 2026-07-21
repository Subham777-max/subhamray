export const POSTS = [
  {
    slug: 'docker-basics-guide',
    title: 'Docker Fundamentals: What, Why, Images, Containers & Essential Commands',
    excerpt:
      'A complete breakdown of containerization - understanding Docker architecture, images vs containers, and essential CLI commands with a hands-on application example.',
    date: 'Jun 2026',
    readTime: '9 min',
    tag: 'Docker',
    tagColor: '#38bdf8',
    content: `
When building software, one of the most frustrating challenges developers face is environmental inconsistency - the classic "it works on my machine" problem. Docker solves this by encapsulating applications and their dependencies into lightweight, portable containers.

## What is Docker & Why Do We Use It?

Docker is an open-source containerization platform that allows software to run in isolated environments called containers. 

### The Problem Docker Solves

Before containerization, applications were deployed directly onto host operating systems or inside virtual machines (VMs). 

- **Direct Deployment**: Differences in OS versions, installed libraries, system dependencies, or node/python versions caused bugs between development, staging, and production.
- **Virtual Machines**: Hypervisors simulate an entire operating system for each application instance. While isolated, VMs require massive resource overhead (gigabytes of RAM and storage) and take minutes to boot up.

### Containerization vs Virtualization

Docker containers share the host operating system's kernel while isolating application processes in user space. This makes containers:

- **Lightweight**: Container images are typically megabytes instead of gigabytes.
- **Fast**: Containers launch in milliseconds.
- **Portable**: An image built on Windows will run identically on macOS, Linux, or cloud providers like AWS and GCP.

## Core Concepts: Images vs Containers

Understanding the distinction between Docker Images and Containers is fundamental.

### 1. Docker Image (The Blueprint)

A Docker image is a read-only, executable template containing everything needed to run an application: source code, runtime, system tools, and dependencies. 

Images are constructed using a series of **read-only layers**. When an instruction in a \`Dockerfile\` is executed, a new layer is added to the image. Layers are cached, making rebuilds extremely efficient.

### 2. Docker Container (The Running Instance)

A container is a runnable instance of a Docker image. When Docker starts a container from an image, it adds a thin read-write layer (the container layer) on top of the image's immutable layers. 

You can create, start, stop, move, or delete containers using Docker CLI commands or API calls. Multiple containers can run concurrently from the same base image without interfering with one another.

## Essential Docker Commands & How They Work

Here is how the key Docker CLI commands function under the hood:

### 1. docker pull

\`\`\`bash
docker pull node:20-alpine
\`\`\`

**How it works**: Contacts Docker Hub (or a configured private container registry), downloads the required filesystem layers for the specified tag (\`20-alpine\`), and stores them in your local Docker engine storage cache.

### 2. docker build

\`\`\`bash
docker build -t my-app:v1 .
\`\`\`

**How it works**: Reads the \`Dockerfile\` in the current directory (\`.\`), creates a build context, and sequentially executes each command, producing immutable image layers and tagging the final result as \`my-app:v1\`.

### 3. docker run

\`\`\`bash
docker run -d -p 8080:3000 --name web-app my-app:v1
\`\`\`

**How it works**: 
- \`-d\` (detached mode): Runs the container in the background and prints the container ID.
- \`-p 8080:3000\`: Maps host port \`8080\` to container internal port \`3000\` using host iptables/netfilter rules.
- \`--name web-app\`: Assigns a user-friendly name to the container instance.

### 4. docker ps

\`\`\`bash
docker ps
# Or view all containers including stopped ones:
docker ps -a
\`\`\`

**How it works**: Queries the Docker daemon daemon process (\`dockerd\`) for state metadata on active and terminated container processes.

### 5. docker exec

\`\`\`bash
docker exec -it web-app sh
\`\`\`

**How it works**: Spawns a new interactive command shell (\`sh\` or \`bash\`) inside an already running container, sharing the container namespaces so you can inspect running files and processes.

### 6. docker logs

\`\`\`bash
docker logs -f web-app
\`\`\`

**How it works**: Attaches to the stdout and stderr streams of the container's PID 1 process. The \`-f\` flag streams logs live.

### 7. docker stop & docker rm

\`\`\`bash
docker stop web-app
docker rm web-app
\`\`\`

**How it works**: \`docker stop\` sends a \`SIGTERM\` signal to container process 1, allowing graceful shutdown (default timeout 10s before \`SIGKILL\`). \`docker rm\` removes the writable container filesystem layer.

### 8. docker rmi

\`\`\`bash
docker rmi my-app:v1
\`\`\`

**How it works**: Removes image tags and deletes unreferenced image layers from local host disk storage.

## Practical Example: Dockerizing a Node.js Application

Let's walk through creating a production-ready container for an Express web application.

### Step 1: Create a Dockerfile

Create a file named \`Dockerfile\` in your project root:

\`\`\`dockerfile
# Use an official, lightweight Node base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package definition files first (optimizes layer caching)
COPY package*.json ./

# Install application dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Inform Docker that the container listens on port 3000 at runtime
EXPOSE 3000

# Specify default command to start the application
CMD ["node", "server.js"]
\`\`\`

### Step 2: Add a .dockerignore File

To prevent copying bulky or sensitive local files into your build image context, add a \`.dockerignore\` file:

\`\`\`text
node_modules
npm-debug.log
.env
.git
\`\`\`

### Step 3: Build and Run

Run the following commands in your terminal:

\`\`\`bash
# Build the image tagged as 'express-server'
docker build -t express-server .

# Spin up a container on host port 3000
docker run -d -p 3000:3000 --name running-api express-server
\`\`\`

Now navigating to \`http://localhost:3000\` serves your containerized Express API seamlessly.
    `,
  },
  {
    slug: 'advanced-docker-compose-networking-volumes',
    title: 'Advanced Docker: Master Compose, Networking & Persistent Volumes',
    excerpt:
      'Deep dive into multi-container orchestration with Docker Compose, container networking drivers, internal DNS resolution, and persistent storage strategies.',
    date: 'Jun 2026',
    readTime: '12 min',
    tag: 'Docker',
    tagColor: '#38bdf8',
    content: `
Once you understand single-container basics, real-world application architectures demand multi-container orchestration, inter-container communication, and persistent storage management.

## 1. Docker Compose: Multi-Container Orchestration

Most modern web applications consist of multiple microservices: a web frontend, a REST or GraphQL API backend, a relational database (PostgreSQL/MySQL), a caching layer (Redis), and background workers.

Managing these services manually via individual \`docker run\` commands is error-prone and unmaintainable. **Docker Compose** allows you to define and manage multi-container environments declaratively in a single YAML file.

### Complete docker-compose.yml Example

Here is a full production-ready stack setup:

\`\`\`yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - api
    networks:
      - app-network

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres-db
      - DB_PORT=5432
      - DB_NAME=appdb
      - DB_USER=postgres
      - DB_PASS=secretpassword
    depends_on:
      postgres-db:
        condition: service_healthy
    networks:
      - app-network

  postgres-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  pgdata:
    driver: local
\`\`\`

### Key Docker Compose Commands

- **\`docker compose up -d\`**: Builds images if missing, creates networks/volumes, and starts all services in the background.
- **\`docker compose down\`**: Stops running containers and removes networks created by \`up\`.
- **\`docker compose down -v\`**: Stops containers and removes created networks **and named volumes**.
- **\`docker compose logs -f api\`**: Follows live log output for the \`api\` service.
- **\`docker compose ps\`**: Displays state and port mappings for defined stack services.

---

## 2. Docker Networking: Communication & Discovery

Docker networking abstracts low-level networking constructs (iptables, veth pairs, network namespaces) to let containers communicate securely.

### Network Drivers Explained

1. **Bridge (Default)**: Creates a private software bridge network on the host. Containers connected to the same bridge network can communicate. Port forwarding mapping (\`-p\`) exposes internal ports to the host interface.
2. **Host**: Removes network isolation between container and Docker host. The container directly uses the host machine's IP and ports (no port mapping required; offers maximum performance).
3. **Overlay**: Enables communication across multiple Docker daemon hosts in Docker Swarm mode or Kubernetes clusters.
4. **None**: Disables all networking for maximum security/isolation.

### User-Defined Networks & Embedded DNS

When containers join a **user-defined bridge network** (like \`app-network\` in our compose file above), Docker provides an **embedded DNS server** at \`127.0.0.11\`.

This means containers do not need hardcoded IP addresses. The backend API can connect to PostgreSQL simply using the service name as host:

\`\`\`javascript
// Backend database connection string:
const dbUri = "postgres://postgres:secretpassword@postgres-db:5432/appdb";
\`\`\`

Docker automatically resolves \`postgres-db\` to the container's current internal IP address within \`app-network\`.

### CLI Commands for Networking

\`\`\`bash
# Create custom isolated bridge network
docker network create my-custom-net

# Connect running container to network
docker network connect my-custom-net web-app

# Inspect network details and connected IP addresses
docker network inspect my-custom-net
\`\`\`

---

## 3. Docker Volumes: Data Persistence & Storage

By default, files created inside a container reside on its writable container layer. When a container is deleted (\`docker rm\`), **all data stored in this layer is lost forever**.

To persist state (like databases or upload directories), Docker provides storage mounting mechanisms.

### Types of Docker Storage

1. **Named Volumes**: Managed entirely by Docker on host filesystem storage (\`/var/lib/docker/volumes/\` on Linux). Recommended for production database storage.
2. **Bind Mounts**: Maps a specific file or directory from host filesystem directly into container. Ideal for local development source code hot-reloading.
3. **tmpfs Mounts**: Stored strictly in host memory (RAM) without writing to host disk. Great for temporary sensitive security tokens or temporary scratch buffers.

### Bind Mount vs Named Volume Comparison

- **Named Volume Syntax**: \`-v pgdata:/var/lib/postgresql/data\`
  - High performance, decoupled from host directory structure, backed up via Docker volume tooling.
- **Bind Mount Syntax**: \`-v $(pwd)/src:/usr/src/app/src\`
  - Directly reflects host code changes into container in real-time.

### Essential Volume Management Commands

\`\`\`bash
# Create a named volume
docker volume create db_data

# List all volumes on host system
docker volume ls

# Inspect volume host path and driver details
docker volume inspect db_data

# Remove unused volumes (free disk space)
docker volume prune
\`\`\`

By mastering Docker Compose multi-service definitions, custom bridge network resolution, and named volumes, you can run robust production application stacks with confidence.
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

export default POSTS;
