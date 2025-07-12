'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
// React Icons
import * as MaterialIcons from 'react-icons/md'
import * as FontAwesome from 'react-icons/fa'
// Tabler Icons
import * as TablerIcons from '@tabler/icons-react'

// アイコンライブラリの定義
type IconLibrary = 'lucide' | 'material' | 'fontawesome' | 'tabler'

interface IconData {
  name: string
  library: IconLibrary
}

// よく使用されるアイコンをカテゴリ別に整理（複数ライブラリ混在）
const iconCategories: Record<string, IconData[]> = {
  '🎯 Instagram投稿生成 - キャリア・ビジネス': [
    { name: 'IconBriefcase', library: 'tabler' },        // カバン・仕事
    { name: 'IconBuilding', library: 'tabler' },         // オフィスビル
    { name: 'IconUserTie', library: 'tabler' },          // ビジネスマン
    { name: 'IconChartLine', library: 'tabler' },        // 成長グラフ
    { name: 'IconTarget', library: 'tabler' },           // ターゲット・目標
    { name: 'IconAward', library: 'tabler' },            // 受賞・成果
    { name: 'IconHandshake', library: 'tabler' },        // 握手・協力
    { name: 'IconPresentation', library: 'tabler' },     // プレゼンテーション
    { name: 'IconClipboardCheck', library: 'tabler' },   // タスク完了
    { name: 'IconBrandLinkedin', library: 'tabler' },    // LinkedIn
    { name: 'IconCertificate', library: 'tabler' },      // 資格・証明書
    { name: 'IconTrendingUp', library: 'tabler' },       // 上昇トレンド
    { name: 'IconBulb', library: 'tabler' },             // アイデア・ひらめき
    { name: 'IconRocket', library: 'tabler' },           // 成長・スタートアップ
    { name: 'IconCrown', library: 'tabler' },            // リーダーシップ
  ],
  '🔢 Instagram投稿生成 - 数字・チェック・リスト': [
    { name: 'IconSquareNumber1', library: 'tabler' },    // 番号1
    { name: 'IconSquareNumber2', library: 'tabler' },    // 番号2
    { name: 'IconSquareNumber3', library: 'tabler' },    // 番号3
    { name: 'IconSquareNumber4', library: 'tabler' },    // 番号4
    { name: 'IconSquareNumber5', library: 'tabler' },    // 番号5
    { name: 'IconSquareNumber6', library: 'tabler' },    // 番号6
    { name: 'IconSquareNumber7', library: 'tabler' },    // 番号7
    { name: 'IconSquareNumber8', library: 'tabler' },    // 番号8
    { name: 'IconSquareNumber9', library: 'tabler' },    // 番号9
    { name: 'IconListCheck', library: 'tabler' },        // チェックリスト
    { name: 'IconListNumbers', library: 'tabler' },      // 番号付きリスト
    { name: 'IconCheck', library: 'tabler' },            // チェックマーク
    { name: 'IconCheckbox', library: 'tabler' },         // チェックボックス
    { name: 'IconCircleCheck', library: 'tabler' },      // 円形チェック
    { name: 'IconSquareCheck', library: 'tabler' },      // 四角チェック
    { name: 'IconList', library: 'tabler' },             // リスト
    { name: 'IconAlertCircle', library: 'tabler' },      // 注意・警告
    { name: 'IconInfoCircle', library: 'tabler' },       // 情報
  ],
  '💬 Instagram投稿生成 - コミュニケーション・ソーシャル': [
    { name: 'IconBrandInstagram', library: 'tabler' },   // Instagram
    { name: 'IconBrandTwitter', library: 'tabler' },     // Twitter/X
    { name: 'IconBrandFacebook', library: 'tabler' },    // Facebook
    { name: 'IconBrandLinkedin', library: 'tabler' },    // LinkedIn
    { name: 'IconBrandYoutube', library: 'tabler' },     // YouTube
    { name: 'IconBrandTiktok', library: 'tabler' },      // TikTok
    { name: 'IconMessage', library: 'tabler' },          // メッセージ
    { name: 'IconMessageCircle', library: 'tabler' },    // チャット
    { name: 'IconMail', library: 'tabler' },             // メール
    { name: 'IconShare', library: 'tabler' },            // シェア
    { name: 'IconHeart', library: 'tabler' },            // いいね
    { name: 'IconThumbUp', library: 'tabler' },          // 高評価
    { name: 'IconEye', library: 'tabler' },              // 閲覧
    { name: 'IconUsers', library: 'tabler' },            // コミュニティ
    { name: 'IconSpeakerphone', library: 'tabler' },     // 拡散・発信
    { name: 'IconAt', library: 'tabler' },               // メンション
  ],
  '📱 Instagram投稿生成 - メディア・テクノロジー': [
    { name: 'IconDeviceMobile', library: 'tabler' },     // スマートフォン
    { name: 'IconDeviceDesktop', library: 'tabler' },    // デスクトップ
    { name: 'IconCamera', library: 'tabler' },           // カメラ
    { name: 'IconPhoto', library: 'tabler' },            // 写真
    { name: 'IconVideo', library: 'tabler' },            // 動画
    { name: 'IconMicrophone', library: 'tabler' },       // マイク
    { name: 'IconHeadphones', library: 'tabler' },       // ヘッドフォン
    { name: 'IconCloud', library: 'tabler' },            // クラウド
    { name: 'IconDatabase', library: 'tabler' },         // データベース
    { name: 'IconCode', library: 'tabler' },             // プログラミング
    { name: 'IconBrandAi', library: 'tabler' },          // AI
    { name: 'IconRobot', library: 'tabler' },            // ロボット・AI
    { name: 'IconWorldWww', library: 'tabler' },         // ウェブ
    { name: 'IconWifi', library: 'tabler' },             // インターネット
  ],
  '✅ Instagram投稿生成 - チェック・確認・ティップス': [
    { name: 'IconTips', library: 'tabler' },             // ティップス
    { name: 'IconLightbulb', library: 'tabler' },        // ひらめき・コツ
    { name: 'IconAlertTriangle', library: 'tabler' },    // 注意・警告
    { name: 'IconInfoCircle', library: 'tabler' },       // 情報・お知らせ
    { name: 'IconQuestionMark', library: 'tabler' },     // 質問・疑問
    { name: 'IconExclamationMark', library: 'tabler' },  // 重要
    { name: 'IconShield', library: 'tabler' },           // 安全・保護
    { name: 'IconBadgeCheck', library: 'tabler' },       // バッジ・認定
    { name: 'IconFlag', library: 'tabler' },             // フラグ・重要
    { name: 'IconStar', library: 'tabler' },             // おすすめ・評価
    { name: 'IconFocus', library: 'tabler' },            // フォーカス・重点
  ],
  '📦 Instagram投稿生成 - ボックス・コンテナ・タイトル': [
    { name: 'IconBox', library: 'tabler' },              // ボックス
    { name: 'IconSquare', library: 'tabler' },           // 四角形
    { name: 'IconRectangle', library: 'tabler' },        // 長方形
    { name: 'IconContainer', library: 'tabler' },        // コンテナ
    { name: 'IconLayoutGrid', library: 'tabler' },       // グリッドレイアウト
    { name: 'IconLayoutCards', library: 'tabler' },      // カードレイアウト
    { name: 'IconTemplate', library: 'tabler' },         // テンプレート
    { name: 'IconFolder', library: 'tabler' },           // フォルダ
    { name: 'IconArchive', library: 'tabler' },          // アーカイブ
    { name: 'IconPackage', library: 'tabler' },          // パッケージ
  ],
  '数字・順序': [
    // Tabler Numbers (最も豊富)
    { name: 'IconNumber1', library: 'tabler' },
    { name: 'IconNumber2', library: 'tabler' },
    { name: 'IconNumber3', library: 'tabler' },
    { name: 'IconNumber4', library: 'tabler' },
    { name: 'IconNumber5', library: 'tabler' },
    { name: 'IconNumber6', library: 'tabler' },
    { name: 'IconNumber7', library: 'tabler' },
    { name: 'IconNumber8', library: 'tabler' },
    { name: 'IconNumber9', library: 'tabler' },
    { name: 'IconNumber0', library: 'tabler' },
    { name: 'IconCircleNumber1', library: 'tabler' },
    { name: 'IconCircleNumber2', library: 'tabler' },
    { name: 'IconCircleNumber3', library: 'tabler' },
    { name: 'IconCircleNumber4', library: 'tabler' },
    { name: 'IconCircleNumber5', library: 'tabler' },
    { name: 'IconSquareNumber1', library: 'tabler' },
    { name: 'IconSquareNumber2', library: 'tabler' },
    { name: 'IconSquareNumber3', library: 'tabler' },
    { name: 'IconSquareNumber4', library: 'tabler' },
    { name: 'IconSquareNumber5', library: 'tabler' },
    // Material Design Numbers
    { name: 'MdLooks1', library: 'material' },
    { name: 'MdLooks2', library: 'material' },
    { name: 'MdLooks3', library: 'material' },
    { name: 'MdLooks4', library: 'material' },
    { name: 'MdLooks5', library: 'material' },
    { name: 'MdLooks6', library: 'material' },
    { name: 'MdFilter1', library: 'material' },
    { name: 'MdFilter2', library: 'material' },
    { name: 'MdFilter3', library: 'material' },
    { name: 'MdFilter4', library: 'material' },
    { name: 'MdFilter5', library: 'material' },
    // Lucide Numbers & Ordering
    { name: 'Hash', library: 'lucide' },
    { name: 'List', library: 'lucide' },
    { name: 'ListOrdered', library: 'lucide' },
    { name: 'ArrowUp', library: 'lucide' },
    { name: 'ArrowDown', library: 'lucide' },
    { name: 'ArrowRight', library: 'lucide' },
    { name: 'ArrowLeft', library: 'lucide' },
    { name: 'Plus', library: 'lucide' },
    { name: 'Minus', library: 'lucide' }
  ],
  'ビジネス・仕事': [
    { name: 'Briefcase', library: 'lucide' },
    { name: 'Building', library: 'lucide' },
    { name: 'Building2', library: 'lucide' },
    { name: 'Users', library: 'lucide' },
    { name: 'User', library: 'lucide' },
    { name: 'UserCheck', library: 'lucide' },
    { name: 'UserPlus', library: 'lucide' },
    { name: 'UserMinus', library: 'lucide' },
    { name: 'UsersRound', library: 'lucide' },
    { name: 'Target', library: 'lucide' },
    { name: 'TrendingUp', library: 'lucide' },
    { name: 'TrendingDown', library: 'lucide' },
    { name: 'BarChart3', library: 'lucide' },
    { name: 'BarChart4', library: 'lucide' },
    { name: 'PieChart', library: 'lucide' },
    { name: 'LineChart', library: 'lucide' },
    { name: 'Calendar', library: 'lucide' },
    { name: 'CalendarDays', library: 'lucide' },
    { name: 'Clock', library: 'lucide' },
    { name: 'FileText', library: 'lucide' },
    { name: 'Folder', library: 'lucide' },
    { name: 'FolderOpen', library: 'lucide' },
    { name: 'Mail', library: 'lucide' },
    { name: 'Phone', library: 'lucide' },
    { name: 'MapPin', library: 'lucide' },
    { name: 'Globe', library: 'lucide' },
    { name: 'Award', library: 'lucide' },
    { name: 'Star', library: 'lucide' },
    { name: 'Crown', library: 'lucide' },
    { name: 'Trophy', library: 'lucide' },
    { name: 'DollarSign', library: 'lucide' },
    { name: 'CreditCard', library: 'lucide' },
    { name: 'Banknote', library: 'lucide' },
    { name: 'Calculator', library: 'lucide' },
    // Font Awesome Business
    { name: 'FaBriefcase', library: 'fontawesome' },
    { name: 'FaBuilding', library: 'fontawesome' },
    { name: 'FaIndustry', library: 'fontawesome' },
    { name: 'FaUsers', library: 'fontawesome' },
    { name: 'FaUser', library: 'fontawesome' },
    { name: 'FaUserTie', library: 'fontawesome' },
    { name: 'FaUserCheck', library: 'fontawesome' },
    { name: 'FaUserPlus', library: 'fontawesome' },
    { name: 'FaChartLine', library: 'fontawesome' },
    { name: 'FaChartBar', library: 'fontawesome' },
    { name: 'FaChartPie', library: 'fontawesome' },
    { name: 'FaCalendarAlt', library: 'fontawesome' },
    { name: 'FaClock', library: 'fontawesome' },
    { name: 'FaFileAlt', library: 'fontawesome' },
    { name: 'FaFolder', library: 'fontawesome' },
    { name: 'FaEnvelope', library: 'fontawesome' },
    { name: 'FaPhone', library: 'fontawesome' },
    { name: 'FaMapMarkerAlt', library: 'fontawesome' },
    { name: 'FaGlobe', library: 'fontawesome' },
    { name: 'FaTrophy', library: 'fontawesome' },
    { name: 'FaStar', library: 'fontawesome' },
    { name: 'FaDollarSign', library: 'fontawesome' },
    { name: 'FaCreditCard', library: 'fontawesome' },
    { name: 'FaMoneyBillAlt', library: 'fontawesome' },
    { name: 'FaCalculator', library: 'fontawesome' },
    { name: 'FaHandshake', library: 'fontawesome' },
    { name: 'FaRocket', library: 'fontawesome' },
    { name: 'FaBullseye', library: 'fontawesome' }
  ],
  'チェック・確認': [
    // Tabler Check Icons
    { name: 'IconCheck', library: 'tabler' },
    { name: 'IconCircleCheck', library: 'tabler' },
    { name: 'IconSquareCheck', library: 'tabler' },
    { name: 'IconX', library: 'tabler' },
    { name: 'IconCircleX', library: 'tabler' },
    { name: 'IconSquareX', library: 'tabler' },
    { name: 'IconAlertCircle', library: 'tabler' },
    { name: 'IconAlertTriangle', library: 'tabler' },
    { name: 'IconInfoCircle', library: 'tabler' },
    { name: 'IconQuestionMark', library: 'tabler' },
    { name: 'IconShield', library: 'tabler' },
    { name: 'IconShieldCheck', library: 'tabler' },
    // Lucide Check Icons
    { name: 'Check', library: 'lucide' },
    { name: 'CheckCircle', library: 'lucide' },
    { name: 'CheckSquare', library: 'lucide' },
    { name: 'CheckCircle2', library: 'lucide' },
    { name: 'Square', library: 'lucide' },
    { name: 'Circle', library: 'lucide' },
    { name: 'X', library: 'lucide' },
    { name: 'XCircle', library: 'lucide' },
    { name: 'XSquare', library: 'lucide' },
    { name: 'AlertCircle', library: 'lucide' },
    { name: 'AlertTriangle', library: 'lucide' },
    { name: 'Info', library: 'lucide' },
    { name: 'HelpCircle', library: 'lucide' },
    { name: 'ShieldCheck', library: 'lucide' },
    { name: 'ShieldAlert', library: 'lucide' },
    { name: 'BadgeCheck', library: 'lucide' },
    { name: 'Verified', library: 'lucide' },
    // Font Awesome Check Icons
    { name: 'FaCheck', library: 'fontawesome' },
    { name: 'FaCheckCircle', library: 'fontawesome' },
    { name: 'FaCheckSquare', library: 'fontawesome' },
    { name: 'FaCheckDouble', library: 'fontawesome' },
    { name: 'FaTimes', library: 'fontawesome' },
    { name: 'FaTimesCircle', library: 'fontawesome' },
    { name: 'FaExclamationTriangle', library: 'fontawesome' },
    { name: 'FaExclamationCircle', library: 'fontawesome' },
    { name: 'FaInfoCircle', library: 'fontawesome' },
    { name: 'FaQuestionCircle', library: 'fontawesome' },
    { name: 'FaShieldAlt', library: 'fontawesome' },
    { name: 'FaCertificate', library: 'fontawesome' },
    { name: 'FaAward', library: 'fontawesome' },
    { name: 'FaMedal', library: 'fontawesome' }
  ],
  '学習・教育': [
    // Lucide Education
    { name: 'BookOpen', library: 'lucide' },
    { name: 'Book', library: 'lucide' },
    { name: 'GraduationCap', library: 'lucide' },
    { name: 'School', library: 'lucide' },
    { name: 'Library', library: 'lucide' },
    { name: 'PenTool', library: 'lucide' },
    { name: 'Edit3', library: 'lucide' },
    { name: 'FileEdit', library: 'lucide' },
    { name: 'Lightbulb', library: 'lucide' },
    { name: 'Brain', library: 'lucide' },
    { name: 'Eye', library: 'lucide' },
    { name: 'Search', library: 'lucide' },
    { name: 'Glasses', library: 'lucide' },
    { name: 'Bookmark', library: 'lucide' },
    { name: 'NotebookPen', library: 'lucide' },
    { name: 'Microscope', library: 'lucide' },
    // Font Awesome Education
    { name: 'FaBook', library: 'fontawesome' },
    { name: 'FaGraduationCap', library: 'fontawesome' },
    { name: 'FaUniversity', library: 'fontawesome' },
    { name: 'FaPen', library: 'fontawesome' },
    { name: 'FaPencilAlt', library: 'fontawesome' },
    { name: 'FaLightbulb', library: 'fontawesome' },
    { name: 'FaSearch', library: 'fontawesome' },
    { name: 'FaBookmark', library: 'fontawesome' }
  ],
  'コミュニケーション・ソーシャル': [
    // Material Design Social
    { name: 'MdMessage', library: 'material' },
    { name: 'MdChat', library: 'material' },
    { name: 'MdComment', library: 'material' },
    { name: 'MdFavorite', library: 'material' },
    { name: 'MdThumbUp', library: 'material' },
    { name: 'MdThumbDown', library: 'material' },
    { name: 'MdShare', library: 'material' },
    { name: 'MdSend', library: 'material' },
    { name: 'MdEmail', library: 'material' },
    { name: 'MdCall', library: 'material' },
    { name: 'MdPerson', library: 'material' },
    { name: 'MdGroup', library: 'material' },
    { name: 'MdPublic', library: 'material' },
    { name: 'MdNotifications', library: 'material' },
    // Lucide Communication
    { name: 'MessageCircle', library: 'lucide' },
    { name: 'MessageSquare', library: 'lucide' },
    { name: 'Send', library: 'lucide' },
    { name: 'Share2', library: 'lucide' },
    { name: 'Heart', library: 'lucide' },
    { name: 'ThumbsUp', library: 'lucide' },
    { name: 'ThumbsDown', library: 'lucide' },
    { name: 'Smile', library: 'lucide' },
    // Font Awesome Social
    { name: 'FaHeart', library: 'fontawesome' },
    { name: 'FaComment', library: 'fontawesome' },
    { name: 'FaShare', library: 'fontawesome' },
    { name: 'FaPaperPlane', library: 'fontawesome' }
  ],
  'メディア・テクノロジー': [
    // Font Awesome Media
    { name: 'FaPlay', library: 'fontawesome' },
    { name: 'FaPause', library: 'fontawesome' },
    { name: 'FaStop', library: 'fontawesome' },
    { name: 'FaVolumeUp', library: 'fontawesome' },
    { name: 'FaVolumeMute', library: 'fontawesome' },
    { name: 'FaMusic', library: 'fontawesome' },
    { name: 'FaVideo', library: 'fontawesome' },
    { name: 'FaCamera', library: 'fontawesome' },
    { name: 'FaImage', library: 'fontawesome' },
    { name: 'FaFilm', library: 'fontawesome' },
    { name: 'FaMicrophone', library: 'fontawesome' },
    { name: 'FaHeadphones', library: 'fontawesome' },
    { name: 'FaGamepad', library: 'fontawesome' },
    { name: 'FaTv', library: 'fontawesome' },
    { name: 'FaDesktop', library: 'fontawesome' },
    // Lucide Tech
    { name: 'Smartphone', library: 'lucide' },
    { name: 'Laptop', library: 'lucide' },
    { name: 'Monitor', library: 'lucide' },
    { name: 'Wifi', library: 'lucide' },
    { name: 'Download', library: 'lucide' },
    { name: 'Upload', library: 'lucide' },
    { name: 'Cloud', library: 'lucide' },
    { name: 'Database', library: 'lucide' },
    { name: 'Settings', library: 'lucide' },
    { name: 'Zap', library: 'lucide' },
    { name: 'Camera', library: 'lucide' },
    { name: 'Image', library: 'lucide' },
    { name: 'Music', library: 'lucide' },
    { name: 'Play', library: 'lucide' },
    { name: 'Pause', library: 'lucide' },
    { name: 'Stop', library: 'lucide' },
    { name: 'Volume2', library: 'lucide' }
  ]
}

