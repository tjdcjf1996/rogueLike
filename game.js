import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { stageLogArr } from "./data.js";
import { level } from "./data.js";
import {cols,lines} from "./server.js"

//---------------------------------------------------------------------------------------------------------------------------- wait 함수 선언
export const wait = (delay) => new Promise((res) => setTimeout(res, delay));
//---------------------------------------------------------------------------------------------------------------------------- wait 함수 선언 끝

//---------------------------------------------------------------------------------------------------------------------------- 로그용 날짜 변수 선언
let today = new Date();
let hour = today.getHours();
//---------------------------------------------------------------------------------------------------------------------------- 로그용 날짜 변수 선언 끝

//---------------------------------------------------------------------------------------------------------------------------- 로그 푸쉬용 함수 선언
function pushLog(arr, str) {
  arr.shift();
  arr.push(str);
}
//---------------------------------------------------------------------------------------------------------------------------- 로그 푸쉬용 함수 선언 끝

//---------------------------------------------------------------------------------------------------------------------------- Player 클래스
class Player {
  constructor() {
    this.hp = 100;
    this.minAtt = 20;
    this.maxAtt = 25;
    this.defense = 1;
  }
  attack() {
    // 공격력을 계산하는 함수
    return Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
  }
  async stageAbility(stage) {
    //체력은 스테이지에 비례하여 증가함. 랜덤(50 ~ 100) / 스테이지
    const addHp = Math.floor(((Math.random() * 51) + 50) / stage);
    this.hp += addHp;
    // 공격력은 현재 체력대비 * 0.1~0.2 배 상승 
    const addAtt = Math.floor(this.hp * (Math.floor(Math.random() * 11 + 10) / 100));

    // 방어력은 스테이지당 1% 증가
    this.defense++;
    // 성공보상 출력 및 보상 반영
    console.log(`스테이지 성공보상으로 체력이 ${addHp}만큼 증가, 공격력이 ${addAtt} 만큼 증가, 방어력이 1% 증가하였습니다!! `)
    this.minAtt += addAtt;
    this.maxAtt += addAtt;
  }



}
//---------------------------------------------------------------------------------------------------------------------------- Player 클래스 끝

//---------------------------------------------------------------------------------------------------------------------------- Monster 클래스 
class Monster {
  constructor() {
    this.hp = 50;
    this.minAtt = 1;
    this.maxAtt = 5;
    this.defense = 0;
  }

  attack() {
    // 공격력을 계산하는 함수
    return Math.floor(Math.random() * (this.maxAtt - this.minAtt + 1)) + this.minAtt;
  }
  stageAbility(stage) {
    this.hp += (stage - 1) * 60;
    this.minAtt += (stage - 1) * 3;
    this.maxAtt += (stage - 1) * 3;
    this.defense = stage;
  }
}
//---------------------------------------------------------------------------------------------------------------------------- Monster 클래스 끝

