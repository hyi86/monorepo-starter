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
import { Switch } from '@monorepo-starter/ui/components/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@monorepo-starter/ui/components/table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  Edit,
  ExternalLink,
  MoreHorizontal,
  MoveLeft,
  MoveRight,
  Plus,
  Search,
  Trash2,
  User,
} from 'lucide-react';

// 사용자 데이터 스키마 정의
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  company: z.string(),
  department: z.string().optional(),
  position: z.string().optional(),
  isActive: z.boolean(),
  lastLoginAt: z.string().optional(),
  permissionIds: z.array(z.number()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

// 샘플 사용자 데이터
const sampleUsers: User[] = [
  {
    id: 1,
    name: '김관리',
    email: 'admin@company.com',
    company: 'ABC물류',
    department: 'IT팀',
    position: '시스템 관리자',
    isActive: true,
    lastLoginAt: '2024-01-15T09:30:00Z',
    permissionIds: [1, 2, 3],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T09:30:00Z',
  },
  {
    id: 2,
    name: '이창고',
    email: 'warehouse@company.com',
    company: 'XYZ센터',
    department: '창고팀',
    position: '창고 관리자',
    isActive: true,
    lastLoginAt: '2024-01-14T14:20:00Z',
    permissionIds: [2, 4],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: 3,
    name: '박출고',
    email: 'outbound@company.com',
    company: 'ABC물류',
    department: '출고팀',
    position: '출고 담당자',
    isActive: true,
    lastLoginAt: '2024-01-13T11:15:00Z',
    permissionIds: [1, 3],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-13T11:15:00Z',
  },
  {
    id: 4,
    name: '최배송',
    email: 'delivery@company.com',
    company: 'DEF배송',
    department: '배송팀',
    position: '배송 관리자',
    isActive: false,
    lastLoginAt: '2024-01-10T16:45:00Z',
    permissionIds: [4, 5],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T16:45:00Z',
  },
  {
    id: 5,
    name: '정재고',
    email: 'inventory@company.com',
    company: 'XYZ센터',
    department: '재고팀',
    position: '재고 관리자',
    isActive: true,
    lastLoginAt: '2024-01-12T08:30:00Z',
    permissionIds: [2, 5],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T08:30:00Z',
  },
  {
    id: 6,
    name: '한셀러',
    email: 'seller@company.com',
    company: 'GHI마켓',
    department: '셀러팀',
    position: '셀러 관리자',
    isActive: true,
    lastLoginAt: '2024-01-11T13:20:00Z',
    permissionIds: [3, 6],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-11T13:20:00Z',
  },
  {
    id: 7,
    name: '강분석',
    email: 'analyst@company.com',
    company: 'ABC물류',
    department: '분석팀',
    position: '데이터 분석가',
    isActive: true,
    lastLoginAt: '2024-01-09T10:15:00Z',
    permissionIds: [1, 7],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-09T10:15:00Z',
  },
  {
    id: 8,
    name: '윤작업',
    email: 'worker@company.com',
    company: 'XYZ센터',
    department: '작업팀',
    position: '작업자',
    isActive: true,
    lastLoginAt: '2024-01-08T15:30:00Z',
    permissionIds: [4, 8],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-08T15:30:00Z',
  },
];

// 액션 핸들러 함수들
const handleEdit = (user: User) => {
  toast.info(`${user.name} 사용자 편집 기능을 구현해주세요.`);
};

const handleToggleUser = (user: User) => {
  toast.success(`${user.name} 사용자가 ${user.isActive ? '비활성화' : '활성화'}되었습니다.`);
};

const handleDelete = (user: User) => {
  toast.error(`${user.name} 사용자 삭제 기능을 구현해주세요.`);
};

// 테이블 컬럼 정의
const columns: ColumnDef<User>[] = [
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
    header: '사용자명',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <User className="text-muted-foreground h-4 w-4" />
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: '이메일',
    cell: ({ row }) => <span className="text-sm">{row.original.email}</span>,
  },
  {
    accessorKey: 'company',
    header: '회사',
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.original.company}
      </Badge>
    ),
  },
  {
    accessorKey: 'department',
    header: '부서',
    cell: ({ row }) => {
      const department = row.original.department;
      return department ? (
        <span className="text-sm">{department}</span>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    accessorKey: 'position',
    header: '직책',
    cell: ({ row }) => {
      const position = row.original.position;
      return position ? (
        <span className="text-sm">{position}</span>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    accessorKey: 'permissionIds',
    header: '권한 수',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="hover:bg-primary hover:text-primary-foreground cursor-pointer text-xs"
        onClick={() => handleManagePermissions(row.original)}
      >
        {row.original.permissionIds.length}개
      </Badge>
    ),
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
    accessorKey: 'lastLoginAt',
    header: '최근 로그인',
    cell: ({ row }) => {
      const lastLogin = row.original.lastLoginAt;
      return lastLogin ? (
        <span className="text-muted-foreground text-sm">{new Date(lastLogin).toLocaleDateString('ko-KR')}</span>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      );
    },
  },
  {
    id: 'actions',
    header: '작업',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              편집
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleUser(user)}>
              {user.isActive ? '비활성화' : '활성화'}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(user)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 사용자 권한 관리 모달 컴포넌트
function UserPermissionDialog({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: User }) {
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

  const [assignedPermissions, setAssignedPermissions] = React.useState<number[]>(user.permissionIds);
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
    toast.success(`${user.name} 사용자의 권한이 저장되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{user.name} - 권한 관리</DialogTitle>
          <DialogDescription>이 사용자에게 할당할 권한을 설정하세요.</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4">
          {/* 할당된 권한 */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">할당된 권한</Label>
              <span className="text-muted-foreground text-sm">{assignedPermissions.length}개</span>
            </div>
            <div className="max-h-100 h-full overflow-y-auto rounded-md border p-3">
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
                    <ExternalLink className="text-muted-foreground h-4 w-4" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 중앙 버튼들 */}
          <div className="flex w-20 flex-col items-center justify-center space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMoveToUnassigned}
              disabled={selectedAssigned.length === 0}
              className="w-full"
            >
              <MoveRight className="mr-2 h-4 w-4" />
              해제
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMoveToAssigned}
              disabled={selectedUnassigned.length === 0}
              className="w-full"
            >
              <MoveLeft className="mr-2 h-4 w-4" />
              할당
            </Button>
          </div>

          {/* 비할당된 권한 */}
          <div className="flex-1 space-y-3">
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
                  <ExternalLink className="text-muted-foreground h-4 w-4" />
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

// 사용자 추가/편집 다이얼로그 컴포넌트
function UserDialog({
  isOpen,
  onClose,
  user,
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  isEdit?: boolean;
}) {
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    department: user?.department || '',
    position: user?.position || '',
    isActive: user?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${isEdit ? '사용자가 수정' : '새 사용자가 추가'}되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? '사용자 편집' : '새 사용자 추가'}</DialogTitle>
          <DialogDescription>{isEdit ? '사용자 정보를 수정하세요.' : '새로운 사용자를 추가하세요.'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">사용자명</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="사용자명을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">회사</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="회사명을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">부서</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="부서명을 입력하세요"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">직책</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="직책을 입력하세요"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
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

// 전역 핸들러 함수 (컬럼 정의에서 사용)
let globalHandleManagePermissions: (user: User) => void;

const handleManagePermissions = (user: User) => {
  if (globalHandleManagePermissions) {
    globalHandleManagePermissions(user);
  }
};

// 메인 사용자 관리 컴포넌트
export default function UserManagementPage() {
  const [data] = React.useState<User[]>(sampleUsers);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | undefined>();
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();

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

  const handleAddUser = () => {
    setEditingUser(undefined);
    setIsDialogOpen(true);
  };

  const handleOpenPermissionDialog = (user: User) => {
    setSelectedUser(user);
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
          <h1 className="text-2xl font-bold">사용자 관리</h1>
          <p className="text-muted-foreground">시스템 사용자를 관리하고 권한을 설정할 수 있습니다.</p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus className="mr-2 h-4 w-4" />
          사용자 추가
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="사용자명으로 검색..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={(table.getColumn('company')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) => table.getColumn('company')?.setFilterValue(value === 'all' ? undefined : value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="회사" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="ABC물류">ABC물류</SelectItem>
            <SelectItem value="XYZ센터">XYZ센터</SelectItem>
            <SelectItem value="DEF배송">DEF배송</SelectItem>
            <SelectItem value="GHI마켓">GHI마켓</SelectItem>
          </SelectContent>
        </Select>
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

      {/* 사용자 추가/편집 다이얼로그 */}
      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={editingUser}
        isEdit={!!editingUser}
      />

      {/* 사용자 권한 관리 다이얼로그 */}
      {selectedUser && (
        <UserPermissionDialog
          isOpen={isPermissionDialogOpen}
          onClose={() => setIsPermissionDialogOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
}
