import os from 'node:os';
import { startServer } from './app.js';
import { PORT } from '../shared/constants.js';

const port = Number(process.env.PORT) || PORT;

const virtual = /vethernet|virtual|vmware|vbox|wsl|docker|loopback|tailscale|zerotier|hyper-v/i;
function lanAddresses() {
  const all = [];
  for (const [name, list] of Object.entries(os.networkInterfaces())) {
    for (const a of list ?? []) {
      if (a.family === 'IPv4' && !a.internal && !virtual.test(name)) all.push(a.address);
    }
  }
  return all;
}

startServer({ port }).then(({ port: p }) => {
  console.log('');
  console.log('  🗿 AURA FARM 6767 서버 켜짐');
  console.log(`  나:   http://localhost:${p}`);
  for (const ip of lanAddresses()) console.log(`  친구: http://${ip}:${p}   (같은 와이파이/공유기)`);
  console.log('');
}).catch((e) => {
  console.error(e.code === 'EADDRINUSE' ? `${port}번 포트를 이미 누가 쓰는 중임.` : e);
  process.exit(1);
});

process.on('uncaughtException', (e) => {
  if (e.code === 'EADDRINUSE') { console.error(`${port}번 포트를 이미 누가 쓰는 중임. 서버 이미 켜져 있는지 확인.`); process.exit(1); }
  throw e;
});
