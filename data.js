export const stageLogArr = [];
export let level = {
    cur : 2,
    kor : function(){
        return this.cur===1 ? '하급' : this.cur===2 ? '중급' : '상급';
    }
};
