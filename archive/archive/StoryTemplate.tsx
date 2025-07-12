// // ③一枚ストーリー型テンプレート - 問題提起・悩み、ボックス回答、逆説、最後に結論
// import React from 'react'
// import { BookHeart, CheckCircle, Star } from 'lucide-react'
// import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

// interface StoryTemplateProps {
//   data: TemplateData
// }

// export function StoryTemplate({ data }: StoryTemplateProps) {
//   // 🎨 テンプレートデータ挿入ロギング - story
//   console.log('🎨 テンプレートデータ挿入 - story')
//   console.log('================================================================================')
//   console.log('📋 挿入データ詳細:')
//   console.log(`  - title: "${data.title || 'なし'}"`)
//   console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
//   console.log(`  - content: "${data.content || 'なし'}"`)
//   console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
//   console.log(`  - checklist: [${data.checklist?.length || 0}個]`)
//   data.checklist?.forEach((item, index) => {
//     console.log(`    └─ ${index + 1}. "${item.text || item}"`)
//   })
//   console.log(`  - items: [${data.items?.length || 0}個]`)
//   data.items?.forEach((item, index) => {
//     const itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
//     console.log(`    └─ ${index + 1}. "${itemText}"`)
//   })
//   console.log('================================================================================')

//   return (
//     <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
//       {/* 背景装飾 */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-20">
//         <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-sm"></div>
//         <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-300 rounded-full blur-sm"></div>
//       </div>
      
//       <div className="relative z-10 p-5 flex flex-col h-full">
//         {/* ヘッダー部分 */}
//         <div className="text-center mb-4">
//           {(() => {
//             const { badge, title } = splitTitleForBadge(data.title)
//             const PageIcon = getPageNumberIcon(data.pageNumber || 1)
//             const badgeText = badge || data.badgeText || 'ストーリー'
            
//             return (
//               <>
//                 <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-3">
//                   <PageIcon className="w-5 h-5" />
//                   <span>{badgeText}</span>
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-800 leading-tight">
//                   {title}
//                 </h1>
//               </>
//             )
//           })()}
//         </div>

//         {/* ストーリー展開 */}
//         <div className="flex-1 space-y-4">
//           {data.content && (
//             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//               <div className="text-center">
//                 <p className="text-base text-gray-800 leading-relaxed font-medium">
//                   {data.content}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* チェックリスト形式での要点 */}
//           {data.checklist && data.checklist.length > 0 && (
//             <div className="bg-white rounded-2xl p-5 border border-blue-200">
//               <div className="text-center mb-4">
//                 <h3 className="text-lg font-bold text-blue-800 mb-3">
//                   重要なポイント
//                 </h3>
//               </div>
//               <div className="space-y-3">
//                 {data.checklist.map((item, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
//                       <CheckCircle className="w-3 h-3 text-white" />
//                     </div>
//                     <p className="text-sm text-gray-800 font-medium">
//                       {item.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* アイテムリスト形式での要点（checklisが無い場合） */}
//           {(!data.checklist || data.checklist.length === 0) && data.items && data.items.length > 0 && (
//             <div className="bg-white rounded-2xl p-5 border border-blue-200">
//               <div className="text-center mb-4">
//                 <h3 className="text-lg font-bold text-blue-800 mb-3">
//                   重要なポイント
//                 </h3>
//               </div>
//               <div className="space-y-3">
//                 {data.items.map((item, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
//                       <CheckCircle className="w-3 h-3 text-white" />
//                     </div>
//                     <p className="text-sm text-gray-800 font-medium">
//                       {typeof item === 'string' ? item : (item.title || item.content || '')}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* 結論・アクションセクション */}
//           {data.subtitle && (
//             <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//               <div className="text-center">
//                 <div className="w-8 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Star className="w-4 h-4 text-white" />
//                 </div>
//                 <p className="text-lg font-bold text-blue-800">
//                   {data.subtitle}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

        
//       </div>
//     </div>
//   )
// }

// // メタデータ
// export const storyMetadata = {
//   id: 'story',
//   name: '一枚ストーリー型',
//   description: '問題提起から解決までのストーリー展開',
//   suitableFor: {
//     contentTypes: ['体験談', '事例紹介', '問題解決'],
//     genres: ['ナレッジ系', 'ノウハウ系'],
//     dataStructure: ['時系列', 'ストーリー'],
//     complexity: 'medium' as const,
//     pageCount: { min: 1, max: 1 }
//   },
//   characterLimits: {
//     title: 30,        // 問題提起タイトル
//     content: 0,       // 使用しない
//     subtitle: 40,     // 最終メッセージ
//     items: 60         // 各ボックス内容
//   },
//   keywords: ['問題', '悩み', '解決', '結果', '変化', '体験', '実際', '具体的']
// }