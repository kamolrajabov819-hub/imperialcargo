

# Add Pagination to Admin CRM Client List

## What
Add page-based pagination to the CRM client list in the Admin page, limiting to 20 clients per page.

## How

**In `src/pages/Admin.tsx`**:

1. Add state: `const [currentPage, setCurrentPage] = useState(1)` with `CLIENTS_PER_PAGE = 20` constant
2. Reset `currentPage` to 1 whenever `search` changes
3. Derive `paginatedClients` from `filtered` array: `filtered.slice((currentPage - 1) * 20, currentPage * 20)`
4. Replace `filtered.map(...)` with `paginatedClients.map(...)` in both mobile card view and desktop table view
5. Add pagination controls below the client list using the existing `Pagination` UI components (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`)
6. Show "Showing X-Y of Z clients" text above or below the list
7. Style pagination to match the dark theme

## Files Changed
| File | Changes |
|---|---|
| `src/pages/Admin.tsx` | Add pagination state, slice filtered results, render pagination controls |

