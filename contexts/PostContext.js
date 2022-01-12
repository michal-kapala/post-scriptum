import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from './UserContext';
import Constants from 'expo-constants';
import testPosts from '../components/TestPosts';

{/*Kontekst dla danych i aktualizacji*/}
export const PostContext = React.createContext();

const apiUrl = Constants.manifest.extra.apiUrl;

{/*Zarządzanie stanem i dostępem do niego*/}
export const PostDataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const userCtx = useContext(UserContext);

    useEffect(() => {
      console.log('new posts set on PostCtx: \n' + JSON.stringify(posts));
    }, [posts]);

    {/*GET /animal/read*/}
    async function getPosts(tokenStr, params) {
      var postList = [], status = null, newJwt = null;
      var res = await fetch(`${apiUrl}/posts?` + params,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + tokenStr
          },
          method: 'GET'
        })
        .then(response => { 
          status = response.status;
          return response.json();
        })
        .then(async (data) => {
          switch(status) {
            case 200:
              // OK
              var jsonStr = JSON.stringify(data);
              postList = JSON.parse(jsonStr);
              break;
            case 401: 
              // jwt expired
              if(userCtx.userData.email) {
                var {newToken, userId} = await userCtx.relogin();
                postList = [];
                newJwt = newToken;
                console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
              }
              break;
            default: 
              console.log('Unhandled getPosts response status: ' + status);
              break;
          }
        });
        
      return {newJwt, postList};
    }

    async function updatePosts(tokenStr, params) {
      var {newJwt, postList} = await getPosts(tokenStr, params);
      // Powtórne wywołanie z nowym jwt w przypadku utraty ważności
      if(newJwt) 
        var {newJwt, postList} = await getPosts(newJwt, params);
      //Serwer nie znalazł wyników
      if(postList == null) 
        postList = [];
      console.log('Posts update:\n' + JSON.stringify(postList));
      //TODO: obrazki z bazy, temp solution
      /*postList.forEach( (post) => {
        //wycięcie daty
        post.admission_date = post.admission_date.substring(0, 10);
      });*/
      setPosts(postList);
    }

    //Aktualizacja post.favourite
    //disabled for now
    async function updateLike(id) {

      var post = getPost(id);
      var newJwt = null, token = userCtx.userData.token;
      const isDeleting = post.favourite;
      console.log(`${isDeleting ? 'delete' : 'create'}Favourite called for ${post.name}, id = ${id}`);
      newJwt = isDeleting ? await dislike(token, id) : await like(token, id);
      if(newJwt) {
        newJwt = isDeleting ? await dislike(newJwt, id) : await like(newJwt, id);
      }
      // Odświeża całą listę postów
      // TODO: GET animal/read/id, podmienienie obiektu w liście i setPosts
      var params = new URLSearchParams({"user-id": userCtx.userData.userId});
      token = newJwt ? newJwt : userCtx.userData.token;
      updatePosts(token, params);
    }

    async function addPost(post, token) {
      var status = null, newJwt = null;

      var res = await fetch(`${apiUrl}/posts`,
        {
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          method: 'POST'
        })
        .then(async response => { 
          status = response.status;
          switch(status) {
            case 201:
              // Created
              break;
            case 401: 
              // jwt expired
              if(userCtx.userData.email) {
                var {newToken, userId} = await userCtx.relogin();
                newJwt = newToken;
                console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
              }
              break;
            default: 
              console.log('Unhandled addPost response status: ' + status);
              break;
          }
        });
        return newJwt;
    }

    async function deletePost(token, params) {
      var status = null, newJwt = null;

      var res = await fetch(`${apiUrl}/posts` + params,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          method: 'DELETE'
        })
        .then(async response => { 
          status = response.status;
          switch(status) {
            case 204:
              // Deleted - No content
              break;
            case 401: 
              // jwt expired
              if(userCtx.userData.email) {
                var {newToken, userId} = await userCtx.relogin();
                newJwt = newToken;
                console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
              }
              break;
            default: 
              console.log('Unhandled deletePost response status: ' + status);
              break;
          }
        });
        return newJwt;
    }

    async function like(token, id) {
      var status = null, newJwt = null;

      var res = await fetch(`${apiUrl}/likes`,
        {
          body: JSON.stringify({
            postId: id,
            userId: userCtx.userData.userId
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          method: 'POST'
        })
        .then(async response => { 
          status = response.status;
          switch(status) {
            case 201:
              // Created
              break;
            case 401: 
              // jwt expired
              if(userCtx.userData.email) {
                var {newToken, userId} = await userCtx.relogin();
                newJwt = newToken;
                console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
              }
              break;
            default: 
              console.log('Unhandled createFavourite response status: ' + status);
              break;
          }
        });
        return newJwt;
    }

    async function dislike(token, id) {
      var status = null, newJwt = null;

      var res = await fetch(`${apiUrl}/likes`,
        {
          body: JSON.stringify({
            postId: id,
            userId: userCtx.userData.userId
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          method: 'DELETE'
        })
        .then(async response => { 
          status = response.status;
          switch(status) {
            case 204:
              // No Content
              break;
            case 401: 
              // jwt expired
              if(userCtx.userData.email) {
                var {newToken, userId} = await userCtx.relogin();
                newJwt = newToken;
                console.log('Refreshed jwt token for user ' + userId + ':\n' + newToken);
              }
              break;
            default: 
              console.log('Unhandled deleteFavourite response status: ' + status);
              break;
          }
        });
        return newJwt;
    }

    function getPost(id) {
      return posts.find(p => p.id == id);
    }

    return(
        <PostContext.Provider value={{ posts, setPosts, updatePosts, addPost, deletePost, getPost }}>
            {children}
        </PostContext.Provider>
      );
}