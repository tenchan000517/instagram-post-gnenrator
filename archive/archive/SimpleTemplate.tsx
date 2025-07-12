// // ⑥シンプル型テンプレート - タイトル、ボックスで解説を箇条書きで列挙
// import React from 'react'
// import { Star, Circle } from 'lucide-react'
// import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

// interface SimpleTemplateProps {
//   data: TemplateData
// }

// export function SimpleTemplate({ data }: SimpleTemplateProps) {
//   // 🎨 テンプレートデータ挿入ロギング - simple
//   console.log('🎨 テンプレートデータ挿入 - simple')
//   console.log('================================================================================')
//   console.log('📋 挿入データ詳細:')
//   console.log(`  - title: "${data.title || 'なし'}"`)
//   console.log(`  - content: "${data.content || 'なし'}"`)
//   console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
//   console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
//   console.log(`  - items: [${data.items?.length || 0}個]`)
//   data.items?.forEach((item, index) => {
//     const itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
//     console.log(`    └─ ${index + 1}. "${itemText}"`)
//   })
//   console.log('================================================================================')

//   return (
//     <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
//       {/* 背景装飾 */}
//       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
//       <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
//       <div className="relative z-10 p-6 flex flex-col h-full">
//         {/* ヘッダー部分 */}
//         <div className="text-center mb-6">
//           {(() => {
//             const { badge, title } = splitTitleForBadge(data.title)
//             const PageIcon = getPageNumberIcon(data.pageNumber || 1)
//             const badgeText = badge || data.badgeText || '重要ポイント'
            
//             return (
//               <>
//                 <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-3">
//                   <PageIcon className="w-5 h-5" />
//                   <span>{badgeText}</span>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-800 leading-tight">
//                   {title}
//                 </h1>
//               </>
//             )
//           })()}
//         </div>

//         {/* メインコンテンツ */}
//         <div className="flex-1 flex items-center justify-center">
//           <div className="w-full bg-white rounded-3xl p-8 border-2 border-blue-200 shadow-lg">
//             <div className="text-center mb-6">
//               <p className="text-2xl text-gray-800 font-medium leading-relaxed">
//                 {data.content}
//               </p>
//             </div>
            
//             {/* 箇条書き */}
//             {data.items && data.items.length > 0 && (
//               <div className="space-y-4">
//                 {data.items.map((item, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
//                       <Circle className="w-2 h-2 text-white fill-current" />
//                     </div>
//                     <p className="text-lg text-gray-800 leading-relaxed">
//                       {typeof item === 'string' ? item : item.title || item.content || String(item)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* フッター部分 */}
//         {data.subtitle && (
//           <div className="mt-4 text-center">
//             <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
//               <p className="text-base text-blue-800 font-medium">
//                 {data.subtitle}
//               </p>
//             </div>
//           </div>
//         )}
        
//       </div>
//     </div>
//   )
// }

// // メタデータ
// export const simpleMetadata = {
//   id: 'simple',
//   name: 'シンプル型',
//   description: 'タイトルと箇条書きボックスのシンプル構成',
//   suitableFor: {
//     contentTypes: ['要点整理', '箇条書き', 'まとめ'],
//     genres: ['ナレッジ系', 'ノウハウ系'],
//     dataStructure: ['点列挙', 'シンプル'],
//     complexity: 'simple' as const,
//     pageCount: { min: 1, max: 1 }
//   },
//   characterLimits: {
//     title: 25,
//     content: 0,
//     subtitle: 30,
//     items: 25         // 各箇条書き項目
//   },
//   keywords: ['ポイント', '要点', 'まとめ', '重要', '基本', 'シンプル']
// }