/**
 * 스프레드시트 데모 - Phase 0.3 셀 렌더링 엔진 테스트
 */

import { VirtualGrid } from './components/virtual-grid';
import { CellRendererEngine, defaultCellRenderers } from './core/cell-renderer';
import { Column } from './core/types';

// 테스트용 컬럼 정의 (다양한 타입 포함)
const testColumns: Column[] = [
  { key: 'id', width: 80, header: 'ID', type: 'number' },
  { key: 'name', width: 150, header: 'Name', type: 'text' },
  { key: 'email', width: 200, header: 'Email', type: 'text' },
  { key: 'age', width: 80, header: 'Age', type: 'number' },
  { key: 'active', width: 80, header: 'Active', type: 'boolean' },
  { key: 'city', width: 120, header: 'City', type: 'text' },
  { key: 'country', width: 100, header: 'Country', type: 'text' },
  { key: 'phone', width: 120, header: 'Phone', type: 'text' },
  { key: 'company', width: 150, header: 'Company', type: 'text' },
  { key: 'position', width: 120, header: 'Position', type: 'text' },
  { key: 'salary', width: 100, header: 'Salary', type: 'number' },
  { key: 'hireDate', width: 120, header: 'Hire Date', type: 'date' },
];

export function VirtualizationDemo() {
  // 커스텀 렌더러 등록 예제
  const customEngine = new CellRendererEngine();

  // 커스텀 렌더러 등록
  customEngine.registerRenderer('custom', ({ value, cell }) => (
    <div className="cell-content custom-cell" style={{ color: 'blue', fontWeight: 'bold' }}>
      🎯 {cell.formattedValue || String(value || '')}
    </div>
  ));

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>스프레드시트 데모</h1>
      <p>Phase 0.3: 셀 렌더링 엔진 + 가상화</p>

      <div style={{ marginBottom: '20px' }}>
        <h3>10,000행 × 12열 가상화 그리드 (다양한 셀 타입)</h3>
        <p>스크롤해보세요! 각 컬럼마다 다른 셀 타입이 적용됩니다.</p>
        <ul style={{ fontSize: '14px', color: '#666' }}>
          <li>📊 숫자 타입: ID, Age, Salary</li>
          <li>📝 텍스트 타입: Name, Email, City, Country, Phone, Company, Position</li>
          <li>☑️ 불린 타입: Active (체크박스)</li>
          <li>📅 날짜 타입: Hire Date</li>
        </ul>
      </div>

      <VirtualGrid rows={10000} columns={testColumns} rowHeight={32} containerWidth={1200} containerHeight={600} />

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>구현된 기능:</h4>
        <ul>
          <li>✅ 행 가상화 (tanstack/react-virtual)</li>
          <li>✅ 열 가상화 (수평 스크롤)</li>
          <li>✅ 동적 컬럼 너비 지원</li>
          <li>✅ 오버스캔 설정 (성능 최적화)</li>
          <li>✅ 스크롤 위치 계산</li>
          <li>✅ 셀 렌더링 엔진 (CellRendererEngine)</li>
          <li>✅ 타입별 셀 렌더러 (text, number, boolean, date)</li>
          <li>✅ 커스텀 렌더러 등록/제거 기능</li>
          <li>✅ 셀 상태별 스타일링 (선택, 포커스, 오류, 더티)</li>
          <li>✅ 접근성 지원 (ARIA 속성, 키보드 네비게이션)</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>커스텀 렌더러 예제:</h4>
        <p>등록된 렌더러 타입: {customEngine.getRegisteredRenderers().join(', ')}</p>
      </div>
    </div>
  );
}
