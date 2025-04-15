*** 워드 파일에 전자 서명하기 ***


/
├── manifest.xml       # Office 애드인 매니페스트 파일
├── src/
│   ├── taskpane.html  # 작업창 UI
│   ├── taskpane.css   # 스타일시트
│   ├── taskpane.js    # Office.js API 연동 로직
# Office.js 전자서명 플러그인

## 프로젝트 구조
```
/
├── manifest.xml       # Office 애드인 매니페스트 파일
├── src/
│   ├── taskpane.html  # 작업창 UI
│   ├── taskpane.css   # 스타일시트
│   ├── taskpane.js    # Office.js API 연동 로직
│   └── signature.js   # 서명 캔버스 및 관리 기능
└── package.json       # 프로젝트 설정
```

## 설치 및 설정

### 개발 환경 설정
```bash
# Office 애드인 생성기 설치
npm install -g yo generator-office
yo office

# 인증서 생성
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem

# HTTPS 서버 실행
npx http-server -p 3000 -S -C cert.pem -K key.pem
```

### Office.js CDN 사용 방법
```html
<script type="text/javascript" src="https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js"></script>
```

## Word에서 애드인 로드하기

### Word 메뉴 확인 방법
- Word 상단 메뉴에서 "삽입" 탭을 클릭합니다.
- 오른쪽 끝에 있는 "애드인" 또는 "내 애드인" 버튼을 찾습니다.
- 만약 없다면, "추가 기능" 또는 "Office 추가 기능" 메뉴를 찾아보세요.

### 대체 방법 (macOS용 Word)
- Word 상단 메뉴에서 "툴" 또는 "도구" 메뉴를 클릭합니다.
- "COM 추가 기능" 또는 **"추가 기능"**을 선택합니다.
- 또는 상단 메뉴의 "삽입" > "추가 기능" 경로를 확인해보세요.

### Mac용 Word에서 개발자 탭 활성화
1. Word > 환경설정 > 리본 메뉴 및 도구 모음
2. '개발자' 탭에 체크 표시
3. 개발자 탭 > COM 추가 기능

### manifest 파일 등록 방법
1. 터미널에서 다음 명령어 실행:
```bash
defaults write com.microsoft.Word OfficeWebAddinDeveloperExtras -bool true
```
2. Word 재시작
3. 개발자 탭 > 추가 기능 > manifest 파일 선택
