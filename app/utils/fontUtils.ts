// ターゲット別スタイル対応ユーティリティ

// ターゲットID定義
const T007_TARGET = 'T007';
const T008_TARGET = 'T008';
const T009_TARGET = 'T009';
const T010_TARGET = 'T010';
const T011_TARGET = 'T011';
const T012_TARGET = 'T012';
const T020_TARGET = 'T020';

/**
 * T007またはT008ターゲットかどうかを判定
 */
export function isT007OrT008Target(targetId?: string): boolean {
  return targetId === T007_TARGET || targetId === T008_TARGET;
}

/**
 * T009ターゲットかどうかを判定
 */
export function isT009Target(targetId?: string): boolean {
  return targetId === T009_TARGET;
}

/**
 * T011ターゲットかどうかを判定
 */
export function isT011Target(targetId?: string): boolean {
  return targetId === T011_TARGET;
}

/**
 * T020ターゲットかどうかを判定
 */
export function isT020Target(targetId?: string): boolean {
  return targetId === T020_TARGET;
}

/**
 * 女性ターゲット（T009/T011/T020）かどうかを判定
 */
export function isFemaleTarget(targetId?: string): boolean {
  return targetId === T009_TARGET || targetId === T011_TARGET || targetId === T020_TARGET;
}

/**
 * T010またはT012ターゲットかどうかを判定
 */
export function isT010OrT012Target(targetId?: string): boolean {
  return targetId === T010_TARGET || targetId === T012_TARGET;
}

/**
 * 女性ターゲット用のフォントクラスを取得
 */
export function getT009FontClass(targetId?: string): string {
  return isFemaleTarget(targetId) ? 'font-t009-special' : 'font-japanese';
}

/**
 * T009ターゲット用のフォントスタイルオブジェクトを取得（削除予定）
 * @deprecated Tailwindクラス方式に移行
 */
export function getT009FontStyle(targetId?: string): { fontFamily?: string } {
  return {};
}

/**
 * 女性ターゲット用の動的クラス名を取得
 */
export function getT009DynamicFontClass(targetId?: string): string {
  return isFemaleTarget(targetId) ? 'font-t009-special' : '';
}

/**
 * ターゲット別背景色クラスを取得
 */
export function getTargetBackgroundClass(targetId?: string): string {
  if (isFemaleTarget(targetId)) {
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

// ターゲット別カスタム背景色設定
const TARGET_CUSTOM_BACKGROUNDS: Record<string, { intro?: string; summary?: string }> = {
  T007: { intro: 'bg-t007-intro', summary: 'bg-t007-summary' },
  T008: { intro: 'bg-t007-intro', summary: 'bg-t007-summary' }, // T007と同じ色を使用
  T010: { summary: 'bg-t010-summary' }, // introは既存のbg-green-500を使用
  T012: { summary: 'bg-t010-summary' }, // T010と同じ薄い緑を使用
  // 今後追加例:
  // T001: { intro: 'bg-t001-intro', summary: 'bg-t001-summary' },
  // T002: { intro: 'bg-t002-intro', summary: 'bg-t002-summary' },
};

/**
 * ターゲット別Introduction背景色クラスを取得
 */
export function getTargetIntroBackgroundClass(targetId?: string): string {
  if (targetId && TARGET_CUSTOM_BACKGROUNDS[targetId]?.intro) {
    return TARGET_CUSTOM_BACKGROUNDS[targetId].intro;
  }
  return getTargetBackgroundClass(targetId);
}

/**
 * ターゲット別Summary背景色クラスを取得
 */
export function getTargetSummaryBackgroundClass(targetId?: string): string {
  if (targetId && TARGET_CUSTOM_BACKGROUNDS[targetId]?.summary) {
    return TARGET_CUSTOM_BACKGROUNDS[targetId].summary;
  }
  return getTargetBackgroundClass(targetId);
}