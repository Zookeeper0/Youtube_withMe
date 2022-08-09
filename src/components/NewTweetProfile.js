import userProfile from '../image/userProfile.png';

const NewTweetProfile = ({ userObj, newTweetObj }) => {

    return (
        <div className="nweet__profile">
            <img src={userProfile} width="26px" height="26px"></img>
            <span className="nweet__profile_">{newTweetObj.creatorProfile}가 공유합니다.</span>
        </div>
    )
};

export default NewTweetProfile;