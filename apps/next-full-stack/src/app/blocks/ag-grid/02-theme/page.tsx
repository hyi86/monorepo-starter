'use client';

import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';
import { Button } from '@monorepo-starter/ui/components/button';
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

ModuleRegistry.registerModules([AllEnterpriseModule, ServerSideRowModelModule]);
LicenseManager.setLicenseKey(
  '[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-104792}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 November 2025}____[v3]_[0102]_MTc2MzA3ODQwMDAwMA==4ecc55839c14ac311390c0d41b27422a',
);

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
    { field: 'age', headerName: '나이', editable: true },
    {
      field: 'date',
      headerName: '날짜',
      editable: true,
      cellEditor: 'agDateCellEditor',
      cellEditorParams: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    { field: 'country', headerName: '국가' },
    { field: 'sport', headerName: '종목' },
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
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json') // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => setRowData(rowData)); // Update state of `rowData`
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
        <p>전체 데이터 수: {rowData.length}</p>
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
