function Card({ user }) {  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card-bg shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-gray-700/80 dark:bg-dark-card dark:shadow-none dark:hover:shadow-black/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-border dark:bg-gray-800">
        <img
          src={user.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5 text-left">
        <h3 className="text-lg font-bold leading-snug text-text dark:text-dark-text">
          {user.imageName}
        </h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Fancy number{" "}
          <span className="font-semibold text-primary-dark-green dark:text-dark-accent">
            {user.imageNumber}
          </span>
        </p>
      </div>
    </article>
  );
}

export default Card;
