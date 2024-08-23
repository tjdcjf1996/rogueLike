import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { level } from "./data.js";
import {cols,lines} from "./server.js"



function displayOption() {
    console.clear();

    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync(' '.repeat(cols*0.22) + 'Level Setting', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.white('='.repeat(cols));
    
    const levelText = `현재 난이도는 ${level.kor()} 입니다.`;
    console.log(line);

    // 난이도 표시
    
    console.log(chalk.green('\n'+ ' '.repeat((cols*0.9-levelText.length)/2) +'변경할 난이도를 선택해주세요'+'\n'));
    console.log(line);

    console.log(chalk.yellow('\n\n'+ ' '.repeat((cols*0.92-levelText.length)/2) +levelText+'\n\n'));
    console.log(line);
    // 옵션들
    console.log(`\n`+' '.repeat(cols*0.48) +chalk.blue('1.') + chalk.white(`하급`));
    console.log(' '.repeat(cols*0.48) +chalk.blue('2.') + chalk.white(`중급`));
    console.log(' '.repeat(cols*0.48) +chalk.blue('3.') + chalk.white(`상급`));
    console.log(' '.repeat(cols*0.46) +chalk.blue('4.') + chalk.white(' 돌아가기')+'\n');

    // 하단 경계선
    console.log(line,'\n');

    // 하단 설명
    console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.\n'));
}

// 유저 입력을 받아 처리하는 함수
function optionInput() {
    const choice = readlineSync.question(' ► 입력: ');

    switch (choice) {
        case '1':
            level.cur = 1;
            option();
            break;
        case '2':
            level.cur = 2;
            option();
            break;
        case '3':
            level.cur = 3;
            option();
            break; 
        case '4':
            break; 
        default:
            console.log(chalk.red('올바른 선택을 하세요.'));
            option(); // 유효하지 않은 입력일 경우 다시 입력 받음
            break;
    }
}

export function option() {
    displayOption();
    optionInput();
}

