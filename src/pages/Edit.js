import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  // id 불러오기 위한 useParanms
  const { id } = useParams();
  // targetDiary를 저장할 state
  const [originData, setOriginData] = useState();

  // useContext를 이용해서 일기를 받아온다.
  const diaryList = useContext(DiaryStateContext);

  // id와 일치하는 값을 Edit 컴포넌트가 마운트됐을 때 사용한다.
  // id나 diaryList가 변할 때, 꺼내온다.
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        // targetDiary가 존재할 때
        setOriginData(targetDiary);
      } else {
        alert("없능 일기입니다.");
        // 만약 그 id 번호가 없으면 저장하지 않고 홈으로 보낸다.
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* originData가 있으면 DiaryEditor 나오도록한다. */}
      {/* isEdit을 true로 만들어 수정으로 변환 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
