// 처음부터 오늘의 날짜가 오게 해주기 위한 기능
export const getStringDate = (date) => {
  // 0~9까지 잘라준다.
  return date.toISOString().slice(0, 10);
};
