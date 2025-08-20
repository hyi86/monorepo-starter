/**
 * 가상화 엔진 데모 - Phase 0.2 테스트
 */

import React from 'react';
import { VirtualGrid } from './components/virtual-grid';
import { Column } from './core/types';

// 테스트용 컬럼 정의
const testColumns: Column[] = [
  { key: 'id', width: 80, header: 'ID' },
  { key: 'name', width: 150, header: 'Name' },
  { key: 'email', width: 200, header: 'Email' },
  { key: 'age', width: 80, header: 'Age' },
  { key: 'city', width: 120, header: 'City' },
  { key: 'country', width: 100, header: 'Country' },
  { key: 'phone', width: 120, header: 'Phone' },
  { key: 'company', width: 150, header: 'Company' },
  { key: 'position', width: 120, header: 'Position' },
  { key: 'salary', width: 100, header: 'Salary' },
];

export function VirtualizationDemo() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>스프레드시트 가상화 엔진 데모</h1>
      <p>Phase 0.2: tanstack/react-virtual 기반 행/열 가상 스크롤</p>

      <div style={{ marginBottom: '20px' }}>
        <h3>10,000행 × 10열 가상화 그리드</h3>
        <p>스크롤해보세요! 실제로는 몇 개의 행만 렌더링됩니다.</p>
      </div>

      <VirtualGrid rows={10000} columns={testColumns} rowHeight={32} containerWidth={1000} containerHeight={600} />

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h4>구현된 기능:</h4>
        <ul>
          <li>✅ 행 가상화 (tanstack/react-virtual)</li>
          <li>✅ 열 가상화 (수평 스크롤)</li>
          <li>✅ 동적 컬럼 너비 지원</li>
          <li>✅ 오버스캔 설정 (성능 최적화)</li>
          <li>✅ 스크롤 위치 계산</li>
        </ul>
      </div>
    </div>
  );
}
