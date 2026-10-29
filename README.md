# ビッグバン株式会社 公式サイト（BIGBANG SUISAN）

> 中文说明在前，日本語の説明は後半にあります。

---

## 中文

### 概要
- 单页静态企业官网，**不需要构建、不需要服务器端**，直接放到 GitHub Pages 即可运行。
- 只使用 HTML / CSS / 原生 JavaScript，不依赖任何框架。
- 外部服务只有两项：Google Fonts（字体）、Google 地图嵌入（无需 API Key）。

### 目录结构
```
/
├─ index.html              首页（唯一的正式页面）
├─ 404.html                找不到页面时显示
├─ robots.txt              搜索引擎设置（允许收录）
├─ .nojekyll               让 GitHub Pages 原样发布文件
├─ .gitignore
├─ README.md
└─ assets/
   ├─ css/style.css        全站样式
   ├─ js/main.js           手机菜单、固定页头、滚动淡入
   └─ images/              Logo、favicon、所有照片（WebP）
```

### 部署到 GitHub Pages
1. 把本文件夹内的**全部文件**（含 `.nojekyll`、`.gitignore` 等以点开头的文件）放到仓库根目录，推送到 `main` 分支。
2. GitHub 仓库 → **Settings → Pages** → Source 选 **Deploy from a branch**，Branch 选 **main / (root)**，保存。
3. 几分钟后即可通过 `https://<账号>.github.io/<仓库名>/` 访问。
4. 使用公司域名时：在 Pages 设置里填 Custom domain（会自动生成 `CNAME` 文件），并在域名服务商处添加 DNS 记录；之后在 `robots.txt` 里补上 Sitemap 网址。

### 日常更新
| 想改的内容 | 改哪里 |
|---|---|
| 文字、电话、FAX、营业所等资料 | `index.html`（全站搜索后一起改，页头、会社概要、联系方式、页脚都有） |
| 颜色、字号、间距 | `assets/css/style.css`（文件开头有配色说明） |
| 换照片 | 用**同名、同尺寸比例**的 WebP 覆盖 `assets/images/` 里的文件即可，不用改代码 |
| 菜单行为 | `assets/js/main.js` |

本地预览：在本文件夹打开终端，执行 `python3 -m http.server 8080`，浏览器打开 `http://localhost:8080`。
修改后请用电脑和手机（或浏览器的手机模式）各看一遍再发布。

### 分支与版本管理（main / dev / Tag）
- **main**：正式版。GitHub Pages 只发布这个分支，**不要直接在 main 上修改**。
- **dev**：日常修改都在这里做，确认无误后再合并到 main。
- 较大的修改可以从 dev 再开临时分支（如 `feature/new-photos`），完成后合并回 dev 并删除。
- 每次发布到 main 后打一个 Tag，方便回溯：

```bash
# 第一次
git checkout -b dev            # 从 main 建 dev

# 日常修改
git checkout dev
# …修改文件…
git add .
git commit -m "会社概要の電話番号を更新"
git push origin dev

# 确认后发布
git checkout main
git merge --no-ff dev
git tag -a v1.1.0 -m "電話番号の更新"
git push origin main --tags

# 出问题时回到上一个版本
git checkout main
git revert <有问题的提交>      # 或：git reset --hard v1.0.0 后强制推送（需谨慎）
```
版本号规则：改文字或照片 → `v1.0.1`；新增区块或较大调整 → `v1.1.0`；整站改版 → `v2.0.0`。
首次发布建议打 `v1.0.0`。

### 修改流程（feature → dev → main）
```bash
git checkout dev && git pull
git checkout -b feature/update-phone      # 每个修改任务一个分支
# …修改文件，本地预览确认…
git add -A && git commit -m "会社概要の電話番号を更新"
git push -u origin feature/update-phone
# 在 GitHub 上建 Pull Request：feature/update-phone → dev，确认后再建 dev → main
```
合并到 main 后 GitHub Pages 会自动重新发布（约 1～3 分钟），然后打 Tag：
`git checkout main && git pull && git tag -a v1.0.1 -m "電話番号の更新" && git push origin v1.0.1`

### 回退错误版本
- 推荐：在 GitHub 上对出问题的 Pull Request 点 **Revert**，或本地 `git revert <commit>` 后推送。历史会保留，不需要强制推送。
- 想整体回到某个 Tag 的内容：`git checkout main && git revert --no-commit v1.0.1..HEAD && git commit -m "v1.0.1 に戻す"`。
- **禁止** `git push --force`。

### 确认正式域名和 HTTPS
- GitHub 仓库 → Settings → Pages：显示 “Your site is live at https://biggbang.jp” 即为正常；“Enforce HTTPS” 应为勾选状态。
- DNS（XServer）只需要：`biggbang.jp` 的 A 记录指向 185.199.108.153 / 109.153 / 110.153 / 111.153，`www` 的 CNAME 指向 `wisdom-technology-dev.github.io`。不要动 NS、SOA、MX 等其他记录。
- 命令行确认：`dig +short biggbang.jp`、`curl -I https://biggbang.jp`。

