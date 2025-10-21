'use client';

import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';
import { faker } from '@faker-js/faker';
import { Button } from '@monorepo-starter/ui/components/button';
import { formatDate } from '@monorepo-starter/utils/date';
import { format } from '@monorepo-starter/utils/number';
import {
  type ColDef,
  GridOptions,
  ModuleRegistry,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-community';
import { AllEnterpriseModule, LicenseManager, ServerSideRowModelModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useRef, useState } from 'react';
import { env } from '~/env';

ModuleRegistry.registerModules([AllEnterpriseModule, ServerSideRowModelModule]);
LicenseManager.setLicenseKey(env.NEXT_PUBLIC_AG_GRID_KEY);

const GridComponent = () => {
  const [theme, setTheme] = useState<
    typeof themeAlpine | typeof themeBalham | typeof themeMaterial | typeof themeQuartz
  >(themeBalham);
  const [rowData, setRowData] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'athlete', editable: true },
    { field: 'age', headerName: '나이', editable: true, filter: true, filterParams: { filterOptions: ['equals'] } },
    {
      field: 'date',
      headerName: '날짜',
      editable: true,
      cellEditor: 'agDateStringCellEditor',
      cellEditorParams: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    { field: 'country', headerName: '국가', editable: true },
    { field: 'sport', headerName: '종목', editable: true },
    { field: 'gold', headerName: '금메달', editable: true, cellEditor: 'agNumberCellEditor' },
    { field: 'silver', headerName: '은메달', editable: true, cellEditor: 'agNumberCellEditor' },
    { field: 'bronze', headerName: '동메달', editable: true, cellEditor: 'agNumberCellEditor' },
    {
      field: 'total',
      headerName: '총 메달',
      valueGetter: (params) => {
        const gold = params.data?.gold || 0;
        const silver = params.data?.silver || 0;
        const bronze = params.data?.bronze || 0;
        return gold + silver + bronze;
      },
      editable: false,
    },
  ]);

  const gridOptions: GridOptions = {
    localeText: AG_GRID_LOCALE_KR,
    rowSelection: {
      mode: 'multiRow',
    },
    cellSelection: {
      handle: {
        mode: 'range',
      },
    },
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,
    onCellValueChanged: () => {
      setHasChanges(true);
    },
    rowNumbers: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = Array.from({ length: 500_000 }).map(() => ({
        id: faker.string.uuid(),
        athlete: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 65 }),
        date: formatDate(faker.date.past(), 'iso9075/date'),
        country: faker.location.country(),
        sport: faker.helpers.arrayElement([
          'Swimming',
          'Athletics',
          'Basketball',
          'Football',
          'Tennis',
          'Ski Jumping',
          'Gymnastics',
          'Nordic Combined',
          'Handball',
          'Volleyball',
          'Water Polo',
          'Baseball',
          'Softball',
          'Hockey',
          'Rugby',
          'Lacrosse',
          'Field Hockey',
        ]),
        gold: faker.number.int({ min: 0, max: 50 }),
        silver: faker.number.int({ min: 0, max: 50 }),
        bronze: faker.number.int({ min: 0, max: 50 }),
        total: 0,
      }));
      setRowData(data);
    };
    fetchData();
  }, []);

  // 저장 함수
  const handleSave = async () => {
    if (!gridRef.current) return;

    setIsSaving(true);
    try {
      // 그리드에서 현재 데이터 가져오기
      const allData: any[] = [];
      gridRef.current.api.forEachNode((node) => {
        if (node.data) {
          allData.push(node.data);
        }
      });

      // 실제 API 호출 대신 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('저장된 데이터:', allData);
      setHasChanges(false);
      alert('저장이 완료되었습니다!');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-[80dvh] w-full flex-col gap-2 p-8">
      <div>
        <p>전체 데이터 수: {format(rowData.length)}</p>
      </div>
      <div className="flex gap-1">
        <Button onClick={() => setTheme(themeAlpine)}>Alpine</Button>
        <Button onClick={() => setTheme(themeBalham)}>Balham</Button>
        <Button onClick={() => setTheme(themeMaterial)}>Material</Button>
        <Button onClick={() => setTheme(themeQuartz)}>Quartz</Button>
        <Button onClick={handleSave} disabled={!hasChanges || isSaving} className="ml-auto">
          {isSaving ? '저장 중...' : hasChanges ? '저장' : '저장됨'}
        </Button>
      </div>
      <AgGridReact ref={gridRef} gridOptions={gridOptions} theme={theme} rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default GridComponent;
