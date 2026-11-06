// 정적 파일을 모은다. deploy: gh-pages 브랜치에 올림. crazygames: SDK를 넣어 dist-crazygames/ 에 만들고 업로드용 zip을 만든다.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2];
const crazy = mode === 'crazygames';
const dist = path.join(root, crazy ? 'dist-crazygames' : 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
// 게임 코드와 three.js를 파일 하나로 묶고 압축한다. 동적 import까지 한 파일에 들어간다.
fs.rmSync(path.join(dist, 'js'), { recursive: true, force: true });
await build({
  entryPoints: [path.join(root, 'public/js/main.js')],
  outfile: path.join(dist, 'js/main.js'),
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2021',
  alias: { 'three/addons': path.join(root, 'node_modules/three/examples/jsm') },
  legalComments: 'none',
  // 브라우저 주소 기준 경로(public/js → /shared)를 실제 폴더로 잇는다
  plugins: [{
    name: 'site-paths',
    setup(b) {
      b.onResolve({ filter: /^\.\.\/(shared|server)\// }, (a) => (a.resolveDir.split(path.sep).join('/').endsWith('public/js') ? { path: path.join(root, a.path.slice(3)) } : null));
    },
  }],
  logLevel: 'warning',
});
fs.mkdirSync(path.join(dist, 'vendor/peerjs'), { recursive: true });
fs.copyFileSync(path.join(root, 'node_modules/peerjs/dist/peerjs.min.js'), path.join(dist, 'vendor/peerjs/peerjs.min.js'));
const ver = Date.now().toString(36);
const indexPath = path.join(dist, 'index.html');
fs.writeFileSync(indexPath, fs.readFileSync(indexPath, 'utf8')
  .replace(/<script type="importmap">.*?<\/script>\n/, '')
  .replace('href="style.css"', `href="style.css?v=${ver}"`)
  .replace('src="js/main.js"', `src="js/main.js?v=${ver}"`)
  .replace('</head>', crazy ? `<script>window.AURA_PORTAL='crazygames'</script>\n<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>\n</head>` : '</head>'));
if (crazy) {
  const out = path.join(root, 'aura-farm-6767-crazygames.zip');
  fs.rmSync(out, { force: true });
  // 윈도우 내장 tar만 zip을 만든다 (Git Bash의 tar는 못 만듦)
  const tar = process.platform === 'win32' ? path.join(process.env.SystemRoot, 'System32', 'tar.exe') : 'bsdtar';
  execFileSync(tar, ['-a', '-cf', out, ...fs.readdirSync(dist)], { cwd: dist, stdio: 'inherit' });
  console.log('zip 생성', out, fs.statSync(out).size);
  process.exit(0);
}
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log('dist 생성');

if (mode === 'deploy') {
  const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).trim();
  const git = (...a) => execFileSync('git', a, { cwd: dist, stdio: 'inherit' });
  git('init', '-q', '-b', 'gh-pages');
  git('add', '-A');
  git('-c', 'user.name=dinored', '-c', 'user.email=dinored960018@users.noreply.github.com', 'commit', '-q', '-m', 'GitHub Pages 배포');
  git('push', '-q', '-f', remote, 'gh-pages');
  fs.rmSync(path.join(dist, '.git'), { recursive: true, force: true });
  console.log('gh-pages 배포 완료');
}
