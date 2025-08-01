// ターゲット別スタイル対応ユーティリティ

// ターゲットID定義
const T009_TARGET = 'T009';
const T010_TARGET = 'T010';
const T012_TARGET = 'T012';

/**
 * T009ターゲットかどうかを判定
 */
export function isT009Target(targetId?: string): boolean {
  return targetId === T009_TARGET;
}

/**
 * T010まT012ターゲットかどうかを判定
 */
export function isT010OrT012Target(targetId?: string): boolean {
  return targetId === T010_TARGET || targetId === T012_TARGET;
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
 * ターゲット別背景色クラスを取得
 */
export function getTargetBackgroundClass(targetId?: string): string {
  if (isT009Target(targetId)) {
    return 'bg-t009-special';
  }
  if (isT010OrT012Target(targetId)) {
    return 'bg-green-500';
  }
  return 'bg-amber-400';
}

/**
 * T009ターゲット用の背景色クラスを取得
 * @deprecated getTargetBackgroundClassを使用してください
 */
export function getT009BackgroundClass(targetId?: string): string {
  return getTargetBackgroundClass(targetId);
}