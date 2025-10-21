'use client';

import { type ColDef, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule, LicenseManager, ServerSideRowModelModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';

ModuleRegistry.registerModules([AllEnterpriseModule, ServerSideRowModelModule]);
LicenseManager.setLicenseKey(
  '[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-104792}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 November 2025}____[v3]_[0102]_MTc2MzA3ODQwMDAwMA==4ecc55839c14ac311390c0d41b27422a',
);

const GridComponent = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'athlete' },
    { field: 'age' },
    { field: 'date' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json') // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => setRowData(rowData)); // Update state of `rowData`
  }, []);

  return (
    <div className="h-[80dvh] w-full">
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default GridComponent;
