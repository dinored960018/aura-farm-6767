// GitHub Pages용 정적 파일을 dist/ 에 모은다. 인자로 deploy를 주면 gh-pages 브랜치에 올린다.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
fs.cpSync(path.join(root, 'shared'), path.join(dist, 'shared'), { recursive: true });
fs.mkdirSync(path.join(dist, 'server'));
for (const f of ['hub.js', 'room.js', 'player.js', 'bot.js', 'nav.js']) {
  fs.copyFileSync(path.join(root, 'server', f), path.join(dist, 'server', f));
}
fs.mkdirSync(path.join(dist, 'vendor/three'), { recursive: true });
for (const f of ['three.module.js', 'three.core.js']) {
  fs.copyFileSync(path.join(root, 'node_modules/three/build', f), path.join(dist, 'vendor/three', f));
}
for (const f of ['postprocessing/EffectComposer.js', 'postprocessing/RenderPass.js', 'postprocessing/ShaderPass.js', 'postprocessing/UnrealBloomPass.js', 'postprocessing/MaskPass.js', 'postprocessing/Pass.js', 'shaders/CopyShader.js', 'shaders/LuminosityHighPassShader.js']) {
  const to = path.join(dist, 'vendor/three-addons', f);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(path.join(root, 'node_modules/three/examples/jsm', f), to);
}
fs.mkdirSync(path.join(dist, 'vendor/peerjs'));
fs.copyFileSync(path.join(root, 'node_modules/peerjs/dist/peerjs.min.js'), path.join(dist, 'vendor/peerjs/peerjs.min.js'));
// 모든 상대 경로 import에 배포 버전을 붙인다
const ver = Date.now().toString(36);
const stamp = (dir) => {
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.js')) continue;
    const p = path.join(dir, f);
    fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(/(['"])(\.{1,2}\/[^'"\n]+?\.js)\1/g, `$1$2?v=${ver}$1`));
  }
};
for (const d of ['js', 'shared', 'server']) stamp(path.join(dist, d));
const indexPath = path.join(dist, 'index.html');
fs.writeFileSync(indexPath, fs.readFileSync(indexPath, 'utf8')
  .replace('href="style.css"', `href="style.css?v=${ver}"`)
  .replace('src="js/main.js"', `src="js/main.js?v=${ver}"`));
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log('dist 생성');

if (process.argv[2] === 'deploy') {
  const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).trim();
  const git = (...a) => execFileSync('git', a, { cwd: dist, stdio: 'inherit' });
  git('init', '-q', '-b', 'gh-pages');
  git('add', '-A');
  git('-c', 'user.name=dinored', '-c', 'user.email=dinored960018@users.noreply.github.com', 'commit', '-q', '-m', 'GitHub Pages 배포');
  git('push', '-q', '-f', remote, 'gh-pages');
  fs.rmSync(path.join(dist, '.git'), { recursive: true, force: true });
  console.log('gh-pages 배포 완료');
}
