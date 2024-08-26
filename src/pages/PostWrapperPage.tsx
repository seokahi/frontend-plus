import { Route, Routes } from 'react-router-dom';
import PostDetailPage from './PostDetailPage';
import PostsPage from './PostPage';
import PostEditPage from './PostEditPage';


const  PostWrapperPage:React.FC = ()=> {

      
    return(
      <>
                <Routes>
                  <Route index element={<PostsPage />} />
                  <Route path=":id" element={<PostDetailPage />} />
                  <Route path=":id/edit" element={<PostEditPage />} />
          </Routes>
      </>
    )
}

export default PostWrapperPage