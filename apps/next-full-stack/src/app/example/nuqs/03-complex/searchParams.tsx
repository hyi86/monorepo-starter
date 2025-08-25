import {
  createLoader,
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  type UrlKeys,
} from 'nuqs/server';

/**
 * 문자열 리터럴 타입 정의
 * - TypeScript의 const assertion을 사용하여 타입 안전성 보장
 * - as const를 사용하면 배열의 각 요소가 리터럴 타입으로 추론됨
 */
export const literals = ['apple', 'banana', 'orange', 'strawberry', 'watermelon'] as const;

/**
 * Literal 타입 정의
 * - typeof literals[number]를 사용하여 배열의 모든 요소를 유니온 타입으로 만듦
 * - 결과: 'apple' | 'banana' | 'orange' | 'strawberry' | 'watermelon'
 */
export type Literal = (typeof literals)[number];

/**
 * 1. URL 검색 파라미터 파서 정의
 * - 각 파라미터의 타입과 기본값을 설정
 * - nuqs의 파서를 사용하여 타입 안전한 URL 파라미터 처리
 *
 * 사용 가능한 파서들:
 * - parseAsString: 문자열 파라미터
 * - parseAsInteger: 정수 파라미터
 * - parseAsFloat: 실수 파라미터
 * - parseAsBoolean: 불린 파라미터
 * - parseAsStringLiteral: 문자열 리터럴 파라미터 (제한된 값만 허용)
 * - parseAsArrayOf: 배열 파라미터
 * - parseAsJson: JSON 파라미터
 * - parseAsDate: 날짜 파라미터
 */
export const parsers = {
  // 문자열 파라미터 (기본값: 빈 문자열)
  str: parseAsString.withDefault(''),

  // 정수 파라미터 (기본값: 100)
  int: parseAsInteger.withDefault(100),

  // 불린 파라미터 (기본값: false)
  bool: parseAsBoolean.withDefault(false),

  // 문자열 리터럴 파라미터 (기본값: 'apple')
  // literals 배열에 정의된 값만 허용
  literal: parseAsStringLiteral(literals).withDefault('apple'),

  // 실수 파라미터 (기본값: 45.18)
  float: parseAsFloat.withDefault(45.18),
};

/**
 * 2. URL 키 매핑 정의
 * - 긴 파라미터 이름을 짧은 URL 키로 매핑
 * - URL을 더 깔끔하게 만들기 위해 사용
 * - 매핑되지 않은 파라미터는 원래 이름 사용
 *
 * 예시:
 * - literal -> ltr: /page?ltr=banana
 * - float -> f: /page?f=10.5
 * - str: /page?str=hello (매핑 없음)
 */
export const urlKeys: UrlKeys<typeof parsers> = {
  literal: 'ltr', // literal -> ltr로 축약
  float: 'f', // float -> f로 축약
};

/**
 * 3. 검색 파라미터 캐시 생성
 * - 서버 컴포넌트에서 URL 파라미터를 파싱하고 캐시
 * - 파서와 URL 키 매핑을 사용하여 설정
 *
 * 캐시 객체의 주요 메서드:
 * - cache.all(): 모든 파라미터의 현재 값 반환
 * - cache.get(key): 특정 파라미터 값 반환
 * - cache.parse(searchParams): URL 파라미터를 파싱하여 캐시에 저장
 * - cache.clear(): 캐시된 모든 값 제거
 */
export const cache = createSearchParamsCache(parsers, {
  urlKeys,
});

/**
 * 4. URL 직렬화 함수 생성
 * - 클라이언트에서 새로운 URL을 생성할 때 사용
 * - clearOnDefault: true - 기본값과 같은 파라미터는 URL에서 제거
 * - URL을 더 깔끔하게 유지하기 위한 설정
 *
 * 직렬화 함수의 주요 기능:
 * - serialize(baseUrl, params): 새로운 URL 생성
 * - clearOnDefault: 기본값과 같은 파라미터는 URL에서 제거
 * - urlKeys: 매핑된 짧은 키 사용
 *
 * 예시:
 * - serialize('/page', { str: 'hello', int: 100 }) -> '/page?str=hello&int=100'
 * - serialize('/page', { str: '', int: 100 }) -> '/page?int=100' (clearOnDefault: true)
 */
export const serialize = createSerializer(parsers, {
  urlKeys,
  clearOnDefault: true,
});

/**
 * 5. 추가 nuqs 서버 함수들 - 실제 사용 예제
 *
 * createLoader: 서버 컴포넌트에서 직접 파라미터 로드
 * - await loadSearchParams(searchParams) 형태로 사용
 * - 캐시 없이 직접 파라미터를 파싱할 때 유용
 */
export const loadSearchParams = createLoader(parsers, {
  urlKeys,
});

/**
 * 6. 하위 페이지에서 사용할 수 있는 추가 함수들
 *
 * createParser(parsers, options):
 * - 파서만 생성하고 캐시나 직렬화 없이 사용
 * - 단순한 파라미터 파싱이 필요할 때 사용
 *
 * createSearchParamsString(parsers, options):
 * - URL 쿼리 문자열만 생성
 * - 전체 URL이 아닌 쿼리 부분만 필요할 때 사용
 *
 * createSearchParamsObject(parsers, options):
 * - 파라미터를 객체로 변환
 * - URL 없이 파라미터 값만 필요할 때 사용
 *
 * createSearchParamsArray(parsers, options):
 * - 파라미터를 배열로 변환
 * - 순서가 중요한 경우 사용
 *
 * createSearchParamsMap(parsers, options):
 * - 파라미터를 Map 객체로 변환
 * - 키-값 쌍으로 작업할 때 유용
 *
 * 사용 예시:
 * ```typescript
 * // 서버 컴포넌트에서 직접 로드
 * const { str, int, bool } = await loadSearchParams(searchParams);
 *
 * // 캐시 사용
 * const allParams = cache.all();
 * const specificParam = cache.get('str');
 *
 * // 직렬화
 * const newUrl = serialize('/page', { str: 'hello', int: 100 });
 * ```
 */
