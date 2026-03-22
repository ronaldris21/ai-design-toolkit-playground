# Expense Tracker — Plan de Implementación

## Context

Queremos construir un **Personal Expense Tracker** como primer proyecto para aprender el flujo profesional completo: spec-driven development, design con AI, y multi-agent orchestration. El objetivo principal es **aprender las herramientas**, el app es el vehículo.

## Tech Stack

| Layer | Choice | Por qué |
|-------|--------|---------|
| Framework | Vite + React 18 + TypeScript | Rápido, sin complejidad SSR |
| Styling | Tailwind CSS 4 | Compatible con Impeccable y UI UX Pro Max |
| Components | shadcn/ui | UI UX Pro Max tiene guidelines específicas para shadcn |
| Charts | Recharts | Recomendado por UI UX Pro Max para Line/Pie/Bar |
| State | Zustand | Ligero, TypeScript-first |
| Routing | React Router v7 | Standard |
| Forms | React Hook Form + Zod | Type-safe validation |
| Storage | localStorage (con service layer abstracto) | Simple, swap a DB después |

## MVP — 4 Pantallas

1. **Dashboard** — 3 cards resumen + donut chart (gasto por categoría) + line chart (tendencia mensual)
2. **Lista de Gastos** — Tabla con filtros (categoría, rango de fechas), delete con confirmación
3. **Agregar/Editar Gasto** — Form: monto, categoría, descripción, fecha. Validación con Zod
4. **Categorías** — CRUD simple: nombre + color por categoría

## Flujo por Fases

### Fase 0: Bootstrap (15 min)
```
npm create vite@latest expense-tracker -- --template react-ts
npm install tailwindcss @tailwindcss/vite recharts zustand react-router-dom react-hook-form zod @hookform/resolvers
npx shadcn@latest init
```
- Verificar que Forge corre el dev server
- `/bmad-help` para confirmar que BMAD responde

### Fase 1: Constitución y Especificación — Spec-Kit (45 min)

| Paso | Comando | Qué aprendes | Artifact |
|------|---------|-------------|----------|
| 1.1 | `/speckit.constitution` | Cómo definir principios del proyecto que cascadean a todo | `.specify/memory/constitution.md` |
| 1.2 | `/speckit.specify` | Cómo convertir ideas en specs formales con acceptance criteria | `.specify/memory/spec.md` |
| 1.3 | `/speckit.clarify` (opcional) | Cómo el AI stress-testea tus propios requirements | Gaps identificados |

### Fase 2: Arquitectura y Diseño — BMAD + Design Toolkit (90 min)

| Paso | Comando / Herramienta | Qué aprendes | Artifact |
|------|----------------------|-------------|----------|
| 2.1 | `/bmad-create-product-brief` | Cómo el agente PM estructura pensamiento de producto | `_bmad-output/planning-artifacts/product-brief.md` |
| 2.2 | `/bmad-create-ux-design` | Cómo se estructura un doc de UX profesional (user flows, design system) | `_bmad-output/planning-artifacts/ux-design.md` |
| 2.3 | UI UX Pro Max (skill) | Decisiones de diseño data-driven (paletas, fonts, colores de charts) | Tailwind config + shadcn theme |
| 2.4 | Mobbin (browser) | Research de UI patterns reales — buscar "expense tracker", "finance dashboard" | 2-3 screenshots de referencia en `docs/` |
| 2.5 | Stitch (browser) | Generar layouts desde texto — Dashboard screen | Layout de referencia |
| 2.6 | `/bmad-create-architecture` | ADRs, folder structure, data flow, component hierarchy | `_bmad-output/planning-artifacts/architecture.md` |

### Fase 3: Planificación y Tasks — Spec-Kit (30 min)

