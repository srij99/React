//https://api.adviceslip.com/advice

import React, { useEffect, useState } from "react";
import { addData, fetchData, deleteData } from "./Service/methods";

const Functionalapp = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    console.log("Constructor called")
    //fetchPostData();
  },[])


  // const [advice, setAdvice]=useState("")

  //   async function fetchAdvice(){
  //     let res = await fetch('https://api.adviceslip.com/advice') 
  //     let data = await res.json()
  //     setAdvice(data.slip.advice)

  //   }

// const fetchPostData = async () =>{
//   let res = await fetchData();
//   setPosts(res.data)
// }


return(  
    <>
    <h1>HHHHH</h1>
    {/*<h2>{advice}</h2>*/}

    <button onClick={async ()=>{
      let res = await addData()
      if (res.status===200 || res.status===201){
        setPosts([res.data,...posts])
      }
      }}>Add</button>

      
    

    <button onClick={async ()=>{
      let res = await fetchData();
         setPosts(res.data)
    }}>Fetch</button>



    <ul>
      {posts.map((e)=>{
        return (<>
        <li>{e.title}</li>



        <button onClick={async ()=>{
          let res = await deleteData(e.id)
          if(res.status===200){
            let list = posts.filter(oldpost=>{
              return oldpost.id!==e.id
            })
            setPosts(list)
          }
        }}>Delete</button>



        </>)
      })}
    </ul>
    </>
  )

  
}

export default Functionalapp;

