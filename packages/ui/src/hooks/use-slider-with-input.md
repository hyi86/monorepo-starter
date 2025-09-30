# useSliderWithInput Hook

슬라이더와 인풋을 함께 사용하는 유틸리티 Hook입니다. 슬라이더와 인풋의 값을 동기화하고, 값 검증 및 초기화 기능을 제공합니다.

## Features

- 🎚️ 슬라이더와 인풋 값 동기화
- ✅ 입력 값 검증 및 클램핑
- 🔄 기본값으로 리셋
- 📏 최소/최대값 제한

## Basic Usage

```tsx
import { useSliderWithInput } from '@/registry/default/hooks/use-slider-with-input';

function SliderComponent() {
  const {
    sliderValue,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
    resetToDefault,
    showReset
  } = useSliderWithInput({
    minValue: 0,
    maxValue: 100,
    initialValue: [50],
    defaultValue: [50]
  });

  return (
    <div className="space-y-4">
      <input
        type="range"
        min={0}
        max={100}
        value={sliderValue[0]}
        onChange={(e) => handleSliderChange([Number(e.target.value)])}
        className="w-full"
      />
      <input
        type="number"
        value={inputValues[0]}
        onChange={(e) => handleInputChange(e, 0)}
        onBlur={(e) => validateAndUpdateValue(e.target.value, 0)}
        className="w-20 px-2 py-1 border rounded"
      />
      {showReset && (
        <button onClick={resetToDefault} className="px-3 py-1 bg-gray-200 rounded">
          리셋
        </button>
      )}
    </div>
  );
}
```

## API Reference

### Hook Parameters

| Option         | Type       | Default     | Description        |
| -------------- | ---------- | ----------- | ------------------ |
| `minValue`     | `number`   | `0`         | 최소값             |
| `maxValue`     | `number`   | `100`       | 최대값             |
| `initialValue` | `number[]` | `[minValue]`| 초기값 배열        |
| `defaultValue` | `number[]` | `[minValue]`| 기본값 배열        |

### Return Value

| Property                | Type                                    | Description                    |
| ----------------------- | --------------------------------------- | ------------------------------ |
| `sliderValue`           | `number[]`                              | 슬라이더 값 배열               |
| `inputValues`           | `string[]`                              | 인풋 값 배열 (문자열)           |
| `handleSliderChange`    | `(newValue: number[]) => void`           | 슬라이더 변경 핸들러           |
| `handleInputChange`     | `(e: ChangeEvent, index: number) => void` | 인풋 변경 핸들러               |
| `validateAndUpdateValue` | `(rawValue: string, index: number) => void` | 값 검증 및 업데이트        |
| `resetToDefault`        | `() => void`                            | 기본값으로 리셋                |
| `showReset`             | `boolean`                               | 리셋 버튼 표시 여부            |

## Examples

### 범위 슬라이더

```tsx
function RangeSlider() {
  const {
    sliderValue,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
    resetToDefault,
    showReset
  } = useSliderWithInput({
    minValue: 0,
    maxValue: 1000,
    initialValue: [200, 800],
    defaultValue: [200, 800]
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="number"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(e, 0)}
          onBlur={(e) => validateAndUpdateValue(e.target.value, 0)}
          className="w-20 px-2 py-1 border rounded"
        />
        <input
          type="number"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(e, 1)}
          onBlur={(e) => validateAndUpdateValue(e.target.value, 1)}
          className="w-20 px-2 py-1 border rounded"
        />
      </div>
      
      <input
        type="range"
        min={0}
        max={1000}
        value={sliderValue[0]}
        onChange={(e) => handleSliderChange([Number(e.target.value), sliderValue[1]])}
        className="w-full"
      />
      
      {showReset && (
        <button onClick={resetToDefault} className="px-3 py-1 bg-blue-500 text-white rounded">
          기본값으로 리셋
        </button>
      )}
    </div>
  );
}
```

### 가격 범위 필터

```tsx
function PriceRangeFilter() {
  const {
    sliderValue,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue
  } = useSliderWithInput({
    minValue: 0,
    maxValue: 100000,
    initialValue: [10000, 50000],
    defaultValue: [10000, 50000]
  });

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">가격 범위</h3>
      <div className="flex items-center gap-2">
        <span>₩</span>
        <input
          type="number"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(e, 0)}
          onBlur={(e) => validateAndUpdateValue(e.target.value, 0)}
          className="w-24 px-2 py-1 border rounded"
        />
        <span>~</span>
        <input
          type="number"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(e, 1)}
          onBlur={(e) => validateAndUpdateValue(e.target.value, 1)}
          className="w-24 px-2 py-1 border rounded"
        />
      </div>
    </div>
  );
}
```
