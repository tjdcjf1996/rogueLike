import os from 'os';
import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from "./game.js";
import { exec } from 'child_process';
import { execSync } from 'child_process';
import { option } from "./option.js";
import { wait } from "./game.js";
import { achieveInfo } from './achieve.js';
export let cols = process.stdout.columns;
export let lines = process.stdout.rows;


async function Initial() {
    const platform = os.platform();

    if (platform === 'win32') {
        // 최초 창크기 설정
        execSync(`mode con: cols=100 lines=50`);
        // 인코딩 방식 설정
        execSync('chcp 65001').toString();
    } else{
        console.log("\n\n\n 윈도우 환경에 호환되는 프로그램입니다.");
        console.log("맥의 경우 정상 동작하지 않을 수 있습니다.");
        console.log("본 프로그램은 100 X 50 환경에 최적화 되어있습니다.");
        await wait(3000);
        exec(`osascript ./resize.applescript`);
        cols = process.stdout.columns;
        console.clear();
    }
}


// 로비 화면을 출력하는 함수
async function displayLobby() {
    console.clear();

    // 타이틀 텍스트
    console.log('\n'.repeat(10) +
        chalk.cyan(
            figlet.textSync(' '.repeat(cols/4) + 'RogueLike', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        ) + '\n'.repeat(10)
    );

    // 상단 경계선
    const line = chalk.rgb(255, 53, 51)('━'.repeat(cols));
    const line2 = chalk.grey('-'.repeat(cols));
    console.log(line);

    // 게임 이름
    console.log(chalk.yellowBright.bold(' '.repeat(cols*0.35) + 'CLI 게임에 오신것을 환영합니다!'));

    // 설명 텍스트
    console.log(chalk.rgb(255, 53, 51)(' '.repeat(cols*0.4) + '옵션을 선택해주세요.'));
    console.log();
    console.log(line);

    // 옵션들
    console.log(' '.repeat(39) + chalk.cyan.bold('1.') + chalk.white(' 새로운 게임 시작'));
    console.log(line2);
    console.log(' '.repeat(41) +chalk.cyan.bold('2.') + chalk.white(' 업적 확인하기'));
    console.log(line2);
    console.log(' '.repeat(43) +chalk.cyan.bold('3.') + chalk.white(' 난이도설정'));
    console.log(line2);
    console.log(' '.repeat(46) +chalk.cyan.bold('4.') + chalk.white(' 종료'));

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
async function handleUserInput() {
    const choice = readlineSync.question(' ► 입력: ');

    switch (choice) {
        case '1':
            console.log(chalk.green('게임을 시작합니다.'));
            // 여기에서 새로운 게임 시작 로직을 구현
            await startGame();
            break;
        case '2':
            await achieveInfo();
            break;
        case '3':
            console.log(chalk.blue('구현 준비중입니다.. 게임을 시작하세요'));
            // 옵션 메뉴 로직을 구현
            option();
            break;
        case '4':
            console.log(chalk.red('게임을 종료합니다.'));
            // 게임 종료 로직을 구현
            process.exit(0); // 게임 종료
            break;
        default:
            console.log(chalk.red('올바른 선택을 하세요.'));
            handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
    }
}

// 게임 시작 함수
export async function start() {
    await Initial();
    while (true) {
        displayLobby();
        await handleUserInput();
    }


}

// 게임 실행


start();
