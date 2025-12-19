import { MessageCircle, ThumbsUp } from "lucide-react";


const PopulorBogs = () => {
const blogs = [
  {
    title: "Top 10 Gadgets You Must Try in 2025",
    author: "Tech Insider",
    likes: 320,
    comments: 45,
  },
  {
    title: "Mastering React in Just 30 Days",
    author: "CodePulse",
    likes: 410,
    comments: 67,
  },
  {
    title: "Best Smartphones Under ₹20,000",
    author: "GadgetHub",
    likes: 290,
    comments: 39,
  },
 
];

  return (
     <div className="bg-white p-5 mx-5 mt-5 mb-4 border ml-5 mr-1 w-92 ">
      <h2 className="font-bold mb-4">Populor Blog</h2>
      {
        blogs.map((b,i)=>(
          <li>
          <div key={i} className="flex justify-between items-center">
            <span className="font-bold mb-2">{b.title}</span>
          </div>
          <span className="text-gray-600">Publisher:{b.author}</span>
          <div className="flex item-center mt-2">
            <MessageCircle size={16}/>
            <span className="text-gray-500 mr-5 ml-1">{b.likes}</span>
            <ThumbsUp size={16}/>
            <span className="text-gray-600">{b.comments}</span>
          </div>
          </li>
        ))
      }
      </div>
  )
}

export default PopulorBogs