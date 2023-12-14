import React,{useState} from 'react'
import Header from '../compotents/Header'
import Tags from '../compotents/Tags'

const Homepage = () => {
    const [tags, setTags] = useState([]);
  return (
    <div className='homepage'>
        <Header setTags={setTags}/>
        <Tags filters={tags}/>
    </div>
  )
}

export default Homepage