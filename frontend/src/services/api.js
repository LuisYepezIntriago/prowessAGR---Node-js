import axios from "axios"
const WEBURL = process.env.REACT_APP_API_URL

export const checkToken = async(token) => {
    try{
        const response = await axios.get(`${WEBURL}fb/usuario`,{
            headers: {
              token: token,
            },
          })
        return response
    }    catch(error){
        console.log(error)
    }
}

export const getTokenData = async(token) => {
  try{
    const response = await axios.get('http://localhost:5000/fb/auth',{
      headers:{
        token: token,
      },
    })
    return response
      }
  catch(error){
    console.log(error)
  }
}