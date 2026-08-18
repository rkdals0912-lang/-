# KSA 라벨 출력 시스템 v4 — PC·모바일 공용 웹앱

이 버전은 기존 단일 HTML 기능을 유지하면서 저장 계층을 Supabase로 확장한 버전입니다.

## 핵심 동작

- PC와 휴대폰이 같은 URL로 접속합니다.
- 제품관리(마스터), 작업지시, 라벨 서식 데이터를 Supabase에 저장합니다.
- 한 기기에서 수정하면 다른 기기에서도 같은 데이터를 읽습니다.
- Supabase 설정이 없으면 자동으로 브라우저 localStorage 모드로 동작합니다.
- 모바일 관리자 버튼/PIN UI와 반응형 화면을 포함합니다.
- 라벨 출력은 브라우저가 연결된 프린터를 통해 진행합니다.

## 1. Supabase 만들기

1. https://supabase.com 에서 프로젝트를 하나 만듭니다.
2. SQL Editor에서 `supabase.sql` 전체를 실행합니다.
3. Project Settings → API에서 다음 두 값을 확인합니다.
   - Project URL
   - anon public key

## 2. config.js 수정

`config.js`를 열고 아래 두 값을 바꿉니다.

```js
window.KSA_CONFIG = {
  SUPABASE_URL: "https://xxxx.supabase.co",
  SUPABASE_ANON_KEY: "여기에 anon key"
};
```

## 3. 웹에 올리기

아래 중 하나로 `index.html`, `config.js`를 같은 폴더에 올리면 됩니다.

- Netlify
- Vercel
- GitHub Pages
- 사내 웹서버

정적 파일만 올려도 동작합니다.

## 4. 모바일 사용

배포된 주소를 Chrome/Safari로 열면 됩니다.
홈 화면에 추가하면 앱처럼 사용할 수 있습니다.

예:
`https://ksa-label.example.com`

## 데이터 구조

현재 기존 앱의 저장 키를 그대로 공유합니다.

- 라벨 서식
- 작업지시
- 사용자 등록 제품마스터

따라서 기존 UI를 크게 바꾸지 않고 공유 DB만 연결했습니다.

## 관리자 PIN

현재 PIN은 기존 코드의 `1234`입니다.

중요: 이 PIN은 화면 UI 잠금 용도입니다. 보안이 필요한 실제 사내 배포에서는
Supabase Auth나 사내 로그인과 연결하는 것을 권장합니다.

## 프린터 관련

브라우저 보안상 웹페이지가 사용자 확인 없이 프린터로 바로 출력하는 것은 제한됩니다.
라벨 프린터가 연결된 PC/태블릿에서 브라우저 인쇄창을 통해 출력하는 방식입니다.

모바일은 작업지시 확인/등록/마스터 관리용으로 사용하고,
실제 산업용 라벨 프린터는 PC 또는 프린터가 연결된 태블릿에서 출력하는 구성이 가장 안정적입니다.
