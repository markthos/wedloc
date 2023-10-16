

const CommentSection = () => {



  return (
    <div className="m-4 flex flex-col text-center">
      <h3>Comment Section</h3>
      <ul className="flex flex-col gap-2">
        {postData.comments.map((comment) => (
          <li key={comment._id}>
            <div className="flex justify-between">
              <h3>{comment.author}</h3>
              <p>{comment.date}</p>
            </div>
            {name === comment.author ? (
              <p className="flex justify-end bg-gray-300 text-center">
                {comment.text}
              </p>
            ) : (
              <p className="flex justify-start bg-gray-300 text-center">
                {comment.text}
              </p>
            )}
          </li>
        ))}
      </ul>
      <form className="w-100% mb-6 mt-6 flex flex-col gap-6">
        <input
          type="textarea"
          name="newComment"
          className="resize"
          placeholder="Comment..."
        />
        <StyledButton type="submit" primaryColor displayText={"Submit"} />
      </form>
    </div>
  );
};

export default CommentSection;
