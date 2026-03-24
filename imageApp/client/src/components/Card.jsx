function Card({ user }) {
  return (
    <div className="border rounded-lg p-3 shadow">
      <img
        src={user.image}
        alt="user"
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}

export default Card;