export default function IconLibraryViewer() {
  const [currentCategory, setCurrentCategory] = useState<string>('数字・順序')
  const [selectedIcon, setSelectedIcon] = useState<IconData>({ name: 'IconNumber1', library: 'tabler' })
  
  const categories = Object.keys(iconCategories)
  const currentIndex = categories.findIndex(cat => cat === currentCategory)
  const currentIcons = iconCategories[currentCategory]
  
  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1
    setCurrentCategory(categories[prevIndex])
    setSelectedIcon(iconCategories[categories[prevIndex]][0])
  }
  
  const goToNext = () => {
    const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0
    setCurrentCategory(categories[nextIndex])
    setSelectedIcon(iconCategories[categories[nextIndex]][0])
  }
  
  const getIconComponent = (iconData: IconData, className: string = "w-8 h-8") => {
    let IconComponent
    switch (iconData.library) {
      case 'lucide':
        IconComponent = (LucideIcons as any)[iconData.name]
        break
      case 'material':
        IconComponent = (MaterialIcons as any)[iconData.name]
        break
      case 'fontawesome':
        IconComponent = (FontAwesome as any)[iconData.name]
        break
      case 'tabler':
        IconComponent = (TablerIcons as any)[iconData.name]
        break
      default:
        return null
    }
    return IconComponent ? <IconComponent className={className} /> : null
  }
  
  const getLibraryBadgeColor = (library: IconLibrary) => {
    switch (library) {
      case 'lucide': return 'bg-blue-100 text-blue-800'
      case 'material': return 'bg-green-100 text-green-800'
      case 'fontawesome': return 'bg-purple-100 text-purple-800'
      case 'tabler': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getImportStatement = (iconData: IconData) => {
    switch (iconData.library) {
      case 'lucide':
        return `import { ${iconData.name} } from 'lucide-react'`
      case 'material':
        return `import { ${iconData.name} } from 'react-icons/md'`
      case 'fontawesome':
        return `import { ${iconData.name} } from 'react-icons/fa'`
      case 'tabler':
        return `import { ${iconData.name} } from '@tabler/icons-react'`
      default:
        return ''
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            アイコンライブラリビューワー
          </h1>
          <p className="text-gray-600">
            4つのアイコンライブラリ統合ビューワー - テンプレートで使用可能なアイコンを確認
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Lucide</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Material Design</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Font Awesome</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Tabler Icons</span>
          </div>
        </div>
        
        {/* カテゴリ選択 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentCategory}
              </h2>
              <p className="text-gray-600 text-sm">
                {currentIcons.length}個のアイコン
              </p>
            </div>
            
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* カテゴリ選択ボタン */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCurrentCategory(category)
                  setSelectedIcon(iconCategories[category][0])
                }}
                className={`p-3 rounded-lg border text-sm transition-all ${
                  currentCategory === category
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* メインプレビューエリア */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 大きな表示 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {selectedIcon.name}
                </h3>
                <span className={`px-2 py-1 rounded text-xs ${getLibraryBadgeColor(selectedIcon.library)}`}>
                  {selectedIcon.library}
                </span>
              </div>
              <div className="flex justify-center items-center mb-4">
                <div className="w-32 h-32 bg-blue-50 rounded-xl flex items-center justify-center border-2 border-blue-200">
                  <div className="text-blue-600" style={{ fontSize: '4rem' }}>
                    {getIconComponent(selectedIcon, "w-16 h-16")}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">インポート方法:</p>
                <code className="text-xs bg-white p-2 rounded border block">
                  {getImportStatement(selectedIcon)}
                </code>
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">使用例:</p>
                <code className="text-xs bg-white p-2 rounded border block">
                  {'<' + selectedIcon.name + ' className="w-6 h-6 text-blue-500" />'}
                </code>
              </div>
            </div>
          </div>
          
          {/* サイズバリエーション */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              サイズバリエーション
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {getIconComponent(selectedIcon, "w-4 h-4")}
                </div>
                <span className="text-sm">w-4 h-4 (16px)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {getIconComponent(selectedIcon, "w-5 h-5")}
                </div>
                <span className="text-sm">w-5 h-5 (20px)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {getIconComponent(selectedIcon, "w-6 h-6")}
                </div>
                <span className="text-sm">w-6 h-6 (24px) - 推奨</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {getIconComponent(selectedIcon, "w-8 h-8")}
                </div>
                <span className="text-sm">w-8 h-8 (32px)</span>
              </div>
            </div>
            
            <h4 className="text-md font-medium text-gray-800 mt-6 mb-3">
              カラーバリエーション
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-blue-500">
                  {getIconComponent(selectedIcon, "w-5 h-5")}
                </div>
                <span className="text-xs">blue-500</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-green-500">
                  {getIconComponent(selectedIcon, "w-5 h-5")}
                </div>
                <span className="text-xs">green-500</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-red-500">
                  {getIconComponent(selectedIcon, "w-5 h-5")}
                </div>
                <span className="text-xs">red-500</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-gray-600">
                  {getIconComponent(selectedIcon, "w-5 h-5")}
                </div>
                <span className="text-xs">gray-600</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* アイコン一覧 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {currentCategory} のアイコン一覧
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {currentIcons.map((iconData) => (
              <button
                key={iconData.name}
                onClick={() => setSelectedIcon(iconData)}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedIcon.name === iconData.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={iconData.name}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`${selectedIcon.name === iconData.name ? 'text-blue-600' : 'text-gray-600'}`}>
                    {getIconComponent(iconData, "w-6 h-6")}
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block break-all">
                      {iconData.name}
                    </span>
                    <span className={`inline-block px-1 py-0.5 rounded text-xs mt-1 ${getLibraryBadgeColor(iconData.library)}`}>
                      {iconData.library}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}