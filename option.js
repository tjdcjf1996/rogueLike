import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import {execSync} from 'child_process';

let optional = '07';
let optionalStr = (optional === '07') ? "ON" : "OFF" ;


function displayOption() {
    console.clear();

    // 타이틀 텍스트
    console.log(
        chalk.cyan(
            figlet.textSync('RL- Javascript', {
                font: 'Standard',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );

    // 상단 경계선
    const line = chalk.magentaBright('='.repeat(50));
    console.log(line);

    // 설명 텍스트
    console.log(chalk.green('변경할 옵션을 선택해주세요.'));
    console.log();

    // 옵션들
    console.log(chalk.blue('1.') + chalk.white(` 다크모드 적용 : ${optionalStr}`));
    console.log(chalk.blue('2.') + chalk.white(' 돌아가기'));

    // 하단 경계선
    console.log(line);

    // 하단 설명
    console.log(chalk.gray('1-2 사이의 수를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
function optionInput() {
    const choice = readlineSync.question('입력: ');

    switch (choice) {
        case '1':
            if(optional === '07'){
                execSync('color 70');
                optionalStr = '70';
            }
                execSync('color 07');
                optionalStr = '07';
            
            // option();
            break;
        case '2':
            break;1
        default:
            console.log(chalk.red('올바른 선택을 하세요.'));
            optionInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
    }
}

export function option(){
    displayOption();
    optionInput();
}

