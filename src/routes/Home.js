import NewTweet from "components/NewTweet";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { dbService, storageService } from "myBase";
import React, { useEffect, useState } from "react";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
// 사진에 랜덤 이름을 주기 위한 라이브러리
import { v4 as uuidv4 } from 'uuid';
import TweetForm from "components/TweetForm";

const Home = ({ userObj }) => {
    const [newTweet, setNewTweet] = useState("");
    const [newTweets, setNewTweets] = useState([]);
    const [image, setImage] = useState("");

    // 데이터 가져와서 보여주기
    // getNewTweet을 사용하지 않고 파베 snapshot 기능을 통해 실시간으로 채팅 업로드 re-render 적게
    useEffect(() => {
        const q = query(
            collection(dbService, "newTweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const newTweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }
            ));
            console.log(newTweetArr);
            console.log("뭔가 일이 일어났어요")
            setNewTweets(newTweetArr);
        });
    }, []);


    return (
        <div className="container">
            <TweetForm userObj={userObj} />
            <div className="nweet_wrapper">
                {newTweets.map((newTweet) => (
                    // 컴포넌트로 모듈화, userObj는 Home의 props
                    <NewTweet key={newTweet.id} newTweetObj={newTweet} isOwner={newTweet.creatorId === userObj.uid} userObj={userObj} />
                ))}
            </div>
        </div>
    )
}

export default Home;