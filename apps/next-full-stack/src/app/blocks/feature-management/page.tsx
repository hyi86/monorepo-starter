'use client';

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
import { Textarea } from '@monorepo-starter/ui/components/textarea';
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
  ExternalLink,
  GroupIcon,
  MoreHorizontal,
  MoveLeft,
  MoveRight,
  Plus,
  Search,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

// 기능 데이터 스키마 정의
export const featureSchema = z.object({
  id: z.number(),
  name: z.string(),
  key: z.string(),
  description: z.string(),
  isEnabled: z.boolean(),
  isRequired: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Feature = z.infer<typeof featureSchema>;

// 샘플 데이터
const sampleFeatures: Feature[] = [
  {
    id: 1,
    name: '택배 출고처리 기능',
    key: 'parcel_outbound_processing',
    description: '택배 상품의 출고 처리 및 상태 변경 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: '출고내역 등록/수정 기능',
    key: 'outbound_history_management',
    description: '출고 내역의 등록, 수정, 삭제 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: '배송차량 신청 기능',
    key: 'delivery_vehicle_request',
    description: '배송차량 신청 및 관리 기능',
    isEnabled: true,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 4,
    name: '센터 접근 기능',
    key: 'warehouse_access',
    description: '센터 내부 접근 및 작업 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: '재고 관리 기능',
    key: 'inventory_management',
    description: '재고 조회, 수정, 조정 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: '배송 라우팅 기능',
    key: 'delivery_routing',
    description: '배송 경로 설정 및 최적화 기능',
    isEnabled: true,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 7,
    name: '센터 데이터 조회 기능',
    key: 'logistics_data_view',
    description: '센터 관련 데이터 조회 및 리포트 생성 기능',
    isEnabled: true,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 8,
    name: '배송 추적 기능',
    key: 'delivery_tracking',
    description: '배송 상태 추적 및 고객 알림 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 9,
    name: '비용 관리 기능',
    key: 'logistics_cost_management',
    description: '비용 계산 및 관리 기능',
    isEnabled: false,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 10,
    name: '파트너 관리 기능',
    key: 'logistics_partner_management',
    description: '파트너사 등록 및 관리 기능',
    isEnabled: true,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 11,
    name: '품질 관리 기능',
    key: 'logistics_quality_management',
    description: '서비스 품질 관리 및 모니터링 기능',
    isEnabled: false,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 12,
    name: '시스템 설정 기능',
    key: 'logistics_system_config',
    description: '시스템 설정 및 파라미터 변경 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 13,
    name: '알림 관리 기능',
    key: 'logistics_notification_management',
    description: '관련 알림 설정 및 관리 기능',
    isEnabled: true,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 14,
    name: '통계 분석 기능',
    key: 'logistics_analytics',
    description: '통계 데이터 분석 및 인사이트 생성 기능',
    isEnabled: false,
    isRequired: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 15,
    name: '보안 관리 기능',
    key: 'logistics_security_management',
    description: '보안 정책 설정 및 관리 기능',
    isEnabled: true,
    isRequired: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// 액션 핸들러 함수들
const handleEdit = (feature: Feature) => {
  toast.info(`${feature.name} 기능 편집 기능을 구현해주세요.`);
};

const handleToggleFeature = (feature: Feature) => {
  toast.success(`${feature.name} 기능이 ${feature.isEnabled ? '비활성화' : '활성화'}되었습니다.`);
};

const handleDelete = (feature: Feature) => {
  toast.error(`${feature.name} 기능 삭제 기능을 구현해주세요.`);
};

// 테이블 컬럼 정의
const columns: ColumnDef<Feature>[] = [
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
    header: '기능명',
    cell: ({ row }) => {
      const feature = row.original;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{feature.name}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'key',
    header: '키',
    cell: ({ row }) => <code className="bg-muted rounded px-2 py-1 text-sm">{row.original.key}</code>,
  },
  {
    accessorKey: 'isEnabled',
    header: '상태',
    cell: ({ row }) => {
      const feature = row.original;
      return (
        <div className="flex items-center gap-2">
          {feature.isEnabled ? (
            <ToggleRight className="h-4 w-4 text-green-600" />
          ) : (
            <ToggleLeft className="text-muted-foreground h-4 w-4" />
          )}
          <span className="text-sm">{feature.isEnabled ? '활성' : '비활성'}</span>
        </div>
      );
    },
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
    id: 'actions',
    header: '작업',
    cell: ({ row }) => {
      const feature = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleManagePermissions(feature)}>
              <GroupIcon className="mr-2 h-4 w-4" />
              기능별 권한 관리
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(feature)}>
              <Edit className="mr-2 h-4 w-4" />
              편집
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleFeature(feature)}>
              {feature.isEnabled ? (
                <>
                  <ToggleLeft className="mr-2 h-4 w-4" />
                  비활성화
                </>
              ) : (
                <>
                  <ToggleRight className="mr-2 h-4 w-4" />
                  활성화
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(feature)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// 기능별 권한 관리 모달 컴포넌트
function FeaturePermissionDialog({
  isOpen,
  onClose,
  feature,
}: {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature;
}) {
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

  // 현재 기능에 할당된 권한 (샘플 데이터)
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
    toast.success(`${feature.name} 기능의 권한이 저장되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{feature.name} - 권한 관리</DialogTitle>
          <DialogDescription>이 기능에 접근할 수 있는 권한을 설정하세요.</DialogDescription>
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

// 기능 추가/편집 다이얼로그 컴포넌트
function FeatureDialog({
  isOpen,
  onClose,
  feature,
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  feature?: Feature;
  isEdit?: boolean;
}) {
  const [formData, setFormData] = React.useState({
    name: feature?.name || '',
    key: feature?.key || '',
    description: feature?.description || '',
    isEnabled: feature?.isEnabled ?? false,
    isRequired: feature?.isRequired ?? false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${isEdit ? '기능이 수정' : '새 기능이 추가'}되었습니다.`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? '기능 편집' : '새 기능 추가'}</DialogTitle>
          <DialogDescription>{isEdit ? '기능 정보를 수정하세요.' : '새로운 기능을 추가하세요.'}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">기능명</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="기능명을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="key">키</Label>
              <Input
                id="key"
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="feature_key"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="기능에 대한 상세 설명"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isEnabled"
                checked={formData.isEnabled}
                onCheckedChange={(checked) => setFormData({ ...formData, isEnabled: checked })}
              />
              <Label htmlFor="isEnabled">활성화</Label>
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

// 전역 핸들러 함수 (컬럼 정의에서 사용)
let globalHandleManagePermissions: (feature: Feature) => void;

const handleManagePermissions = (feature: Feature) => {
  if (globalHandleManagePermissions) {
    globalHandleManagePermissions(feature);
  }
};

// 메인 기능 관리 컴포넌트
export default function FeatureManagementPage() {
  const [data] = React.useState<Feature[]>(sampleFeatures);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingFeature, setEditingFeature] = React.useState<Feature | undefined>();
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState<Feature | undefined>();

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

  const handleAddFeature = () => {
    setEditingFeature(undefined);
    setIsDialogOpen(true);
  };

  const handleOpenPermissionDialog = (feature: Feature) => {
    setSelectedFeature(feature);
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
          <h1 className="text-2xl font-bold">기능 관리</h1>
          <p className="text-muted-foreground">시스템의 기능들을 활성화/비활성화하고 설정할 수 있습니다.</p>
        </div>
        <Button onClick={handleAddFeature}>
          <Plus className="mr-2 h-4 w-4" />
          기능 추가
        </Button>
      </div>

      {/* 검색 및 필터 */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="기능명으로 검색..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={(table.getColumn('isEnabled')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('isEnabled')?.setFilterValue(value === 'all' ? undefined : value === 'true')
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

      {/* 기능 추가/편집 다이얼로그 */}
      <FeatureDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        feature={editingFeature}
        isEdit={!!editingFeature}
      />

      {/* 기능별 권한 관리 다이얼로그 */}
      {selectedFeature && (
        <FeaturePermissionDialog
          isOpen={isPermissionDialogOpen}
          onClose={() => setIsPermissionDialogOpen(false)}
          feature={selectedFeature}
        />
      )}
    </div>
  );
}
