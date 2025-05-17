"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function DataTable({
  columns,
  initialData,
  apiEndpoint,
  pageQueryParam = "page",
  defaultPageSize = 10,
  customActions,
  onRowClick,
  meta,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const page = Number(searchParams.get(pageQueryParam) || "1");

  // 현재 URL의 모든 검색 파라미터를 유지하기 위한 함수
  const buildUrlWithParams = (endpoint, pageNum, pageSize) => {
    const params = new URLSearchParams();

    // 기본 페이지네이션 파라미터 추가
    params.set("currentPage", pageNum.toString());
    params.set("size", pageSize.toString());

    // 현재 URL의 다른 모든 검색 파라미터 추가 (pageQueryParam 제외)
    for (const [key, value] of searchParams.entries()) {
      if (key !== pageQueryParam) {
        params.set(key, value);
      }
    }

    return `${endpoint}?${params.toString()}`;
  };

  const { data, isLoading } = useSWR(
    buildUrlWithParams(apiEndpoint, page, defaultPageSize),
    {
      fallbackData: initialData,
    }
  );
  const updateUrl = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set(pageQueryParam, newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const tableData = data?.list || [];
  const totalItems = data?.totalCount || 0;
  const totalPages =
    data?.pages || Math.ceil(totalItems / defaultPageSize) || 0;

  const table = useReactTable({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: defaultPageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        updater instanceof Function
          ? updater({ pageIndex: page - 1, pageSize: defaultPageSize })
          : updater;
      updateUrl(newState.pageIndex + 1);
    },
    manualPagination: true,
    pageCount: totalPages,
    meta: {
      ...meta,
      totalCount: totalItems,
    },
  });

  const getPageNumbers = () => {
    const pages = [];
    const totalPagesToShow = isMobile ? 3 : 5;

    if (totalPages <= totalPagesToShow) {
      // 전체 페이지가 5개 이하면 모든 페이지를 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 전체 페이지가 5개 초과일 때는 현재 페이지를 중심으로 5개를 표시
      let startPage = Math.max(1, page - Math.floor(totalPagesToShow / 2));
      let endPage = startPage + totalPagesToShow - 1;

      // endPage가 totalPages를 초과하는 경우 조정
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">총 {totalItems}개</div>
        {customActions && (
          <div className="flex items-center gap-2">{customActions}</div>
        )}
      </div>

      <div className="rounded-md overflow-hidden bg-white">
        <Table className="w-full table-fixed min-w-[1000px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="break-all"
                    style={{
                      width: header.column.columnDef.meta?.size || "auto",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && !data ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <Loader2 className="h-100 w-5 animate-spin text-primary" />
                    <span>데이터를 불러오는 중...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : tableData.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-muted/50",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  tabIndex={onRowClick ? 0 : undefined}
                  role={onRowClick ? "button" : undefined}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      onRowClick(row.original);
                    }
                  }}
                  style={{ outline: "none" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="gap-0">
                <PaginationFirst
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage() || isLoading}
                />

                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage() || isLoading}
                />
              </PaginationItem>

              {getPageNumbers().map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(pageNumber - 1)}
                    isActive={page === pageNumber}
                    disabled={isLoading}
                    className={cn(
                      isLoading ? "pointer-events-none" : "cursor-pointer"
                    )}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage() || isLoading}
                />
                <PaginationLast
                  onClick={() => table.setPageIndex(totalPages - 1)}
                  disabled={!table.getCanNextPage() || isLoading}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
