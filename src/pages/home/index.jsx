import React from "react"
import Layout from "../../componemts/layout"
import {useSelector, useDispatch} from 'react-redux';
import { PostApi } from "../../apis/posts/post";
import queryString from 'query-string'; 
const Home = () => {
    const user = useSelector((state) => state.auth.user);
    const [data, setData] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [strSearch, setStrSearch] = React.useState("");
    const [keywordSearch, setKeywordSearch] = React.useState("");
    const [sortBy, setSortBy] = React.useState("");
    React.useEffect(() => {
        const getData = async () => {
            let payload = {
                _sort: sortBy,
                _order: "desc",
                description_like:keywordSearch
            }
            await PostApi.getWithPagination(queryString.stringify(payload)).then((res) => {
                setData(res || []);
            })
        }
        getData();
     }, [isLoading, keywordSearch, sortBy])
     const onChangeInput = (event, id) => {
        setComments({ 
            ...comments, 
            [id]: { 
                "content" : event.target.value, "userName": user.userName, "fullName": user.fullName
            }})
     }
      const handleAddComment = (postId, comment) => {
        const updatedPosts = data.filter((f) => f.id == postId)?.map(post => {
          if (post.id == postId) {
            return { ...post, comments: [...post.comments, comment] };
          }
          return post;
        });
        handleSubmitComment(postId,updatedPosts[0]);
        setComments({ ...comments, [postId]: '' });
    };
    const handleKeyPress = (e, postId) => {
        if (e.key === 'Enter') {
          handleAddComment(postId, comments[postId]);
        }
      };
     const handleSubmitComment = async(postId,content) => {
        let payload = {
            comments : content?.comments?? [],
            count: content?.comments.length,
        }
        await PostApi.createComment(postId, payload).then((res) => {
            if(res) setIsLoading(!isLoading)
        })
     }
     const handleSearch = () => {
        setStrSearch(event.target.value);
     }
     const handleSort = (item) => {
        setSortBy(item.key)
     }
    return (
        <Layout 
            onChange={handleSearch}
            value={strSearch}
            submit={() => {
                setKeywordSearch(strSearch);
            }}
            onChangeSort={handleSort}
        >
            <div className="main-content">
                <div className="page-content">
                    <div className="container-full">
                    {data?.map((item, index) => {
                        return (
                            <div className='row justify-content-center' key={index}>
                                <div className="col-sm-12 col-md-9 col-lg-6">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex">
                                            <div className="rounded-circle border d-flex justify-content-center align-items-center"
                                                style= {{width:40 , height:40}}>
                                                <i className="fas fa-user-alt  text-info"></i>
                                            </div>
                                            <div className="flex-grow-1 ms-3 w-100">
                                                <h4 className="mb-0 card-title">{item?.createdBy}</h4>
                                                <p className="font-size-14 mb-1">{item?.title}</p>
                                            </div>
                                        </div> 
                                        <div className="mt-3">
                                            <img src={item?.image} className="w-100" />
                                            <div className="pt-5 font-size-14">
                                                <p>
                                                    {item?.description}
                                                </p>
                                            </div>
                                        </div> 
                                        <hr className="mb-2"></hr> 
                                        <div className="text-truncate font-size-14">
                                                Comment
                                        </div>
                                        <hr className="mt-2"></hr>
                                        <div className="d-flex mb-2">
                                            <div className="rounded-circle border d-flex justify-content-center align-items-center"
                                                style= {{width:40 , height:40}}>
                                                <i className="fas fa-user-alt text-info"></i>
                                            </div>
                                            {/* <form className="w-100" onSubmit={()=> handleSubmit(event, item.id)}> */}
                                                <div className="flex-grow-1 ms-3">
                                                    <div className="input-group">
                                                        <input  name="content"  
                                                            value={comments[item.id]?.content || ''}
                                                            className="form-control"  
                                                            onKeyPress={(e) => {
                                                                if(comments[item.id]?.content)  handleKeyPress(e, item.id)
                                                            }}
                                                            onChange={(e) => onChangeInput(e, item.id)}
                                                        />
                                                        <button className="btn btn-info" 
                                                            disabled={!comments[item.id]?.content}
                                                            onClick={() => handleAddComment(item.id, comments[item.id])}> 
                                                            <i className=" fas fa-external-link-alt"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            {/* </form> */}
                                           
                                        </div> 
                                        {item?.comments?.map((comment, key ) => {
                                            return(
                                                <div className="mt-2" key={key}>
                                                    <div className="d-flex">
                                                        <div className="rounded-circle border d-flex justify-content-center align-items-center"
                                                            style= {{width:40 , height:40}}>
                                                            <i className="fas fa-user-alt   text-info"></i>
                                                        </div>
                                                        <div className="flex-grow-1 ms-3 w-100">
                                                            <h4 className="mb-0 card-title">{comment?.fullName}</h4>
                                                            <div className="font-size-13 mb-1">{comment?.content}</div>
                                                        </div>
                                                    </div>      
                                                </div>
                                            )
                                        })}                         
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home