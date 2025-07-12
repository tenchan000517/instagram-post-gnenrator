// // ②説明型テンプレート - タイトル、概要、解説
// import React from 'react'
// import { Lightbulb, Info, CheckCircle } from 'lucide-react'
// import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

// interface ExplanationTemplateProps {
//   data: TemplateData
// }

// export function ExplanationTemplate({ data }: ExplanationTemplateProps) {
//   // 🎨 テンプレートデータ挿入ロギング - explanation
//   console.log('🎨 テンプレートデータ挿入 - explanation')
//   console.log('================================================================================')
//   console.log('📋 挿入データ詳細:')
//   console.log(`  - title: "${data.title || 'なし'}"`)
//   console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
//   console.log(`  - content: "${data.content || 'なし'}"`)
//   console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
//   console.log(`  - pageNumber: ${data.pageNumber || 'なし'}`)
//   console.log('================================================================================')

//   return (
//     <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
//       {/* 背景装飾パターン */}
//       <div className="absolute top-0 left-0 w-full h-full opacity-20">
//         <div className="absolute top-20 left-20 w-4 h-4 bg-blue-200 rounded-full"></div>
//         <div className="absolute top-40 right-16 w-3 h-3 bg-blue-300 rounded-full"></div>
//         <div className="absolute bottom-32 left-16 w-5 h-5 bg-blue-200 rounded-full"></div>
//         <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300 rounded-full"></div>
//       </div>
      
//       <div className="relative z-10 p-6 flex flex-col h-full">
//         {/* ヘッダー部分 */}
//         <div className="text-center mb-8">
//           {(() => {
//             const { badge, title } = splitTitleForBadge(data.title)
//             const PageIcon = getPageNumberIcon(data.pageNumber || 1)
//             const badgeText = badge || data.badgeText || '詳しく解説'
            
//             return (
//               <>
//                 <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-4">
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

//         {/* 概要セクション */}
//         {data.subtitle && (
//           <div className="mb-8">
//             <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
//               <div className="flex items-start gap-4">
//                 <div className="w-8 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                   <Info className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h2 className="text-lg font-bold text-blue-800 mb-2">概要</h2>
//                   <p className="text-base text-gray-700 leading-relaxed">
//                     {data.subtitle}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* メイン解説 */}
//         <div className="flex-1">
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col justify-center">
//             <div className="text-center">
//               <div className="w-10 h-10 bg-gradient-to-b from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <CheckCircle className="w-5 h-5 text-white" />
//               </div>
//               <p className="text-lg text-gray-800 leading-relaxed font-medium">
//                 {data.content}
//               </p>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   )
// }

// // メタデータ
// export const explanationMetadata = {
//   id: 'explanation',
//   name: '説明型',
//   description: 'タイトル、概要、詳細解説の構成',
//   suitableFor: {
//     contentTypes: ['解説', '概念説明', '定義'],
//     genres: ['ナレッジ系', 'ノウハウ系'],
//     dataStructure: ['階層構造', '概要→詳細'],
//     complexity: 'simple' as const,
//     pageCount: { min: 1, max: 2 }
//   },
//   characterLimits: {
//     title: 25,
//     content: 120,     // メイン解説文
//     subtitle: 50,     // 概要文
//     items: 0          // 使用しない
//   },
//   keywords: ['とは', '意味', '理由', '背景', '重要性', '効果', '影響']
// }