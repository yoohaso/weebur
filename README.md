## ⚙️ 실행 방법
```
  npm install
  npm run dev
```

## 📁 폴더 구조
```
src/
├── api/           # API 통신 관련 코드
│
├── components/    # 재사용 가능한 UI 컴포넌트
│   ├── common/    # 공통 기능 컴포넌트 (무한 스크롤, 로딩, 에러 표시 등)
│   ├── layouts/   # 레이아웃 관련 컴포넌트 (앱 기본 구조)
│   └── ui/        # 순수 UI 표현 컴포넌트 (버튼, 그리드, 리스트 등)
│
├── constants/     # 공용 상수 정의
│
├── features/      # 도메인 관련 비즈니스 컴포넌트
│
├── hooks/         # 커스텀 React 훅
│
├── pages/         # Next.js 페이지 컴포넌트
│   ├── _app.tsx   # 앱의 루트 컴포넌트
│   ├── _document.tsx # HTML 문서 구조 정의
│   ├── index.tsx  # 홈페이지
│   └── search.tsx # 검색 결과 페이지
│
└── globalstyles.tsx # 전역 스타일 정의
```

## 🧪 기술
- 필수: React, Next.js, TypeScript
- 선택: Next.js - page router, formik, @tanstack/react-query, styled-components

## 💻 기능 요구사항
### ✅ UI
- [o] 페이지 진입 시, 20개의 아이템이 기본으로 노출되어야 합니다.
- [o] 각 아이템은 다음의 항목을 포함합니다.
  - 상품명 (`title`)
  - 상품설명 (`description`)
  - 썸네일 이미지 (`thumbnail`)
  - 별점 (`rating`)
  - 리뷰 수 (`reviews`)
- [o] View 방식 종류
  - [o] 리스트형 (List): 한 줄에 1개 아이템
  - [o] 그리드형 (Grid): 한 줄에 4개 아이템
- [o] View 표시 조건은 다음과 같습니다.
  - [o] 페이지 최초 진입 시 50% 확률로 랜덤하게 View 방식 결정
  - [o] 결정된 방식은 24시간 동안 유지
  - [o] 이후 다시 랜덤 결정

### ✅ 데이터 가져오기
- [o] [DummyJSON API Docs Products API](https://dummyjson.com/docs/products#products-all)를 활용하여 Data를 가져올 수 있습니다.

### ✅ 페이지네이션
- [o] [Limit과 Skip](https://dummyjson.com/docs/products#products-limit_skip)으로 페이지네이션 결과를 받을 수 있습니다.

### ✅ 검색 필터
- [o] [search API](https://dummyjson.com/docs/products#products-search)를 활용해 문자열 검색이 가능해야 합니다.
- [o] [sort API](https://dummyjson.com/docs/products#products-sort) 를 활용해 별점 (`rating`) 내림차순으로 정렬이 가능해야 합니다.
- [o] 필터는 form을 사용해 구현해야 하며, 아래 조건을 만족해야 합니다.
  -  [o] 검색 버튼이 존재해야 합니다.
  -  [o] 페이지 새로고침 후에도 필터 값이 유지되어야 합니다.
- [o] 검색 결과가 없을 경우 `일치하는 결과가 없습니다.` 문구가 표시되어야 합니다.

### ✅ 무한스크롤
- [o] 페이지 하단 도달 시 다음 20개의 아이템이 자동으로 로드 되어야 합니다.
- [o] 필터 결과에도 무한 스크롤이 적용 되어야 합니다.
- [o] 마지막 데이터까지 로딩되면 `더 이상 불러올 수 없습니다.` 문구가 표시되어야 합니다.

## ➕ 추가 세부 구현 사항
###  검색폼
- 빈 문자열 검색어 validation
- 좌우 공백 있을 시 제거 후 전송

### 반응형
- 그리드형으로 표시 될 시 한 줄에 2개 아이템 표시(4개로 표시하면 item의 크기가 너무 작아서 2개로 표시)

### View 방식
  - localStorage에 View 방식 저장
  - 페이지가 focus 됐을 때, localStoreage에 저장된 만료시간이 지났으면 View 방식을 재설정하도록 구현
