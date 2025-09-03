# ガジェット専用データベース構造設計

作成日: 2025-08-30
目的: 生産性向上ガジェットの独立管理システム

## 🎯 設計方針

### ガジェットの特性を活かした設計
1. **価格帯別管理**（〜5,000円、〜10,000円、〜30,000円）
2. **用途別分類**（デスク環境、入力デバイス、健康管理）
3. **即効性重視**（買ってすぐ効果を実感）

## 📊 ガジェットデータベース構造

```json
{
  "id": "GADGET_001",
  "type": "gadget",
  "name": "ロジクール MX Master 3",
  "category": "入力デバイス",
  "subCategory": "マウス",
  "brand": "Logicool",
  "model": "MX Master 3",
  
  "ten_scores": {
    "immediate_effect": 95,      // 即効性
    "comfort_improvement": 90,   // 快適性向上
    "productivity_boost": 85,    // 生産性向上度
    "durability": 95,            // 耐久性
    "cost_performance": 80       // コスパ
  },
  
  "price_info": {
    "market_price": 13500,       // 実売価格
    "list_price": 15950,         // 定価
    "price_range": "10000-15000",
    "best_price_timing": "Amazonプライムデー",
    "price_history": {
      "lowest": 9800,
      "average": 12000
    }
  },
  
  "specs": {
    "dimensions": "124.9 x 84.3 x 51mm",
    "weight": "141g",
    "battery": "充電式、最大70日",
    "connectivity": ["Bluetooth", "Unifying USB", "USB-C充電"],
    "compatibility": ["Windows", "Mac", "Linux", "iPad"],
    "warranty": "2年間"
  },
  
  "productivity_features": {
    "key_features": [
      "MagSpeed電磁気スクロール",
      "アプリ別カスタマイズ",
      "3台デバイス切り替え",
      "横スクロールホイール"
    ],
    "time_saving": "1日30分の操作時間短縮",
    "ergonomic_benefit": "手首の負担70%軽減",
    "learning_curve": "10分で基本操作習得"
  },
  
  "target_users": {
    "programmer": 95,       // プログラマー
    "designer": 100,        // デザイナー
    "writer": 85,          // ライター
    "student": 70,         // 学生
    "general_office": 90,  // 一般事務
    "gamer": 60           // ゲーマー
  },
  
  "real_world_impact": {
    "setup_time": "3分",
    "noticeable_improvement": "即日実感",
    "roi_period": "3ヶ月で元取れる",
    "user_satisfaction": 92,  // %
    "repurchase_rate": 85    // %
  },
  
  "alternatives": [
    "GADGET_002",  // MX Master 2S
    "GADGET_015",  // Apple Magic Mouse
    "GADGET_023"   // Elecom EX-G Pro
  ],
  
  "bundle_recommendations": [
    "GADGET_050",  // MX Keys キーボード
    "GADGET_101"   // マウスパッド
  ]
}
```

## 🏗️ ガジェットカテゴリ構造

### 1. 入力デバイス
```json
{
  "category": "入力デバイス",
  "items": [
    {
      "subCategory": "マウス",
      "priceRanges": {
        "budget": "〜3,000円（エントリー）",
        "standard": "3,000〜10,000円（スタンダード）",
        "premium": "10,000円〜（プレミアム）"
      }
    },
    {
      "subCategory": "キーボード",
      "types": ["メカニカル", "パンタグラフ", "メンブレン", "静電容量無接点"]
    },
    {
      "subCategory": "トラックパッド",
      "brands": ["Apple", "Logicool", "Microsoft"]
    }
  ]
}
```

### 2. デスク環境
```json
{
  "category": "デスク環境",
  "items": [
    {
      "subCategory": "モニター",
      "specs": ["27インチ", "32インチ", "ウルトラワイド", "4K"]
    },
    {
      "subCategory": "モニターアーム",
      "loadCapacity": ["〜10kg", "〜15kg", "〜20kg"]
    },
    {
      "subCategory": "デスクライト",
      "features": ["調光調色", "USB充電", "クランプ式"]
    },
    {
      "subCategory": "PCスタンド",
      "adjustability": ["固定", "高さ調整", "角度調整"]
    }
  ]
}
```

### 3. 健康・快適性
```json
{
  "category": "健康・快適性",
  "items": [
    {
      "subCategory": "オフィスチェア",
      "priceRanges": {
        "budget": "〜20,000円",
        "standard": "20,000〜50,000円",
        "premium": "50,000円〜"
      }
    },
    {
      "subCategory": "フットレスト",
      "types": ["固定式", "角度調整式", "温熱機能付き"]
    },
    {
      "subCategory": "アームレスト",
      "mounting": ["クランプ式", "置き型", "椅子取付"]
    }
  ]
}
```

