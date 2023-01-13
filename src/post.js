const Post = ({ item }) => {
  return (
    <div>
      <div>Name:{item.name}</div>
      <div>Body:{item.body}</div>
    </div>
  );
};

export default Post;
