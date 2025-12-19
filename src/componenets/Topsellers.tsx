import { useEffect, useState } from "react";

interface Authors {
  name: string;
  isFollowing: boolean;
  image: string;
}

const Topsellers = () => {
  const [author, setAuthor] = useState<Authors[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/?results=5");
        const data = await res.json();

        const authorData: Authors[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthor(authorData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchdata();
  }, []);

   // FOLLOW/UNFOLLOW function
  const toggleFollow = (index: number) => {
    setAuthor(prev =>
      prev.map((a, i) =>
        i === index ? { ...a, isFollowing: !a.isFollowing } : a
      )
    );
  };

  return (
    <div className="bg-white p-5 mx-5 mt-20 border w-92 ">
      <h2 className="font-bold mb-4">Top Sellers</h2>
     <ul>
      {author.map((a, index) => (
        <li key={index} className="flex items-center justify-between mb-4" >
          <section className="flex items-center justify-between">
          <img src={a.image} alt={a.name} className="h-[25%] w-[25%] rounded-full justify-center"/>
          <span className="ml-4">{a.name}</span>
          </section>
          <button
          onClick={()=>toggleFollow(index)}
           className={`py-1 px-2 rounded ${a.isFollowing ? "bg-red-500 text-white" : "bg-black text-white"}`}>{a.isFollowing ? 'unfollow': "follow"}</button>
        </li>
        
      ))}
      </ul>
    </div>
  );
};

export default Topsellers;
