import axios from 'axios';
import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [diaryList, setDiaryList] = useState(null);
  const [formValues, setFormValues] = useState({ title: "", content: "", mood: "" });

  useEffect(() => {
    fetchDiary();
  }, []);

  const fetchDiary = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/diary");
      //console.log(res.data);
      setDiaryList(res.data.map(diary => ({ ...diary, mood: diary.mood || "" })));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const currentDate = new Date().toISOString().split('T')[0];

    await axios.post("http://localhost:4000/api/diary", { ...formValues, title, content, date: currentDate });
    fetchDiary();

    setFormValues({ title: "", content: "" });
  };

  const onDeleteHandler = async (id) => {
    await axios.delete(`http://localhost:4000/api/diary/${id}`);
    fetchDiary();
  };

  const onMoodChange = (selectedMood) => {
    if (formValues.mood !== selectedMood) {
      setFormValues({ ...formValues, mood: selectedMood });
    }
  };

  return (
      <>
        <Container>
          <Title>✨ Diary ✨</Title>
          <Form onSubmit={onSubmitHandler}>
            <MoodSelector>
              <label>
                <input
                    type="checkbox"
                    value="신난댜~"
                    checked={formValues.mood === "신난댜~!~!"}
                    onChange={() => onMoodChange("신난댜~!~!")}
                />
                😻
              </label>
              <label>
                <input
                    type="checkbox"
                    value="야호~!"
                    checked={formValues.mood === "야호~!"}
                    onChange={() => onMoodChange("야호~!")}
                />
                😽
              </label>
              <label>
                <input
                    type="checkbox"
                    value="얍"
                    checked={formValues.mood === "얍"}
                    onChange={() => onMoodChange("얍")}
                />
                😺
              </label>
              <label>
                <input
                    type="checkbox"
                    value="우웅..."
                    checked={formValues.mood === "우웅..."}
                    onChange={() => onMoodChange("우웅...")}
                />
                😿
              </label>
              <label>
                <input
                    type="checkbox"
                    value="노발"
                    checked={formValues.mood === "노발"}
                    onChange={() => onMoodChange("노발")}
                />
                😾
              </label>
            </MoodSelector>
            <Input name="title" placeholder="제목" value={formValues.title} onChange={(e) => setFormValues({ ...formValues, title: e.target.value })} />
            <TextArea name="content" placeholder="내용" value={formValues.content} onChange={(e) => setFormValues({ ...formValues, content: e.target.value })} />
            <SubmitButton type="submit">Write</SubmitButton>
          </Form>
          {diaryList && (
              <DiaryList>
                {diaryList.map((diary) => (
                    <DiaryItem key={diary.id}>
                      <div>
                        <DiaryTitle>{diary.title}</DiaryTitle>
                        <DiaryContent>{diary.content}</DiaryContent>
                        <DiaryDate>{diary.date}</DiaryDate>
                        <DiaryMood>Mood: {diary.mood}</DiaryMood> {/* 추가된 부분 */}
                      </div>
                      <DeleteButton onClick={() => onDeleteHandler(diary.id)}>
                        Delete
                      </DeleteButton>
                    </DiaryItem>
                ))}
              </DiaryList>
          )}
          <Alert>그만 줄여용!!</Alert>
        </Container>
      </>
  );
}

export default App;

const Container = styled.div`
display: flex;
width: 100vw;
  height: 30vh;
justify-content: center;
align-items: center;
flex-direction: column;
padding-top: 20px;
//margin-top: 30px;
background-color: #efe5d8;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: #2f2616;
  margin-bottom: 20px;
  @media only screen and (max-width: 350px) {
    color: #d28b1c;
  }
`;

const Form = styled.form`
width: 60%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-bottom: 20px;
`;

const Input = styled.input`
width: 100%;
padding: 10px;
margin-bottom: 10px;
font-size: 16px;
`;

const TextArea = styled.textarea`
width: 100%;
padding: 10px;
margin-bottom: 10px;
font-size: 16px;
`;

const MoodSelector = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 30px;
    cursor: pointer;

    input {
      margin-bottom: 5px;
    }
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 50%;
  background-color: #eebf2b;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #12c9b9;
  }
`;

const DiaryList = styled.ul`
  list-style: none;
  width: 60%;
  box-shadow: 0 0 4px rgb(238, 191, 43);
  background-color: white;
`;

const DiaryItem = styled.li`
border-bottom: 1px solid #eee;
padding: 20px 0;
display: flex;
justify-content: space-between;
align-items: center;
`;

const DiaryMood = styled.p`
  font-size: 14px;
  color: #eebf2b;
`;

const DiaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #ee8d2b;
`;

const DiaryContent = styled.p`
  font-size: 16px;
  color: #483703;
`;
//d
const DiaryDate = styled.p`
  font-size: 14px;
  color: #4d4a40;
`;

const DeleteButton = styled.button`
  padding: 10px;
  margin-right: 2rem;
  background-color: #d34d2f;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #944545;
  }
`;

const Alert = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #00b2ff;
  display: none;
  @media only screen and (max-width: 350px) {
    display: flex;
  }
`;