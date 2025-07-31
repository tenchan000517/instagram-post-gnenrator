// T009ターゲット専用フォント対応ユーティリティ

// T009専用ターゲットID
const T009_TARGET = 'T009';

/**
 * T009ターゲットかどうかを判定
 */
export function isT009Target(targetId?: string): boolean {
  return targetId === T009_TARGET;
}

/**
 * T009ターゲット用のフォントクラスを取得
 */
export function getT009FontClass(targetId?: string): string {
  return isT009Target(targetId) ? 'font-t009-special' : 'font-japanese';
}

/**
 * T009ターゲット用のフォントスタイルオブジェクトを取得（削除予定）
 * @deprecated Tailwindクラス方式に移行
 */
export function getT009FontStyle(targetId?: string): { fontFamily?: string } {
  return {};
}

/**
 * T009ターゲット用の動的クラス名を取得
 */
export function getT009DynamicFontClass(targetId?: string): string {
  const isT009 = isT009Target(targetId);
  return isT009 ? 'font-t009-special' : '';
}

/**
 * T009ターゲット用の背景色クラスを取得
 */
export function getT009BackgroundClass(targetId?: string): string {
  const isT009 = isT009Target(targetId);
  return isT009 ? 'bg-t009-special' : 'bg-amber-400';
}