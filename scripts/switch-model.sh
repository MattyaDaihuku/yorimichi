#!/bin/bash

# モデル設定ファイルのパス
FILE_PATH="/home/dice/programs/2026_team8/src/lib/ai-active-model.ts"

# モデル名マップ（ユーザー様指定の正確な名称に調整）
declare -A MODELS
MODELS=(
  ["25f"]="gemini-2.5-flash"
  ["25l"]="gemini-2.5-flash-lite"
  ["3f"]="gemini-3-flash-preview"
  ["g3"]="gemma-3-27b-it"
)

# 引数チェック
if [ -z "$1" ]; then
  echo "使用法: ./scripts/switch-model.sh <エイリアス>"
  echo "エイリアス一覧:"
  echo "  25f -> Gemini 2.5 Flash"
  echo "  25l -> Gemini 2.5 Flash Lite"
  echo "  3f  -> Gemini 3 Flash (Preview)"
  echo "  g3  -> Gemma 3 (27b-it)"
  exit 1
fi

ALIAS=$1
SELECTED_MODEL=${MODELS[$ALIAS]}

# エイリアスが見つからない場合は、入力をそのままモデル名として扱う
if [ -z "$SELECTED_MODEL" ]; then
  SELECTED_MODEL=$ALIAS
fi

# 設定ファイルを書き換え（1行上書き）
echo "export const ACTIVE_MODEL = \"$SELECTED_MODEL\";" > "$FILE_PATH"

echo "------------------------------------------"
echo "モデルを切り替えました: $SELECTED_MODEL"
echo "ファイルを更新しました: $FILE_PATH"
echo "------------------------------------------"
