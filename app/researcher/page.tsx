import ResearchComponent from '../components/ResearchComponent'
import Header from '../components/Header'

export default function ResearcherPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ResearchComponent />
    </div>
  )
}

export const metadata = {
  title: '就活テーマリサーチャー | Instagram投稿生成',
  description: '厳選された176の就活テーマについて詳細なリサーチを実行し、Instagram投稿作成に必要な情報を収集します。',
}