#!/bin/bash

# プロジェクトのルートディレクトリに移動
cd "$(dirname "$0")/.."

# content/assets/blog が存在するか確認
if [ ! -d "content/assets/blog" ]; then
  echo "Warning: content/assets/blog not found. Skipping sync."
  exit 0
fi

# public/assets/blog がシンボリックリンクなら一旦削除
if [ -L "public/assets/blog" ]; then
  rm "public/assets/blog"
fi

# public/assets/blog ディレクトリを実ディレクトリとして作成
mkdir -p "public/assets/blog"

# content/assets/blog 内の各ディレクトリを public/assets/blog に同期
# ただし 'default' はスキップする
for dir in content/assets/blog/*; do
  if [ -d "$dir" ]; then
    dirname=$(basename "$dir")
    if [ "$dirname" != "default" ]; then
      # 既存のリンクやディレクトリがあれば削除
      rm -rf "public/assets/blog/$dirname"
      
      if [ "$GITHUB_ACTIONS" = "true" ]; then
        # GitHub Actions (本番ビルド) では実ファイルをコピーする
        echo "Copying assets for $dirname..."
        cp -R "$dir" "public/assets/blog/$dirname"
      else
        # ローカル開発環境ではシンボリックリンクを貼る (相対パス)
        echo "Linking assets for $dirname..."
        ln -s "../../../content/assets/blog/$dirname" "public/assets/blog/$dirname"
      fi
    fi
  fi
done

echo "Assets sync completed."
