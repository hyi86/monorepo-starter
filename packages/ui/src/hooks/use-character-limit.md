# useCharacterLimit Hook

텍스트 입력 시 글자 수 제한을 관리하는 React 커스텀 Hook입니다. 사용자가 입력할 수 있는 최대 글자 수를 설정하고, 현재 입력된 글자 수를 실시간으로 추적해주는 기능을 제공합니다.

## Features

- 📝 글자 수 제한 설정
- 🔢 실시간 글자 수 추적
- ⚠️ 최대 길이 초과 방지
- 🎛️ 간단한 API

## Basic Usage

```tsx
import { useCharacterLimit } from '@/registry/default/hooks/use-character-limit';

function TextInput() {
  const { value, characterCount, handleChange, maxLength } = useCharacterLimit({
    maxLength: 100,
    initialValue: '',
  });

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="텍스트를 입력하세요..."
        className="w-full rounded-lg border p-3"
      />
      <div className="text-sm text-gray-600">
        {characterCount}/{maxLength}
      </div>
    </div>
  );
}
```

## API Reference

### Hook Parameters

| Option         | Type     | Default | Description         |
| -------------- | -------- | ------- | ------------------- |
| `maxLength`    | `number` | -       | 최대 글자 수 (필수) |
| `initialValue` | `string` | `''`    | 초기값              |

### Return Value

| Property         | Type       | Description         |
| ---------------- | ---------- | ------------------- |
| `value`          | `string`   | 현재 입력된 값      |
| `characterCount` | `number`   | 현재 글자 수        |
| `handleChange`   | `function` | 입력 변경 핸들러    |
| `maxLength`      | `number`   | 설정된 최대 글자 수 |

## Examples

### 트위터 스타일 글자 수 표시

```tsx
function TwitterInput() {
  const { value, characterCount, handleChange, maxLength } = useCharacterLimit({
    maxLength: 280,
  });

  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="무슨 일이 일어나고 있나요?"
        className="w-full resize-none rounded-lg border p-3"
        rows={4}
      />
      <div className="flex justify-end">
        <span className={`text-sm ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-gray-500'}`}>
          {characterCount}/{maxLength}
        </span>
      </div>
    </div>
  );
}
```

### 폼 검증과 함께 사용

```tsx
function FormWithValidation() {
  const { value, characterCount, handleChange, maxLength } = useCharacterLimit({
    maxLength: 500,
  });

  const isValid = characterCount > 0 && characterCount <= maxLength;

  return (
    <form className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">설명 (최대 {maxLength}자)</label>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="설명을 입력하세요..."
          className="w-full rounded-lg border p-3"
          rows={5}
        />
        <div className="mt-1 flex justify-between text-sm">
          <span className={characterCount > maxLength ? 'text-red-500' : 'text-gray-500'}>
            {characterCount}/{maxLength}
          </span>
          {characterCount > maxLength && <span className="text-red-500">글자 수를 초과했습니다</span>}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
      >
        제출
      </button>
    </form>
  );
}
```
