# AI Coding Guidelines for H2 Research Frontend

## Architecture Overview
This is a React SPA using Vite, displaying scientific articles on hydrogen research. Key components:
- **Pages** (`src/pages/`): Route handlers like `Articles.jsx` for data fetching and layout.
- **Components** (`src/components/`): Reusable UI like `StudyCard.jsx`, `FilterSidebar.jsx`.
- **Store** (`src/store/`): Redux Toolkit for auth state; local state for article data.
- **API** (`src/config/apiHandle/`): Axios instance with base URL `https://api.h2research.org/api/`, JWT auth via localStorage.

Data flow: User filters/search → API call to `final-article-list-main` → Render `StudyCard` components. Filters transformed from strings to objects with `id`/`name` (see `transformFilters` in `utils/helpers.js`).

## Developer Workflows
- **Development**: `npm run dev` (Vite dev server on port 5173).
- **Build**: `npm run build` (outputs to `dist/`).
- **Lint**: `npm run lint` (ESLint with React rules).
- **Deploy**: Firebase via `firebase_deploy/firebase.json`; run `firebase deploy` after build.
- **Debug**: Use Redux DevTools for store; browser dev tools for API calls. API timeouts at 15s.

## Project-Specific Patterns
- **Search/Filter Logic**: Search terms as arrays in `admin_search`, with `isAnd` boolean for AND/OR. Filters send `id` values only (e.g., `studyTypes: [1,2]`). Other filters like `HighlightArticle` send `"True"` strings.
- **State Preservation**: Use `sessionStorage` for article list state (key: `'articlesListState'`); restore on navigation via `location.state`.
- **Component Props**: Pass full objects (e.g., `study` object) to components; access nested data like `study.publicData.title`.
- **Styling**: Tailwind CSS with custom colors (e.g., `text-[#004C78]` for primary blue). Responsive classes: `sm:`, `md:`, `lg:`.
- **Error Handling**: API errors logged; use `react-loader-spinner` for loading states.
- **Routing**: React Router; navigate with `useNavigate()`; preserve filters in URL params (e.g., `?search=term&logic=AND`).

## Integration Points
- **Backend API**: POST requests with JSON body; auth via `Authorization: Bearer <token>`.
- **External Libs**: Chart.js for visualizations, PDF.js for viewers, Antd for UI components.
- **Assets**: Images in `src/assets/images/`; import as modules (e.g., `import inReviewImage from "../../assets/images/inReview.png"`).

Reference: `Articles.jsx` for fetch logic, `StudyCard.jsx` for rendering, `package.json` for deps.</content>
<parameter name="filePath">.github/copilot-instructions.md