### 注意事项
- 页面照片均为示意图，部分为 AI 生成，页脚已注明；取得实拍照片后建议替换。
- 正式版已移除 `noindex, nofollow`，上线后会被搜索引擎收录。
- 仍待客户确认：WeChat / LINE 账号、「お取引先様専用のオンライン注文」的入口网址、豊洲市場营业所的具体位置、正式英文社名等。确认后再在页面上追加，不要先放空链接。

---

## 日本語

### 概要
- 1 ページ構成の静的な企業サイトです。**ビルド不要・サーバー側の処理なし**で、GitHub Pages にそのまま公開できます。
- HTML / CSS / 素の JavaScript のみで作成し、フレームワークは使っていません。
- 外部サービスは Google Fonts（フォント）と Google マップの埋め込み（API キー不要）の 2 つだけです。

### フォルダ構成
```
/
├─ index.html              トップページ（公開ページはこの 1 枚）
├─ 404.html                ページが見つからない時の表示
├─ robots.txt              検索エンジン向け設定（インデックス許可）
├─ .nojekyll               GitHub Pages でファイルをそのまま公開するため
├─ .gitignore
├─ README.md
└─ assets/
   ├─ css/style.css        サイト全体のスタイル
   ├─ js/main.js           スマホメニュー・固定ヘッダー・スクロール表示
   └─ images/              ロゴ・favicon・写真（WebP）
```

### GitHub Pages への公開
1. このフォルダ内の**すべてのファイル**（`.nojekyll`・`.gitignore` など「.」で始まるものを含む）をリポジトリ直下に置き、`main` ブランチへ push します。
2. リポジトリの **Settings → Pages** で Source を **Deploy from a branch**、Branch を **main / (root)** にして保存します。
3. 数分後、`https://<アカウント>.github.io/<リポジトリ名>/` で表示されます。
4. 独自ドメインを使う場合は、Pages 設定の Custom domain に入力（`CNAME` が自動作成されます）し、ドメイン側で DNS を設定してください。その後 `robots.txt` に Sitemap の URL を追記します。

### 日々の更新
| 変更したい内容 | 編集する場所 |
|---|---|
| 文章・電話・FAX・営業所などの情報 | `index.html`（ヘッダー・会社概要・お問い合わせ・フッターに同じ情報があるため、全体を検索してまとめて修正） |
| 色・文字サイズ・余白 | `assets/css/style.css`（冒頭に配色のメモあり） |
| 写真の差し替え | `assets/images/` の画像を**同じファイル名・同じ縦横比**の WebP で上書き（コード修正不要） |
| メニューの動き | `assets/js/main.js` |

ローカル確認：このフォルダでターミナルを開き `python3 -m http.server 8080` を実行し、`http://localhost:8080` を開きます。
公開前に、パソコンとスマホ（またはブラウザのスマホ表示）の両方で確認してください。

### ブランチとバージョン管理（main / dev / Tag）
- **main**：公開中の本番。GitHub Pages はこのブランチだけを公開します。**main で直接編集しないでください。**
- **dev**：日々の修正はここで行い、確認後に main へマージします。
- 大きめの修正は dev から一時ブランチ（例：`feature/new-photos`）を作り、終わったら dev へ戻して削除します。
- main へ公開するたびに Tag を付け、いつでも以前の版に戻せるようにします（コマンドは中文欄と同じ）。

バージョンの付け方：文字・写真の修正 → `v1.0.1`、セクション追加など → `v1.1.0`、全面リニューアル → `v2.0.0`。初回公開は `v1.0.0` を推奨します。

### 修正の流れ（feature → dev → main）
上の中文欄のコマンドと同じです。修正ごとに `feature/…` ブランチを作り、Pull Request で `dev`、確認後に `main` へマージします。`main` へ入ると GitHub Pages が自動で再公開（1〜3 分）されるので、その後 Tag を付けます。

### 誤った版を戻す
- GitHub の Pull Request 画面で **Revert**、またはローカルで `git revert <commit>` して push します（履歴は残り、強制 push は不要）。
- ある Tag の状態に戻す：`git revert --no-commit v1.0.1..HEAD` → コミット → push。
- `git push --force` は使わないでください。

### 独自ドメインと HTTPS の確認
- Settings → Pages に「Your site is live at https://biggbang.jp」と表示され、「Enforce HTTPS」にチェックが入っていれば正常です。
- XServer の DNS は、`biggbang.jp` の A レコード（185.199.108.153 / 109.153 / 110.153 / 111.153）と `www` の CNAME（`wisdom-technology-dev.github.io`）だけ。NS・SOA・MX などは触りません。
- 確認コマンド：`dig +short biggbang.jp`、`curl -I https://biggbang.jp`

### 注意事項
- 掲載写真はイメージで、一部は AI 生成です（フッターに注記済み）。実際の写真が用意でき次第、差し替えをおすすめします。
- 公開版では `noindex, nofollow` を外しているため、公開後は検索エンジンに登録されます。
- お客様確認待ち：WeChat / LINE のアカウント、「お取引先様専用のオンライン注文」の入口 URL、豊洲市場 営業所の詳しい場所、英文社名など。確定後に追記し、それまではリンクを置かないでください。
