'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Badge } from '@monorepo-starter/ui/components/badge';
import { Button } from '@monorepo-starter/ui/components/button';
import { Checkbox } from '@monorepo-starter/ui/components/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@monorepo-starter/ui/components/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@monorepo-starter/ui/components/dropdown-menu';
import { Input } from '@monorepo-starter/ui/components/input';
import { Label } from '@monorepo-starter/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@monorepo-starter/ui/components/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@monorepo-starter/ui/components/table';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  Edit,
  Eye,
  EyeOff,
  GroupIcon,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react';

// 메뉴 데이터 스키마 정의
export const menuSchema = z.object({
  id: z.number(),
  name: z.string(),
  path: z.string(),
  icon: z.string().optional(),
  parentId: z.number().optional(),
  order: z.number(),
  isVisible: z.boolean(),
  isActive: z.boolean(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MenuItem = z.infer<typeof menuSchema>;

// 샘플 데이터
const sampleMenus: MenuItem[] = [
  {
    id: 1,
    name: '대시보드',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    parentId: undefined,
    order: 1,
    isVisible: true,
    isActive: true,
    description: '메인 대시보드 페이지',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: '사용자 관리',
    path: '/users',
    icon: 'Users',
    parentId: undefined,
    order: 2,
    isVisible: true,
    isActive: true,
    description: '사용자 목록 및 관리',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: '사용자 목록',
    path: '/users/list',
    icon: 'List',
    parentId: undefined,
    order: 3,
    isVisible: true,
    isActive: true,
    description: '사용자 목록 조회',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: '사용자 추가',
    path: '/users/create',
    icon: 'UserPlus',
    parentId: undefined,
    order: 4,
    isVisible: true,
    isActive: true,
    description: '새 사용자 등록',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: '시스템 설정',
    path: '/settings',
    icon: 'Settings',
    parentId: undefined,
    order: 5,
    isVisible: true,
    isActive: false,
    description: '시스템 전반적인 설정',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: '메뉴 관리',
    path: '/settings/menus',
    icon: 'Menu',
    parentId: undefined,
    order: 6,
    isVisible: true,
    isActive: true,
    description: '메뉴 구조 관리',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 7,
    name: '상품 관리',
    path: '/products',
    icon: 'Package',
    parentId: undefined,
    order: 7,
    isVisible: true,
    isActive: true,
    description: '상품 목록 및 재고 관리',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 8,
    name: '주문 관리',
    path: '/orders',
    icon: 'ShoppingCart',
    parentId: undefined,
    order: 8,
    isVisible: true,
    isActive: true,
    description: '주문 내역 및 처리',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 9,
    name: '재고 관리',
    path: '/inventory',
    icon: 'Warehouse',
    parentId: undefined,
    order: 9,
    isVisible: true,
    isActive: true,
    description: '재고 현황 및 관리',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 10,
    name: '고객 관리',
    path: '/customers',
    icon: 'UserCheck',
    parentId: undefined,
    order: 10,
    isVisible: true,
    isActive: true,
    description: '고객 정보 및 관리',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 11,
    name: '매출 분석',
    path: '/analytics/sales',
    icon: 'TrendingUp',
    parentId: undefined,
    order: 11,
    isVisible: true,
    isActive: true,
    description: '매출 통계 및 분석',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 12,
    name: '리포트',
    path: '/reports',
    icon: 'FileText',
    parentId: undefined,
    order: 12,
    isVisible: true,
    isActive: true,
    description: '다양한 리포트 생성',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 13,
    name: '알림 설정',
    path: '/notifications',
    icon: 'Bell',
    parentId: undefined,
    order: 13,
    isVisible: false,
    isActive: true,
    description: '시스템 알림 설정',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 14,
    name: '백업 관리',
    path: '/backup',
    icon: 'Database',
    parentId: undefined,
    order: 14,
    isVisible: true,
    isActive: false,
    description: '데이터 백업 및 복원',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 15,
    name: '로그 관리',
    path: '/logs',
    icon: 'ScrollText',
    parentId: undefined,
    order: 15,
    isVisible: true,
    isActive: true,
    description: '시스템 로그 조회',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// 액션 핸들러 함수들
const handleEdit = (menu: MenuItem) => {
  toast.info(`${menu.name} 메뉴 편집 기능을 구현해주세요.`);
};

const handleToggleVisibility = (menu: MenuItem) => {
  toast.success(`${menu.name} 메뉴 ${menu.isVisible ? '숨김' : '표시'} 처리되었습니다.`);
};

const handleDelete = (menu: MenuItem) => {
  toast.error(`${menu.name} 메뉴 삭제 기능을 구현해주세요.`);
};

// 전역 핸들러 함수 (컬럼 정의에서 사용)
let globalHandleManagePermissions: (menu: MenuItem) => void;

const handleManagePermissions = (menu: MenuItem) => {
  if (globalHandleManagePermissions) {
    globalHandleManagePermissions(menu);
  }
};

// 테이블 컬럼 정의
const columns: ColumnDef<MenuItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="모든 행 선택"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="행 선택"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: '메뉴명',
    cell: ({ row }) => {
      const menu = row.original;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{menu.name}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'path',
    header: '경로',
    cell: ({ row }) => <code className="bg-muted rounded px-2 py-1 text-sm">{row.original.path}</code>,
  },
  {
    accessorKey: 'order',
    header: '순서',
    cell: ({ row }) => (
      <div className="text-center">
        <span className="bg-muted rounded px-2 py-1 text-sm">{row.original.order}</span>
      </div>
    ),
  },
  {
    accessorKey: 'isVisible',
    header: '표시',
    cell: ({ row }) => {
      const isVisible = row.original.isVisible;
      return (
        <div className="flex items-center justify-center">
          {isVisible ? (
            <Eye className="h-4 w-4 text-green-600" />
          ) : (
            <EyeOff className="text-muted-foreground h-4 w-4" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: '상태',
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return <Badge variant={isActive ? 'default' : 'secondary'}>{isActive ? '활성' : '비활성'}</Badge>;
    },
  },
  {
    accessorKey: 'description',
    header: '설명',
    cell: ({ row }) => {
      const description = row.original.description;
      return description ? (
        <span className="text-muted-foreground max-w-[200px] truncate text-sm">{description}</span>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    id: 'actions',
    header: '작업',
    cell: ({ row }) => {
      const menu = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleManagePermissions(menu)}>
              <GroupIcon className="mr-2 h-4 w-4" />
              메뉴별 권한 관리
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(menu)}>
              <Edit className="mr-2 h-4 w-4" />
              편집
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleVisibility(menu)}>
              {menu.isVisible ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  숨기기
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  표시
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(menu)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 메뉴별 권한 관리 모달 컴포넌트
function MenuPermissionDialog({ isOpen, onClose, menu }: { isOpen: boolean; onClose: () => void; menu: MenuItem }) {
  // 샘플 권한 데이터
  const allPermissions = [
    { id: 1, name: '회사', description: '회사 루트 권한' },
    { id: 2, name: '창고 마스터', description: '창고 관련 업무 권한' },
    { id: 3, name: '셀러 마스터', description: '셀러 관련 업무 권한' },
    { id: 4, name: '창고', description: '창고 관련 업무 권한' },
    { id: 5, name: '셀러', description: '셀러 관련 업무 권한' },
    { id: 6, name: '기본 작업자', description: '기본 작업자 권한' },
    { id: 7, name: '확장 작업자', description: '확장 작업자 권한' },
    { id: 8, name: '관리자', description: '시스템 관리자 권한' },
    { id: 9, name: '분석가', description: '데이터 분석 권한' },
    { id: 10, name: '감사자', description: '감사 및 모니터링 권한' },
  ];

  // 현재 메뉴에 할당된 권한 (샘플 데이터)
  const [assignedPermissions, setAssignedPermissions] = React.useState<number[]>([1, 2, 3]);
  const [selectedAssigned, setSelectedAssigned] = React.useState<number[]>([]);
  const [selectedUnassigned, setSelectedUnassigned] = React.useState<number[]>([]);

  const unassignedPermissions = allPermissions.filter((p) => !assignedPermissions.includes(p.id));

  const handleMoveToAssigned = () => {
    const newAssigned = [...assignedPermissions, ...selectedUnassigned];
    setAssignedPermissions(newAssigned);
    setSelectedUnassigned([]);
    toast.success(`${selectedUnassigned.length}개 권한이 할당되었습니다.`);
  };

  const handleMoveToUnassigned = () => {
    const newAssigned = assignedPermissions.filter((id) => !selectedAssigned.includes(id));
    setAssignedPermissions(newAssigned);
    setSelectedAssigned([]);
    toast.success(`${selectedAssigned.length}개 권한이 해제되었습니다.`);
  };

  const handleSelectAssigned = (permissionId: number) => {
    setSelectedAssigned((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    );
  };

  const handleSelectUnassigned = (permissionId: number) => {
    setSelectedUnassigned((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId],
    );
  };

  const handleSave = () => {
    toast.success(`${menu.name} 메뉴의 권한이 저장되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{menu.name} - 권한 관리</DialogTitle>
          <DialogDescription>이 메뉴에 접근할 수 있는 권한을 설정하세요.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6">
          {/* 할당된 권한 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">할당된 권한</Label>
              <span className="text-muted-foreground text-sm">{assignedPermissions.length}개</span>
            </div>
            <div className="h-full max-h-100 overflow-y-auto rounded-md border p-3">
              {assignedPermissions.map((permissionId) => {
                const permission = allPermissions.find((p) => p.id === permissionId);
                if (!permission) return null;

                return (
                  <div
                    key={permission.id}
                    className={`hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between space-x-2 rounded-md p-2 ${
                      selectedAssigned.includes(permission.id) ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => handleSelectAssigned(permission.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex h-4 w-4 items-center justify-center">
                        {selectedAssigned.includes(permission.id) && (
                          <div className="bg-primary h-2 w-2 rounded-full" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{permission.name}</span>
                    </div>
                    <Users className="text-muted-foreground h-4 w-4" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 중앙 버튼들 */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMoveToUnassigned}
              disabled={selectedAssigned.length === 0}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              해제
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMoveToAssigned}
              disabled={selectedUnassigned.length === 0}
              className="w-full"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              할당
            </Button>
          </div>

          {/* 비할당된 권한 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">비할당된 권한</Label>
              <span className="text-muted-foreground text-sm">{unassignedPermissions.length}개</span>
            </div>
            <div className="h-full max-h-60 overflow-y-auto rounded-md border p-3">
              {unassignedPermissions.map((permission) => (
                <div
                  key={permission.id}
                  className={`hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between space-x-2 rounded-md p-2 ${
                    selectedUnassigned.includes(permission.id) ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => handleSelectUnassigned(permission.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center">
                      {selectedUnassigned.includes(permission.id) && (
                        <div className="bg-primary h-2 w-2 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{permission.name}</span>
                  </div>
                  <Users className="text-muted-foreground h-4 w-4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 메뉴 추가/편집 다이얼로그 컴포넌트
function MenuDialog({
  isOpen,
  onClose,
  menu,
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu?: MenuItem;
  isEdit?: boolean;
}) {
  const [formData, setFormData] = React.useState({
    name: menu?.name || '',
    path: menu?.path || '',
    parentId: menu?.parentId || undefined,
    order: menu?.order || 1,
    isVisible: menu?.isVisible ?? true,
    isActive: menu?.isActive ?? true,
    description: menu?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${isEdit ? '메뉴가 수정' : '새 메뉴가 추가'}되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? '메뉴 편집' : '새 메뉴 추가'}</DialogTitle>
          <DialogDescription>{isEdit ? '메뉴 정보를 수정하세요.' : '새로운 메뉴를 추가하세요.'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">메뉴명</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="메뉴명을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="path">경로</Label>
              <Input
                id="path"
                value={formData.path}
                onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                placeholder="/path"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">순서</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="메뉴 설명"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isVisible"
                checked={formData.isVisible}
                onCheckedChange={(checked) => setFormData({ ...formData, isVisible: !!checked })}
              />
              <Label htmlFor="isVisible">표시</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
              />
              <Label htmlFor="isActive">활성</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">{isEdit ? '수정' : '추가'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// 메인 어드민 메뉴 관리 컴포넌트
export default function AdminMenuManagementPage() {
  const [data] = React.useState<MenuItem[]>(sampleMenus);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingMenu, setEditingMenu] = React.useState<MenuItem | undefined>();
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState<MenuItem | undefined>();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleAddMenu = () => {
    setEditingMenu(undefined);
    setIsDialogOpen(true);
  };

  const handleOpenPermissionDialog = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setIsPermissionDialogOpen(true);
  };

  // 전역 핸들러 함수 설정
  React.useEffect(() => {
    globalHandleManagePermissions = handleOpenPermissionDialog;
  }, []);

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">메뉴 관리</h1>
          <p className="text-muted-foreground">시스템 메뉴 구조를 관리하고 설정할 수 있습니다.</p>
        </div>
        <Button onClick={handleAddMenu}>
          <Plus className="mr-2 h-4 w-4" />
          메뉴 추가
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="메뉴명으로 검색..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={(table.getColumn('isVisible')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('isVisible')?.setFilterValue(value === 'all' ? undefined : value === 'true')
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="표시 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="true">표시</SelectItem>
            <SelectItem value="false">숨김</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={(table.getColumn('isActive')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('isActive')?.setFilterValue(value === 'all' ? undefined : value === 'true')
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="활성 상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="true">활성</SelectItem>
            <SelectItem value="false">비활성</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns2 className="mr-2 h-4 w-4" />
              컬럼
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 테이블 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length}개 중 {table.getFilteredRowModel().rows.length}개 행이
          선택되었습니다.
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              페이지당 행 수
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              페이지 {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">첫 페이지로</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">이전 페이지</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">다음 페이지</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">마지막 페이지로</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 메뉴 추가/편집 다이얼로그 */}
      <MenuDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        menu={editingMenu}
        isEdit={!!editingMenu}
      />

      {/* 메뉴별 권한 관리 다이얼로그 */}
      {selectedMenu && (
        <MenuPermissionDialog
          isOpen={isPermissionDialogOpen}
          onClose={() => setIsPermissionDialogOpen(false)}
          menu={selectedMenu}
        />
      )}
    </div>
  );
}
