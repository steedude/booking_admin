# 串接Google登錄2023

## Google登錄套件

- [vue3-google-login : v2.0.18](https://www.npmjs.com/package/vue3-google-login)

已經支援google Identity authentication 比較新的登錄方式

google cloud console管理clientId/uri/測試賬號…等等 https://console.cloud.google.com/

server 驗證google登錄token的方式

## 取得 Google API 用戶端 ID

1. 開啟 [Google API 控制台](https://console.cloud.google.com/apis)的「憑證」頁面。
2. 建立或選取 Google API 專案。如果專案已有「使用 Google 帳戶登入」按鈕或 Google One Tap 功能，請使用現有專案和網路用戶端 ID。建立正式版應用程式時，可能需要多個專案，其他您管理的專案將會重複執行其餘步驟。
3. 按一下「Create credentials」(建立憑證) >「OAuth client ID」(OAuth 用戶端 ID)，然後在「Application type」(應用程式類型) 中選取「Web application」(網頁應用程式)，建立新的用戶端 ID。 如要使用現有的用戶端 ID，請選取其中一個「網頁應用程式」。
4. 將您網站的 URI 新增至授權 JavaScript 來源。URI 只包含配置和完整主機名稱。
   例如:

   ```
   https://www.example.com
   http://localhost
   http://localhost:5173
   ```

5. 記錄Client ID起來

## 安裝套件

```
import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: 'YOUR_GOOGLE_CLIENT_ID就是上一個步驟的Client ID'
})

app.mount('#app')
```

## 使用套件

```
<script setup>
const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response)
}
</script>

<template>
  <GoogleLogin :callback="callback"/>
</template>
```

更詳細內容可以看[套件文檔](https://devbaji.github.io/vue3-google-login/)

## 為何不用整合社群Vue套件?

找整合登錄套件時有發現一個問題

> > 警告：自 2023 年 3 月 31 日後，Google 登入網路版 JavaScript 平台程式庫的支援已淘汰。本指南中的解決方案是以此程式庫為基礎，因此已不適用。
> > 改用新的 Google Identity Services for Web 解決方案，讓使用者能輕鬆快速地透過自己的 Google 帳戶登入您的應用程式。
> > 根據預設，系統會禁止新的用戶端 ID 使用舊版平台程式庫，現有的用戶端 ID 不會受到影響。凡是在 2022 年 7 月 29 日前建立的新用戶端 ID，都可以設定 plugin_name，以便使用舊版 Google 平台程式庫。
> > 詳情請參閱 淘汰與淘汰作業頁面。
> > https://developers.google.com/identity/sign-in/web/sign-in?hl=zh-tw

因為Google改推新 Google Identity Services Authorization API的登入方式, 舊API已不給新用戶使用, 導致不少Vue的整合登錄library目前無法支援.

### 目前2023/08無法使用的整合套件:

- [vue-authenticate : v.1.5.0](https://www.npmjs.com/package/vue-authenticate) 不支援TS, API太舊.
- [vue-authenticate-2 : v2.1.0](https://www.npmjs.com/package/vue-authenticate-2) 上面的版本+支援TS版, 一樣太舊.
- [@websanova/vue-auth : v.4.2.1](https://www.npmjs.com/package/@websanova/vue-auth) 完整支援VUE+TS, 但是因新Google Identity Services還未能支援.
- [vue-auth3 : v.1.0.10](https://www.npmjs.com/package/vue-auth3) 上面的fork後Vue3+Axios版本, API也相同沒特別試了.

以上套件目前都無法使用, 或許要等未來更新吧!

## 另一個好辦法

### [Firebase](https://firebase.google.com/)

可以串google fb twitter….等, 拿到token後再接入我們的server也行, 還有不少後端的功能.

免費額度: 每日5萬次讀/2萬次寫/2萬次刪除

最多人推薦的方式, google推出的整合不少社群以及後端server的功能, 功能強大但是跟大家討論後暫不使用.
