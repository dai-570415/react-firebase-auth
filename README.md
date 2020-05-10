# 【超初級】 ReactとFirebase Authenticationに連携してみた

## プロジェクトダウンロード & 構築

```bash
$ git clone https://github.com/dai-570415/react-firebase-auth.git

$ cd react-firebase-auth

$ npm install

$ npm start
```

Firebase.jsを編集

```js:Firebase.js
//Firebase.js

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    // 各自のFirebaseキーを入れる
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_KEY",
    databaseURL: "YOUR_KEY",
    projectId: "YOUR_KEY",
    storageBucket: "YOUR_KEY",
    messagingSenderId: "YOUR_KEY",
    appId: "YOUR_KEY",
    measurementId: "YOUR_KEY"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
```

以上でFirebase Authenticationに連携できるかと思います。

## 編集した手順です。同じように手を動かしてしたい方は以下を参照してください。
[参照した記事](https://qiita.com/zaburo/items/801bd288cec47bd28764)

### 必要なモジュール
bootstrapはお好みで使用(自分はモジュールは一応入れてるけど使用してません)

```bash
$ npm install --save react-router-dom firebase bootstrap reactstrap react-loading-overlay formik yup
```

### ファイル生成
※参考記事から一部変更あり

```bash
cd src

touch Auth.js
touch Firebase.js

mkdir components
touch components/Home.js
touch components/Profile.js
touch components/SignInOrUp.js
touch components/SignUp.js
```

□screens => components(個人的にcomponentsの方が見慣れているので変更)

□touch components/SignInOrUp.js => touch components/SignIn.js(SignInOrUpの名称が冗長)

### それに伴いそれぞれ変更する箇所

```jsx
// 各コンポーネント共通で変更
// import React from 'react';
import React, { Component } from 'react';

// ...省略

// class SignIn extends React.Component {
class SignIn extends Component {
```

```jsx:App.js
// ファイル名を変更したのでApp.jsも変更
import Home from './components/Home';
import Profile from './components/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
```

```jsx:components/SignIn.js
// SignIn.jsも同様に変更
// class SignInOrUp extends Component {
class SignIn extends Component {

// ...省略

// export default withRouter(SignInOrUp);
export default withRouter(SignIn);
```

また、各コンポーネントの可読性も良くするため最低限必要なタグ以外はひとます取っています。

### サインアウトボタンの切り出し
記事内ではHome.jsとProfile.jsそれぞれに同じコードを記述していますが
修正する際や可読性のことを考えて、共通部品として切り出しておきました。

まずsrcの中に「elements/SignOut.js」を作成

- elementsはcomponentsと差別化したかったので任意で作りました。

- componentsはルーティングページ部品、elementsはタグで使用する部品で役割を分けました。

```jsx:elements/SignOut.js
// elements/SignOut.js
import React from 'react';
import firebase from '../Firebase';

const SignOut = () => {
    const handleLogout = () => {
        firebase.auth().signOut();
    }

    return (
        <React.Fragment>
            <button onClick={ handleLogout }>Sign out</button>
        </React.Fragment>
    );
}

export default SignOut;
```

続いてHome.jsとProfile.jsそれぞれ改修

```jsx:components/Home.js
// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

// 追加
import SignOut from '../elements/SignOut';

const Home = () => {
    return (
        <React.Fragment>
            <h2>Home</h2>
            <Link to="/profile">Profile</Link>
            <SignOut />{/* 追加 */}
        </React.Fragment>
    );
}

export default Home;
```

```jsx:components/Profile.js
// components/Profile.js
import React from 'react';
import { Link } from 'react-router-dom';

// 追加
import SignOut from '../elements/SignOut';

const Profile = () => {
    return (
        <React.Fragment>
            <h2>Profile</h2>
            <Link to="/">Home</Link>
            <SignOut />{/* 追加 */}
        </React.Fragment>
    );
}

export default Profile;
```