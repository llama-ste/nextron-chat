# Nextron chat
Nextron + Firebase를 이용한 1:1 채팅앱

<br/>

## 📆 프로젝트 기간
#### 2021.01.10 ~ 2023.01.13

<br/>

## 기능
- [x]  회원가입
- [x]  로그인
- [x]  유저 목록
- [x]  1:1 채팅

<br/>

## 서버 실행 방법
1. 레포지토리를 클론받습니다.
```
git clone https://github.com/llama-ste/nextron-chat.git
```

<br/>

2. 프로젝트의 root 경로에 .env파일을 아래와 같이 설정합니다.<br/> 
[Firebase](https://firebase.google.com/?hl=ko)에서 웹앱을 추가하면 키를 받을 수 있습니다.
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=1
```

<br/>

3. 프로젝트의 root 경로에 Firebase 프로젝트에 서비스 계정을 추가하여 비공개키 파일을 내려받아서 넣습니다.<br/>
아래와 같은 형태의 파일을 받을 수 있습니다.
```json
// app-name-serviceAccountKey.json
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

<br/>

4. main폴더의 background.ts의 serviceAccount의 경로를 해당 파일로 바꿔줍니다.
```javascript
// /main/background.ts

const serviceAccount = require("/app-name-serviceAccountKey.json");
```

<br/>

5. 터미널을 열고 프로젝트 경로에서 아래의 명령어 두가지를 순차적으로 입력하면 패키지를 설치한뒤, 개발 서버를 실행합니다.
```
$ npm install 
$ npm run dev
```
💡 아래의 명령어를 이용하면 앱을 설치할 수 있는 install파일을 받아볼 수 있습니다.
```
$ npm run build
```
#### 📌 설치 파일을 타인에게 전달하여 다른 유저가 mac에서 다운로드 받을 경우 설정 - 보안 및 개인 정보 보호탭에서 다운로드를 허용해야 설치할 수 있습니다.
<img width="480" alt="스크린샷 2023-01-16 오후 2 22 43" src="https://user-images.githubusercontent.com/90495580/212604700-c8a5bc91-f0f7-4431-b0e2-f4a7e08042b6.png">


<br/>

## Preview
### 회원가입 및 로그인
![sign-up-in](https://user-images.githubusercontent.com/90495580/212615156-e73656fd-3974-4ff1-849d-9ac3e6014ca0.gif)

### 1:1 채팅
![1:1 chat](https://user-images.githubusercontent.com/90495580/212616712-9e1a8828-3d8b-41c9-9f74-1cfdd2fc37c8.gif)
