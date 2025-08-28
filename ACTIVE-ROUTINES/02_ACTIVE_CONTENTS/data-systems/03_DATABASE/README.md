# 03_DATABASE - データベース・データソース

**更新日**: 2025年8月27日  
**用途**: 各種データベースファイル・マスターデータ・データソース

---

## 📊 habit-databases/ - 習慣データベース

### メインデータベース
- `habit-behavior-database.json` - 習慣データベース（45エントリ）⭐メインDB
- `productivity-tools-database.json` - 生産性ツールデータベース

### classified-dbs/ - 分類済みデータベース
目的・条件別に分類された習慣データベース:
- `easy-habits.json` / `medium-habits.json` / `hard-habits.json` - 難易度別
- `free-habits.json` - 費用無料系
- `morning-habits.json` - 朝実施系
- `high-productivity-habits.json` - 生産性85点以上
- `high-wellbeing-habits.json` - 幸福度85点以上
- `high-career-habits.json` - キャリア85点以上
- `high-learning-habits.json` - 学習効果85点以上

---

## 🏢 company-databases/ - 企業データベース

### 企業マスターデータ
- `companyMasterData.json` - 企業マスターデータ（基本版）
- `companyMasterData_extended.json` - 企業拡張データ（詳細版）

### データ内容
- **企業情報**: 年収、休日数、残業時間、営業利益率、ROE等
- **企業数**: 100+社
- **業界分類**: 15業界（IT・コンサル・商社・製薬等）

---

## 🎯 使用方法

### ランキング生成時のデータ選択
1. **習慣ランキング**: `habit-databases/` からメイン or 分類済みDB選択
2. **企業ランキング**: `company-databases/` から基本版 or 拡張版選択
3. **カスタム条件**: 分類済みDBで特定条件のランキング作成

### データベース参照
```bash
# 習慣データベース参照
03_DATABASE/habit-databases/habit-behavior-database.json

# 企業データベース参照
03_DATABASE/company-databases/companyMasterData.json

# 特定条件データ参照
03_DATABASE/habit-databases/classified-dbs/high-productivity-habits.json
```

---

## ⚠️ データベース管理注意点

1. **バックアップ**: 重要データは必ずバックアップを取る
2. **整合性**: データ更新時は関連データベースも同期更新
3. **フォーマット**: 既存フォーマットに合わせて追加・編集
4. **検証**: データ追加後は必ず動作確認を実施

---

**このディレクトリのファイルはランキング生成の元データです。慎重に管理してください。**