| Paso | Comando | Qué aprendes | Artifact |
|------|---------|-------------|----------|
| 3.1 | `/speckit.plan` | Cómo un plan técnico se alinea con constitution y spec | `.specify/memory/plan.md` |
| 3.2 | `/speckit.tasks` | Cómo descomponer un plan en tasks ordenados con dependencias | `.specify/memory/tasks.md` |
| 3.3 | `/speckit.analyze` | Cómo validar consistencia entre spec, plan y tasks | Reporte de gaps |
| 3.4 | `/speckit.checklist` | Cómo generar un definition of done antes de codear | `.specify/memory/checklist.md` |

### Fase 4: Implementación — Spec-Kit + Forge (3-4 hrs)

- `/agent-os:inject-standards` para inyectar convenciones
- Forge para dev server persistente + type-check en paralelo
- `/speckit.implement` para cada grupo de tasks:

| Grupo | Qué se construye | Tiempo est. |
|-------|-----------------|-------------|
| T1: Foundation | Tailwind theme, Zustand store setup, Router skeleton, localStorage service | 30 min |
| T2: Data Layer | Types, store CRUD actions, seed data de categorías default | 30 min |
| T3: Layout Shell | Sidebar nav, top bar, month selector, responsive | 30 min |
| T4: Categories | CRUD de categorías con color picker | 30 min |
| T5: Add/Edit Expense | Form con validación Zod | 30 min |
| T6: Expenses List | Tabla con filtros y delete | 40 min |
| T7: Dashboard | Cards resumen + donut chart + line chart | 45 min |
| T8: Polish Pass | Empty states, toasts, keyboard nav | 15 min |

### Fase 5: Design Polish — Impeccable (45 min)

| Comando | Qué hace |
|---------|---------|
| `/audit` | Scan de accesibilidad, performance, theming, responsive |
| `/typeset` | Corrige tipografía: sizes, line heights, heading hierarchy |
| `/arrange` | Revisa spacing: margins, padding, alignment, grid |
| `/colorize` | Valida contraste, consistencia de paleta |
| `/polish` | Hover states, transitions, border radii, shadows |
| `/animate` | Entrance animations, transitions, loading states |
| `/critique` | Review final con sugerencias específicas |

### Fase 6: Code Review y QA — BMAD (30 min)

| Comando | Qué aprendes |
|---------|-------------|
| `/bmad-code-review` | Review de calidad, patterns, type safety, error handling |
| `/bmad-review-adversarial-general` | Pensamiento adversarial: qué pasa si localStorage está lleno? Si borras categoría con gastos? |
| `/bmad-qa-generate-e2e-tests` | Cómo se genera un test plan profesional desde specs |

### Fase 7: Standards y Docs (15 min)

| Comando | Qué aprendes |
|---------|-------------|
| `/agent-os:discover-standards` | Cómo Agent OS detecta patterns del codebase completo (comparar con Fase 0) |
| `/bmad-document-project` | Cómo el Tech Writer agent genera docs desde el código |

## Resumen de Herramientas por Fase

| Herramienta | Fases |
|---|---|
| Spec-Kit | 1, 3, 4 |
| BMAD | 2, 6, 7 |
| Impeccable | 5 |
| UI UX Pro Max | 2 |
| Agent OS | 0, 4, 7 |
| Forge | 4, 5, 6 |
| Stitch | 2 |
| Mobbin | 2 |

## Tiempo Total Estimado: ~6.5-7.5 horas

Recomendación de sesiones:
- **Sesión 1** (3 hrs): Fases 0-3 — Planificación completa
- **Sesión 2** (3-4 hrs): Fase 4 — Implementación
- **Sesión 3** (1.5 hrs): Fases 5-7 — Polish, review, docs

## Verificación

- Dev server corriendo sin errores (Forge)
- 4 pantallas navegables con React Router
- CRUD completo de gastos y categorías
- Charts renderizando con datos
- Filtros funcionando (categoría + fecha)
- localStorage persistiendo entre reloads
- Audit de Impeccable pasando sin issues críticos
- Code review de BMAD sin findings de severidad alta
