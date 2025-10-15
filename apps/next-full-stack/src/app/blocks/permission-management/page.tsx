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
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
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
import { Textarea } from '@monorepo-starter/ui/components/textarea';

// 권한 데이터 스키마 정의
export const permissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  menuIds: z.array(z.number()),
  featureIds: z.array(z.number()),
  userCount: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Permission = z.infer<typeof permissionSchema>;

// 샘플 데이터
const samplePermissions: Permission[] = [
  {
    id: 1,
    name: '관리자',
    description: '시스템 전체 관리 권한',
    menuIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    featureIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    userCount: 3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: '회사',
    description: '회사 루트 권한',
    menuIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    featureIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    userCount: 8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: '창고 마스터',
    description: '창고 관련 업무 권한',
    menuIds: [1, 2, 3, 4],
    featureIds: [1, 2, 3, 4],
    userCount: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: '셀러 마스터',
    description: '셀러 관련 업무 권한',
    menuIds: [1, 5, 6, 7, 8],
    featureIds: [3, 6, 7, 8],
    userCount: 12,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: '창고',
    description: '창고 관련 업무 권한',
    menuIds: [1, 9, 10, 11],
    featureIds: [5, 9, 10, 11],
    userCount: 6,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: '셀러',
    description: '셀러 관련 업무 권한',
    menuIds: [1, 12, 13, 14],
    featureIds: [7, 12, 13, 14],
    userCount: 4,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 7,
    name: '기본 작업자',
    description: '기본 작업자 권한',
    menuIds: [1, 15, 16, 17, 18],
    featureIds: [12, 15],
    userCount: 2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 8,
    name: '확장 작업자',
    description: '확장 작업자 권한',
    menuIds: [1, 2],
    featureIds: [1, 2],
    userCount: 45,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 9,
    name: '게스트',
    description: '제한된 조회 권한',
    menuIds: [1],
    featureIds: [1],
    userCount: 0,
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 10,
    name: '테스트 권한',
    description: '개발 및 테스트용 권한',
    menuIds: [1, 2, 3],
    featureIds: [1, 2, 3],
    userCount: 0,
    isActive: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// 액션 핸들러 함수들
const handleEdit = (permission: Permission) => {
  toast.info(`${permission.name} 권한 편집 기능을 구현해주세요.`);
};

const handleTogglePermission = (permission: Permission) => {
  toast.success(`${permission.name} 권한이 ${permission.isActive ? '비활성화' : '활성화'}되었습니다.`);
};

const handleDelete = (permission: Permission) => {
  toast.error(`${permission.name} 권한 삭제 기능을 구현해주세요.`);
};

// 전역 핸들러 함수들 (컬럼 정의에서 사용)
let globalHandleManageMenus: (permission: Permission) => void;
let globalHandleManageFeatures: (permission: Permission) => void;
let globalHandleManageUsers: (permission: Permission) => void;

const handleManageMenus = (permission: Permission) => {
  if (globalHandleManageMenus) {
    globalHandleManageMenus(permission);
  }
};

const handleManageFeatures = (permission: Permission) => {
  if (globalHandleManageFeatures) {
    globalHandleManageFeatures(permission);
  }
};

const handleManageUsers = (permission: Permission) => {
  if (globalHandleManageUsers) {
    globalHandleManageUsers(permission);
  }
};

// 테이블 컬럼 정의
const columns: ColumnDef<Permission>[] = [
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
    header: '권한명',
    cell: ({ row }) => {
      const permission = row.original;
      return (
        <div className="flex items-center gap-2">
          <Users className="text-muted-foreground h-4 w-4" />
          <span className="font-medium">{permission.name}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: '설명',
    cell: ({ row }) => {
      const description = row.original.description;
      return <span className="text-muted-foreground max-w-[300px] truncate text-sm">{description}</span>;
    },
  },
  {
    accessorKey: 'menuIds',
    header: '메뉴 수',
    cell: ({ row }) => {
      const menuCount = row.original.menuIds.length;
      return (
        <Badge
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground cursor-pointer text-xs"
          onClick={() => handleManageMenus(row.original)}
        >
          {menuCount}개
        </Badge>
      );
    },
  },
  {
    accessorKey: 'featureIds',
    header: '기능 수',
    cell: ({ row }) => {
      const featureCount = row.original.featureIds.length;
      return (
        <Badge
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground cursor-pointer text-xs"
          onClick={() => handleManageFeatures(row.original)}
        >
          {featureCount}개
        </Badge>
      );
    },
  },
  {
    accessorKey: 'userCount',
    header: '사용자 수',
    cell: ({ row }) => {
      const userCount = row.original.userCount;
      return (
        <div
          className="hover:text-primary flex cursor-pointer items-center gap-2"
          onClick={() => handleManageUsers(row.original)}
        >
          <span className="text-sm">{userCount}명</span>
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
    id: 'actions',
    header: '작업',
    cell: ({ row }) => {
      const permission = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(permission)}>
              <Edit className="mr-2 h-4 w-4" />
              편집
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleTogglePermission(permission)}>
              {permission.isActive ? '비활성화' : '활성화'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(permission)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 권한 추가/편집 다이얼로그 컴포넌트 (간단한 버전)
function PermissionDialog({
  isOpen,
  onClose,
  permission,
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  permission?: Permission;
  isEdit?: boolean;
}) {
  const [formData, setFormData] = React.useState({
    name: permission?.name || '',
    description: permission?.description || '',
    isActive: permission?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${isEdit ? '권한이 수정' : '새 권한이 추가'}되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? '권한 편집' : '새 권한 추가'}</DialogTitle>
          <DialogDescription>{isEdit ? '권한 정보를 수정하세요.' : '새로운 권한을 추가하세요.'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">권한명</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="권한명을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="권한에 대한 상세 설명"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
            />
            <Label htmlFor="isActive">활성화</Label>
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

// 메뉴 관리 모달 컴포넌트
function MenuManagementDialog({
  isOpen,
  onClose,
  permission,
}: {
  isOpen: boolean;
  onClose: () => void;
  permission: Permission;
}) {
  const [selectedMenus, setSelectedMenus] = React.useState<number[]>(permission.menuIds);

  const sampleMenus = [
    { id: 1, name: '대시보드', path: '/dashboard' },
    { id: 2, name: '사용자 관리', path: '/users' },
    { id: 3, name: '사용자 목록', path: '/users/list' },
    { id: 4, name: '사용자 추가', path: '/users/create' },
    { id: 5, name: '시스템 설정', path: '/settings' },
    { id: 6, name: '메뉴 관리', path: '/settings/menus' },
    { id: 7, name: '상품 관리', path: '/products' },
    { id: 8, name: '주문 관리', path: '/orders' },
    { id: 9, name: '재고 관리', path: '/inventory' },
    { id: 10, name: '고객 관리', path: '/customers' },
    { id: 11, name: '매출 분석', path: '/analytics/sales' },
    { id: 12, name: '리포트', path: '/reports' },
    { id: 13, name: '알림 설정', path: '/notifications' },
    { id: 14, name: '백업 관리', path: '/backup' },
    { id: 15, name: '로그 관리', path: '/logs' },
  ];

  const handleMenuToggle = (menuId: number) => {
    setSelectedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]));
  };

  const handleSave = () => {
    toast.success(`${permission.name}의 메뉴가 업데이트되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{permission.name} - 메뉴 관리</DialogTitle>
          <DialogDescription>이 권한에 할당할 메뉴를 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">메뉴 선택</Label>
            <span className="text-muted-foreground text-sm">{selectedMenus.length}개 선택됨</span>
          </div>
          <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto rounded-md border p-3">
            {sampleMenus.map((menu) => (
              <div key={menu.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`menu-${menu.id}`}
                  checked={selectedMenus.includes(menu.id)}
                  onCheckedChange={() => handleMenuToggle(menu.id)}
                />
                <Label htmlFor={`menu-${menu.id}`} className="text-sm">
                  {menu.name}
                </Label>
              </div>
            ))}
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

// 기능 관리 모달 컴포넌트
function FeatureManagementDialog({
  isOpen,
  onClose,
  permission,
}: {
  isOpen: boolean;
  onClose: () => void;
  permission: Permission;
}) {
  const [selectedFeatures, setSelectedFeatures] = React.useState<number[]>(permission.featureIds);

  const sampleFeatures = [
    { id: 1, name: '택배 출고처리 기능' },
    { id: 2, name: '출고내역 등록/수정 기능' },
    { id: 3, name: '배송차량 신청 기능' },
    { id: 4, name: '센터 접근 기능' },
    { id: 5, name: '재고 관리 기능' },
    { id: 6, name: '배송 라우팅 기능' },
    { id: 7, name: '센터 데이터 조회 기능' },
    { id: 8, name: '배송 추적 기능' },
    { id: 9, name: '비용 관리 기능' },
    { id: 10, name: '파트너 관리 기능' },
    { id: 11, name: '품질 관리 기능' },
    { id: 12, name: '시스템 설정 기능' },
    { id: 13, name: '알림 관리 기능' },
    { id: 14, name: '통계 분석 기능' },
    { id: 15, name: '보안 관리 기능' },
  ];

  const handleFeatureToggle = (featureId: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    );
  };

  const handleSave = () => {
    toast.success(`${permission.name}의 기능이 업데이트되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{permission.name} - 기능 관리</DialogTitle>
          <DialogDescription>이 권한에 할당할 기능을 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">기능 선택</Label>
            <span className="text-muted-foreground text-sm">{selectedFeatures.length}개 선택됨</span>
          </div>
          <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto rounded-md border p-3">
            {sampleFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature.id}`}
                  checked={selectedFeatures.includes(feature.id)}
                  onCheckedChange={() => handleFeatureToggle(feature.id)}
                />
                <Label htmlFor={`feature-${feature.id}`} className="text-sm">
                  {feature.name}
                </Label>
              </div>
            ))}
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

// 사용자 관리 모달 컴포넌트
function UserManagementDialog({
  isOpen,
  onClose,
  permission,
}: {
  isOpen: boolean;
  onClose: () => void;
  permission: Permission;
}) {
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);

  const sampleUsers = [
    { id: 1, name: '김관리', email: 'admin@company.com', company: 'ABC물류' },
    { id: 2, name: '이창고', email: 'warehouse@company.com', company: 'XYZ센터' },
    { id: 3, name: '박출고', email: 'outbound@company.com', company: 'ABC물류' },
    { id: 4, name: '최배송', email: 'delivery@company.com', company: 'DEF배송' },
    { id: 5, name: '정재고', email: 'inventory@company.com', company: 'XYZ센터' },
    { id: 6, name: '한셀러', email: 'seller@company.com', company: 'GHI마켓' },
    { id: 7, name: '강분석', email: 'analyst@company.com', company: 'ABC물류' },
    { id: 8, name: '윤작업', email: 'worker@company.com', company: 'XYZ센터' },
    { id: 9, name: '서확장', email: 'extended@company.com', company: 'JKL확장' },
    { id: 10, name: '조기본', email: 'basic@company.com', company: 'MNO기본' },
  ];

  const handleUserToggle = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  const handleSave = () => {
    toast.success(`${permission.name}의 사용자가 업데이트되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{permission.name} - 사용자 관리</DialogTitle>
          <DialogDescription>이 권한에 할당할 사용자를 선택하세요.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">사용자 선택</Label>
            <span className="text-muted-foreground text-sm">{selectedUsers.length}명 선택됨</span>
          </div>
          <div className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto rounded-md border p-3">
            {sampleUsers.map((user) => (
              <div
                key={user.id}
                className="hover:bg-muted/50 flex items-center justify-between space-x-2 rounded-md p-3"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleUserToggle(user.id)}
                  />
                  <div className="flex flex-col">
                    <Label htmlFor={`user-${user.id}`} className="text-sm font-medium">
                      {user.name}
                    </Label>
                    <span className="text-muted-foreground text-xs">{user.email}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-primary text-sm font-medium">{user.company}</span>
                </div>
              </div>
            ))}
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

// 메인 권한 관리 컴포넌트
export default function PermissionManagementPage() {
  const [data] = React.useState<Permission[]>(samplePermissions);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingPermission, setEditingPermission] = React.useState<Permission | undefined>();
  const [isMenuDialogOpen, setIsMenuDialogOpen] = React.useState(false);
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = React.useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = React.useState(false);
  const [selectedPermission, setSelectedPermission] = React.useState<Permission | undefined>();

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

  const handleAddPermission = () => {
    setEditingPermission(undefined);
    setIsDialogOpen(true);
  };

  const handleOpenMenuDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsMenuDialogOpen(true);
  };

  const handleOpenFeatureDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsFeatureDialogOpen(true);
  };

  const handleOpenUserDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsUserDialogOpen(true);
  };

  // 전역 핸들러 함수들 설정
  React.useEffect(() => {
    globalHandleManageMenus = handleOpenMenuDialog;
    globalHandleManageFeatures = handleOpenFeatureDialog;
    globalHandleManageUsers = handleOpenUserDialog;
  }, []);

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">권한 관리</h1>
          <p className="text-muted-foreground">사용자 권한을 관리하고 메뉴/기능을 할당할 수 있습니다.</p>
        </div>
        <Button onClick={handleAddPermission}>
          <Plus className="mr-2 h-4 w-4" />
          권한 추가
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="권한명으로 검색..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={(table.getColumn('isActive')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('isActive')?.setFilterValue(value === 'all' ? undefined : value === 'true')
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="상태" />
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

      {/* 권한 추가/편집 다이얼로그 */}
      <PermissionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        permission={editingPermission}
        isEdit={!!editingPermission}
      />

      {/* 메뉴 관리 다이얼로그 */}
      {selectedPermission && (
        <MenuManagementDialog
          isOpen={isMenuDialogOpen}
          onClose={() => setIsMenuDialogOpen(false)}
          permission={selectedPermission}
        />
      )}

      {/* 기능 관리 다이얼로그 */}
      {selectedPermission && (
        <FeatureManagementDialog
          isOpen={isFeatureDialogOpen}
          onClose={() => setIsFeatureDialogOpen(false)}
          permission={selectedPermission}
        />
      )}

      {/* 사용자 관리 다이얼로그 */}
      {selectedPermission && (
        <UserManagementDialog
          isOpen={isUserDialogOpen}
          onClose={() => setIsUserDialogOpen(false)}
          permission={selectedPermission}
        />
      )}
    </div>
  );
}
