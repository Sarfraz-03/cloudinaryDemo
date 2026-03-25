function Card({ user }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <img
        src={user.image}
        alt={`${user.name}'s profile`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
      <p className="text-gray-600">Fancy number: {user.age}</p>
    </div>
  );
}

export default Card;