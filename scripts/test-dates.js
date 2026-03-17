const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getGitDates(filePath) {
  try {
    // Get the first commit date (creation date)
    const postDate = execSync(`git log --follow --format=%aI --reverse "${filePath}" | head -1`, { encoding: 'utf8' }).trim();
    // Get the last commit date (update date)
    const updateDate = execSync(`git log -1 --format=%aI "${filePath}"`, { encoding: 'utf8' }).trim();

    if (postDate && updateDate) {
      return { postDate, updateDate };
    }
  } catch (error) {
    console.error('Git error:', error.message);
  }

  const stats = fs.statSync(filePath);
  return {
    postDate: stats.birthtime.toISOString(),
    updateDate: stats.mtime.toISOString(),
  };
}

// テスト実行: _posts ディレクトリ内の最初のファイルで試す
const postsDir = path.join(process.cwd(), '_posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

if (files.length > 0) {
  const targetFile = path.join(postsDir, files[0]);
  console.log(`Testing file: ${targetFile}`);
  const dates = getGitDates(targetFile);
  console.log('Result:', JSON.stringify(dates, null, 2));
} else {
  console.log('No markdown files found in _posts/');
}
