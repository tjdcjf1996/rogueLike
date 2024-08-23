import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { stageLogArr } from "./data.js";
import { wait } from './game.js';

async function arrPrint() {
    console.clear();

    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync(' '.repeat(15) + 'Achievements', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.white('='.repeat(100));
    console.log(line);

    
    console.log(' '.repeat(35) + chalk.yellowBright.bold('지금까지 깨신 기록입니다!'));

    // 설명 텍스트
    console.log(chalk.green(' '.repeat(34) + '기록은 10개까지 저장됩니다!'));
    console.log(line);

    // 옵션들
    if (stageLogArr.length > 0) {
        stageLogArr.forEach((stage, i) => {
            console.log(' '.repeat(25) + `${i + 1}번째 기록은 ${stage[0]}모드에서  ${stage[1]} 스테이지까지 깨셨네요!`);
        });
    } else {
        console.log(' '.repeat(35) + '깨신 기록이 없어요 ㅠ..ㅠ');
    }



    // 하단 경계선
    console.log(line, '\n');

    // 하단 설명
    console.log(chalk.gray('1. 되돌아가기'));

}

function achieveInput() {
    const choice = readlineSync.question(' ► 입력 : ');

    switch (choice) {
        case '1':
            console.log(chalk.red('메뉴로 되돌아갑니다.'));
            break;

        default:
            console.log(chalk.red('메뉴로 되돌아갑니다.'));
            break;
    }
}

export async function achieveInfo() {

    await arrPrint();
    achieveInput();
    
}