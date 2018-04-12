
export function tableFormatter(row, column,cellValue){
  let num =parseFloat(cellValue).toFixed(2);
  return num;
}
export function procCode(code) {
  if(code!=null){
  switch (code){
    case "0":
      code="未审核";
      break;
    case "1":
      code="处理中";
      break;
    case "2":
      code="补件";
      break;
    case "3":
      code="拒绝";
      break;
    case "4":
      code="客户放弃申请";
      break;
    case "5":
      code="客户放弃申请";
      break;
    case "6":
      code="已放款";
      break;
    case "7":
      code="通过待补件";
      break;
    case "8":
      code="已处理";
      break;
    case "9":
      code="异常";
      break;
    case "10":
      code="捞件中";
      break;
    case "11":
      code="暂存";
      break;
    case "90":
      code="开户失败";
      break;
    case "91":
      code="已取消开户";
      break;
    case "92":
      code="取消面签";
      break;
    case "93":
      code="取消放款";
      break;
    case "94":
      code="激活失败";
      break;
    case "95":
      code="放款失败";
      break;
    case "99":
      code="结案";
      break;
    default:
      code=""
  }}
  return code;
}
export function  userInfo(code) {
  switch (code){
    case "01":
      code="新账户";
      break;
    case "05":
      code="已核准";
      break;
    case "07":
      code="部分放款";
      break;
    case "08":
      code="全部放款";
      break;
    case "10":
      code="取消贷款";
      break;
    case "12":
      code="已进行展期的预约申请";
      break;
    case "13":
      code="已展期";
      break;
    case "15":
      code="已重整";
      break;
    case "20":
      code="待清";
      break;
    case "40":
      code="结清";
      break;
    case "50":
      code="到期";
      break;
    default:code="";
  }
  return code;
}
