ChatGPTのリサーチ結果をJSONファイルとして保存してください

**リサーチ結果貼り付けエリア**：
```
[ここにChatGPTから受け取ったJSON形式のリサーチ結果を貼り付けてください]
```

マスタープロンプト: /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TYPE003企業ランキング/01_リサーチ結果JSON保存マスタープロンプト.md

このマスタープロンプトに従って以下の処理を実行してください：

**実行内容**：
1. 貼り付けられたJSON形式データの構文検証
2. 企業の業界自動判定
3. 業界別JSONファイルへの追加保存
4. 既存データとの重複チェック
5. 保存完了確認

**保存先ディレクトリ**：
`/mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/industries/`

**対象ファイル**：
- government_companies.json
- medical_companies.json  
- transport_companies.json
- machinery_companies.json
- hr_companies.json
- banking_companies.json
- food_companies.json
- logistics_companies.json