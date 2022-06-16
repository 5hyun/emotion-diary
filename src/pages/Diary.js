import { useParams } from "react-router-dom";
//리액트 hooks는 아니지만 별도 라이브러리가 제공하는 hooks를
// 사용자 정의 hooks를 커스텀 hooks라고 부른다.

const Diary = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다.</p>
    </div>
  );
};

export default Diary;
