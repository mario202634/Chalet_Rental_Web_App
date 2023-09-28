import UserSummary from './UserSummary';

const UsersList = (props) => {
  return (
    <div className="grid grid-cols-2 gap-5 justify-center items-center">
      {props.users.map((p) => (
        <UserSummary user={p} key={p._id} />
      ))}
    </div>
  );
};

export default UsersList;
