# Enterprise Knowledge Base

An enterprise knowledge base powered by **Retrieval-Augmented Generation (RAG)**, with verifiable answer provenance and automated knowledge-gap analytics.

## Overview

Organizations often store important knowledge across multiple documents, reports, wikis, and internal communication platforms. Finding accurate and relevant information across these scattered sources can be time-consuming.

This project aims to develop an AI-powered enterprise knowledge base that allows users to retrieve information and ask questions in natural language using organizational documents.

The system uses Retrieval-Augmented Generation (RAG) to generate context-aware answers grounded in retrieved documents.

## Key Features

- **Document Ingestion:** Process and index organizational documents.
- **Semantic Retrieval:** Retrieve relevant information using vector embeddings and similarity search.
- **Context-Aware Answers:** Generate answers using retrieved document context.
- **Verifiable Provenance:** Provide source references to help users trace answers back to their original documents.
- **Confidence-Based Responses:** Identify queries with insufficient supporting information.
- **Knowledge-Gap Analytics:** Analyze unanswered and low-confidence queries to identify missing documentation.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Backend | Python, FastAPI |
| Document Processing | MinerU |
| Embeddings | BGE-M3 |
| Vector Database | Qdrant |
| Reranking | BGE Reranker |
| LLM | Google Gemini |

## Project Structure

```text
enterprise-knowledge-base/
├── backend/
├── frontend/
├── docs/
├── .gitignore
├── README.md
└── LICENSE
```

## Project Status

Currently under development. The initial project structure and RAG pipeline design are being established.

## Team

Developed as a three-member major project.
