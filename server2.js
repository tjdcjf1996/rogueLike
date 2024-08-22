import { exec } from 'child_process';

// 음악 파일 경로
const musicPath = '/back.mp3';

// 배경음악 실행
exec(`start /min wmplayer "${musicPath}"`, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err}`);
        return;
    }
    console.log('Background music started.');
});

// 여기에 게임 로직을 추가하세요.
console.log("게임이 시작됩니다...");
setTimeout(()=>{},30000)