//---------------------------------------------------------------------------------------------------------------------------- bonusAbility 함수 선언
async function bonusAbility(player, monster) {
  // 1. 체력 회복 = 현 스테이지 몬스터 최대 공격력의 5배
  // 2. 공격력 증가 = 현재 최대공격력의 30% 증가
  // 3. 방어력 증가 = 방어력 3% 증가


  console.log('\n'.repeat(lines*0.15));
  const line = chalk.magentaBright('='.repeat(cols));
  console.log(line);

  console.log(
    chalk.cyan(
      figlet.textSync(' '.repeat(cols*0.2) + 'Bonus Track !!', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );

  console.log(chalk.magentaBright('='.repeat(cols)));

  const bonusList = `| 1. 체력 (${monster.maxAtt * 5}만큼 회복) | 2. 공격력 (${Math.floor(player.maxAtt * 0.3)}만큼 증가) | 3.방어력 3 증가) |`;
  chalk.yellow(console.log(
    ' '.repeat((cols*85 - bonusList.length) / 2) + bonusList
  ));
  console.log(chalk.magentaBright('='.repeat(cols)) + '\n');



  async function inputBonus(player, monster) {
    const choice = readlineSync.question('당신의 선택은?');


    switch (choice) {
      
      case '1':
        player.hp += monster.maxAtt * 5;
        console.log(`체력이 ${monster.maxAtt * 5} 만큼 회복되었습니다!`);
        await wait(1000);
        break;
        // 체력 일정량 회복, 해당 스테이지 몬스터의 최대공격력 5배만큼 회복한다.
      case '2':
        const attAdd = Math.floor(player.maxAtt * 0.3);
        player.minAtt += attAdd;
        player.maxAtt += attAdd;
        console.log(`공격력이 ${attAdd} 만큼 증가 되었습니다!`);
        await wait(1000);
        break;
        // 공격력이 최대 공격력의 0.3배만큼 증가한다.
      case '3':
        player.defense += 3;
        console.log(`방어력이 3% 증가 되었습니다!`);
        await wait(1000);
        break;
        // 방어력의 경우 고정으로 3% 증가한다.
      default:
        console.log(chalk.red('올바른 선택을 하지 않아 보너스 트랙이 소멸되었습니다.'));
        await wait(1000);
        break;
    }
  }

  await inputBonus(player, monster);
  console.clear();
}

//---------------------------------------------------------------------------------------------------------------------------- bonusAbility 함수 선언 끝


//---------------------------------------------------------------------------------------------------------------------------- displayStatus 함수 선언
async function displayStatus(stage, player, monster) {
  console.log(chalk.rgb(255, 53, 51)(`\n` + ('=').repeat(cols*0.43) + `Current Status` + ('=').repeat(cols*0.43) + '\n'));

  const infoPlayer = `| 플레이어 정보 : 체력 - ${player.hp} | 공격력 - ${player.minAtt}~${player.maxAtt} | 방어력 - ${player.defense}%`;
  const infoMonster = `| 몬스터 정보 : hp - ${monster.hp} | 공격력 - ${monster.minAtt}~${monster.maxAtt} | 방어력 - ${monster.defense}%`;
  console.log(
    chalk.cyanBright((' ').repeat(36) + `| Stage: ${stage} | 난이도 : ${level.kor()}`, '\n') +
    chalk.blueBright(
      (' ').repeat((90 - infoPlayer.length) / 2) + infoPlayer + '\n'
    ) +
    chalk.redBright(
      (' ').repeat((90 - infoMonster.length) / 2) + infoMonster + '\n'
    ),
  );
  console.log(chalk.rgb(255, 53, 51)(('=').repeat(cols) + `\n`));
}
//---------------------------------------------------------------------------------------------------------------------------- displayStatus 함수 선언 끝

//---------------------------------------------------------------------------------------------------------------------------- battle 함수 선언
const battle = async (stage, player, monster, bonusNum, reg) => {

  let logs = new Array(30).fill("");
  

  // 기도메타 잔여 횟수 저장
  let prey = 1;
  // 플레이어나 몬스터 둘중 하나 죽을때까지 반복
  while (player.hp > 0 && monster.hp > 0 && reg.cur === 1) {
    console.clear();
    // 스테이지 4판당 서비스 스탯 제공
    if (bonusNum == 1 && stage !== 1 && (stage - 1) % 4 === 0) {
      await bonusAbility(player, monster);
      bonusNum = 0;
    }
    await displayStatus(stage, player, monster);
    console.log(' '.repeat(cols*0.35) + `두둥탁. 몬스터가 등장했어요!` + '\n\n' + '='.repeat(cols*0.45) + 'Log Screen' + '='.repeat(cols*0.45));

    logs.forEach((log) => console.log(log));
    console.log('='.repeat(cols));

    console.log(
      chalk.green(
        `\n` + ' '.repeat(cols*0.06) + `| 1. 공격한다 | 2. 연속공격(10% 확률) | 3.기도메타(5% 확률 / 잔여:${prey}회) | 4. 게임포기 | \n\n`,
      ),
    );


    //---------------------------------------------------------------------------------------------------------------------------- battleInput 선언 
    // switch 구문을 통해 선택한 행동 처리
    async function battleInput() {

      const choice = readlineSync.question(' ► 당신의 선택은? ');

      switch (choice) {
        // 일반공격
        case '1':
          const attP = player.attack() * ((100 - monster.defense) / 100);
          const attM = monster.attack() * ((100 - player.defense) / 100);
          monster.hp -= Math.floor(attP);
          pushLog(logs, chalk.green(`[${hour}:${new Date().getMinutes()}:${new Date().getSeconds()}] 몬스터에게 ${Math.floor(attP)} 만큼 피해를 입혔습니다.`));
          player.hp -= Math.floor(attM);
          pushLog(logs, chalk.red(`[${hour}:${new Date().getMinutes()}:${new Date().getSeconds()}] 몬스터로부터 ${Math.floor(attM)} 만큼 피해를 받았습니다.`));
          break;
        // 10% 확률로 공격 2번 진행, 실패 시 플레이어만 뚜까 맞음.
        case '2':
          const ddRand = Math.floor(Math.random() * 101);
          if (ddRand <= 10) {
            pushLog(logs, chalk.blue(`-------------------------------------------`));
            pushLog(logs, chalk.blue(`더블공격 성공!`));
            let attP = player.attack() * ((100 - monster.defense) / 100);
            monster.hp -= Math.floor(attP);
            pushLog(logs, chalk.blue(`[${hour}:${new Date().getMinutes()}:${new Date().getSeconds()}] 몬스터에게 ${Math.floor(attP)} 만큼 피해를 입혔습니다.`));
            attP = player.attack() * ((100 - monster.defense) / 100);
            monster.hp -= Math.floor(attP);
            pushLog(logs, chalk.blue(`[${hour}:${new Date().getMinutes()}:${new Date().getSeconds()}] 몬스터에게 ${Math.floor(attP)} 만큼 피해를 입혔습니다.`));
            pushLog(logs, chalk.blue(`-------------------------------------------`));
          } else {
            const attM = monster.attack() * ((100 - player.defense) / 100);
            player.hp -= Math.floor(attM);
            pushLog(logs, chalk.red(`-------------------------------------------`));
            pushLog(logs, chalk.red(`더블공격 실패....`));
            pushLog(logs, chalk.red(`[${hour}:${new Date().getMinutes()}:${new Date().getSeconds()}] 몬스터로부터 ${Math.floor(attM)} 만큼 피해를 받았습니다.`));
            pushLog(logs, chalk.red(`-------------------------------------------`));

          }
          break;
        // 기도메타. 5% 확률로 몬스터의 피를 0으로 만들고 다음 스테이지로 진행
        case '3':
          const rand = Math.floor(Math.random() * 101);
          if (prey === 1 && rand <= 5) {
            monster.hp = 0;
            console.log("오 신께서 대신 몬스터를 물리치셨습니다. 다음 스테이지로 이동합니다.");
          }

          else if (prey !== 1) {
            pushLog(logs, chalk.red(`헤이, 헤이! 기도메타는 한번 뿐이라고.`));
          }

          else {
            pushLog(logs, chalk.red(`기도메타가 실패하였습니다.. 이어서 싸우십시요.`));
            prey--;
          }
          break;

          case '4':
            console.log(chalk.red(`게임을 포기하셨습니다. 업적은 등록되지 않습니다.`));
            reg.cur = 0;
          break;

        default:
          console.log(chalk.red('올바른 선택을 하세요.'));
          battleInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
          break;
      }
    }
    await battleInput();
  }
  //---------------------------------------------------------------------------------------------------------------------------- battleInput 선언 끝

  // 위 반복문이 끝났다는 것은 플레이어나 몬스터가 죽었다는 뜻.
  // 누가 죽었는지 판별해서 조건 
  if (player.hp < 0) {
    console.log(chalk.red("플레이어가 죽었습니다. 메뉴로 돌아갑니다."),);
    stageLogArr.push([level.kor(), stage-1]);
    await wait(3000);
    // 게임 메인으로 돌아감
    return;
  } else if(monster.hp < 0) {
    console.clear();
    console.log(chalk.blue("몬스터를 물리쳤습니다! 잠시 후 다음 스테이지로 이동합니다."),);
  } else {
    await wait(3000);
  }

};
//---------------------------------------------------------------------------------------------------------------------------- battle 함수 선언 끝

//---------------------------------------------------------------------------------------------------------------------------- startGame 함수 선언
export async function startGame() {
  console.clear();
  const player = new Player(); // 플레이어 객체 생성
  let stage = 1;
  let stageNum = 10;
  let bonusNum = 1;
  let reg = {
    cur : 1
  };

  if(level.cur===1){
    stageNum = 10;
    player.hp = 150;
    player.minAtt = 25;
    player.maxAtt = 30;
  }else if(level.cur === 2){
    stageNum = 15;
    player.hp = 100;
    player.minAtt = 20;
    player.maxAtt = 25;
  }else{
    stageNum = 20;
    player.hp = 100;
    player.minAtt = 15;
    player.maxAtt = 20;
  }

  while (stage <= stageNum && reg.cur === 1) {
    // 스테이지 시작할 때마다 Monster 객체 생성
    const monster = new Monster(stage);
    monster.stageAbility(stage);
    await battle(stage, player, monster, bonusNum, reg);



    if (player.hp > 0 && reg.cur===1) {
      bonusNum = 1;
      stage++;
      await player.stageAbility(stage);
      // setTimeout은 promise를 반환하지 않기 때문에 await이 작동하지 않음. 따라서 wait 함수를 작성하여 사용.
      // wait 함수는 전역에 위치
      await wait(1500);

    } else {
      return;
    }

  }

  console.log("모든 스테이지를 무찌르셨습니다! 축하드립니다.");
  stageLogArr.push([level.kor(), stage]);
  await wait(2000);


  return;
}
//---------------------------------------------------------------------------------------------------------------------------- startGame 함수 선언 끝