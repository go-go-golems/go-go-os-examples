---
Title: Build standalone OS1 component lab with published npm packages
Ticket: os1-component-lab
Status: active
Topics:
    - react
    - storybook
    - npm
    - design-system
    - rtk-query
DocType: index
Intent: long-term
Owners: []
RelatedFiles: []
ExternalSources: []
Summary: "Ticket for building a standalone OS1 component lab using published @go-go-golems npm packages, React, RTK Query, and Storybook."
LastUpdated: 2026-05-11T14:35:00-04:00
WhatFor: "Tracks the design, implementation, validation, and diary for the standalone npm consumer app."
WhenToUse: "Use while implementing or reviewing the OS1 component lab in this repository."
---

# Build standalone OS1 component lab with published npm packages

## Overview

This ticket tracks a standalone React/Vite/TypeScript application that consumes public npm packages from `@go-go-golems`, especially `@go-go-golems/os-core`, to validate low-level OS1-style primitives outside the source monorepo.

The app uses RTK Query for self-contained data flow and Storybook for component-driven development. Each component lives in its own directory with a colocated `.stories.tsx` file.

## Key Links

- [Design guide](./design-doc/01-os1-component-lab-design-and-implementation-guide.md)
- [Diary](./reference/01-diary.md)
- [Tasks](./tasks.md)
- [Changelog](./changelog.md)

## Status

Current status: **active**

## Topics

- react
- storybook
- npm
- design-system
- rtk-query

## Structure

- `design-doc/` — implementation guide and architecture notes.
- `reference/` — chronological diary.
- `playbooks/` — future command runbooks if needed.
- `scripts/` — temporary scripts if needed.
- `sources/` — external/source references if needed.