### 4. 収納・整理
```json
{
  "category": "収納・整理",
  "items": [
    {
      "subCategory": "ケーブル管理",
      "solutions": ["ケーブルトレー", "ケーブルボックス", "ケーブルクリップ"]
    },
    {
      "subCategory": "デスクオーガナイザー",
      "materials": ["木製", "金属", "アクリル"]
    }
  ]
}
```

### 5. 電源・充電
```json
{
  "category": "電源・充電",
  "items": [
    {
      "subCategory": "USB充電器",
      "specs": ["急速充電", "GaN", "複数ポート"]
    },
    {
      "subCategory": "モバイルバッテリー",
      "capacity": ["10000mAh", "20000mAh", "30000mAh"]
    },
    {
      "subCategory": "電源タップ",
      "features": ["USB付き", "個別スイッチ", "雷ガード"]
    }
  ]
}
```

## 🎯 ガジェット特化ランキング

### 価格帯別ランキング
```javascript
// 5,000円以下で買える最強ガジェットTOP10
filter: {
  type: "gadget",
  price_info.market_price: <= 5000,
  ten_scores.immediate_effect: >= 80
}
sort: ten_scores.cost_performance

結果例:
1. Anker USB急速充電器（2,990円）
2. ノートPCスタンド（3,480円）
3. ケーブル管理ボックス（1,980円）
4. マウスパッド大型（2,480円）
5. ブルーライトカットメガネ（3,980円）
```

### 職種別ランキング
```javascript
// エンジニア必須ガジェットTOP10
filter: {
  type: "gadget",
  target_users.programmer: >= 90
}
sort: ten_scores.productivity_boost

結果例:
1. HHKB Professional（35,200円）
2. MX Master 3（13,500円）
3. 27インチ4Kモニター（45,000円）
4. モニターアーム（12,000円）
5. 昇降デスク（65,000円）
```

### 即効性ランキング
```javascript
// 買ってすぐ効果を実感できるガジェットTOP10
filter: {
  type: "gadget",
  real_world_impact.setup_time: <= "10分",
  real_world_impact.noticeable_improvement: "即日実感"
}
sort: ten_scores.immediate_effect

結果例:
1. マウスパッド（即座に操作性向上）
2. PCスタンド（姿勢改善即実感）
3. USBハブ（ポート不足即解決）
4. デスクライト（目の疲れ即軽減）
5. リストレスト（手首負担即軽減）
```

## 📊 ガジェット評価の特殊指標

### ROI（投資回収）計算
```javascript
function calculateROI(gadget) {
  const dailyTimeSaved = gadget.productivity_features.time_saving;
  const hourlyValue = 2000; // 時給換算
  const dailyValue = (dailyTimeSaved / 60) * hourlyValue;
  const price = gadget.price_info.market_price;
  const daysToROI = price / dailyValue;
  return {
    roi_days: daysToROI,
    roi_months: daysToROI / 30
  };
}
```

### セット購入推奨
```javascript
// キーボード + マウスセット
// モニター + モニターアーム
// デスク + チェア
// 複数購入で相乗効果
```

## 🔄 価格追跡機能

### セール情報管理
```json
{
  "sale_calendar": {
    "amazon_prime_day": "7月",
    "black_friday": "11月",
    "year_end": "12月",
    "new_year": "1月"
  },
  "price_alert": {
    "threshold": 0.8,  // 通常価格の80%以下で通知
    "history_low": true
  }
}
```

## 📁 ファイル構造

```
/gadgets/
├── input_devices/
│   ├── mouse.json
│   ├── keyboard.json
│   └── trackpad.json
├── desk_environment/
│   ├── monitor.json
│   ├── monitor_arm.json
│   ├── desk_light.json
│   └── pc_stand.json
├── health_comfort/
│   ├── office_chair.json
│   ├── footrest.json
│   └── armrest.json
├── storage_organization/
│   ├── cable_management.json
│   └── desk_organizer.json
└── power_charging/
    ├── usb_charger.json
    ├── mobile_battery.json
    └── power_strip.json
```

## 🎯 ガジェット独自の価値

1. **物理的な改善** - デジタルツールでは解決できない問題を解決
2. **即座の体感** - 使った瞬間から違いを実感
3. **長期投資** - 一度買えば数年使える
4. **環境構築** - 生産性の土台作り

これにより、ツール・資格・ガジェットそれぞれの特性を活かした最適なデータベースが構築できます。